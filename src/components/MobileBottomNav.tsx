"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, Grid, User, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";
import { useWishlist } from "./WishlistProvider";
import { useAuth } from "./AuthProvider";

const NAV_ITEMS = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Store", icon: ShoppingBag, href: "/store" },
  { label: "Series", icon: Grid, href: "/collection" },
  { label: "Favorites", icon: Heart, href: "/profile#wishlist" },
  { label: "Profile", icon: User, href: "/profile" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { items } = useCart();
  const { wishlist } = useWishlist();
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#fbfbfd]/80 backdrop-blur-2xl border-t border-black/5 px-6 pb-safe pt-3 flex items-center justify-between"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        // Dynamic link for profile
        let href = item.href;
        if (item.label === "Profile" && !user) href = "/login";
        if (item.label === "Profile" && user?.email === 'admin@nove.in') href = "/admin";

        return (
          <Link key={item.label} href={href} className="relative flex flex-col items-center flex-1 py-1">
            <motion.div
              whileTap={{ scale: 0.8 }}
              className={`relative p-2 rounded-2xl transition-colors duration-300 ${isActive ? "text-[#1d1d1f]" : "text-gray-400/80"}`}
            >
              {isActive && (
                <motion.div 
                  layoutId="lens-glow"
                  className="absolute inset-0 rounded-2xl bg-[#1d1d1f]/5 blur-md"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
              
              {/* Badges */}
              {item.label === "Store" && items.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1d1d1f] text-[9px] font-bold text-white shadow-sm ring-2 ring-[#fbfbfd]"
                >
                  {items.length}
                </motion.span>
              )}
              {item.label === "Favorites" && wishlist.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#1d1d1f] text-[9px] font-bold text-white shadow-sm ring-2 ring-[#fbfbfd]"
                >
                  {wishlist.length}
                </motion.span>
              )}
            </motion.div>
            
            <AnimatePresence>
              {isActive && (
                <motion.span 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-[10px] font-bold tracking-tight uppercase text-[#1d1d1f] mt-0.5"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
            
            {isActive && (
              <motion.div
                layoutId="active-indicator"
                className="absolute -bottom-1 w-6 h-1 bg-[#1d1d1f] rounded-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </Link>
        );
      })}
    </motion.div>
  );
}
