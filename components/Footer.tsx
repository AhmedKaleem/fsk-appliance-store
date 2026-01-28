import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-2 border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-xl text-gray-900 mb-3">
              FSK Appliance Store
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted partner for premium electronics and appliances. Order on WhatsApp for the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/search" className="text-sm text-gray-600 hover:text-[hsl(var(--brand))] transition-colors">
                  Search Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-[hsl(var(--brand))] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-gray-600 hover:text-[hsl(var(--brand))] transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-gray-600">Free Delivery</li>
              <li className="text-sm text-gray-600">Installation Support</li>
              <li className="text-sm text-gray-600">EMI Options</li>
              <li className="text-sm text-gray-600">Warranty Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
              Get in Touch
            </h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-gray-600">
                Order on WhatsApp for best price
              </li>
              <li className="text-sm text-gray-600">
                Fast delivery & installation
              </li>
              <li className="text-sm text-gray-600">
                Local support available
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} FSK Appliance Store. All rights reserved.
          </div>
          <div className="text-sm text-gray-600">
            Order on WhatsApp for best price • EMI • Installation
          </div>
        </div>
      </div>
    </footer>
  );
}
