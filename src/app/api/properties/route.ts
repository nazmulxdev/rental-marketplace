import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

async function getUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions as NextAuthOptions);
  // @ts-expect-error user id added via callback augmentation
  return (session?.user?.id as string | undefined) || null;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mine = searchParams.get("mine");
    const ownerAdminId = searchParams.get("ownerAdminId");
    const { propertiesCollection } = await getCollection();

    interface PropertyFilter { ownerAdminId?: ObjectId }
    const filter: PropertyFilter = {};

    if (ownerAdminId) {
      if (!ObjectId.isValid(ownerAdminId)) {
        return NextResponse.json({ error: "Invalid ownerAdminId" }, { status: 400 });
      }
      filter.ownerAdminId = new ObjectId(ownerAdminId);
    } else if (mine === "1") {
      const userId = await getUserId();
      if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      filter.ownerAdminId = new ObjectId(userId);
    }

    const docs = await propertiesCollection
      .find(filter, { projection: { title: 1, type: 1, pricing: 1, status: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    const items = docs.map(d => ({
      _id: d._id.toString(),
      title: d.title,
      type: d.type,
      pricing: d.pricing,
      status: d.status,
      createdAt: d.createdAt
    }));

    return NextResponse.json({ items });
  } catch (e) {
    console.error("GET /api/properties error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
  const userId = await getUserId();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const body = await req.json();
    const { title, description = "", type, monthly, deposit, city, district, division } = body || {};
    if (!title || !type) return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const { propertiesCollection } = await getCollection();

    const now = new Date();
    const doc = {
      ownerAdminId: new ObjectId(userId),
      title,
      description,
      type,
      pricing: {
        monthly: monthly ? Number(monthly) : null,
        deposit: deposit ? Number(deposit) : null
      },
      location: {
        geo: null,
        address: { city: city || "", district: district || "", division: division || "" }
      },
      amenities: [],
      rules: [],
      images: [],
      availability: 'vacant',
      status: 'active',
      stats: { saves: 0, views: 0 },
      createdAt: now,
      updatedAt: now,
      deletedAt: null
    };

  const result = await propertiesCollection.insertOne(doc);
  return NextResponse.json({ ok: true, item: { _id: result.insertedId.toString(), title: doc.title, type: doc.type, pricing: doc.pricing, status: doc.status, createdAt: doc.createdAt } });
  } catch (e) {
    console.error("POST /api/properties error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
