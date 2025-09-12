import { getCollection } from "@/lib/db.connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/user/profile
// Returns the current authenticated user's profile fields flattened for the profile form.
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { usersCollection } = await getCollection();
    const user = await usersCollection.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const profile = user.profile || {};
    const address = profile.address || {};

    return Response.json({
      name: profile.name || "",
      phone: profile.phone || "",
      avatarUrl: profile.avatarUrl || "",
      city: address.city || "",
      district: address.district || "",
      division: address.division || "",
      country: address.country || "",
      postalCode: address.postalCode || "",
    });
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
