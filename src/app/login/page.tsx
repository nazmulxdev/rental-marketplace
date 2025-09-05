"use client";

// Login Page (Collaborative Notes)
// --------------------------------
// PURPOSE:
//   Provides a basic user login form (email + password) for the RentEase platform.
//   This is a minimal placeholder until real authentication is wired up.
//
// TEAM EXTENSION POINTS (search these tags):
//   - AUTH_SUBMIT: Replace mock submit handler with real API / NextAuth signIn.
//   - FORM_VALIDATION: Plug in Zod / Yup / custom validation.
//   - SOCIAL_PROVIDERS: Add OAuth buttons (Google, GitHub, etc.).
//   - ERROR_UI: Replace inline error text with toast or alert component.
//
// DESIGN CHOICES:
//   - Client component for form state + validation.
//   - Uses Tailwind + DaisyUI utility classes (no global.css edits per project rule).
//   - Accessible: semantic <form>, labeled inputs, aria-live region for errors.
//
// NEXT STEPS Suggestion:
//   - Protect /dashboard route and redirect authenticated users away from /login.
//   - Implement password reset flow.
//
// NOTE: After implementing real auth, remove the console.log in handleSubmit.

import { FormEvent, useState } from "react";
import Link from "next/link";

interface FormState {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // (AUTH_SUBMIT) Replace this with real auth call (e.g. fetch('/api/auth/login')).
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    // (FORM_VALIDATION) Simple front-end guard.
    if (!form.email || !form.password) {
      setError("Email and password required");
      return;
    }
    try {
      setLoading(true);
      // Simulate network latency.
      await new Promise((res) => setTimeout(res, 800));
      // Replace with await signIn("credentials", { redirect: false, ...form }) or custom API.
  console.log("LOGIN_SUBMIT", form);
      // Optionally redirect on success.
      // router.push('/dashboard');
  } catch {
      setError("Login failed (mock)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Welcome back</h1>
            <p className="text-base-content/70 text-sm mb-4">Login to manage your rentals and messages.</p>

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

              {/* (ERROR_UI) Accessible error region */}
              <div aria-live="polite" className="min-h-5 text-sm text-error">
                {error}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
              </button>
            </form>

            {/* (SOCIAL_PROVIDERS) Insert provider buttons here */}
            <div className="mt-6 text-center text-sm">
              <span className="text-base-content/70">Don&apos;t have an account? </span>
              <Link href="/register" className="link link-primary font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
