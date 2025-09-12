"use client";
import React, { useState, FormEvent } from "react";
import { FiInfo, FiType } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface Props {
  listingId: string;
  initialTitle: string;
  initialStatus: string;
  initialType: string;
  initialDescription: string;
  initialMonthly: number | string;
  initialDeposit: number | string;
  initialCity: string;
  initialDistrict: string;
  initialDivision: string;
}

export default function UpdateListingForm({ listingId, initialTitle, initialStatus, initialType, initialDescription, initialMonthly, initialDeposit, initialCity, initialDistrict, initialDivision }: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [status, setStatus] = useState(initialStatus);
  const [type, setType] = useState(initialType);
  const [description, setDescription] = useState(initialDescription);
  const [monthly, setMonthly] = useState(String(initialMonthly ?? ''));
  const [deposit, setDeposit] = useState(String(initialDeposit ?? ''));
  const [city, setCity] = useState(initialCity);
  const [district, setDistrict] = useState(initialDistrict);
  const [division, setDivision] = useState(initialDivision);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);
  const router = useRouter();

  // Debug: fetch session user id to compare
  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          interface SessionShape { user?: { id?: string } }
          const s: SessionShape = await res.json();
          const uid = s?.user?.id;
          setDebugInfo(`listingId=${listingId} sessionUser=${uid}`);
        }
      } catch {
        // ignore
      }
    })();
  }, [listingId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(false);
    try {
      setLoading(true);
      const res = await fetch(`/api/properties/${listingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status, type, description, monthly: monthly || undefined, deposit: deposit || undefined, city, district, division })
      });
      const data = await res.json();
      if (!res.ok) {
        const raw = data?.error || 'Unknown error';
        const ownership = raw === 'Not found or forbidden';
        if (ownership) {
          // Double-check ownership by fetching the document (server page gating already checks but in case of race condition)
          try {
            const check = await fetch(`/api/properties/${listingId}`);
            if (check.ok) {
              // If we can read the doc, suppress misleading ownership error.
              setError('Update failed (conflict). Try again.');
            } else {
              setError('You can only edit listings you own.');
            }
          } catch {
            setError('You can only edit listings you own.');
          }
        } else {
          setError(raw);
        }
        setDebugInfo(prev => (prev ? prev + ` | apiError=${raw}` : `apiError=${raw}`));
        return;
      }
      setSuccess(true);
      // Brief delay to show Saved then redirect
      setTimeout(() => {
        router.push('/dashboard/my-listings?updated=1');
      }, 50);
    } catch {
      setError('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const statusColor = status === 'active' ? 'badge-success' : status === 'draft' ? 'badge-warning' : 'badge-neutral';

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Status / Meta Card */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-medium text-base">Listing Status</h2>
              <p className="text-xs text-base-content/60 max-w-prose">Status controls visibility to seekers. Draft is hidden; archived keeps history but is not publicly shown.</p>
            </div>
            <span className={`badge ${statusColor} badge-outline text-xs capitalize`}>{status}</span>
          </div>
          <div className="form-control max-w-xs">
            <label className="label" htmlFor="status"><span className="label-text font-medium">Change Status</span></label>
            <select id="status" className="select select-bordered" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Basic Info Card */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body space-y-7">
          <div className="flex items-center gap-2">
            <div className="badge badge-primary badge-sm p-3 rounded-md">
              <FiInfo className="h-4 w-4" />
            </div>
            <h2 className="font-medium text-base">Basic Information</h2>
          </div>
          {(() => {
            const TITLE_MAX = 120;
            const DESC_MAX = 1200;
            const titleRemaining = TITLE_MAX - title.length;
            const descRemaining = DESC_MAX - description.length;
            return (
              <div className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-12">
                  {/* Title */}
                  <div className="form-control lg:col-span-7">
                    <div className="flex items-center justify-between">
                      <label className="label" htmlFor="title"><span className="label-text font-medium">Title</span></label>
                      <span className={`text-[11px] tabular-nums ${titleRemaining < 0 ? 'text-error' : 'text-base-content/50'}`}>{title.length}/{TITLE_MAX}</span>
                    </div>
                    <input
                      id="title"
                      className={`input input-bordered ${titleRemaining < 0 ? 'input-error' : ''}`}
                      value={title}
                      maxLength={TITLE_MAX + 20}
                      onChange={e=>setTitle(e.target.value)}
                      placeholder="Cozy 2BR Apartment in Downtown"
                    />
                    <p className="mt-1 text-[11px] text-base-content/60">Keep it concise & descriptive. This appears in search results.</p>
                  </div>
                  {/* Type */}
                  <div className="form-control lg:col-span-5">
                    <div className="flex items-center justify-between">
                      <label className="label" htmlFor="type"><span className="label-text font-medium flex items-center gap-1"><FiType className="h-3.5 w-3.5" />Type</span></label>
                    </div>
                    <select id="type" className="select select-bordered" value={type} onChange={e=>setType(e.target.value)}>
                      <option value="room">Room</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                    </select>
                    <p className="mt-1 text-[11px] text-base-content/60">Select the closest property category.</p>
                  </div>
                </div>
                {/* Description */}
                <div className="form-control">
                  <div className="flex items-center justify-between">
                    <label className="label" htmlFor="description"><span className="label-text font-medium">Description</span></label>
                    <span className={`text-[11px] tabular-nums ${descRemaining < 0 ? 'text-error' : 'text-base-content/50'}`}>{description.length}/{DESC_MAX}</span>
                  </div>
                  <textarea
                    id="description"
                    className={`textarea textarea-bordered min-h-40 leading-relaxed ${descRemaining < 0 ? 'textarea-error' : ''}`}
                    value={description}
                    maxLength={DESC_MAX + 200}
                    onChange={e=>setDescription(e.target.value)}
                    placeholder="Highlight unique features, nearby transit, included utilities, furnishing, neighborhood vibe, etc."
                  />
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-base-content/60">
                    <span>Tip: Start with the strongest selling point.</span>
                    {descRemaining < 0 && <span className="text-error font-medium">Too long – trim content.</span>}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Pricing & Location Card */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body space-y-6">
          <h2 className="font-medium text-base">Pricing & Location</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="form-control">
              <label className="label" htmlFor="monthly"><span className="label-text font-medium">Monthly (BDT)</span></label>
              <input id="monthly" type="number" className="input input-bordered" value={monthly} onChange={e=>setMonthly(e.target.value)} placeholder="12000" />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="deposit"><span className="label-text font-medium">Deposit (BDT)</span></label>
              <input id="deposit" type="number" className="input input-bordered" value={deposit} onChange={e=>setDeposit(e.target.value)} placeholder="24000" />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="city"><span className="label-text font-medium">City</span></label>
              <input id="city" className="input input-bordered" value={city} onChange={e=>setCity(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="district"><span className="label-text font-medium">District</span></label>
              <input id="district" className="input input-bordered" value={district} onChange={e=>setDistrict(e.target.value)} />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="division"><span className="label-text font-medium">Division</span></label>
              <input id="division" className="input input-bordered" value={division} onChange={e=>setDivision(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div aria-live="polite" className="min-h-5 text-sm space-y-1">
        {error && <div className="text-error">{error}</div>}
        {success && !error && <div className="text-success">Saved</div>}
        {debugInfo && <div className="text-[10px] opacity-60">{debugInfo}</div>}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={loading}>{loading ? <span className="loading loading-spinner loading-sm"/> : 'Save Changes'}</button>
        <button type="button" onClick={() => router.push('/dashboard/my-listings')} className="btn btn-ghost w-full sm:w-auto">Back</button>
      </div>
    </form>
  );
}
