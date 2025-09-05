"use client";

// LoginForm (Client Component)
// ----------------------------
// Handles interactive login form logic: state, validation, submission.
// Parent server component supplies any server-passed defaults / messages later.

import { FormEvent, useState } from "react";
import Link from "next/link";

interface LoginFormProps {
  // (OPTIONAL) Prefill email if redirected from protected route.
  presetEmail?: string;
}

interface FormState {
  email: string;
  password: string;
}

export function LoginForm({ presetEmail = "" }: LoginFormProps) {
  const [form, setForm] = useState<FormState>({ email: presetEmail, password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError("Email and password required");
      return;
    }
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 600));
      console.log("LOGIN_SUBMIT", form);
    } catch {
      setError("Login failed (mock)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
          autoComplete="current-password"
          className="input input-bordered w-full"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={6}
        />
      </div>

      <div aria-live="polite" className="min-h-5 text-sm text-error">{error}</div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
      </button>

      <div className="mt-6 text-center text-sm">
        <span className="text-base-content/70">Don&apos;t have an account? </span>
        <Link href="/register" className="link link-primary font-medium">
          Sign up
        </Link>
      </div>
    </form>
  );
}
