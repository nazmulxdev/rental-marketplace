import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// POST /api/admin/admin-request
export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const { adminApplication } = await getCollection();

    // Check if user already has a pending request
    const existing = await adminApplication.findOne({
      userId: new ObjectId(userId),
      status: "pending",
    });
    if (existing) {
      return NextResponse.json(
        { error: "You already have a pending request" },
        { status: 400 }
      );
    }

    const now = new Date();
    const result = await adminApplication.insertOne({
      userId: new ObjectId(userId),
      status: "pending",
      submittedAt: now,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      { message: "Role request submitted successfully", result },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET /api/admin/admin-request
export async function GET() {
  try {
    const { adminApplication } = await getCollection();

    const requests = await adminApplication.find().sort({ submittedAt: -1 }).toArray();

    return NextResponse.json({ requests }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
