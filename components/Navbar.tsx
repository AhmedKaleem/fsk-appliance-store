 "use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* announcement bar */}
      <div className="bg-gradient-to-r from-[hsl(var(--brand))] to-[hsl(var(--brand))]/90 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 text-xs sm:text-sm flex items-center justify-between">
          <span className="opacity-95 font-medium">
            Free delivery • Installation support • Best price on WhatsApp
          </span>
          <div className="hidden sm:flex gap-4 opacity-90">
            <span className="flex items-center gap-1.5">
              <span>✓</span>
              <span>EMI Available</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>✓</span>
              <span>Genuine Products</span>
            </span>
          </div>
        </div>
      </div>

      {/* main nav - Wakefit-like */}
      <div className="bg-[#5a2ea6] text-white border-b border-[#5a2ea6] shadow-none">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 lg:py-4 flex items-center gap-4 lg:gap-8">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
            {/* Hamburger menu - always visible, like Wakefit */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-2.5 py-2 text-white hover:bg-white/10 transition-colors"
              aria-label="Open navigation menu"
            >
              <span className="sr-only">Open menu</span>
              <span className="flex flex-col gap-[3px]">
                <span className="block h-[2px] w-4 bg-white rounded-full" />
                <span className="block h-[2px] w-4 bg-white rounded-full" />
                <span className="block h-[2px] w-4 bg-white rounded-full" />
              </span>
            </button>

            <Link
              href="/"
              className="font-bold tracking-tight text-xl lg:text-2xl text-white hover:text-white/80 transition-colors"
            >
              FSK <span className="font-semibold opacity-90">Appliance Store</span>
            </Link>
          </div>

          {/* Center: search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search TVs, AC, Fridge, Washing Machine…"
                className="w-full rounded-full border border-transparent bg-white/95 px-4 py-2.5 pl-11 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-white focus:border-white placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm hover:text-gray-600"
                aria-label="Search"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Right: actions */}
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link
              className="text-white/90 hover:text-white/80 transition-colors"
              href="/search"
            >
              Products
            </Link>
            <Link
              className="text-white/90 hover:text-white/80 transition-colors"
              href="/stores"
            >
              Stores
            </Link>
            <Link
              className="text-white/90 hover:text-white/80 transition-colors"
              href="/contact"
            >
              Contact
            </Link>
            <Link
              className="text-white/90 hover:text-white/80 transition-colors"
              href="/admin/login"
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* category strip like Wakefit menu */}
        <div className="border-t border-purple-700/40 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              "Air Conditioners",
              "Televisions",
              "Refrigerators",
              "Washing Machines",
              "Kitchen Appliances",
              "Small Appliances",
            ].map((c) => (
              <span
                key={c}
                className="whitespace-nowrap rounded-full border border-purple-100 bg-white px-4 py-1.5 text-xs font-medium text-purple-900 hover:bg-purple-100 hover:border-purple-200 cursor-pointer transition-all duration-200"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Slide-out hamburger menu (Wakefit-style) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:z-[70]">
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
          />

          {/* Panel */}
          <div className="relative h-full w-72 max-w-[80vw] bg-white shadow-2xl animate-[slideIn_0.25s_ease-out]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <span className="font-semibold text-gray-900 text-sm">
                FSK Appliance Store
              </span>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="px-2 py-3 space-y-1 text-sm">
              <Link
                href="/search"
                className="block rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/stores"
                className="block rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Stores
              </Link>
              <Link
                href="/contact"
                className="block rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/admin/login"
                className="block rounded-lg px-3 py-2 text-gray-900 hover:bg-gray-100 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
