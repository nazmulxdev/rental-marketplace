"use client";
// Update Listing Page (Client Component)
// -------------------------------------
// Placeholder edit form; in real flow you'd load listing data by id (possibly dynamic route /update-listing/[id]).
import React, { useState, FormEvent } from "react";

interface UpdateForm {
  listingId: string;
  title: string;
  status: "active" | "draft" | "archived" | "";
}

export default function UpdateListingPage() {
  const [form, setForm] = useState<UpdateForm>({ listingId: "", title: "", status: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof UpdateForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!form.listingId) {
      setError("Listing ID required");
      return;
    }
    try {
      setLoading(true);
      // (API_CALL) PATCH /api/properties/:id
      await new Promise((r) => setTimeout(r, 700));
      console.log("UPDATE_LISTING_SUBMIT", form);
      setSuccess(true);
    } catch {
      setError("Failed to update listing (mock)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6 max-w-xl">
      <h1 className="text-xl font-semibold">Update Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="form-control">
          <label className="label" htmlFor="listingId"><span className="label-text font-medium">Listing ID</span></label>
          <input id="listingId" className="input input-bordered" value={form.listingId} onChange={handleChange("listingId")} placeholder="Enter listing _id" required />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="title"><span className="label-text font-medium">Title</span></label>
          <input id="title" className="input input-bordered" value={form.title} onChange={handleChange("title")} />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="status"><span className="label-text font-medium">Status</span></label>
          <select id="status" className="select select-bordered" value={form.status} onChange={handleChange("status")}>        
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div aria-live="polite" className="min-h-5 text-sm">
          {error && <span className="text-error">{error}</span>}
          {success && !error && <span className="text-success">Listing updated (mock)</span>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? <span className="loading loading-spinner loading-sm" /> : "Save Changes"}
        </button>
      </form>
    </section>
  );
}
