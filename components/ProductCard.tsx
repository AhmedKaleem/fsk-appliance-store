import Link from "next/link";

export type ProductCardType = {
  id: string;
  name: string;
  brand?: string | null;
  model?: string | null;
  price_offer?: number | null;
  images?: any[];
  stock_status?: string | null;
};

function stockBadge(status?: string | null) {
  const s = status || "CALL_TO_CONFIRM";
  const map: Record<string, { label: string; cls: string }> = {
    IN_STOCK: { label: "In Stock", cls: "bg-green-50 text-green-700 border-green-200" },
    OUT_OF_STOCK: { label: "Out of Stock", cls: "bg-red-50 text-red-700 border-red-200" },
    LIMITED: { label: "Limited", cls: "bg-amber-50 text-amber-700 border-amber-200" },
    CALL_TO_CONFIRM: { label: "Call to confirm", cls: "bg-slate-50 text-slate-700 border-slate-200" },
  };
  return map[s] || map.CALL_TO_CONFIRM;
}

export default function ProductCard(p: ProductCardType) {
  const { id } = p;
  const firstImg = Array.isArray(p.images) ? p.images[0] : null;
  const badge = stockBadge(p.stock_status);

  return (
    <Link
      href={`/product/${id}`}
      className="group relative rounded-2xl border-2 border-gray-200 bg-white overflow-hidden hover:shadow-xl hover:border-[hsl(var(--brand))]/30 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {firstImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={firstImg}
            alt={p.name}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-sm font-medium">
            No image
          </div>
        )}

        <div className={`absolute top-3 left-3 text-[10px] font-semibold px-2.5 py-1 rounded-full border ${badge.cls} shadow-sm`}>
          {badge.label}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 md:p-5">
        <div className="text-sm md:text-base font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-[hsl(var(--brand))] transition-colors">
          {p.name}
        </div>
        <div className="text-xs md:text-sm text-gray-500 mt-1.5 line-clamp-1">
          {p.brand || ""} {p.model || ""}
        </div>

        <div className="mt-4 flex items-end justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gray-500 font-medium mb-0.5">Offer Price</div>
            <div className="text-xl md:text-2xl font-bold text-gray-900">
              {p.price_offer ? `₹${p.price_offer.toLocaleString("en-IN")}` : "Call for price"}
            </div>
          </div>
          <div className="text-sm text-[hsl(var(--brand))] font-semibold group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0">
            View →
          </div>
        </div>
      </div>
    </Link>
  );
}
