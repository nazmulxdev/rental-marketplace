import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// PATCH /api/admin/member-request/:id
export async function PATCH(req, { params }) {
  try {
    const { id } = params; // this is the user's _id
    const { action } = await req.json();

    if (!["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const { usersCollection } = await getCollection();

    const user = await usersCollection.findOne({ _id: new ObjectId(id) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Only update if the current request is pending
    if (user.profile.roleRequest !== "MEMBER") {
      return NextResponse.json(
        { error: "No pending member request for this user" },
        { status: 400 }
      );
    }

    const updatedFields = {
      "profile.roleRequest": action === "approve" ? "APPROVED" : "REJECTED",
      updatedAt: new Date(),
    };

    // If approved, update roles from USER -> MEMBER
    if (action === "approve") {
      updatedFields.roles = "MEMBER";
    }

    await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFields }
    );

    return NextResponse.json(
      { message: `Member request ${action}d successfully` },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
