"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Feather, Droplets, Gem } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const HERO_IMAGES = [
  "/products/Ember/ember_v3.png",
  "/products/Terra/te1_v2.png",
  "/products/Aqua/aq_v1.png",
  "/products/Aqua/aqr_v1.png",
  "/products/Ember/ember_5.png",
];


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const craftsmanshipRef = useRef<HTMLElement>(null);
  const bentoRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 35, damping: 25, restDelta: 0.001 });

  const { scrollYProgress: mainScrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollYProgress: craftsmanshipScroll } = useScroll({
    target: craftsmanshipRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: bentoScroll } = useScroll({
    target: bentoRef,
    offset: ["start end", "end start"]
  });




  // Section 1: Hero Transforms
  const heroOpacity = useTransform(smoothScrollY, [0, 1500, 1800], [1, 1, 0]);
  const heroParallax = useTransform(smoothScrollY, [0, 1800], [0, 900]);

  // Section 2: Craftsmanship Island Morphing
  const craftsmanshipScale = useTransform(craftsmanshipScroll, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);
  const craftsmanshipRadius = useTransform(craftsmanshipScroll, [0, 0.4, 0.6, 1], ["60px", "0px", "0px", "60px"]);
  const craftsmanshipOpacity = useTransform(craftsmanshipScroll, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  // Section 3: Bento Island Morphing
  const bentoScale = useTransform(bentoScroll, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);
  const bentoRadius = useTransform(bentoScroll, [0, 0.4, 0.6, 1], ["60px", "0px", "0px", "60px"]);
  const bentoOpacity = useTransform(bentoScroll, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="flex flex-col bg-[#fbfbfd] min-h-screen">
      
      <motion.div
         initial="hidden"
         animate="visible"
         variants={{
           hidden: { opacity: 0 },
           visible: { 
             opacity: 1, 
             transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.2 } 
           }
         }}
         className="w-full flex-grow flex flex-col"
      >
        {/* 1. Ethereal Liquid Hero */}
          <section className="relative h-[1800px] w-full flex flex-col items-center pt-[5vh]">
        {/* Soft Background Liquid Blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              opacity: [0.6, 0.8, 0.6],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-300/40 via-gray-200/10 to-transparent mix-blend-multiply" 
          />
          <motion.div 
            animate={{ 
              opacity: [0.5, 0.7, 0.5],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-300/50 via-gray-200/10 to-transparent mix-blend-multiply" 
          />
        </div>

        <motion.div 
          style={{ opacity: heroOpacity, y: heroParallax }}
          className="relative z-10 text-center flex flex-col items-center px-6 mt-[10vh] md:mt-[15vh]"
        >
          <motion.h1 
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-5xl md:text-8xl font-sans font-bold tracking-tighter text-[#1d1d1f] mb-4 md:mb-6"
          >
            Light as air.
          </motion.h1>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
            }}
            className="text-xl md:text-3xl font-serif text-gray-400 italic font-light mb-8 md:mb-10 max-w-2xl mx-auto"
          >
            Premium Eucalyptus Leather. <br className="md:hidden" /> The art of weightless elegance.
          </motion.h2>

          {/* Editorial Multi-Product Showcase */}
          <div className="relative z-20 w-full max-w-7xl mx-auto mt-12 md:mt-20 px-6 h-[500px] md:h-[700px] flex items-center justify-center">
            {/* 1. Main Masterpiece - Ember Black */}
            <motion.div 
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(0)}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ 
                opacity: hoveredIndex !== null && hoveredIndex !== 0 ? 0.6 : 1, 
                x: 0, 
                scale: hoveredIndex === 0 ? 1.05 : hoveredIndex === null ? 1 : 0.95,
                y: [0, -20, 0],
                transition: {
                  duration: 1.5,
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 }
                }
              }}
              className="absolute left-[5%] md:left-[10%] top-[10%] w-[60%] md:w-[500px] aspect-square"
              style={{ cursor: 'pointer', zIndex: hoveredIndex === 0 ? 50 : 30 }}
            >
              <div className="relative w-full h-full glass-display rounded-[60px] p-8 md:p-12 shadow-2xl overflow-hidden group">
                 <Image src="/products/Ember/ember_v3.png" alt="Ember Black" fill className="object-contain product-image group-hover:scale-105 transition-transform duration-700" priority />
                 <div className="absolute bottom-6 left-8 text-left">
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">NOVE Ember</p>
                   <p className="text-sm font-bold text-[#1d1d1f]">Midnight Black</p>
                 </div>
              </div>
            </motion.div>

            {/* 2. Secondary - Terra Brown */}
            <motion.div 
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(1)}
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              animate={{ 
                opacity: hoveredIndex !== null && hoveredIndex !== 1 ? 0.6 : 1, 
                x: 0, 
                scale: hoveredIndex === 1 ? 0.95 : hoveredIndex === null ? 0.85 : 0.8,
                y: [0, 20, 0],
                transition: {
                  duration: 1.8,
                  delay: 0.4,
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 }
                }
              }}
              className="absolute right-[5%] md:right-[15%] top-[0%] w-[45%] md:w-[350px] aspect-square"
              style={{ cursor: 'pointer', zIndex: hoveredIndex === 1 ? 50 : 20 }}
            >
              <div className="relative w-full h-full glass-display rounded-[50px] p-6 md:p-10 shadow-xl overflow-hidden group">
                 <Image src="/products/Terra/te1_v2.png" alt="Terra Brown" fill className="object-contain product-image group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute bottom-6 left-8 text-left">
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">NOVE Terra</p>
                   <p className="text-sm font-bold text-[#1d1d1f]">Heather Brown</p>
                 </div>
              </div>
            </motion.div>

            {/* 3. Tertiary - Aqua Blue */}
            <motion.div 
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(2)}
              initial={{ opacity: 0, y: 100, scale: 0.7 }}
              animate={{ 
                opacity: hoveredIndex !== null && hoveredIndex !== 2 ? 0.5 : 0.9, 
                y: 0, 
                scale: hoveredIndex === 2 ? 0.85 : hoveredIndex === null ? 0.75 : 0.7,
                x: [0, 15, 0],
                transition: {
                  duration: 2,
                  delay: 0.8,
                  x: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.4 }
                }
              }}
              className="absolute right-[0%] md:right-[5%] bottom-[10%] w-[40%] md:w-[300px] aspect-square"
              style={{ cursor: 'pointer', zIndex: hoveredIndex === 2 ? 50 : 10 }}
            >
              <div className="relative w-full h-full glass-display rounded-[40px] p-4 md:p-8 shadow-lg overflow-hidden group transition-opacity">
                 <Image src="/products/Aqua/aq_v1.png" alt="Aqua Blue" fill className="object-contain product-image group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute bottom-6 left-8 text-left">
                   <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">NOVE Aqua</p>
                   <p className="text-sm font-bold text-[#1d1d1f]">Ocean Mist</p>
                 </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 1.5, duration: 0.8 }}
             className="mt-12 md:mt-0 z-40"
          >
            <Link href="/store" className="glass px-10 py-5 rounded-full flex items-center space-x-4 hover:bg-white/90 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.08)] active:scale-95 group capitalize">
              <span className="text-[#1d1d1f] text-lg font-bold tracking-tight">Explore the Collection</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight size={20} className="text-[#1d1d1f]" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

      </section>

      {/* 2. Craftsmanship Narrative - Island Reveal */}
      <section ref={craftsmanshipRef} className="relative min-h-[150vh] z-20">
        <div className="sticky top-[80px] h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ 
              scale: craftsmanshipScale, 
              borderRadius: craftsmanshipRadius,
              opacity: craftsmanshipOpacity
            }}
            className="w-[95vw] h-[90vh] max-h-full bg-white shadow-2xl overflow-y-auto overflow-x-hidden flex items-center px-6 md:px-24 py-12 scrollbar-hide"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center w-full max-w-7xl mx-auto h-full my-auto">
              <div className="relative h-[35vh] md:h-[50vh] w-full flex-shrink-0 flex items-center justify-center">
                <Image 
                  src="/products/Aqua/aqr_v1.png" 
                  alt="Texture Detail" 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain product-image"
                />
              </div>
              
              <div className="flex flex-col justify-center">
                <span className="text-sm tracking-widest uppercase font-semibold text-gray-400 mb-4">The Feel</span>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-8 leading-tight">Liquid glass contours that catch the light perfectly.</h3>
                <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
                  Every NOVE handbag is sculpted, not just stitched. By analyzing the way light wraps around curved glass, we developed a silhouette that feels entirely fluid in motion while resting comfortably against your side.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Why NOVE Bento Box - Island Reveal */}
      <section ref={bentoRef} className="relative min-h-[150vh] z-20">
        <div className="sticky top-[80px] h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ 
              scale: bentoScale, 
              borderRadius: bentoRadius,
              opacity: bentoOpacity
            }}
            className="w-[95vw] h-[90vh] max-h-full bg-white shadow-2xl overflow-y-auto overflow-x-hidden flex items-center px-6 md:px-24 py-12 scrollbar-hide"
          >
            <div className="max-w-7xl mx-auto w-full py-10">
              <div className="text-center mb-10 md:mb-16 mt-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f]">Designed differently.</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto">
                <div className="col-span-1 md:col-span-2 bg-[#fbfbfd] rounded-[32px] p-8 md:p-10 flex flex-col items-start justify-between relative overflow-hidden group border border-gray-100">
                  <div className="z-10 max-w-md">
                    <Droplets size={32} strokeWidth={1} className="text-[#1d1d1f] mb-4" />
                    <h4 className="text-2xl font-semibold mb-3 text-[#1d1d1f]">Fluid Dynamics.</h4>
                    <p className="text-gray-500 text-base leading-relaxed">Inspired by falling water. The seamless exterior masks a hyper-organized interior.</p>
                  </div>
                  <div className="absolute right-[-10%] md:right-[-5%] bottom-[-20%] md:bottom-[-10%] w-[70%] md:w-[50%] h-full opacity-40 group-hover:scale-105 transition-transform duration-1000">
                     <Image src="/products/Ember/ember_5.png" alt="Fluid" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain product-image" />
                  </div>
                </div>

                <div className="bg-[#1d1d1f] text-white rounded-[32px] p-8 md:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[250px] md:min-h-[300px]">
                  <Feather size={32} strokeWidth={1} className="text-white mb-4" />
                  <h4 className="text-2xl font-semibold mb-3">Zero Gravity.</h4>
                  <p className="text-gray-400 text-base leading-relaxed">Engineered to feel totally weightless.</p>
                </div>

                <div className="bg-[#fbfbfd] border border-gray-100 rounded-[32px] p-8 md:p-10 flex flex-col items-center justify-center text-center min-h-[250px] md:min-h-[300px]">
                  <Gem size={32} strokeWidth={1} className="text-[#1d1d1f] mb-4" />
                  <h4 className="text-2xl font-semibold mb-3 text-[#1d1d1f]">Premium Ethical Design.</h4>
                  <p className="text-gray-500 text-base leading-relaxed">Plant-based Eucalyptus Leather.</p>
                </div>

                <div className="col-span-1 md:col-span-2 bg-white border border-gray-100 rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="max-w-sm flex flex-col items-center md:items-start text-center md:text-left">
                     <h4 className="text-2xl font-semibold mb-4 text-[#1d1d1f]">Ready to feel it?</h4>
                     <Link href="/store" className="inline-flex rounded-full bg-[#1d1d1f] text-white px-10 py-4 font-bold hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-black/5">
                       Go to Store
                     </Link>
                   </div>
                   <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto h-full min-h-[200px]">
                       <Image src="/products/Terra/te1_v2.png" alt="Store" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain product-image" />
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </motion.div>
    </div>
  );
}

