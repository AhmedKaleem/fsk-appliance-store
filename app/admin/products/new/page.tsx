import Link from "next/link";
import AdminProductForm from "@/components/AdminProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add Product</h1>
          <p className="mt-2 text-base text-gray-600">Create a new product for the storefront</p>
        </div>
        <Link 
          href="/admin/products" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[hsl(var(--brand))] transition-colors"
        >
          <span>←</span>
          <span>Back to Products</span>
        </Link>
      </div>

      <AdminProductForm mode="create" />
    </div>
  );
}
