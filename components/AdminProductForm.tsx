"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Category = {
  id: string;
  name: string;
  slug?: string | null;
};

type Props = {
  mode: "create" | "edit";
  initialData?: any;
  productId?: string;
};

type FormState = {
  name: string;
  category_id: string;
  brand: string;
  model: string;
  price_mrp: string;
  price_offer: string;
  stock_status: "IN_STOCK" | "OUT_OF_STOCK" | "LIMITED" | "CALL_TO_CONFIRM";
  is_active: boolean;
  short_desc: string;
  specs_json: string;
  image_url: string;
};

const EMPTY: FormState = {
  name: "",
  category_id: "",
  brand: "",
  model: "",
  price_mrp: "",
  price_offer: "",
  stock_status: "CALL_TO_CONFIRM",
  is_active: true,
  short_desc: "",
  specs_json: "{\n\n}",
  image_url: "",
};

function safeJsonStringify(value: any) {
  try {
    if (typeof value === "string") return value;
    return JSON.stringify(value ?? {}, null, 2);
  } catch {
    return "{\n\n}";
  }
}

function toNumberOrNull(v: string) {
  const n = Number(v);
  if (!v || Number.isNaN(n)) return null;
  return n;
}

async function uploadProductImage(file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${crypto.randomUUID()}.${ext}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, { cacheControl: "3600", upsert: false });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
  return data.publicUrl;
}

export default function AdminProductForm({ mode, initialData, productId }: Props) {
  const [v, setV] = useState<FormState>(EMPTY);
  const [cats, setCats] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  // Load categories
  useEffect(() => {
    (async () => {
      setLoadingCats(true);

      const { data, error } = await supabase
        .from("categories")
        .select("id,name,slug")
        .order("name", { ascending: true });

      if (error) {
        setErr(error.message);
        setCats([]);
      } else {
        setCats((data as any) || []);
      }

      setLoadingCats(false);
    })();
  }, []);

  // Prefill when editing
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setV((prev) => ({
        ...prev,
        name: initialData.name ?? "",
        category_id: initialData.category_id ?? "",
        brand: initialData.brand ?? "",
        model: initialData.model ?? "",
        price_mrp: initialData.price_mrp != null ? String(initialData.price_mrp) : "",
        price_offer: initialData.price_offer != null ? String(initialData.price_offer) : "",
        stock_status: initialData.stock_status ?? "CALL_TO_CONFIRM",
        is_active: initialData.is_active ?? true,
        short_desc: initialData.short_desc ?? "",
        specs_json: safeJsonStringify(initialData.specs_json),
        image_url: Array.isArray(initialData.images) ? (initialData.images[0] ?? "") : "",
      }));
    }
  }, [mode, initialData]);

  // SINGLE source of truth: ensure category_id is valid once cats are available
  useEffect(() => {
    if (!cats.length) return;

    setV((p) => {
      // if category already set and exists in list, keep it
      if (p.category_id && cats.some((c) => c.id === p.category_id)) return p;

      // otherwise default to first category
      return { ...p, category_id: cats[0].id };
    });
  }, [cats]);

  const title = useMemo(() => (mode === "edit" ? "Update Product" : "Create Product"), [mode]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(null);

    if (!v.name.trim()) {
      setErr("Product name is required.");
      return;
    }
    if (!v.category_id) {
      setErr("Category is required.");
      return;
    }

    // Validate JSON
    let specsObj: any = null;
    try {
      specsObj = v.specs_json?.trim() ? JSON.parse(v.specs_json) : {};
    } catch {
      setErr("Specifications JSON is invalid. Please correct it.");
      return;
    }

    const payload: any = {
      name: v.name.trim(),
      category_id: v.category_id,
      brand: v.brand?.trim() || null,
      model: v.model?.trim() || null,
      price_mrp: toNumberOrNull(v.price_mrp),
      price_offer: toNumberOrNull(v.price_offer),
      stock_status: v.stock_status,
      is_active: v.is_active,
      short_desc: v.short_desc?.trim() || null,
      specs_json: specsObj,
      images: v.image_url ? [v.image_url] : [],
    };

    try {
      setSaving(true);

      if (mode === "edit") {
        if (!productId) throw new Error("Missing productId for edit mode.");

        const { error } = await supabase.from("products").update(payload).eq("id", productId);
        if (error) throw error;

        setOk("Product updated successfully.");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;

        setOk("Product created successfully.");

        // reset but keep current category for convenience
        setV((p) => ({ ...EMPTY, category_id: p.category_id || (cats[0]?.id ?? "") }));
      }
    } catch (e: any) {
      setErr(e?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-black/10 p-5 bg-white">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Product Name */}
        <div>
          <label className="text-sm font-medium">Product Name *</label>
          <input
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"
            value={v.name}
            onChange={(e) => setV((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g., Samsung 1.5 Ton AC"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium">Category *</label>
          <select
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"
            value={v.category_id}
            onChange={(e) => setV((p) => ({ ...p, category_id: e.target.value }))}
            disabled={loadingCats}
          >
            <option value="">
              {loadingCats ? "Loading..." : "Select category"}
            </option>

            {!loadingCats &&
              cats.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="text-sm font-medium">Brand</label>
          <input
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"
            value={v.brand}
            onChange={(e) => setV((p) => ({ ...p, brand: e.target.value }))}
            placeholder="e.g., Samsung"
          />
        </div>

        {/* Model */}
        <div>
          <label className="text-sm font-medium">Model</label>
          <input
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"
            value={v.model}
            onChange={(e) => setV((p) => ({ ...p, model: e.target.value }))}
            placeholder="e.g., AR18"
          />
        </div>

        {/* MRP */}
        <div>
          <label className="text-sm font-medium">MRP</label>
          <input
            type="number"
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"
            value={v.price_mrp}
            onChange={(e) => setV((p) => ({ ...p, price_mrp: e.target.value }))}
            placeholder="e.g., 35000"
          />
        </div>

        {/* Offer */}
        <div>
          <label className="text-sm font-medium">Offer Price</label>
          <input
            type="number"
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"
            value={v.price_offer}
            onChange={(e) => setV((p) => ({ ...p, price_offer: e.target.value }))}
            placeholder="e.g., 30000"
          />
        </div>

        {/* Stock Status */}
        <div>
          <label className="text-sm font-medium">Stock Status</label>
          <select
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"
            value={v.stock_status}
            onChange={(e) => setV((p) => ({ ...p, stock_status: e.target.value as any }))}
          >
            <option value="IN_STOCK">IN_STOCK</option>
            <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
            <option value="LIMITED">LIMITED</option>
            <option value="CALL_TO_CONFIRM">CALL_TO_CONFIRM</option>
          </select>
        </div>

        {/* Active */}
        <div className="flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            checked={v.is_active}
            onChange={(e) => setV((p) => ({ ...p, is_active: e.target.checked }))}
          />
          <span className="text-sm">Active (visible on site)</span>
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Product Image</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  setErr(null);
                  setOk(null);
                  setUploading(true);
                  const url = await uploadProductImage(file);
                  setV((p) => ({ ...p, image_url: url }));
                } catch (e: any) {
                  setErr(e?.message || "Upload failed.");
                } finally {
                  setUploading(false);
                }
              }}
            />
            {uploading ? <span className="text-xs text-black/60">Uploading...</span> : null}
          </div>

          {v.image_url ? (
            <div className="mt-3 rounded-xl border border-black/10 p-3 bg-white">
              <div className="text-xs text-black/60 mb-2">Preview</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.image_url} alt="preview" className="h-48 rounded-lg object-cover" />
              <div className="mt-2 text-[10px] text-black/40 break-all">{v.image_url}</div>
            </div>
          ) : (
            <p className="mt-2 text-xs text-black/50">
              Upload an image. It will be stored in Supabase Storage.
            </p>
          )}
        </div>

        {/* Short Desc */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Short Description</label>
          <textarea
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2"
            rows={4}
            value={v.short_desc}
            onChange={(e) => setV((p) => ({ ...p, short_desc: e.target.value }))}
            placeholder="2–3 lines about the product (features, warranty, installation etc.)"
          />
        </div>

        {/* Specs JSON */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Specifications JSON</label>
          <textarea
            className="mt-2 w-full rounded-xl border border-black/10 px-3 py-2 font-mono text-xs"
            rows={8}
            value={v.specs_json}
            onChange={(e) => setV((p) => ({ ...p, specs_json: e.target.value }))}
            placeholder={`{\n  "Capacity": "1.5 Ton",\n  "Star Rating": "5 Star"\n}`}
          />
          <p className="mt-2 text-xs text-black/50">
            Example: {"{ \"Capacity\": \"1.5 Ton\", \"Star\": \"5\" }"} (valid JSON only)
          </p>
        </div>
      </div>

      {err ? <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{err}</div> : null}
      {ok ? <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">{ok}</div> : null}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {saving ? "Saving..." : title}
        </button>

        <button
          type="button"
          className="rounded-xl border border-black/10 px-4 py-2"
          onClick={() =>
            setV((p) => ({
              ...EMPTY,
              category_id: p.category_id || (cats[0]?.id ?? ""),
            }))
          }
          disabled={saving || uploading}
        >
          Reset
        </button>
      </div>
    </form>
  );
}
