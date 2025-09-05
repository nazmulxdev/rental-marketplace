"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Props {
  listingId: string;
  initialTitle: string;
  initialStatus: string;
}

export default function UpdateListingForm({ listingId, initialTitle, initialStatus }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(false);
    try {
      setLoading(true);
      const res = await fetch(`/api/properties/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status })
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Update failed'); return; }
      setSuccess(true);
      router.refresh();
    } catch {
      setError('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="form-control">
        <label className="label" htmlFor="title"><span className="label-text font-medium">Title</span></label>
        <input id="title" className="input input-bordered" value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div className="form-control">
        <label className="label" htmlFor="status"><span className="label-text font-medium">Status</span></label>
        <select id="status" className="select select-bordered" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <div aria-live="polite" className="min-h-5 text-sm">
        {error && <span className="text-error">{error}</span>}
        {success && !error && <span className="text-success">Saved</span>}
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? <span className="loading loading-spinner loading-sm"/> : 'Save Changes'}</button>
        <button type="button" onClick={() => router.push('/dashboard/my-listings')} className="btn btn-ghost">Back</button>
      </div>
    </form>
  );
}
