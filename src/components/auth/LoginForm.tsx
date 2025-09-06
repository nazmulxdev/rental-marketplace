"use client";

// LoginForm (Client Component)
// ----------------------------
// Handles interactive login form logic: state, validation, submission.
// Parent server component supplies any server-passed defaults / messages later.

import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon (lightweight SVG)
import Link from "next/link";
import { signIn } from "next-auth/react";

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
  const [success,setSuccess] = useState(false)

  // (AUTH_SOCIAL_GOOGLE) Replace with real NextAuth signIn('google') or custom OAuth flow.
  const handleGoogle = async () => {
    try {
      await signIn("google");
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password) {
      setError("Email and password required");
      return;
    }
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
      if (!res) {
        setError("Login failed. Try again.");
      } else if (res.error) {
        setError(res.error);
      }
      else{
        // Handle here if login success.
        // Redirect to other page after login
        // Or show success message
        setSuccess(true)
      }
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

      <div aria-live="polite" className="min-h-5 text-sm text-error">{error} {success && !error && <span className="text-success">Login successful (mock).</span>}</div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? <span className="loading loading-spinner loading-sm" /> : "Login"}
      </button>

      {/* Social login section */}
      <div className="divider text-xs uppercase">or</div>
      <button
        type="button"
        onClick={handleGoogle}
        className="btn btn-outline w-full gap-2"
        aria-label="Continue with Google"
      >
        <FcGoogle size={18} />
        Continue with Google
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
