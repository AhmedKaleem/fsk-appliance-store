 "use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProductCard, { type ProductCardType } from "@/components/ProductCard";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function SearchPageClient() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams?.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Update search query when URL changes
  useEffect(() => {
    if (urlQuery && urlQuery !== searchQuery) {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        setCategories([]);
        setHasSearched(false);
        return;
      }

      setLoading(true);
      setHasSearched(true);

      // Search products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("id,name,brand,model,price_offer,images,stock_status")
        .eq("is_active", true)
        .or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,model.ilike.%${searchQuery}%`)
        .order("created_at", { ascending: false })
        .limit(50);

      // Search categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("id,name,slug")
        .ilike("name", `%${searchQuery}%`)
        .order("name", { ascending: true })
        .limit(10);

      if (!productsError && productsData) {
        setProducts(productsData as ProductCardType[]);
      } else {
        setProducts([]);
      }

      if (!categoriesError && categoriesData) {
        setCategories(categoriesData as Category[]);
      } else {
        setCategories([]);
      }

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  async function handleSearch() {
    if (!searchQuery.trim()) {
      setProducts([]);
      setCategories([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    // Search products
    const { data: productsData, error: productsError } = await supabase
      .from("products")
      .select("id,name,brand,model,price_offer,images,stock_status")
      .eq("is_active", true)
      .or(`name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%,model.ilike.%${searchQuery}%`)
      .order("created_at", { ascending: false })
      .limit(50);

    // Search categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("categories")
      .select("id,name,slug")
      .ilike("name", `%${searchQuery}%`)
      .order("name", { ascending: true })
      .limit(10);

    if (!productsError && productsData) {
      setProducts(productsData as ProductCardType[]);
    } else {
      setProducts([]);
    }

    if (!categoriesError && categoriesData) {
      setCategories(categoriesData as Category[]);
    } else {
      setCategories([]);
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-[hsl(var(--brand))] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Search</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
          Smart Search
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-600">
          Find categories and products by name, brand, or model
        </p>
      </div>

      {/* Search Input */}
      <div className="mb-8">
        <div className="relative max-w-2xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for TVs, AC, Fridge, Washing Machine, Brand name..."
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-4 pl-12 pr-4 text-base outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]/30 focus:border-[hsl(var(--brand))] transition-all placeholder:text-gray-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">🔍</div>
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[hsl(var(--brand))] border-t-transparent"></div>
            </div>
          )}
        </div>
        {searchQuery && (
          <p className="mt-3 text-sm text-gray-600">
            {loading
              ? "Searching..."
              : hasSearched &&
                `Found ${categories.length + products.length} result${
                  categories.length + products.length !== 1 ? "s" : ""
                } (${categories.length} categor${categories.length !== 1 ? "ies" : "y"}, ${
                  products.length
                } product${products.length !== 1 ? "s" : ""})`}
          </p>
        )}
      </div>

      {/* Results */}
      {hasSearched && !loading && (
        <>
          {categories.length > 0 || products.length > 0 ? (
            <>
              {/* Categories Section */}
              {categories.length > 0 && (
                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Categories</h2>
                    <span className="text-sm text-gray-600">
                      {categories.length} categor{categories.length !== 1 ? "ies" : "y"} found
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="group rounded-xl border-2 border-gray-200 bg-white p-4 text-center hover:border-[hsl(var(--brand))] hover:shadow-md transition-all duration-200"
                      >
                        <div className="font-semibold text-sm text-gray-900 group-hover:text-[hsl(var(--brand))] transition-colors line-clamp-2">
                          {category.name}
                        </div>
                        <div className="mt-2 text-xs text-gray-500">Browse →</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Section */}
              {products.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Products</h2>
                    <span className="text-sm text-gray-600">
                      {products.length} product{products.length !== 1 ? "s" : ""} found
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
                    {products.map((p) => (
                      <ProductCard key={p.id} {...p} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                Try searching with different keywords or browse our categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  ← Browse Categories
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
        </>
      )}

      {/* Initial State */}
      {!hasSearched && !searchQuery && (
        <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-12 text-center">
          <div className="text-5xl mb-4">🔎</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Start searching</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Enter a product name, brand, or model in the search box above to find what you're
            looking for.
          </p>
        </div>
      )}
    </div>
  );
}

