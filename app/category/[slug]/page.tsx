import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { data: category } = await supabase
    .from("categories")
    .select("id,name,slug")
    .eq("slug", params.slug)
    .single();

  if (!category) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <p className="mt-2 text-gray-600">The category you're looking for doesn't exist.</p>
          <Link 
            href="/" 
            className="mt-4 inline-block text-[hsl(var(--brand))] hover:underline font-semibold"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { data: products } = await supabase
    .from("products")
    .select("id,name,brand,model,price_offer,images,stock_status")
    .eq("is_active", true)
    .eq("category_id", category.id)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-[hsl(var(--brand))] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
          {category.name}
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-600">
          Order on WhatsApp for best price and availability. Free delivery • Installation support • EMI options
        </p>
      </div>

      {/* Products Grid */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products in this category yet</h3>
          <p className="text-gray-600 mb-6">
            Check back soon or contact us on WhatsApp for availability.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              ← Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-[hsl(var(--brand))] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
