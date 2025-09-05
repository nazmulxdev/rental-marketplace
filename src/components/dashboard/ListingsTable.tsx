"use client";
import React from "react";

interface ListingItem {
  _id: string;
  title: string;
  type: string;
  pricing?: { monthly?: number | null };
  status: string;
  createdAt?: string;
}

export default function ListingsTable({ items }: { items: ListingItem[] }) {
  if (items.length === 0) {
    return <div className="alert bg-base-200/50 border border-base-300 text-sm">No listings yet. Create one via Add Listing.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-base-300 bg-base-100">
      <table className="table table-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide">
            <th>Title</th>
            <th className="hidden sm:table-cell">Type</th>
            <th>Monthly</th>
            <th className="hidden md:table-cell">Status</th>
            <th className="hidden lg:table-cell">Created</th>
          </tr>
        </thead>
        <tbody>
          {items.map(l => (
            <tr key={l._id} className="hover">
              <td className="font-medium max-w-[200px] truncate">{l.title}</td>
              <td className="hidden sm:table-cell capitalize">{l.type}</td>
              <td>{l.pricing?.monthly ?? "—"}</td>
              <td className="hidden md:table-cell"><span className="badge badge-outline badge-sm capitalize">{l.status}</span></td>
              <td className="hidden lg:table-cell text-xs text-base-content/60">{l.createdAt ? new Date(l.createdAt).toLocaleDateString() : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
