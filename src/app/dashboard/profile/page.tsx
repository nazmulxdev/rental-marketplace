"use client";
// Dashboard Profile Page
// ----------------------
// Interactive form mapped to USERS.profile schema (DBstructrure.md)
import React, { useState, FormEvent, useMemo, useEffect } from "react";
import Image from "next/image";

interface ProfileForm {
  name: string;
  phone: string;
  avatarUrl: string;
  city: string;
  district: string;
  division: string;
  country: string;
  postalCode: string;
}

export default function DashboardProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    phone: "",
    avatarUrl: "",
    city: "",
    district: "",
    division: "",
    country: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Load existing profile data
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/user/profile", { cache: "no-store" });
        if (!res.ok) throw new Error("failed");
        const data = await res.json();
        if (!cancelled) {
          setForm({
            name: data.name || "",
            phone: data.phone || "",
            avatarUrl: data.avatarUrl || "",
            city: data.city || "",
            district: data.district || "",
            division: data.division || "",
            country: data.country || "",
            postalCode: data.postalCode || "",
          });
        }
      } catch {
        // ignore; form stays empty
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleChange = (field: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    if (!form.name) {
      setError("Name required");
      return;
    }
    try {
      setLoading(true);
      // (API_CALL) PATCH /api/user/profile
      await new Promise((r) => setTimeout(r, 800));
      console.log("PROFILE_UPDATE_SUBMIT", form);
      setSuccess(true);
    } catch {
      setError("Failed to update profile (mock)");
    } finally {
      setLoading(false);
    }
  };

  const avatarPreview = useMemo(() => {
    if (form.avatarUrl) {
      return (
        <Image
          src={form.avatarUrl}
          alt="Avatar preview"
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-cover border border-base-300"
        />
      );
    }
    const initial = (form.name || "?").charAt(0).toUpperCase();
    return (
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary text-2xl font-semibold border border-base-300">
        {initial}
      </span>
    );
  }, [form.avatarUrl, form.name]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-base-content/70 max-w-2xl">Update your public information. This data helps potential renters and platform admins identify you.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-10" noValidate>
        {initialLoading && (
          <div className="flex items-center gap-2 text-sm text-base-content/60">
            <span className="loading loading-spinner loading-sm" /> Loading profile...
          </div>
        )}
        <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Avatar + Actions */}
            <div className="space-y-4">
              {avatarPreview}
              <div className="form-control">
                <label className="label" htmlFor="avatarUrl"><span className="label-text font-medium">Avatar URL</span></label>
                <input id="avatarUrl" className="input input-bordered" value={form.avatarUrl} onChange={handleChange("avatarUrl")} placeholder="https://..." />
              </div>
              <button type="button" className="btn btn-outline btn-sm w-full" onClick={() => setForm({ ...form, avatarUrl: "" })}>Remove</button>
            </div>
          {/* Profile + Address */}
          <div className="space-y-8">
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body space-y-6">
                <h2 className="font-medium text-base">Personal Info</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="form-control">
                    <label className="label" htmlFor="name"><span className="label-text font-medium">Name</span></label>
                    <input id="name" className="input input-bordered" value={form.name} onChange={handleChange("name")} required />
                  </div>
                  <div className="form-control">
                    <label className="label" htmlFor="phone"><span className="label-text font-medium">Phone</span></label>
                    <input id="phone" className="input input-bordered" value={form.phone} onChange={handleChange("phone")} />
                  </div>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 border border-base-300 shadow-sm">
              <div className="card-body space-y-6">
                <h2 className="font-medium text-base">Address</h2>
                <div className="grid gap-6 sm:grid-cols-2">
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
                  <div className="form-control">
                    <label className="label" htmlFor="country"><span className="label-text font-medium">Country</span></label>
                    <input id="country" className="input input-bordered" value={form.country} onChange={handleChange("country")} />
                  </div>
                  <div className="form-control sm:col-span-2">
                    <label className="label" htmlFor="postalCode"><span className="label-text font-medium">Postal Code</span></label><br />
                    <input id="postalCode" className="input input-bordered" value={form.postalCode} onChange={handleChange("postalCode")} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-2">
          <div aria-live="polite" className="min-h-5 text-sm w-full sm:w-auto text-center sm:text-left">
            {error && <span className="text-error">{error}</span>}
            {success && !error && <span className="text-success">Profile updated (mock)</span>}
          </div>
          <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "Save Profile"}
          </button>
        </div>
      </form>
    </section>
  );
}
