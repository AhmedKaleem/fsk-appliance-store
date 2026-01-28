import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalWhatsAppFAB from "@/components/GlobalWhatsAppFAB";

export const metadata: Metadata = {
  title: "FSK Appliance Store",
  description: "Online showroom with WhatsApp ordering",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))] antialiased">
        <Navbar />
        {children}
        <Footer />
        <GlobalWhatsAppFAB />
      </body>
    </html>
  );
}
