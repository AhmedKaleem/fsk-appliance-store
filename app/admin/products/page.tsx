import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function AdminProductsPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("id,name,brand,model,price_offer,stock_status,is_active,created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-base text-gray-600">Manage products shown in the storefront</p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[hsl(var(--brand))] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
        >
          <span>+</span>
          <span>Add Product</span>
        </Link>
      </div>

      {error ? (
        <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 mb-6">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error loading products</h3>
          <pre className="text-xs text-red-700 overflow-auto">{JSON.stringify(error, null, 2)}</pre>
        </div>
      ) : null}

      <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Brand/Model</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Active</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products?.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {p.brand || "-"} {p.model ? `• ${p.model}` : ""}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {p.price_offer ? `₹${p.price_offer.toLocaleString("en-IN")}` : "-"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      p.stock_status === "IN_STOCK" ? "bg-green-100 text-green-800" :
                      p.stock_status === "OUT_OF_STOCK" ? "bg-red-100 text-red-800" :
                      p.stock_status === "LIMITED" ? "bg-amber-100 text-amber-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {p.stock_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      p.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {p.is_active ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/products/edit/${p.id}`}
                      className="inline-flex items-center rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
              {!products?.length ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-500">
                      <div className="text-4xl mb-3">📦</div>
                      <p className="text-base font-medium">No products yet</p>
                      <p className="text-sm mt-1">Click "Add Product" to get started</p>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
