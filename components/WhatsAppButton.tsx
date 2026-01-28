"use client";

type Props = {
  productName: string;
  brand?: string | null;
  model?: string | null;
  offerPrice?: number | null;
  pageUrl?: string;
};

export default function WhatsAppButton({ productName, brand, model, offerPrice, pageUrl }: Props) {
  const number = process.env.NEXT_PUBLIC_SHOP_WHATSAPP;
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME;

  const text = encodeURIComponent(
`Hi ${shopName || ""},

I saw this product on your website and want the best price / availability.

Product: ${productName}
Brand: ${brand || "-"}
Model: ${model || "-"}
Offer Price shown: ${offerPrice ?? "-"}

Please share:
• Final best price
• EMI options
• Delivery & installation details

Link: ${pageUrl || ""}`
  );

  const href = `https://wa.me/${number}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-4 text-base font-semibold text-white hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <span className="text-xl">💬</span>
      <span>Get Best Price on WhatsApp</span>
    </a>
  );
}
