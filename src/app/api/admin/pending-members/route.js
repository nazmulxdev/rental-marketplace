import { getCollection } from "@/lib/db.connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const {usersCollection} = await getCollection();
    const pending = await usersCollection
      .find({ "profile.roleRequest": "MEMBER" })
      .project({
        email: 1,
        roles: 1,
        status: 1,
        "profile.name": 1,
        "profile.avatarUrl": 1,
        "profile.roleRequest": 1,
      })
      .toArray();

    return NextResponse.json(pending, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
