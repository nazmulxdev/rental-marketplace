// Login Page (Server Component Wrapper)
// ------------------------------------
// Renders static shell + imports interactive client form.
// Add server-side auth redirect logic here later (e.g., redirect authenticated users away).

import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Welcome back</h1>
            <p className="text-base-content/70 text-sm mb-4">Login to manage your rentals and messages.</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
