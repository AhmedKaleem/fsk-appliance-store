 "use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) router.push("/admin/products");
    else {
      const j = await res.json().catch(() => ({}));
      setErr(j.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Login</h1>
          <p className="mt-2 text-base text-gray-600">Login to manage products</p>
        </div>

        <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]/30 focus:border-[hsl(var(--brand))] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shop.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]/30 focus:border-[hsl(var(--brand))] transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {err && (
              <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
                <p className="text-sm font-medium text-red-800">{err}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[hsl(var(--brand))] px-6 py-3.5 text-base font-semibold text-white hover:opacity-90 disabled:opacity-60 transition-opacity shadow-lg hover:shadow-xl"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
