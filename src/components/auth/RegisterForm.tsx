"use client";

// RegisterForm (Client Component)
// -------------------------------
// Contains interactive sign-up logic separate from server-rendered wrapper page.

import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google icon
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export function RegisterForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // (AUTH_SOCIAL_GOOGLE) Replace with real signIn('google') when NextAuth or custom OAuth is configured.
  const handleGoogle = async () => {
    try {
      await signIn("google");
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  // uploading image

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const imageData = new FormData();
    imageData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: imageData,
    });

    if (!res.ok) {
      console.log("Upload failed", res.statusText);
      return;
    }
    const data = await res.json();

    if (data?.url) setImageUrl(data?.url);
  };

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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          image: imageUrl,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        setSuccess(true);
        // Optionally redirect after slight delay:
        // router.push('/login');
      }
    } catch {
      setError("Registration failed (mock)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Profile Photo Upload */}
      <div className="flex flex-col items-center">
        <label className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Uploaded image"
              width={128}
              height={128}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm text-center">
              Click to upload photo
            </span>
          )}
          <input type="file" className="hidden" onChange={handleUpload} />
        </label>
      </div>

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
        {success && !error && (
          <span className="text-success">
            Account created (mock). You can now login.
          </span>
        )}
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          "Create account"
        )}
      </button>

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
        <span className="text-base-content/70">Already have an account? </span>
        <Link href="/login" className="link link-primary font-medium">
          Login
        </Link>
      </div>
    </form>
  );
}
