"use client";

import { useState } from "react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import RecentlyViewed from "@/components/RecentlyViewed";

const getColorCode = (colorName: string) => {
  const map: Record<string, string> = {
    'Black': '#1c1c1e',
    'Olive Green': '#4a5d23',
    'White': '#f8f9fa',
    'Cherry Red': '#990f02',
    'Dusty Pink': '#dcae96',
    'Heather Brown': '#6b4f4f'
  };
  return map[colorName] || '#1c1c1e';
};

const STORE_COLLECTIONS = [
  {
    name: "All",
    filterKey: "All",
    href: "/store",
    desc: "Complete Series",
    image: "/products/Terra/te1_v2.png",
    bg: "bg-white border border-gray-100",
    text: "text-[#1d1d1f]"
  },
  {
    name: "Ember",
    filterKey: "Ember Series",
    href: "/product/ember",
    desc: "Black & Olive Green",
    image: "/products/Ember/ember_v3.png",
    bg: "bg-orange-50",
    text: "text-orange-950"
  },
  {
    name: "Aqua",
    filterKey: "Aqua Series",
    href: "/product/aqua",
    desc: "White & Cherry Red",
    image: "/products/Aqua/aq_v1.png",
    bg: "bg-blue-50",
    text: "text-blue-950"
  },
  {
    name: "Aero",
    filterKey: "Aero Series",
    href: "/product/aero",
    desc: "Black & Dusty Pink",
    image: "/products/Aero/ae_v1.png",
    bg: "bg-gray-100",
    text: "text-gray-900"
  },
  {
    name: "Terra",
    filterKey: "Terra Series",
    href: "/product/terra",
    desc: "White & Heather Brown",
    image: "/products/Terra/te1_v2.png",
    bg: "bg-[#f4f0ec]",
    text: "text-[#4a3f35]"
  }
];

export default function Store() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filteredProducts = activeFilter 
    ? products.filter(p => p.collection.includes(activeFilter)) 
    : products;

  return (
    <div className="flex flex-col bg-[#fbfbfd] min-h-screen pt-24">
      {/* Product Grid Section - Apple Store Card UI Light */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-4">Store.</h1>
          <p className="text-xl text-gray-500 font-medium">The complete NOVE collection.</p>
        </div>

        {/* Featured Collections Bento Grid - Scrollable on mobile, grid on desktop */}
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 md:mb-24 scrollbar-hide snap-x">
          {STORE_COLLECTIONS.map((c, i) => {
            const isSelected = activeFilter === c.filterKey || (activeFilter === null && c.filterKey === "All");
            
            return (
              <Link key={c.filterKey} href={c.href} className="snap-center min-w-[200px] md:min-w-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className={`relative h-64 md:h-80 rounded-[24px] md:rounded-[32px] overflow-hidden ${c.bg} flex flex-col justify-between p-6 md:p-8 group cursor-pointer transition-all duration-300 hover:shadow-xl`}
                >
                  <div className="z-10 relative">
                    <h3 className={`text-lg md:text-2xl font-bold tracking-tight ${c.text}`}>{c.name}</h3>
                    <p className={`text-[10px] md:text-sm mt-1 font-medium opacity-80 ${c.text}`}>{c.desc}</p>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[65%] p-6">
                    <motion.div 
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.05, y: -10 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image src={c.image} alt={c.name} fill className="object-contain object-bottom drop-shadow-2xl" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        <div className="min-h-[500px]">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 content-start">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <RecentlyViewed />
    </div>
  );
}

// Extracted ProductCard component for cleaner code
function ProductCard({ product }: { product: any }) {
  // Use the first image of the first variant as the default
  const defaultImage = product.variants[0].images[0];
  const price = product.variants[0].price || product.basePrice;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/product/${product.id}`} className="group flex flex-col h-full bg-white rounded-[32px] overflow-hidden hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
        <div className="p-8 pb-0 z-10 flex flex-col items-center text-center">
          <h3 className="text-[#1d1d1f] text-2xl font-semibold tracking-tight mb-2">{product.name}</h3>
          <span className="text-gray-500 font-regular text-lg">₹{price.toLocaleString()}</span>
          <div className="flex space-x-2 mt-4">
            {product.variants.map((variant: any) => (
                <div 
                  key={variant.color} 
                  className="w-3 h-3 rounded-full border border-black/10 shadow-sm" 
                  style={{ backgroundColor: getColorCode(variant.color) }} 
                  title={variant.color}
                ></div>
            ))}
          </div>
        </div>
        
        <div className="relative w-full aspect-square mt-4 flex items-center justify-center p-6 px-8 relative overflow-hidden">
          {/* Artistic Organic Curved Canvas Backdrop */}
          <div className="absolute inset-x-8 inset-y-4 bg-gradient-to-br from-[#f8f6f4] via-[#fcfbf9] to-[#f4f7f6] border border-black/[0.01] rounded-[48px_24px_64px_24px] pointer-events-none group-hover:rounded-[24px_64px_24px_64px] transition-all duration-700" />
          
          <div className="relative w-[85%] h-[85%] z-10 transition-transform duration-700 group-hover:scale-[1.04] group-hover:translate-y-[-5px]">
             <Image 
              src={defaultImage} 
              alt={product.name} 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.05)] group-hover:drop-shadow-[0_20px_35px_rgba(0,0,0,0.08)] transition-all duration-700"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
