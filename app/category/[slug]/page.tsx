import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";

// URL param is the category ID (from category tile and category strip). Next.js 16: params is a Promise.
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug: categoryId } = await params;

  if (!categoryId) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
          <p className="mt-2 text-gray-600">Missing category in the URL.</p>
          <Link href="/" className="mt-4 inline-block text-[hsl(var(--brand))] hover:underline font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Look up the category by its ID (for name/headings).
  const { data: category } = await supabase
    .from("categories")
    .select("id,name")
    .eq("id", categoryId)
    .maybeSingle();

  // Fetch all products that belong to this category (category_id = categoryId), same as product page logic.
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id,name,brand,model,price_offer,images,stock_status")
    .eq("is_active", true)
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  // Relevant products: other categories (You May Also Like), exclude current category
  const { data: relevantProducts } = await supabase
    .from("products")
    .select("id,name,brand,model,price_offer,images,stock_status")
    .eq("is_active", true)
    .neq("category_id", categoryId)
    .order("created_at", { ascending: false })
    .limit(8);

  const productList = productsError ? [] : (products ?? []);
  const otherProducts = relevantProducts ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-[hsl(var(--brand))] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category?.name ?? "Category"}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
          {category?.name ?? "Category"}
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-600">
          Order on WhatsApp for best price and availability. Free delivery • Installation support • EMI options
        </p>
      </div>

      {/* Products in this category */}
      {productList.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {productList.map((p) => (
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

      {/* You May Also Like - products from other categories */}
      {otherProducts.length > 0 && (
        <section className="mt-12 md:mt-16">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">You May Also Like</h2>
            <Link
              href="/search"
              className="text-sm font-semibold text-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]/80 transition-colors"
            >
              View all →
            </Link>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            More products you might be interested in.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {otherProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
