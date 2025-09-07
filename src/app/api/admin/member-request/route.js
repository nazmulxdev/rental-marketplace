//(POST) : api/admin/member-request
import { getCollection } from "@/lib/db.connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, requestedRole } = await req.json();
    const {usersCollection} = await getCollection()

    const user = await usersCollection.findOne({email});
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Validation Rules
    if (requestedRole === "MEMBER" && user.roles !== "USER") {
      return NextResponse.json(
        { error: "Only USER can request to become MEMBER" },
        { status: 400 }
      );
    }


    // ✅ Save request
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          "profile.roleRequest": requestedRole,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json(
      { message: `Role request for ${requestedRole} submitted successfully` },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


//(GET) : api/admin/member-request

export async function GET() {
  try {
    const { usersCollection } = await getCollection();

    // Fetch users who requested MEMBER role
    const memberRequests = await usersCollection
      .find({ "profile.roleRequest": "MEMBER" }) // only pending member requests
      .project({ email: 1, "profile.roleRequest": 1, updatedAt: 1 })
      .toArray();

    return NextResponse.json({ memberRequests }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
