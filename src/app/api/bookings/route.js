import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/db.connect";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, adminUserId, propertyId, slot, notes } = body;

    const { bookingCollection } = await getCollection();

    const bookingDoc = {
      userId: new ObjectId(userId),
      adminUserId: new ObjectId(adminUserId),
      propertyId: new ObjectId(propertyId),
      slot,
      status: "requested",
      notes: notes || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await bookingCollection.insertOne(bookingDoc);

    return NextResponse.json({ success: true, insertedId: result.insertedId });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
