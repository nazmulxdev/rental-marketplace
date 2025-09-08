import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";

export async function PATCH(req, { params }) {
  try {
    const { action, superAdminId } = await req.json(); // approve | reject | member | ban
    const { id } = params; // adminApplication._id

    const { usersCollection, adminApplication, adminsCollection } = await getCollection();

    // Find the admin request and user
    const request = await adminApplication.findOne({ _id: new ObjectId(id) });
    if (!request) return new Response(JSON.stringify({ error: "Request not found" }), { status: 404 });

    const user = await usersCollection.findOne({ _id: new ObjectId(request.userId) });
    if (!user) return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });

    let userUpdate = {};
    let appStatus = "";

    switch (action) {
      case "approve": // make admin
        userUpdate = { roles: "ADMIN", "profile.roleRequest": "APPROVED" };
        appStatus = "approved";

        // Create or update admin profile in adminsCollection
        const adminProfile = {
          userId: user._id,
          approved: true,
          approvedAt: new Date(),
          business: {
            displayName: user.profile.name || "",
            about: "",
            payoutMethod: { provider: "", accountRef: "" },
          },
          rating: { avg: 0, count: 0 },
          stats: { activeListings: 0, totalAgreements: 0 },
          badges: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await adminsCollection.updateOne(
          { userId: user._id },
          { $set: adminProfile },
          { upsert: true }
        );
        break;

      case "reject": // reject admin request
        userUpdate = {roles: "USER", "profile.roleRequest": "REJECTED"};
        appStatus = "rejected";
        break;

      case "member": // demote to member
        userUpdate = { roles: "MEMBER", "profile.roleRequest": "REJECTED" };
        appStatus = "member";
        // Remove admin profile if exists
        await adminsCollection.deleteOne({ userId: user._id });
        break;

      case "ban": // ban user
        userUpdate = { roles: "BANNED", "profile.roleRequest": "BANNED" };
        appStatus = "banned";
        // Remove admin profile if exists
        await adminsCollection.deleteOne({ userId: user._id });
        break;

      default:
        return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
    }

    // Update user roles/status if necessary
    if (Object.keys(userUpdate).length > 0) {
      await usersCollection.updateOne(
        { _id: new ObjectId(request.userId) },
        { $set: userUpdate }
      );
    }

    // Update admin application
    await adminApplication.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: appStatus, approvedBy: superAdminId || null, updatedAt: new Date() } }
    );

    return new Response(JSON.stringify({ message: "User role updated successfully" }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
