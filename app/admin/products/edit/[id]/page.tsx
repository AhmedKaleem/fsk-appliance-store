"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import AdminProductForm from "@/components/AdminProductForm";

export default function AdminEditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) setErr(error.message);
      setProduct(data);
      setLoading(false);
    }

    load();
  }, [id]);

  if (!id) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-8">
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center text-gray-600">Loading product...</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-8">
          <h1 className="text-xl font-semibold text-red-900">Error loading product</h1>
          <pre className="mt-4 rounded-xl bg-white p-4 text-xs overflow-auto text-left">
            {JSON.stringify({ id, err }, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Product not found</h1>
          <Link 
            href="/admin/products" 
            className="mt-4 inline-block text-[hsl(var(--brand))] hover:underline font-semibold"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
          <p className="mt-2 text-base text-gray-600">Update product information</p>
        </div>
        <Link 
          href="/admin/products" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[hsl(var(--brand))] transition-colors"
        >
          <span>←</span>
          <span>Back to Products</span>
        </Link>
      </div>

      <AdminProductForm mode="edit" initialData={product} productId={id} />
    </div>
  );
}
