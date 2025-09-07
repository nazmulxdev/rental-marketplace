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

    if (requestedRole === "ADMIN" && !["USER", "MEMBER"].includes(user.roles)) {
      return NextResponse.json(
        { error: "Only USER or MEMBER can request to become ADMIN" },
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
