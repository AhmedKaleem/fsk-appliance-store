import Link from "next/link";

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_SHOP_WHATSAPP;
  const shopName = process.env.NEXT_PUBLIC_SHOP_NAME || "FSK Appliance Store";

  const whatsappLink = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi ${shopName}, I'd like to know more about your products and services.`)}`
    : "#";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-[hsl(var(--brand))] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Contact</span>
      </nav>

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
          Contact Us
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Get in touch with us for the best prices, product availability, and support. We're here to help!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Information Card */}
        <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            {/* WhatsApp */}
            {whatsappNumber && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">
                  💬
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[hsl(var(--brand))] hover:underline font-medium"
                  >
                    {whatsappNumber}
                  </a>
                  <p className="text-sm text-gray-600 mt-1">Chat with us for instant support</p>
                </div>
              </div>
            )}

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">
                📍
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Store Address</h3>
                <p className="text-gray-700">
                  (Add shop address here)
                </p>
                <p className="text-sm text-gray-600 mt-1">Visit our showroom</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl">
                🕒
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                <p className="text-gray-700">9 AM – 9 PM</p>
                <p className="text-sm text-gray-600 mt-1">Monday to Sunday</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-[hsl(var(--brand))]/5 via-white to-[hsl(var(--brand))]/5 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Contact Us?</h2>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-[hsl(var(--brand))] text-xl mt-0.5">✓</span>
              <div>
                <span className="font-semibold text-gray-900">Best Prices</span>
                <p className="text-sm text-gray-600">Get exclusive offers and best deals</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[hsl(var(--brand))] text-xl mt-0.5">✓</span>
              <div>
                <span className="font-semibold text-gray-900">Product Availability</span>
                <p className="text-sm text-gray-600">Check real-time stock and delivery options</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[hsl(var(--brand))] text-xl mt-0.5">✓</span>
              <div>
                <span className="font-semibold text-gray-900">EMI Options</span>
                <p className="text-sm text-gray-600">Flexible payment plans available</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[hsl(var(--brand))] text-xl mt-0.5">✓</span>
              <div>
                <span className="font-semibold text-gray-900">Installation Support</span>
                <p className="text-sm text-gray-600">Professional installation and setup</p>
              </div>
            </li>
          </ul>

          {whatsappNumber && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-4 text-base font-semibold text-white hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <span>💬</span>
              <span>Chat on WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">How to Order</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-3">1️⃣</div>
            <h4 className="font-semibold text-gray-900 mb-2">Browse Products</h4>
            <p className="text-sm text-gray-600">Explore our wide range of appliances</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">2️⃣</div>
            <h4 className="font-semibold text-gray-900 mb-2">Contact Us</h4>
            <p className="text-sm text-gray-600">Send product details on WhatsApp</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-3">3️⃣</div>
            <h4 className="font-semibold text-gray-900 mb-2">Get Best Price</h4>
            <p className="text-sm text-gray-600">Receive offer and delivery details</p>
          </div>
        </div>
      </div>
    </div>
  );
}
