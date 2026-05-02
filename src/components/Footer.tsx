"use client";

import Link from "next/link";
import { ShieldCheck, Globe, MessageCircle, Sparkles } from "lucide-react";

const FOOTER_LINKS = [
  { name: "Store", href: "/store" },
  { name: "Collection", href: "/collection" },
  { name: "FAQ", href: "/faq" },
  { name: "Shipping", href: "/shipping" },
  { name: "Policies", href: "/policy" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { name: "Instagram", href: "#", icon: MessageCircle },
  { name: "Pinterest", href: "#", icon: Sparkles },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#fbfbfd] border-t border-gray-100 py-20 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <Link href="/" className="text-4xl font-serif text-[#1d1d1f] tracking-widest font-bold mb-10">
          NOVE
        </Link>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.name} href={link.href} className="text-[#1d1d1f] font-medium text-sm hover:opacity-60 transition-opacity">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-8 mb-16">
          {SOCIAL_LINKS.map((social) => (
            <Link key={social.name} href={social.href} className="text-[#1d1d1f] hover:scale-110 transition-transform">
              <social.icon size={20} strokeWidth={1.5} />
            </Link>
          ))}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between pt-10 border-t border-black/5 text-[10px] text-[#86868b] uppercase tracking-[0.2em] font-bold gap-6">
           <div className="flex flex-wrap justify-center items-center gap-6">
              <span>© 2026 NOVE Edition 01</span>
              <div className="flex items-center space-x-2">
                 <ShieldCheck size={14} className="text-green-600/60" />
                 <span>Razorpay Secured</span>
              </div>
           </div>
           <div className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm border border-black/5">
              <Globe size={14} className="text-blue-600/60" />
              <span>International Shipping to 40+ Countries</span>
           </div>
        </div>
      </div>
    </footer>
  );
}

