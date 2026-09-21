"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import TryAtHomeModal from "@/components/TryAtHomeModal";

interface MirKashProduct {
  id: string;
  productId: string;
  name: string;
  price: number;
  imagePrimary: string;
  imageSecondary: string;
}

// 1. Top Section Products (Horizontal Slider under Hero Poster)
const TOP_PRODUCTS: MirKashProduct[] = [
  {
    id: "ember-black",
    productId: "ember",
    name: "EMBER - OBSIDIAN BLACK",
    price: 5999,
    imagePrimary: "/products/Ember/Black/img2.jpeg",
    imageSecondary: "/products/Ember/Black/img1.jpeg"
  },
  {
    id: "aqua-cherry",
    productId: "aqua",
    name: "AQUA - CHERRY RED",
    price: 5999,
    imagePrimary: "/products/Aqua/aqr_v1.png",
    imageSecondary: "/products/Aqua/aqua_1.jpeg"
  },
  {
    id: "terra-brown",
    productId: "terra",
    name: "TERRA - HEATHER BROWN",
    price: 5999,
    imagePrimary: "/products/Terra/HeatherBrown/f9951844-c074-4e39-8e0b-b2ab33c08f18.png",
    imageSecondary: "/products/Terra/HeatherBrown/IMG_3161.png"
  },
  {
    id: "aero-pink",
    productId: "aero",
    name: "AERO - DUSTY PINK",
    price: 5999,
    imagePrimary: "/products/pink1.jpeg",
    imageSecondary: "/products/pink2.jpeg"
  },
  {
    id: "ember-olive",
    productId: "ember",
    name: "EMBER - OLIVE GREEN",
    price: 5999,
    imagePrimary: "/products/Ember/OliveGreen/img3.jpeg",
    imageSecondary: "/products/Ember/OliveGreen/img1.jpeg"
  },
  {
    id: "aqua-white",
    productId: "aqua",
    name: "AQUA - IVORY WHITE",
    price: 5999,
    imagePrimary: "/products/Aqua/CherryWhite/aq_main.png",
    imageSecondary: "/products/Aqua/CherryWhite/img2.jpeg"
  }
];

// 2. "For this summer" Collection Products
const SUMMER_PRODUCTS: MirKashProduct[] = [
  {
    id: "ember-olive-grid",
    productId: "ember",
    name: "EMBER - OLIVE GREEN",
    price: 5999,
    imagePrimary: "/products/Ember/OliveGreen/img3.jpeg",
    imageSecondary: "/products/Ember/OliveGreen/img1.jpeg"
  },
  {
    id: "aero-black-grid",
    productId: "aero",
    name: "AERO - MIDNIGHT BLACK",
    price: 5999,
    imagePrimary: "/products/Aero/Black/ae_main.png",
    imageSecondary: "/products/bp.jpeg"
  },
  {
    id: "aqua-white-grid",
    productId: "aqua",
    name: "AQUA - IVORY WHITE",
    price: 5999,
    imagePrimary: "/products/Aqua/CherryWhite/aq_main.png",
    imageSecondary: "/products/Aqua/CherryWhite/img2.jpeg"
  },
  {
    id: "terra-white-grid",
    productId: "terra",
    name: "TERRA - CLASSIC WHITE",
    price: 5999,
    imagePrimary: "/products/Terra/White/img3.jpeg",
    imageSecondary: "/products/Terra/White/img2.jpeg"
  }
];

// 3. "The Woven Edit" Collection Products
const WOVEN_PRODUCTS: MirKashProduct[] = [
  {
    id: "aqua-cherry-woven",
    productId: "aqua",
    name: "AQUA - CHERRY RED",
    price: 5999,
    imagePrimary: "/products/Aqua/aqr_v1.png",
    imageSecondary: "/products/Aqua/aqua_2.jpeg"
  },
  {
    id: "terra-brown-woven",
    productId: "terra",
    name: "TERRA - HEATHER BROWN",
    price: 5999,
    imagePrimary: "/products/Terra/HeatherBrown/IMG_3162.png",
    imageSecondary: "/products/Terra/HeatherBrown/IMG_3161.png"
  },
  {
    id: "ember-black-woven",
    productId: "ember",
    name: "EMBER - OBSIDIAN BLACK",
    price: 5999,
    imagePrimary: "/products/Ember/Black/img5.jpeg",
    imageSecondary: "/products/Ember/Black/img3.jpeg"
  },
  {
    id: "aero-pink-woven",
    productId: "aero",
    name: "AERO - DUSTY PINK",
    price: 5999,
    imagePrimary: "/products/pp.jpeg",
    imageSecondary: "/products/pink4.jpeg"
  }
];

export default function Home() {
  const [isTryAtHomeOpen, setIsTryAtHomeOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="flex flex-col bg-white min-h-screen text-[#1a1a1a] pt-[29px]">
      <TryAtHomeModal isOpen={isTryAtHomeOpen} onClose={() => setIsTryAtHomeOpen(false)} />

      {/* ── 1. CINEMATIC HERO POSTER BANNER (Header integrates directly on top) ── */}
      <section className="relative w-full h-[75vh] md:h-[88vh] min-h-[520px] bg-[#1a1a1a] overflow-hidden group">
        <Image
          src="/Banners/newban2.jpeg"
          alt="NOVA Luxury Handbags"
          fill
          priority
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 brightness-[0.88]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        {/* Bottom Poster Caption & CTA */}
        <div className="absolute inset-0 max-w-[1500px] mx-auto px-6 sm:px-12 flex flex-col justify-end pb-10 sm:pb-16 z-10 text-white">
          <span className="text-[11px] uppercase tracking-[0.25em] text-white/80 font-light mb-2">
            Edition 01 · Plant-Based Luxury
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal tracking-wide mb-4 max-w-2xl text-white">
            Made slowly. <br className="hidden sm:inline" />
            Worn forever.
          </h1>
          <div>
            <Link
              href="/store"
              className="inline-block text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium underline underline-offset-8 hover:text-stone-200 transition-colors"
            >
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. TOP PRODUCT HORIZONTAL SCROLL / SHOWCASE (Mir Kash Sub-Hero Slider) ── */}
      <section className="relative w-full py-10 md:py-16 border-b border-stone-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-8">
          <div className="relative group">
            {/* Left & Right Scroll Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-2 sm:-left-3 top-[38%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Previous products"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute -right-2 sm:-right-3 top-[38%] -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/95 shadow-md border border-stone-200 flex items-center justify-center text-stone-700 hover:text-black transition-colors cursor-pointer"
              aria-label="Next products"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>

            {/* Scrollable Product Track */}
            <div
              ref={scrollRef}
              className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide snap-x px-1 py-2"
            >
              {TOP_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FULL-BLEED EDITORIAL BANNER: CAPSULE (Mir Kash Exact Section) ── */}
      <section className="w-full relative aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.5/1] bg-[#eae6e1] overflow-hidden group">
        <Image
          src="/Banners/newban3.jpeg"
          alt="Capsule"
          fill
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/20 transition-colors" />
        <div className="absolute inset-0 max-w-[1500px] mx-auto px-6 sm:px-12 flex flex-col justify-end pb-8 sm:pb-14 z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white font-normal tracking-wide mb-3">
            Capsule
          </h2>
          <div>
            <Link
              href="/collection"
              className="inline-block text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium underline underline-offset-8 hover:text-stone-200 transition-colors"
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCT GRID: "FOR THIS SUMMER" (Mir Kash Exact Section) ── */}
      <section className="py-12 sm:py-20 max-w-[1500px] mx-auto px-4 sm:px-8 w-full">
        <div className="flex items-baseline justify-between mb-8 sm:mb-12 border-b border-stone-200 pb-4">
          <h2 className="text-2xl sm:text-4xl font-serif font-normal text-[#1a1a1a]">
            For this summer
          </h2>
          <Link
            href="/store"
            className="text-xs sm:text-sm uppercase tracking-[0.15em] text-[#1a1a1a] hover:text-stone-500 transition-colors font-medium"
          >
            Shop now
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {SUMMER_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} isGrid />
          ))}
        </div>
      </section>

      {/* ── 5. FULL-BLEED EDITORIAL BANNER: THE WOVEN EDIT (Mir Kash Exact Section) ── */}
      <section className="w-full relative aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.5/1] bg-[#eae6e1] overflow-hidden group">
        <Image
          src="/Banners/newban4.jpeg"
          alt="The Woven Edit"
          fill
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-black/20 transition-colors" />
        <div className="absolute inset-0 max-w-[1500px] mx-auto px-6 sm:px-12 flex flex-col justify-end pb-8 sm:pb-14 z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white font-normal tracking-wide mb-3">
            The Woven Edit
          </h2>
          <div>
            <Link
              href="/store"
              className="inline-block text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium underline underline-offset-8 hover:text-stone-200 transition-colors"
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. PRODUCT GRID: THE WOVEN EDIT PRODUCTS ── */}
      <section className="py-12 sm:py-20 max-w-[1500px] mx-auto px-4 sm:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {WOVEN_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} isGrid />
          ))}
        </div>
      </section>

      {/* ── 7. FULL-BLEED EDITORIAL BANNER: NOT LEATHER. BETTER. (Mir Kash Exact Section) ── */}
      <section className="w-full relative aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.5/1] bg-[#1a1a1a] overflow-hidden group">
        <Image
          src="/Banners/newban5.jpeg"
          alt="Not leather. Better."
          fill
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 brightness-95"
        />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 max-w-[1500px] mx-auto px-6 sm:px-12 flex flex-col justify-end pb-8 sm:pb-14 z-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white font-normal tracking-wide mb-3">
            Not leather. Better.
          </h2>
          <div>
            <Link
              href="/about#materials"
              className="inline-block text-white text-xs sm:text-sm uppercase tracking-[0.18em] font-medium underline underline-offset-8 hover:text-stone-200 transition-colors"
            >
              Shop now
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. TRY AT HOME. NO PRESSURE. (Mir Kash Exact Section) ── */}
      <section className="py-20 sm:py-28 bg-[#faf8f5] border-y border-stone-200 w-full px-6 sm:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] text-stone-500 font-medium block">
            Mumbai · Private Try at Home
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-[#1a1a1a] tracking-tight">
            Try at home. No pressure.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            We bring up to six bags to your door, so you can see them in your own light before you decide. Complimentary, and Mumbai only.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setIsTryAtHomeOpen(true)}
              className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-[#1a1a1a] underline underline-offset-8 hover:text-stone-500 transition-colors cursor-pointer"
            >
              <span>Book a Try at Home →</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 9. NOTE FROM FOUNDER & TRUST PILLARS (Mir Kash Exact 3 Columns) ── */}
      <section className="py-16 sm:py-24 max-w-[1500px] mx-auto px-6 sm:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-stone-200">
          {/* Pillar 1 */}
          <div className="space-y-2 pt-6 md:pt-0 md:px-6 first:pl-0">
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500">
              Note from Founder
            </h3>
            <p className="text-lg sm:text-xl font-serif text-[#1a1a1a] leading-snug">
              Made slowly. Worn forever. Hurts nothing.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-2 pt-6 md:pt-0 md:px-6">
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500">
              Order it. Try it.
            </h3>
            <p className="text-lg sm:text-xl font-serif text-[#1a1a1a] leading-snug">
              14 days to decide. No question returns.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-2 pt-6 md:pt-0 md:px-6 last:pr-0">
            <h3 className="text-xs uppercase tracking-[0.2em] font-medium text-stone-500">
              Built to Last
            </h3>
            <p className="text-lg sm:text-xl font-serif text-[#1a1a1a] leading-snug">
              1-year warranty
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Minimalist Editorial Product Card (Mir Kash exact typography & proportions)
function ProductCard({ product, isGrid = false }: { product: MirKashProduct; isGrid?: boolean }) {
  return (
    <div className={`${isGrid ? "w-full" : "min-w-[220px] sm:min-w-[280px] md:min-w-[320px] snap-start"} group flex flex-col`}>
      <Link href={`/product/${product.productId}`} className="block">
        {/* Clean, Neutral Background Image Container */}
        <div className="relative aspect-[4/5] w-full bg-[#f4f3f0] overflow-hidden mb-3.5 flex items-center justify-center p-6 sm:p-8">
          <Image
            src={product.imagePrimary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-2 transition-all duration-500 group-hover:scale-105 group-hover:opacity-0"
          />
          <Image
            src={product.imageSecondary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-2 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
        </div>

        {/* Minimalist Product Details (Exact Mir Kash single-line small typography) */}
        <div className="space-y-1">
          <div className="text-[12px] sm:text-[13px] tracking-[0.06em] font-normal text-[#1a1a1a] uppercase truncate group-hover:text-stone-600 transition-colors">
            {product.name}
          </div>
          <div className="text-[12px] sm:text-[13px] tracking-[0.04em] font-light text-stone-600">
            ₹{product.price.toLocaleString()}
          </div>
        </div>
      </Link>
    </div>
  );
}
