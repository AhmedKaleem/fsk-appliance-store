const items = [
  { title: "Free Delivery", sub: "On eligible items", icon: "🚚" },
  { title: "Free Installation", sub: "Support available", icon: "🧰" },
  { title: "Best Warranty", sub: "Brand warranty", icon: "🛡️" },
  { title: "Local Support", sub: "Fast resolution", icon: "💬" },
];

export default function TrustRow() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {items.map((x) => (
          <div
            key={x.title}
            className="group rounded-2xl border-2 border-gray-200 bg-white p-5 md:p-6 flex flex-col md:flex-row gap-4 items-center hover:border-[hsl(var(--brand))]/30 hover:shadow-lg transition-all duration-300"
          >
            <div className="h-14 w-14 md:h-16 md:w-16 rounded-xl bg-gradient-to-br from-[hsl(var(--brand))]/15 to-[hsl(var(--brand))]/5 flex items-center justify-center text-2xl md:text-3xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
              {x.icon}
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="text-sm md:text-base font-bold text-gray-900">{x.title}</div>
              <div className="text-xs md:text-sm text-gray-500 mt-1">{x.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
