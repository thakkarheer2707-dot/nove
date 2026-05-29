"use client";

import { useState } from "react";
import SplashScreen from "./SplashScreen";
import Navigation from "./Navigation";
import Footer from "./Footer";
import SmoothScroller from "./SmoothScroller";
import { motion } from "framer-motion";
import { CartProvider } from "./CartProvider";
import { WishlistProvider } from "./WishlistProvider";
import CartDrawer from "./CartDrawer";
import PageTransition from "./PageTransition";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <WishlistProvider>
      <CartProvider>
        <SmoothScroller>
          {showSplash && (
            <SplashScreen 
              key="splash" 
              onComplete={() => setShowSplash(false)} 
            />
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showSplash ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Navigation />
            <CartDrawer />
            
            <main className="flex-grow pt-16 min-h-screen">
              <PageTransition>
                {children}
              </PageTransition>
            </main>

            <Footer />
          </motion.div>
        </SmoothScroller>
      </CartProvider>
    </WishlistProvider>
  );
}
