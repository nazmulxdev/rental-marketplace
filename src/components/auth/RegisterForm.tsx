"use client";

// RegisterForm (Client Component)
// -------------------------------
// Contains interactive sign-up logic separate from server-rendered wrapper page.

import { FormEvent, useState } from "react";
import Link from "next/link";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export function RegisterForm() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 800));
      console.log("REGISTER_SUBMIT", form);
      setSuccess(true);
    } catch {
      setError("Registration failed (mock)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="form-control">
        <label className="label" htmlFor="name">
          <span className="label-text font-medium">Full name</span>
        </label>
        <input
          id="name"
          type="text"
          className="input input-bordered w-full"
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="email">
          <span className="label-text font-medium">Email</span>
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="input input-bordered w-full"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="password">
          <span className="label-text font-medium">Password</span>
        </label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          className="input input-bordered w-full"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={6}
        />
      </div>

      <div className="form-control">
        <label className="label" htmlFor="confirm">
          <span className="label-text font-medium">Confirm password</span>
        </label>
        <input
          id="confirm"
          type="password"
          autoComplete="new-password"
          className="input input-bordered w-full"
          placeholder="••••••••"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
          minLength={6}
        />
      </div>

      <div aria-live="polite" className="min-h-5 text-sm">
        {error && <span className="text-error">{error}</span>}
        {success && !error && <span className="text-success">Account created (mock). You can now login.</span>}
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? <span className="loading loading-spinner loading-sm" /> : "Create account"}
      </button>

      <div className="mt-6 text-center text-sm">
        <span className="text-base-content/70">Already have an account? </span>
        <Link href="/login" className="link link-primary font-medium">
          Login
        </Link>
      </div>
    </form>
  );
}
