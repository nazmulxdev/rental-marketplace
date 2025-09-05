"use client";
import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ListingItem {
  _id: string;
  title: string;
  type: string;
  pricing?: { monthly?: number | null };
  status: string;
  createdAt?: string;
}

export default function ListingsTable({ items }: { items: ListingItem[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    router.push(`/dashboard/update-listing/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
      if (!res.ok) {
        alert("Failed to delete");
        return;
      }
      // Refresh page data
      router.refresh();
    } finally {
      setDeletingId(null);
    }
  };
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
            <th>Actions</th>
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
              <td className="w-px">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(l._id)}
                    className="btn btn-ghost btn-xs tooltip"
                    data-tip="Edit"
                    aria-label={`Edit ${l.title}`}
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(l._id)}
                    disabled={deletingId === l._id}
                    className="btn btn-error btn-xs tooltip"
                    data-tip="Delete"
                    aria-label={`Delete ${l.title}`}
                  >
                    {deletingId === l._id ? <span className="loading loading-spinner loading-xs" /> : <FiTrash2 className="h-4 w-4" />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
