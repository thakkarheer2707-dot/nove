"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Feather, Droplets, Gem } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const HERO_IMAGES = [
  "/products/Ember/ember_v3.png",
  "/products/Terra/te1_v2.png",
  "/products/Aqua/aq_v1.png",
  "/products/Aqua/aqr_v1.png",
  "/products/Ember/ember_5.png",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col bg-[#fbfbfd] min-h-screen">
      {/* 1. High-Performance Artistic Asymmetrical Hero Banner */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] w-full flex flex-col justify-center px-4 md:px-8 pt-6 pb-12 bg-[#fbfbfd]">
        
        {/* Soft Background Static Glows (behind the curved canvas) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(229,229,234,0.25)_0%,_transparent_70%)] mix-blend-multiply" />
          <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(229,229,234,0.3)_0%,_transparent_70%)] mix-blend-multiply" />
        </div>

        {/* The Shaped Banner Canvas Card */}
        <div className="relative z-10 w-full max-w-7xl mx-auto min-h-[75vh] md:min-h-[78vh] flex items-center bg-gradient-to-br from-[#f6f2ee] via-[#fae6db] to-[#f0f5fd] border border-black/[0.02] shadow-[0_30px_70px_rgba(0,0,0,0.03)] overflow-hidden rounded-[32px_80px_32px_80px] md:rounded-[40px_160px_40px_160px] p-6 md:p-16">
          
          {/* Subtle overlay texture grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
            
            {/* Left Content (Text and CTA) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-orange-900/60 mb-2 block">NOVE LUXURY</span>
              
              <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter text-[#1d1d1f] leading-none">
                Light <br/> as air.
              </h1>
              
              <h2 className="text-lg md:text-xl font-serif text-gray-500 italic font-light max-w-sm leading-relaxed">
                Premium Eucalyptus Leather. <br className="hidden md:block" /> The art of weightless elegance.
              </h2>
              
              <div className="pt-4">
                <Link 
                  href="/store" 
                  className="inline-flex items-center gap-4 bg-[#1d1d1f] hover:bg-black text-white px-10 py-4 rounded-full text-base font-bold tracking-tight shadow-xl shadow-black/10 active:scale-95 group transition-all"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Content (The Artistic Handbag Showcase Canvas) */}
            <div className="lg:col-span-7 w-full flex justify-center items-center">
              
              {/* Crescent/Organic Gallery Showcase Frame */}
              <div className="relative w-full max-w-[480px] aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center bg-white/40 border border-white/60 shadow-[inset_0_4px_24px_rgba(255,255,255,0.4)] backdrop-blur-sm rounded-[60px_30px_90px_30px] md:rounded-[120px_60px_180px_60px] overflow-hidden group">
                
                {/* Floating ambient backdrop halo */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.6)_0%,_transparent_75%)] pointer-events-none" />

                {/* Handbag shadow */}
                <div className="absolute bottom-[10%] w-[65%] h-[20px] bg-black/[0.04] blur-lg rounded-full pointer-events-none transition-transform duration-700 group-hover:scale-90" />

                <div className="relative w-[75%] h-[75%]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, y: -15 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full relative transition-transform duration-700 group-hover:scale-[1.04]"
                    >
                      <Image 
                        src={HERO_IMAGES[currentIndex]} 
                        alt="NOVE Collection" 
                        fill 
                        className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Gallery tag detail */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 bg-black/5 rounded-full border border-white/40 pointer-events-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                  <span className="text-[9px] uppercase tracking-widest font-bold text-black/40">EDITION 0{currentIndex + 1}</span>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 1.5 Curated Shaped Collection Banners */}
      <section className="bg-[#fbfbfd] py-24 px-6 w-full border-t border-black/5">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-gray-400 mb-4 block">CURATED EDITIONS</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f]">Sculpted proportions.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Ember Banner */}
            <Link 
               href="/store?collection=Ember+Series"
               className="group relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[380px] bg-gradient-to-br from-[#fdf5f0] to-[#fae6db] border border-orange-100/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-900/[0.03] active:scale-[0.99] rounded-[50px_20px_50px_20px] md:rounded-[100px_40px_100px_40px]"
            >
              <div className="z-10 max-w-xs text-left">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-orange-850 mb-3 block">01 / EMBER</span>
                <h3 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-3">Ember Series</h3>
                <p className="text-[#8e8e93] text-sm font-light leading-relaxed">
                  A silhouette of quiet confidence and burning strength.
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-orange-950 group-hover:underline">
                  <span>Shop Edition</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="relative w-full md:w-[60%] h-[240px] mt-6 md:mt-0 flex items-center justify-center">
                <div className="absolute bottom-[5%] w-[60%] h-[20px] bg-black/[0.04] blur-lg rounded-full pointer-events-none group-hover:scale-95 transition-transform" />
                <div className="relative w-[85%] h-[85%] transition-transform duration-500 group-hover:translate-y-[-10px] group-hover:scale-[1.03]">
                  <Image 
                    src="/products/Ember/Black/product_4.png" 
                    alt="Ember Series Purse" 
                    fill 
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </Link>

            {/* Aqua Banner */}
            <Link 
               href="/store?collection=Aqua+Series"
               className="group relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[380px] bg-gradient-to-br from-[#f0f5fd] to-[#dbebfa] border border-blue-100/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/[0.03] active:scale-[0.99] rounded-[20px_50px_20px_50px] md:rounded-[40px_100px_40px_100px]"
            >
              <div className="z-10 max-w-xs text-left">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-blue-850 mb-3 block">02 / AQUA</span>
                <h3 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-3">Aqua Series</h3>
                <p className="text-[#8e8e93] text-sm font-light leading-relaxed">
                  Sculpted liquid contours inspired by adaptive, falling water.
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-blue-950 group-hover:underline">
                  <span>Shop Edition</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="relative w-full md:w-[60%] h-[240px] mt-6 md:mt-0 flex items-center justify-center">
                <div className="absolute bottom-[5%] w-[60%] h-[20px] bg-black/[0.04] blur-lg rounded-full pointer-events-none group-hover:scale-95 transition-transform" />
                <div className="relative w-[85%] h-[85%] transition-transform duration-500 group-hover:translate-y-[-10px] group-hover:scale-[1.03]">
                  <Image 
                    src="/products/Aqua/aqr_v1.png" 
                    alt="Aqua Series Purse" 
                    fill 
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </Link>

            {/* Terra Banner */}
            <Link 
               href="/store?collection=Terra+Series"
               className="group relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[380px] bg-gradient-to-br from-[#f6f2ee] to-[#e8ded5] border border-amber-100/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/[0.03] active:scale-[0.99] rounded-[30px_30px_60px_20px] md:rounded-[60px_60px_120px_40px]"
            >
              <div className="z-10 max-w-xs text-left">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-amber-850 mb-3 block">03 / TERRA</span>
                <h3 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-3">Terra Series</h3>
                <p className="text-[#8e8e93] text-sm font-light leading-relaxed">
                  Resilient structure crafted for grounding travel and daily motion.
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-amber-950 group-hover:underline">
                  <span>Shop Edition</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="relative w-full md:w-[60%] h-[240px] mt-6 md:mt-0 flex items-center justify-center">
                <div className="absolute bottom-[5%] w-[60%] h-[20px] bg-black/[0.04] blur-lg rounded-full pointer-events-none group-hover:scale-95 transition-transform" />
                <div className="relative w-[85%] h-[85%] transition-transform duration-500 group-hover:translate-y-[-10px] group-hover:scale-[1.03]">
                  <Image 
                    src="/products/Terra/te1_v2.png" 
                    alt="Terra Series Purse" 
                    fill 
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </Link>

            {/* Aero Banner */}
            <Link 
               href="/store?collection=Aero+Series"
               className="group relative flex flex-col md:flex-row items-center justify-between p-8 md:p-12 min-h-[380px] bg-gradient-to-br from-[#f3f3f5] to-[#e3e3e7] border border-gray-200/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gray-900/[0.03] active:scale-[0.99] rounded-[60px_20px_30px_60px] md:rounded-[120px_40px_60px_120px]"
            >
              <div className="z-10 max-w-xs text-left">
                <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-700 mb-3 block">04 / AERO</span>
                <h3 className="text-3xl font-bold text-[#1d1d1f] tracking-tight mb-3">Aero Series</h3>
                <p className="text-[#8e8e93] text-sm font-light leading-relaxed">
                  Sleek, weightless evening proportions designed for simplicity.
                </p>
                <span className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-gray-950 group-hover:underline">
                  <span>Shop Edition</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="relative w-full md:w-[60%] h-[240px] mt-6 md:mt-0 flex items-center justify-center">
                <div className="absolute bottom-[5%] w-[60%] h-[20px] bg-black/[0.04] blur-lg rounded-full pointer-events-none group-hover:scale-95 transition-transform" />
                <div className="relative w-[85%] h-[85%] transition-transform duration-500 group-hover:translate-y-[-10px] group-hover:scale-[1.03]">
                  <Image 
                    src="/products/Aero/Black/ae_main.png" 
                    alt="Aero Series Purse" 
                    fill 
                    className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 2. Craftsmanship Narrative - High Performance Layout */}
      <section className="bg-white border-t border-black/5 py-24 px-6 w-full section-render-optimize">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[45vh] md:h-[58vh] w-full flex items-center justify-center bg-gradient-to-br from-[#fcf9f6] via-[#f7f3ed] to-[#f0f4fd] border border-black/[0.02] shadow-[0_20px_50px_rgba(0,0,0,0.02)] rounded-[80px_40px_160px_40px] md:rounded-[120px_60px_200px_60px] p-12 overflow-hidden group">
            {/* Subtle overlay texture grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.5)_0%,_transparent_75%)] pointer-events-none" />
            
            <div className="relative w-[85%] h-[85%] z-10 transition-transform duration-700 group-hover:scale-[1.04]">
              <Image 
                src="/products/Aqua/aqr_v1.png" 
                alt="Texture Detail" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.06)]"
              />
            </div>
          </div>
          
          <div className="flex flex-col justify-center max-w-xl">
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-gray-400 mb-4 block">The Feel</span>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
              Liquid glass contours that catch the light.
            </h3>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light mb-8">
              Every NOVE handbag is sculpted, not just stitched. By analyzing the way light wraps around curved glass, we developed a silhouette that feels entirely fluid in motion while resting comfortably against your side.
            </p>
            <div className="h-[2px] w-16 bg-black/5" />
          </div>
        </div>
      </section>

      {/* 3. Why NOVE Bento Box - Fast CSS Layout */}
      <section className="bg-[#fbfbfd] border-t border-black/5 py-24 px-6 w-full section-render-optimize">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.2em] uppercase font-bold text-gray-400 mb-4 block">Innovation</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f]">Designed differently.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto">
            {/* Fluid Dynamics Card */}
            <div className="col-span-1 md:col-span-2 bg-white rounded-[32px] p-8 md:p-10 flex flex-col items-start justify-between relative overflow-hidden group border border-gray-100 min-h-[320px]">
              <div className="z-10 max-w-md">
                <Droplets size={32} strokeWidth={1.5} className="text-[#1d1d1f] mb-6" />
                <h4 className="text-2xl font-bold mb-3 text-[#1d1d1f] tracking-tight">Fluid Dynamics.</h4>
                <p className="text-gray-500 leading-relaxed font-light">
                  Inspired by falling water. The seamless exterior masks a hyper-organized interior.
                </p>
              </div>
              <div className="absolute right-[-5%] bottom-[-15%] w-[45%] h-[80%] opacity-20 group-hover:scale-105 transition-transform duration-700 pointer-events-none">
                 <Image src="/products/Ember/ember_5.png" alt="Fluid" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain" />
              </div>
            </div>

            {/* Zero Gravity Card */}
            <div className="bg-[#1d1d1f] text-white rounded-[32px] p-8 md:p-10 flex flex-col items-start justify-between min-h-[320px] shadow-lg shadow-black/[0.03]">
              <Feather size={32} strokeWidth={1.5} className="text-white mb-6" />
              <div>
                <h4 className="text-2xl font-bold mb-2 tracking-tight">Zero Gravity.</h4>
                <p className="text-gray-400 leading-relaxed font-light">
                  Engineered to feel totally weightless in your everyday movement.
                </p>
              </div>
            </div>

            {/* Premium Ethical Design Card */}
            <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 flex flex-col items-start justify-between min-h-[320px]">
              <Gem size={32} strokeWidth={1.5} className="text-[#1d1d1f] mb-6" />
              <div>
                <h4 className="text-2xl font-bold mb-2 text-[#1d1d1f] tracking-tight">Premium Ethical Design.</h4>
                <p className="text-gray-500 leading-relaxed font-light">
                  Crafted carefully from fast-growing, carbon-neutral Eucalyptus plant derivatives.
                </p>
              </div>
            </div>

            {/* Ready to feel it Card */}
            <div className="col-span-1 md:col-span-2 bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[320px] group">
               <div className="max-w-sm flex flex-col items-center md:items-start text-center md:text-left">
                 <h4 className="text-2xl font-bold mb-6 text-[#1d1d1f] tracking-tight">Ready to feel it?</h4>
                 <Link 
                   href="/store" 
                   className="inline-flex rounded-full bg-[#1d1d1f] hover:bg-black text-white px-10 py-4 font-bold tracking-tight shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                 >
                   Go to Store
                 </Link>
               </div>
               <div className="relative w-full md:w-1/2 h-[220px] flex items-center justify-center p-4">
                  {/* Subtle Curved Canvas Frame */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#fcf9f6] to-[#f0f4fd] border border-black/[0.01] rounded-[60px_24px_80px_24px] pointer-events-none group-hover:rounded-[24px_80px_24px_80px] transition-all duration-700" />
                  <div className="relative w-[85%] h-[85%] z-10 transition-transform duration-700 group-hover:scale-[1.04]">
                     <Image src="/products/Terra/te1_v2.png" alt="Store" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.05)]" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

