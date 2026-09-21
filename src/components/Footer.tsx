"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const COUNTRIES = [
  { name: "India", currency: "₹ INR", flag: "🇮🇳", code: "INR" },
  { name: "United States", currency: "$ USD", flag: "🇺🇸", code: "USD" },
  { name: "United Kingdom", currency: "£ GBP", flag: "🇬🇧", code: "GBP" },
  { name: "United Arab Emirates", currency: "د.إ AED", flag: "🇦🇪", code: "AED" },
  { name: "Australia", currency: "A$ AUD", flag: "🇦🇺", code: "AUD" },
  { name: "Canada", currency: "C$ CAD", flag: "🇨🇦", code: "CAD" },
  { name: "Singapore", currency: "S$ SGD", flag: "🇸🇬", code: "SGD" },
  { name: "Hong Kong", currency: "HK$ HKD", flag: "🇭🇰", code: "HKD" },
  { name: "Germany", currency: "€ EUR", flag: "🇩🇪", code: "EUR" },
  { name: "France", currency: "€ EUR", flag: "🇫🇷", code: "EUR" },
  { name: "Italy", currency: "€ EUR", flag: "🇮🇹", code: "EUR" },
  { name: "Spain", currency: "€ EUR", flag: "🇪🇸", code: "EUR" },
  { name: "Netherlands", currency: "€ EUR", flag: "🇳🇱", code: "EUR" },
  { name: "Switzerland", currency: "CHF CHF", flag: "🇨🇭", code: "CHF" },
  { name: "Sweden", currency: "kr SEK", flag: "🇸🇪", code: "SEK" },
  { name: "Norway", currency: "kr NOK", flag: "🇳🇴", code: "NOK" },
  { name: "Denmark", currency: "kr DKK", flag: "🇩🇰", code: "DKK" },
  { name: "Japan", currency: "¥ JPY", flag: "🇯🇵", code: "JPY" },
  { name: "New Zealand", currency: "NZ$ NZD", flag: "🇳🇿", code: "NZD" },
  { name: "Saudi Arabia", currency: "SR SAR", flag: "🇸🇦", code: "SAR" },
  { name: "South Africa", currency: "R ZAR", flag: "🇿🇦", code: "ZAR" },
];

export default function Footer() {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <footer className="w-full bg-white text-[#1a1a1a] border-t border-stone-200 pt-16 pb-12 px-6 sm:px-10 lg:px-16 mt-auto">
      <div className="max-w-[1500px] mx-auto">
        {/* Main Footer Links Columns (Mir Kash exact format) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-16 text-[13px] tracking-[0.05em]">
          {/* Column 1 */}
          <div className="space-y-3">
            <ul className="space-y-2.5 font-normal">
              <li>
                <Link href="/about" className="hover:text-stone-500 transition-colors">Journal</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-stone-500 transition-colors">About</Link>
              </li>
              <li>
                <Link href="/about#materials" className="hover:text-stone-500 transition-colors">Materials</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-stone-500 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-stone-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <ul className="space-y-2.5 font-normal">
              <li>
                <Link href="/shipping" className="hover:text-stone-500 transition-colors">Try at Home</Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-stone-500 transition-colors">Shipping &amp; Returns</Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-stone-500 transition-colors">Track Order</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-stone-500 transition-colors">Bulk Gifting</Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <ul className="space-y-2.5 font-normal">
              <li>
                <Link href="/policy" className="hover:text-stone-500 transition-colors">Terms</Link>
              </li>
              <li>
                <Link href="/policy" className="hover:text-stone-500 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/policy" className="hover:text-stone-500 transition-colors">Accessibility</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-3">
            <ul className="space-y-2.5 font-normal">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-stone-500 transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-stone-500 transition-colors">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-stone-500 transition-colors">
                  Pinterest
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-stone-500 transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Global Studio Locations (Mir Kash exact format) */}
        <div className="border-t border-stone-100 pt-10 pb-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-[12px] text-stone-500 tracking-[0.03em]">
          <div>
            <span className="text-[#1a1a1a] font-medium block">Hong Kong</span>
            Guardforce Centre, 03 Hok Yuen Street, Hung Hom, Hong Kong
          </div>
          <div>
            <span className="text-[#1a1a1a] font-medium block">India</span>
            Jaywant Industrial Estate, Tardeo, Mumbai — 400034
          </div>
          <div>
            <span className="text-[#1a1a1a] font-medium block">New York, USA</span>
            37W, 47th Street, New York, USA 10036
          </div>
        </div>

        {/* Country & Currency Selector + Copyright (Mir Kash exact format) */}
        <div className="border-t border-stone-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px]">
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-[#1a1a1a] hover:text-stone-600 transition-colors cursor-pointer py-1.5"
            >
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.name} {selectedCountry.currency}</span>
              <ChevronDown size={14} className="opacity-60" />
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-72 bg-white border border-stone-200 rounded-xl p-2 shadow-2xl z-30 max-h-64 overflow-y-auto">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setSelectedCountry(c);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors cursor-pointer hover:bg-stone-50 ${
                      selectedCountry.code === c.code ? "bg-stone-100 font-medium text-black" : "text-stone-700"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{c.flag}</span>
                      <span>{c.name}</span>
                    </span>
                    <span className="text-stone-500">{c.currency}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="text-stone-400 text-[11px]">
            © {new Date().getFullYear()} NOVA. Made slowly. Worn forever.
          </div>
        </div>
      </div>
    </footer>
  );
}
