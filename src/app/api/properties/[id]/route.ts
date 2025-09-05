import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import type { NextAuthOptions } from "next-auth";

async function getUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions as NextAuthOptions);
  // @ts-expect-error id added in callback
  return session?.user?.id || null;
}

export async function GET(_req: NextRequest, { params }: { params: { id: string }}) {
  try {
    const { id } = params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const { propertiesCollection } = await getCollection();
    const doc = await propertiesCollection.findOne({ _id: new ObjectId(id) }, { projection: { title:1, description:1, type:1, pricing:1, status:1, location:1 } });
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item: { ...doc, _id: doc._id.toString() } });
  } catch (e) {
    console.error("GET /api/properties/[id] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string }}) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const body = await req.json();
  const { title, status, description, monthly, deposit, city, district, division, type } = body || {};
  interface Pricing { monthly: number | null; deposit: number | null }
  interface Address { city: string; district: string; division: string }
  const update: { updatedAt: Date; title?: string; status?: string; description?: string; type?: string; pricing?: Pricing; 'location.address'?: Address } = { updatedAt: new Date() };
    if (title !== undefined) update.title = title;
    if (status !== undefined) update.status = status;
    if (type !== undefined) update.type = type;
    if (description !== undefined) update.description = description;
    if (monthly !== undefined || deposit !== undefined) {
      update.pricing = { monthly: monthly !== undefined ? Number(monthly) : null, deposit: deposit !== undefined ? Number(deposit) : null };
    }
    if (city !== undefined || district !== undefined || division !== undefined) {
      update['location.address'] = { city: city || '', district: district || '', division: division || '' };
    }
    const { propertiesCollection } = await getCollection();

    // Backward compatibility: some older records may have stored ownerAdminId as a plain string instead of ObjectId.
    const ownerObjectId = ObjectId.isValid(userId) ? new ObjectId(userId) : null;
    interface OwnershipFilter {
      _id: ObjectId;
      $or: Array<{ ownerAdminId: ObjectId } | { ownerAdminId: string }>;
    }
    const ownershipFilter: OwnershipFilter = {
      _id: new ObjectId(id),
      $or: [
        ...(ownerObjectId ? [{ ownerAdminId: ownerObjectId }] : []),
        { ownerAdminId: userId }
      ]
    };

    // First fetch the document to ensure ownership (and to allow clearer error messaging)
    const existing = await propertiesCollection.findOne(ownershipFilter, { projection: { _id:1 } });
    if (!existing) {
      return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
    }

    const result = await propertiesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after", projection: { title:1,type:1,description:1,pricing:1,status:1,location:1,createdAt:1 } }
    );
    const doc = result ? result.value : null;
    if (!doc) return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
    return NextResponse.json({ item: { ...doc, _id: doc._id.toString() } });
  } catch (e) {
    console.error("PATCH /api/properties/[id] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string }}) {
  try {
    const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { id } = params;
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    const { propertiesCollection } = await getCollection();
    const result = await propertiesCollection.deleteOne({ _id: new ObjectId(id), ownerAdminId: new ObjectId(userId) });
    if (result.deletedCount === 0) return NextResponse.json({ error: "Not found or forbidden" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/properties/[id] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
