import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
      {/* Hero Carousel Banner */}
      <HeroCarousel />

      {/* Promo strip like Wakefit (icons row) */}
      <div className="mt-4 md:mt-6 rounded-2xl bg-white shadow-sm border border-gray-200 px-4 md:px-6 py-3 md:py-4 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm text-gray-700">
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

      {/* Content Below Carousel */}
      <div className="mt-8 md:mt-10">
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

          {/* Right side - Trust Badge */}
          <div className="hidden md:flex justify-center">
            <div className="rounded-2xl bg-white border-2 border-gray-200 px-8 py-6 shadow-xl max-w-sm">
              <div className="text-xs text-gray-500 font-medium mb-1 text-center">Up to</div>
              <div className="text-4xl font-bold text-[hsl(var(--brand))] text-center">₹ Best Price</div>
              <div className="text-xs text-gray-500 font-medium mt-1 text-center">on WhatsApp enquiry</div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <span>✓</span>
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
                  <span>✓</span>
                  <span>Installation Support</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-2">
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
