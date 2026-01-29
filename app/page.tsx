// app/page.tsx
import Link from "next/link";
import Hero from "@/components/Hero";
import TrustRow from "@/components/TrustRow";
import ProductCard, { type ProductCardType } from "@/components/ProductCard";
import { supabase } from "@/lib/supabaseClient";
import { getCategoryImageUrls } from "@/lib/categoryImages";

type Category = {
  id: string;
  name: string;
  slug: string | null;
};

function CategoryTile({ c, imageUrl }: { c: Category; imageUrl: string | null }) {
  // Fallback to a gradient if no image is available
  const img = imageUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f3f4f6' width='400' height='300'/%3E%3C/svg%3E";

  return (
    <Link
      href={`/category/${c.id}`}
      className="group relative rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-xl hover:border-[hsl(var(--brand))]/30 transition-all duration-300"
    >
      <div className="relative aspect-[4/2] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={c.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
      </div>
      <div className="relative px-3 py-3 md:px-4 md:py-3 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-[hsl(var(--brand))] transition-colors line-clamp-1">
            {c.name}
          </div>
          <div className="text-xs text-gray-500 mt-1">Browse models & offers</div>
        </div>
        <div className="text-gray-400 group-hover:text-[hsl(var(--brand))] group-hover:translate-x-1 transition-all duration-300 text-lg md:text-xl">
          →
        </div>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  // Categories
  const { data: categoriesData } = await supabase
    .from("categories")
    .select("id,name,slug")
    .order("name", { ascending: true });

  const categories: Category[] = (categoriesData || []) as any;

  // Get category image URLs from Supabase Storage
  const categoryImageUrls = await getCategoryImageUrls(categories);

  // Featured Products
  // (Assumption: products table has columns: id, name, brand, model, price_offer, images, stock_status, is_active)
  // Adjust select list if your schema differs.
  const { data: productsData } = await supabase
    .from("products")
    .select("id,name,brand,model,price_offer,images,stock_status")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(8);

  const products: ProductCardType[] = (productsData || []) as any;

  // New Launches - Get first product with is_newlaunch = true for banner image
  const { data: newLaunchProduct } = await supabase
    .from("products")
    .select("id,name,images")
    .eq("is_active", true)
    .eq("is_newlaunch", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  // Check if any new launches exist
  const { count: newLaunchCount } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true)
    .eq("is_newlaunch", true);

  const hasNewLaunches = (newLaunchCount || 0) > 0;
  const newLaunchImage = newLaunchProduct?.images && Array.isArray(newLaunchProduct.images) 
    ? newLaunchProduct.images[0] 
    : null;

  return (
    <main className="pb-20">
      {/* Hero + Trust */}
      <Hero />
      <TrustRow />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 space-y-16 md:space-y-20">
        {/* Category Section */}
        <section id="categories">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                    Shop by Category
                  </h2>
                  <p className="text-sm md:text-base text-gray-500 mt-2">
                    Explore our wide range of appliances
                  </p>
                </div>
                <Link
                  href="/search"
                  className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]/80 transition-colors"
                >
                  Explore all
                  <span className="text-lg">→</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {categories.length ? (
                  categories.map((c) => (
                    <CategoryTile key={c.id} c={c} imageUrl={categoryImageUrls[c.name] || null} />
                  ))
                ) : (
                  <div className="col-span-full rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                    No categories yet. Add categories in Supabase.
                  </div>
                )}
              </div>
            </section>

        {/* Featured Products */}
        <section id="featured">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                    Featured Products
                  </h2>
                  <p className="text-sm md:text-base text-gray-500 mt-2">
                    Handpicked bestsellers and new arrivals
                  </p>
                </div>
                <Link
                  href="/search"
                  className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]/80 transition-colors"
                >
                  View all
                  <span className="text-lg">→</span>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
                {products.length ? (
                  products.map((p) => <ProductCard key={p.id} {...p} />)
                ) : (
                  <div className="col-span-full rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                    No products yet. Add products from Admin.
                  </div>
                )}
              </div>
        </section>

        {/* New Launches Section */}
        {hasNewLaunches && (
          <section id="new-launches">
            <Link
              href="/new-launches"
              className="group block rounded-3xl border border-gray-200 bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Text Content */}
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <p className="text-sm md:text-base text-gray-700 mb-2">Fresh Drops. Latest Styles.</p>
                  <p className="text-sm md:text-base text-gray-600 mb-4">
                    Discover what&apos;s new in FSK Electronics Shop.
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    New Launches
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 mb-6">
                    Smart TV • Home Appliances • Accessories
                  </p>
                  <div className="inline-flex items-center justify-center rounded-full bg-[#5a2ea6] px-6 py-3 text-sm font-semibold text-white hover:bg-[#4a2596] transition-colors w-fit">
                    Shop Now
                  </div>
                </div>

                {/* Right Side - Product Image */}
                <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  {newLaunchImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={newLaunchImage}
                      alt={newLaunchProduct?.name || "New Launch Product"}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm font-medium">
                      New Launch Product
                    </div>
                  )}
                  {/* Label overlay */}
                  <div className="absolute bottom-4 right-4 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-semibold text-gray-900 shadow-sm">
                    {newLaunchProduct?.name || "New Launch"}
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Stores Section on landing page */}
        <section id="stores" className="rounded-3xl border border-gray-200 bg-white p-8 md:p-10 lg:p-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">Our Stores</h2>
                  <p className="mt-2 text-sm md:text-base text-gray-600 max-w-xl">
                    Visit our physical stores to experience products in person and get assistance from our experts.
                  </p>
                </div>
                <Link
                  href="/stores"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  View all stores
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-5 flex flex-col gap-2 text-sm text-gray-700"
                  >
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Store {i}
                    </div>
                    <div className="font-semibold text-gray-900">FSK Appliance Store - Location {i}</div>
                    <div className="text-gray-600">Address details will be added here.</div>
                    <div className="text-gray-500 text-xs mt-1">Timings: 9 AM – 9 PM</div>
                  </div>
                ))}
              </div>
        </section>

        {/* Bottom CTA */}
        <section className="mt-4 md:mt-6">
              <div className="relative rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-[hsl(var(--brand))]/5 to-white p-8 md:p-12 lg:p-16 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                      Want the best local price instantly?
                    </h3>
                    <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 max-w-2xl">
                      Send the product name on WhatsApp and we'll share the offer price, availability and delivery details.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Link
                      href="/search"
                      className="rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-center"
                    >
                      Browse Products
                    </Link>
                    <Link
                      href="/contact"
                      className="rounded-xl bg-[hsl(var(--brand))] px-6 py-3.5 text-sm font-semibold text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 text-center"
                    >
                      Contact on WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
        </section>
      </section>
    </main>
  );
}
