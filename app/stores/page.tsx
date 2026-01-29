import Link from "next/link";

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-[hsl(var(--brand))] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Stores</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
          Our Stores
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl">
          Discover our physical store locations. Detailed addresses, contact numbers, and directions will be added here.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-600">
        Store details will be updated soon.
      </div>
    </div>
  );
}

