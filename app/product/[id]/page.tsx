"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard, { type ProductCardType } from "@/components/ProductCard";

function stockBadge(status?: string | null) {
  const s = status || "CALL_TO_CONFIRM";
  const map: Record<string, { label: string; cls: string }> = {
    IN_STOCK: { label: "In Stock", cls: "bg-green-50 text-green-700 border-green-200" },
    OUT_OF_STOCK: { label: "Out of Stock", cls: "bg-red-50 text-red-700 border-red-200" },
    LIMITED: { label: "Limited Stock", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    CALL_TO_CONFIRM: { label: "Call to confirm", cls: "bg-slate-50 text-slate-700 border-slate-200" },
  };
  return map[s] || map.CALL_TO_CONFIRM;
}

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params?.id;

  const [p, setP] = useState<any>(null);
  const [err, setErr] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [similar, setSimilar] = useState<ProductCardType[]>([]);

  useEffect(() => {
    async function load() {
      if (!productId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select(
          "id,name,brand,model,price_mrp,price_offer,images,stock_status,short_desc,specs_json,is_active,category_id",
        )
        .eq("id", productId)
        .single();

      setErr(error);
      setP(data);

      // Load relevant products with smart algorithm
      if (!error && data) {
        const relevantProducts: ProductCardType[] = [];
        const productPrice = data.price_offer || 0;
        const priceRange = productPrice * 0.3; // 30% price range

        // Priority 1: Same brand products (if brand exists)
        if (data.brand) {
          const { data: sameBrandData } = await supabase
            .from("products")
            .select("id,name,brand,model,price_offer,images,stock_status")
            .eq("is_active", true)
            .eq("brand", data.brand)
            .neq("id", productId)
            .order("created_at", { ascending: false })
            .limit(4);

          if (sameBrandData && sameBrandData.length > 0) {
            relevantProducts.push(...(sameBrandData as ProductCardType[]));
          }
        }

        // Priority 2: Same category products
        if (data.category_id && relevantProducts.length < 8) {
          const { data: sameCategoryData } = await supabase
            .from("products")
            .select("id,name,brand,model,price_offer,images,stock_status")
            .eq("is_active", true)
            .eq("category_id", data.category_id)
            .neq("id", productId)
            .order("created_at", { ascending: false })
            .limit(8 - relevantProducts.length);

          if (sameCategoryData && sameCategoryData.length > 0) {
            // Filter out duplicates
            const existingIds = new Set(relevantProducts.map(p => p.id));
            const newProducts = (sameCategoryData as ProductCardType[]).filter(p => !existingIds.has(p.id));
            relevantProducts.push(...newProducts);
          }
        }

        // Priority 3: Similar price range products (if we still need more)
        if (productPrice > 0 && relevantProducts.length < 8) {
          const { data: similarPriceData } = await supabase
            .from("products")
            .select("id,name,brand,model,price_offer,images,stock_status")
            .eq("is_active", true)
            .neq("id", productId)
            .gte("price_offer", productPrice - priceRange)
            .lte("price_offer", productPrice + priceRange)
            .order("created_at", { ascending: false })
            .limit(8 - relevantProducts.length);

          if (similarPriceData && similarPriceData.length > 0) {
            // Filter out duplicates
            const existingIds = new Set(relevantProducts.map(p => p.id));
            const newProducts = (similarPriceData as ProductCardType[]).filter(p => !existingIds.has(p.id));
            relevantProducts.push(...newProducts);
          }
        }

        // Limit to 8 products total
        setSimilar(relevantProducts.slice(0, 8));
      } else {
        setSimilar([]);
      }

      setLoading(false);
    }

    load();
  }, [productId]);

  if (!productId) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Route param missing</h1>
          <pre className="mt-4 rounded-xl bg-gray-50 p-4 text-xs overflow-auto text-left">
            {JSON.stringify({ params }, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center text-gray-600">Loading...</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-xl font-semibold text-red-900">Error loading product</h1>
          <pre className="mt-4 rounded-xl bg-white p-4 text-xs overflow-auto text-left">
            {JSON.stringify({ productId, err }, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (!p) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Product not found</h1>
          <p className="mt-2 text-gray-600">Product ID: {productId}</p>
          <Link href="/search" className="mt-4 inline-block text-[hsl(var(--brand))] hover:underline">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const images = Array.isArray(p.images) ? p.images : [];
  const badge = stockBadge(p.stock_status);
  const specs = p.specs_json ? (typeof p.specs_json === "string" ? JSON.parse(p.specs_json) : p.specs_json) : null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-[hsl(var(--brand))] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/search" className="hover:text-[hsl(var(--brand))] transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{p.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl border-2 border-gray-200 bg-gray-50 overflow-hidden">
            {images[selectedImage] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[selectedImage]}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm font-medium">
                No image available
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl border-2 overflow-hidden transition-all ${
                    selectedImage === idx
                      ? "border-[hsl(var(--brand))] ring-2 ring-[hsl(var(--brand))]/20"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`${p.name} ${idx + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">{p.name}</h1>
                <div className="mt-2 text-base text-gray-600">
                  {p.brand && <span className="font-medium">{p.brand}</span>}
                  {p.model && <span className="mx-2">•</span>}
                  {p.model && <span>{p.model}</span>}
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full border text-xs font-semibold ${badge.cls}`}>
                {badge.label}
              </div>
            </div>

            {p.short_desc && (
              <p className="mt-4 text-base text-gray-700 leading-relaxed">{p.short_desc}</p>
            )}
          </div>

          {/* Price Section */}
          <div className="rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
            <div className="flex items-baseline gap-3">
              {p.price_mrp && p.price_offer && p.price_mrp > p.price_offer && (
                <div className="text-lg text-gray-500 line-through">₹{p.price_mrp.toLocaleString("en-IN")}</div>
              )}
              <div className="text-4xl font-bold text-gray-900">
                ₹{p.price_offer ? p.price_offer.toLocaleString("en-IN") : "Call for price"}
              </div>
            </div>
            {p.price_mrp && p.price_offer && p.price_mrp > p.price_offer && (
              <div className="mt-2 text-sm text-green-600 font-semibold">
                Save ₹{(p.price_mrp - p.price_offer).toLocaleString("en-IN")} (
                {Math.round(((p.price_mrp - p.price_offer) / p.price_mrp) * 100)}% off)
              </div>
            )}

            <div className="mt-6">
              <WhatsAppButton 
                productName={p.name} 
                brand={p.brand} 
                model={p.model} 
                offerPrice={p.price_offer}
                pageUrl={typeof window !== 'undefined' ? window.location.href : ''}
              />
            </div>
          </div>

          {/* Key Features */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--brand))] mt-0.5">✓</span>
                <span>Genuine products with brand warranty</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--brand))] mt-0.5">✓</span>
                <span>Free delivery on eligible items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--brand))] mt-0.5">✓</span>
                <span>Installation support available</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--brand))] mt-0.5">✓</span>
                <span>EMI options available</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {specs && Object.keys(specs).length > 0 && (
        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="border-b border-gray-100 pb-3">
                <dt className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{key}</dt>
                <dd className="mt-1 text-base text-gray-900">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {/* Relevant Products */}
      {similar.length > 0 && (
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
            {p.brand 
              ? `More ${p.brand} products and similar items you might be interested in.`
              : "Similar products you might be interested in."}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {similar.map((sp) => (
              <ProductCard key={sp.id} {...sp} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
