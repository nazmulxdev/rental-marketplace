// Registration Page (Server Component Wrapper)
// -------------------------------------------
// Provides static shell & mounts interactive RegisterForm client component.
// Future server logic: redirect if authenticated, fetch invite codes, etc.

import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // (FORM_VALIDATION) Simple synchronous checks.
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

      // (Fetch to send user data to backend)
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
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
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <h1 className="text-2xl font-semibold tracking-tight mb-1">
              Create an account
            </h1>
            <p className="text-base-content/70 text-sm mb-4">
              Join RentEase and start listing or finding rentals.
            </p>

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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                  minLength={6}
                />
              </div>

              <div className="form-control">
                <label className="label" htmlFor="confirm">
                  <span className="label-text font-medium">
                    Confirm password
                  </span>
                </label>
                <input
                  id="confirm"
                  type="password"
                  autoComplete="new-password"
                  className="input input-bordered w-full"
                  placeholder="••••••••"
                  value={form.confirm}
                  onChange={(e) =>
                    setForm({ ...form, confirm: e.target.value })
                  }
                  required
                  minLength={6}
                />
              </div>

              {/* Feedback region (ERROR_UI) */}
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
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px border-t"></div>
              <span className="mx-2">OR</span>
              <div className="flex-grow h-px border-t"></div>
            </div>
            <GoogleLogin />

            {/* (SOCIAL_PROVIDERS) Insert provider buttons here */}
            <div className="mt-6 text-center text-sm">
              <span className="text-base-content/70">
                Already have an account?{" "}
              </span>
              <Link href="/login" className="link link-primary font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
