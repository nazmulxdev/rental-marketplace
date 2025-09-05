// My Listings Page
// -----------------
// Will fetch properties owned by the authenticated admin user (ownerAdminId matches user/account context).
// Placeholder list UI.
import React from "react";
import { getCollection } from "@/lib/db.connect";
import { ObjectId } from "mongodb";
import ListingsTable from "@/components/dashboard/ListingsTable";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import type { NextAuthOptions } from "next-auth";

export const dynamic = 'force-dynamic';

interface ListingRow { _id: string; title: string; type: string; pricing?: { monthly?: number | null }; status: string; createdAt?: Date }

interface PageProps { searchParams?: { [key: string]: string | string[] | undefined } }

export default async function MyListingsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions as NextAuthOptions);
  // @ts-expect-error id added in callback
  const userId: string | null = session?.user?.id || null;
  let items: ListingRow[] = [];
  if (userId) {
    const { propertiesCollection } = await getCollection();
    const docs = await propertiesCollection
      .find({ ownerAdminId: new ObjectId(userId) }, { projection: { title: 1, type: 1, pricing: 1, status: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();
    items = docs.map(d => ({ _id: d._id.toString(), title: d.title, type: d.type, pricing: d.pricing, status: d.status, createdAt: d.createdAt }));
  }

  const createdFlag = searchParams?.created === '1';
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">My Listings</h1>
        <p className="text-sm text-base-content/70">Manage and monitor properties you have published.</p>
      </div>
      {createdFlag && (
        <div className="alert alert-success bg-success/10 border border-success/30 text-success text-sm">
          Listing created successfully.
        </div>
      )}
      {!userId ? (
        <div className="alert bg-base-200/60 border border-base-300 text-sm">Login required to view your listings.</div>
      ) : (
        <ListingsTable items={items.map(i => ({ ...i, createdAt: i.createdAt ? i.createdAt.toISOString() : undefined }))} />
      )}
    </section>
  );
}
