// Registration Page (Server Component Wrapper)
// -------------------------------------------
// Provides static shell & mounts interactive RegisterForm client component.
// Future server logic: redirect if authenticated, fetch invite codes, etc.

import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <h1 className="text-2xl font-semibold tracking-tight mb-1">Create an account</h1>
            <p className="text-base-content/70 text-sm mb-4">Join RentEase and start listing or finding rentals.</p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
