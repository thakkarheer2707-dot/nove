"use client";

import { useScroll, useMotionValueEvent, AnimatePresence, motion } from "framer-motion";
import { Search, Menu, X, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useCart } from "./CartProvider";
import SearchOverlay from "./SearchOverlay";
import TryAtHomeModal from "./TryAtHomeModal";

export default function Navigation() {
  const { user } = useAuth();
  const { items, setIsCartOpen } = useCart();
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTryAtHomeOpen, setIsTryAtHomeOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const totalCartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const isTransparent = isHome && !isScrolled;

  return (
    <>
      {/* ── Top Animated Marquee Bar (Mir Kash signature) ── */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white text-[10px] md:text-[11px] uppercase tracking-[0.2em] py-2 overflow-hidden select-none border-b border-white/10">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          <span className="mx-8 font-light">HANDMADE VEGAN BAGS</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">MADE SLOWLY, WORN FOREVER</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">PLANT LEATHER</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">SHIPS WORLDWIDE</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">CRUELTY-FREE ALWAYS</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">COMPLIMENTARY TRY AT HOME IN MUMBAI</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">HANDMADE VEGAN BAGS</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">MADE SLOWLY, WORN FOREVER</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">PLANT LEATHER</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">SHIPS WORLDWIDE</span>
          <span className="mx-4 opacity-40">•</span>
          <span className="mx-8 font-light">CRUELTY-FREE ALWAYS</span>
        </div>
      </div>

      {/* ── Main Mir Kash Two-Tier Navigation (Transparent over Hero Poster) ── */}
      <header
        className={`fixed top-[29px] left-0 right-0 z-40 w-full transition-all duration-300 ${
          isTransparent
            ? "bg-gradient-to-b from-black/60 via-black/30 to-transparent text-white border-b border-white/15"
            : "bg-white/95 backdrop-blur-md text-[#1a1a1a] shadow-xs border-b border-stone-200"
        }`}
      >
        {/* Tier 1: Brand & Utilities */}
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8 h-[56px] md:h-[64px] flex items-center justify-between relative">
          {/* Left: Mobile Menu / Search */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1 hover:opacity-75 transition-opacity"
              aria-label="Menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center gap-2 text-[12px] uppercase tracking-[0.12em] hover:opacity-75 transition-opacity cursor-pointer font-light"
            >
              <Search size={15} strokeWidth={1.5} />
              <span>Search</span>
            </button>
          </div>

          {/* Center: Brand Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link
              href="/"
              className={`font-serif text-[26px] md:text-[30px] tracking-[0.22em] font-normal uppercase transition-opacity hover:opacity-85 ${
                isTransparent ? "text-white drop-shadow-sm" : "text-[#1a1a1a]"
              }`}
            >
              NOVA
            </Link>
          </div>

          {/* Right: Account & Cart */}
          <div className="flex items-center space-x-6 text-[12px] uppercase tracking-[0.12em] font-light">
            <Link
              href={user ? (user.email === "admin@nove.in" ? "/admin" : "/profile") : "/login"}
              className="hidden sm:inline-block hover:opacity-75 transition-opacity"
            >
              Account
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="hover:opacity-75 transition-opacity cursor-pointer flex items-center gap-1.5"
            >
              <span>Cart</span>
              <span className="font-normal">({totalCartCount})</span>
            </button>
          </div>
        </div>

        {/* Tier 2: Sub-Nav Links */}
        <div
          className={`hidden md:flex items-center justify-center space-x-10 py-2.5 text-[12px] uppercase tracking-[0.14em] font-light transition-colors ${
            isTransparent
              ? "border-t border-white/10 text-white/95"
              : "border-t border-stone-100 text-[#1a1a1a]"
          }`}
        >
          <Link
            href="/store"
            className="hover:opacity-70 transition-opacity py-0.5"
          >
            Shop All
          </Link>
          <Link
            href="/about#materials"
            className="hover:opacity-70 transition-opacity py-0.5"
          >
            Materials
          </Link>
          <Link
            href="/about"
            className="hover:opacity-70 transition-opacity py-0.5"
          >
            About
          </Link>
          <button
            onClick={() => setIsTryAtHomeOpen(true)}
            className="hover:opacity-70 transition-opacity py-0.5 cursor-pointer uppercase font-light"
          >
            Try at Home
          </button>
        </div>
      </header>

      {/* Navigation Overlays */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <TryAtHomeModal isOpen={isTryAtHomeOpen} onClose={() => setIsTryAtHomeOpen(false)} />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="relative w-4/5 max-w-sm bg-white text-[#1a1a1a] h-full shadow-2xl flex flex-col justify-between p-6 sm:p-8 z-10"
            >
              <div>
                <div className="flex justify-between items-center pb-6 border-b border-stone-100">
                  <span className="font-serif text-2xl tracking-[0.2em]">NOVA</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-stone-500 hover:text-black"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex flex-col space-y-6 mt-8 text-sm uppercase tracking-[0.14em] text-[#1a1a1a]">
                  <Link
                    href="/store"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-stone-500"
                  >
                    Shop All
                  </Link>
                  <Link
                    href="/about#materials"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-stone-500"
                  >
                    Materials
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-stone-500"
                  >
                    About
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsTryAtHomeOpen(true);
                    }}
                    className="text-left hover:text-stone-500 cursor-pointer uppercase"
                  >
                    Try at Home
                  </button>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 space-y-3 text-xs uppercase tracking-wider text-stone-600">
                <Link
                  href={user ? (user.email === "admin@nove.in" ? "/admin" : "/profile") : "/login"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-black"
                >
                  <User size={15} strokeWidth={1.5} />
                  <span>{user ? `Account (${user.name.split(" ")[0]})` : "Account / Sign in"}</span>
                </Link>
                <div className="text-[10px] text-stone-400 tracking-widest pt-2">
                  Mumbai · Hong Kong · New York
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
