"use client";

const number = process.env.NEXT_PUBLIC_SHOP_WHATSAPP;
const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "FSK Appliance Store";

export default function GlobalWhatsAppFAB() {
  if (!number) return null;

  const text = encodeURIComponent(
    `Hi ${shopName},\n\nI found your store online and would like to know more about prices and availability.`,
  );

  const href = `https://wa.me/${number}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
    >
      <span className="text-2xl" aria-hidden="true">
        💬
      </span>
    </a>
  );
}

