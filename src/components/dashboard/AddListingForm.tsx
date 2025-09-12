"use client";
import React, { useState, FormEvent, useTransition } from "react";
import { useRouter } from "next/navigation";

interface ListingForm {
  title: string;
  description: string;
  type: "room" | "apartment" | "house" | "";
  monthly: string;
  deposit: string;
  city: string;
  district: string;
  division: string;
}

export default function AddListingForm() {
  const [form, setForm] = useState<ListingForm>({
    title: "",
    description: "",
    type: "",
    monthly: "",
    deposit: "",
    city: "",
    district: "",
    division: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (field: keyof ListingForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.title || !form.type) {
      setError("Title and type required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.status === 401) {
        setError("You must be logged in to create a listing.");
        return;
      }
      if (!res.ok) {
        setError(data.error || "Failed to create listing");
        return;
      }
      setSuccess(true);
      // Optional local reset (not really necessary because we'll redirect)
      setForm({ ...form, title: "", description: "", monthly: "", deposit: "" });
      // Defer navigation to allow state update flush
      startTransition(() => {
        router.push("/dashboard/my-listings?created=1");
      });
    } catch {
      setError("Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* Basic Info Card */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body space-y-6">
          <h2 className="font-medium text-base">Basic Information</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="form-control">
              <label className="label" htmlFor="title"><span className="label-text font-medium">Title</span></label><br />
              <input id="title" className="input input-bordered" placeholder="Cozy 2BR Apartment in Downtown" value={form.title} onChange={handleChange("title")} required />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="type"><span className="label-text font-medium">Type</span></label><br />
              <select id="type" className="select select-bordered" value={form.type} onChange={handleChange("type")} required>
                <option value="">Select type</option>
                <option value="room">Room</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="monthly"><span className="label-text font-medium">Monthly (BDT)</span></label><br />
              <input id="monthly" type="number" className="input input-bordered" value={form.monthly} onChange={handleChange("monthly")} placeholder="12000" />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="deposit"><span className="label-text font-medium">Deposit (BDT)</span></label><br />
              <input id="deposit" type="number" className="input input-bordered" value={form.deposit} onChange={handleChange("deposit")} placeholder="24000" />
            </div>
            <div className="form-control lg:col-span-2">
              <label className="label" htmlFor="description"><span className="label-text font-medium">Description</span></label><br />
              <textarea id="description" className="textarea textarea-bordered min-h-32" value={form.description} onChange={handleChange("description")} placeholder="Describe the property, nearby landmarks, utilities included, etc." />
            </div>
          </div>
        </div>
      </div>

      {/* Location Card */}
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body space-y-6">
          <h2 className="font-medium text-base">Location</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="form-control">
              <label className="label" htmlFor="city"><span className="label-text font-medium">City</span></label>
              <input id="city" className="input input-bordered" value={form.city} onChange={handleChange("city")} />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="district"><span className="label-text font-medium">District</span></label>
              <input id="district" className="input input-bordered" value={form.district} onChange={handleChange("district")} />
            </div>
            <div className="form-control">
              <label className="label" htmlFor="division"><span className="label-text font-medium">Division</span></label>
              <input id="division" className="input input-bordered" value={form.division} onChange={handleChange("division")} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
        <div aria-live="polite" className="min-h-5 text-sm w-full sm:w-auto text-center sm:text-left">
          {error && <span className="text-error">{error}</span>}
          {success && !error && <span className="text-success">Listing created</span>}
        </div>
        <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={loading || isPending}>
          {loading || isPending ? <span className="loading loading-spinner loading-sm" /> : "Create Listing"}
        </button>
      </div>
    </form>
  );
}
