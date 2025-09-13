import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import type { NextAuthOptions } from "next-auth";

async function getUserId(): Promise<string | null> {
  const session = await getServerSession(authOptions as NextAuthOptions);
  return session?.user?.id || null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!ObjectId.isValid(id))
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const { propertiesCollection } = await getCollection();
    const doc = await propertiesCollection.findOne(
      { _id: new ObjectId(id) },
      {
        projection: {
          title: 1,
          description: 1,
          type: 1,
          pricing: 1,
          status: 1,
          location: 1,
        },
      }
    );
    if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ item: { ...doc, _id: doc._id.toString() } });
  } catch (e) {
    console.error("GET /api/properties/[id] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!ObjectId.isValid(id))
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await req.json();
    const {
      title,
      status,
      description,
      monthly,
      deposit,
      city,
      district,
      division,
      type,
    } = body || {};

    // Defined specific types to remove 'any'
    interface Pricing {
      monthly: number | null;
      deposit: number | null;
    }
    interface Address {
      city: string;
      district: string;
      division: string;
    }
    interface UpdatePayload {
      updatedAt: Date;
      title?: string;
      status?: string;
      description?: string;
      type?: string;
      pricing?: Pricing;
      "location.address"?: Address;
    }

    const update: UpdatePayload = { updatedAt: new Date() };

    if (title !== undefined) update.title = title;
    if (status !== undefined) update.status = status;
    if (type !== undefined) update.type = type;
    if (description !== undefined) update.description = description;
    if (monthly !== undefined || deposit !== undefined) {
      update.pricing = {
        monthly: monthly !== undefined ? Number(monthly) : null,
        deposit: deposit !== undefined ? Number(deposit) : null,
      };
    }
    if (
      city !== undefined ||
      district !== undefined ||
      division !== undefined
    ) {
      update["location.address"] = {
        city: city || "",
        district: district || "",
        division: division || "",
      };
    }

    const { propertiesCollection } = await getCollection();
    const ownerObjectId = ObjectId.isValid(userId) ? new ObjectId(userId) : null;

    // ✅ FIX: Defined a specific type for the filter to remove 'any'
    interface OwnershipFilter {
      _id: ObjectId;
      $or: Array<{ ownerAdminId: ObjectId } | { ownerAdminId: string }>;
    }

    const ownershipFilter: OwnershipFilter = {
      _id: new ObjectId(id),
      $or: [
        ...(ownerObjectId ? [{ ownerAdminId: ownerObjectId }] : []),
        { ownerAdminId: userId },
      ],
    };

    const existing = await propertiesCollection.findOne(ownershipFilter, {
      projection: { _id: 1 },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Not found or forbidden" },
        { status: 404 }
      );
    }

    const result = await propertiesCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      {
        returnDocument: "after",
        projection: {
          title: 1, type: 1, description: 1, pricing: 1, status: 1, location: 1, createdAt: 1,
        },
      }
    );

    const doc = result ? result.value : null;
    if (!doc)
      return NextResponse.json(
        { error: "Not found or forbidden" },
        { status: 404 }
      );
    return NextResponse.json({ item: { ...doc, _id: doc._id.toString() } });
  } catch (e) {
    console.error("PATCH /api/properties/[id] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    if (!ObjectId.isValid(id))
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      
    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID format" }, { status: 400 });
    }

    const { propertiesCollection } = await getCollection();
    const result = await propertiesCollection.deleteOne({
      _id: new ObjectId(id),
      ownerAdminId: new ObjectId(userId),
    });
    if (result.deletedCount === 0)
      return NextResponse.json(
        { error: "Not found or forbidden" },
        { status: 404 }
      );
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/properties/[id] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}