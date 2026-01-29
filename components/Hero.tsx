import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
      {/* Hero Carousel Banner */}
      <HeroCarousel />

      {/* Promo strip like Wakefit (icons row) - hidden on mobile */}
      <div className="mt-4 md:mt-6 rounded-2xl bg-white shadow-sm border border-gray-200 px-4 md:px-6 py-3 md:py-4 hidden md:flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-[hsl(var(--brand))] font-semibold">Right to Save</span>
          <span className="hidden sm:inline text-gray-400">•</span>
          <span className="hidden sm:inline text-gray-500">Sale ends soon</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <span>💳</span>
            <span>Easy EMI</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🚚</span>
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🛠️</span>
            <span>Free Installation</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🛡️</span>
            <span>Brand Warranty</span>
          </div>
        </div>
      </div>

      {/* Content Below Carousel - hidden on mobile (left side, right side, badge) */}
      <div className="mt-8 md:mt-10 hidden md:block">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm">
              <span className="text-[hsl(var(--brand))]">⚡</span>
              Today's Deals • Best local price on WhatsApp
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
              Online Showroom for{" "}
              <span className="text-[hsl(var(--brand))]">Electronics</span> & Appliances
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
              Browse products, compare models, and get the best offer instantly on WhatsApp.
              Delivery • Installation • Warranty support.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/search"
                className="rounded-xl bg-[hsl(var(--brand))] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Search Products
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Contact Store
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Genuine Products", "Fast Delivery", "Local Support", "EMI Options"].map((t) => (
                <span 
                  key={t} 
                  className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-700 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right side - Smart TV image with trust badge on bottom-left */}
          <div className="relative hidden md:block aspect-square md:aspect-[4/3] rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://jrbmhkfhxsiovycymkoa.supabase.co/storage/v1/object/public/product-images/products/Smart%20TV%20(1260%20x%201260%20px)%20(1).png"
              alt="Smart TV banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 text-xs sm:text-sm text-gray-800">
              <div className="font-semibold text-[hsl(var(--brand))] text-xs sm:text-sm">
                Trusted Quality
              </div>
              <div className="mt-1 space-y-1 text-[11px] sm:text-xs">
                <div className="flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>✓</span>
                  <span>Installation Support</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>✓</span>
                  <span>EMI Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
