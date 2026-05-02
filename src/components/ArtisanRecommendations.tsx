"use client";

import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ArtisanRecommendations({ currentProductId }: { currentProductId: string }) {
  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    // Recommend 4 other products randomly - client side only to avoid hydration mismatch
    const shuffled = [...products]
      .filter(p => p.id !== currentProductId)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setRecommendations(shuffled);
  }, [currentProductId]);

  if (recommendations.length === 0) return null;

  return (
    <section className="py-24 border-t border-black/5">
      <div className="flex items-end justify-between mb-16">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] mb-4 tracking-tight">Artisan Recommendations.</h2>
          <p className="text-gray-500 font-medium tracking-wide text-sm">Curated pairings from the NOVE collection.</p>
        </div>
        <Link href="/store" className="group flex items-center space-x-2 text-[#1d1d1f] hover:opacity-70 transition-all text-sm font-semibold">
          <span>Explore All</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        {recommendations.map((product, i) => {
          const defaultVariant = product.variants[0];
          const price = defaultVariant.price || product.basePrice;
          const image = defaultVariant.images[0];
          
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <Link 
                href={`/product/${product.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] bg-white rounded-[32px] mb-6 overflow-hidden flex items-center justify-center p-8 transition-all shadow-[0_2px_20px_rgba(0,0,0,0.04)] group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] group-hover:scale-[1.02] active:scale-[0.98]">
                  <Image 
                    src={image} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-110 product-image"
                  />
                </div>
                <div className="px-2 text-center md:text-left">
                  <h3 className="text-[#1d1d1f] text-xl font-semibold tracking-tight mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-lg font-regular">₹{price.toLocaleString()}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
