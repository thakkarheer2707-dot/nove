"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Feather, Droplets, Gem, Sparkles, Compass, ChevronRight, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const BANNERS = [
  {
    src: "/Banners/ban1.jpeg",
    title: "Ember Series",
    subtitle: "Edition 01",
    tagline: "Quiet confidence and burning strength.",
    href: "/store?collection=Ember+Series"
  },
  {
    src: "/Banners/ban2.jpeg",
    title: "Aqua Series",
    subtitle: "Edition 02",
    tagline: "Fluid, sculpted organic forms inspired by adaptive water contours.",
    href: "/store?collection=Aqua+Series"
  },
  {
    src: "/Banners/ban3.jpeg",
    title: "Terra Series",
    subtitle: "Edition 03",
    tagline: "Resilient contours engineered for natural grounding and mobility.",
    href: "/store?collection=Terra+Series"
  },
  {
    src: "/Banners/ban4.jpeg",
    title: "Aero Series",
    subtitle: "Edition 04",
    tagline: "Sleek weightlessness designed for ultimate minimalist simplicity.",
    href: "/store?collection=Aero+Series"
  }
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [activeShowcase, setActiveShowcase] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 3D Parallax Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [flarePos, setFlarePos] = useState({ x: 0, y: 0 });

  // Auto-play Hero Carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setHeroIndex((prev) => (prev + 1) % BANNERS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setHeroIndex((prev) => (prev + 1) % BANNERS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setHeroIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  // Handle Mouse Tilt & Light Reflection Flare
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left;
    const y = e.clientY - card.top;
    
    // Relative coordinates centered at (0,0), ranging from -0.5 to 0.5
    const relativeX = (x / card.width) - 0.5;
    const relativeY = (y / card.height) - 0.5;
    
    setTilt({
      x: relativeX * 6, // max 6 degrees of rotation on Y axis
      y: relativeY * -6 // max 6 degrees of rotation on X axis
    });
    
    setFlarePos({
      x: (x / card.width) * 100,
      y: (y / card.height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const scrollLookbook = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth * 0.45;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  // Custom 3D Slide Transition Variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98,
      rotateY: dir > 0 ? 5 : -5,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 180, damping: 24 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        rotateY: { duration: 0.4 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.98,
      rotateY: dir < 0 ? 5 : -5,
      transition: {
        x: { type: "spring" as const, stiffness: 180, damping: 24 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        rotateY: { duration: 0.4 }
      }
    })
  };

  return (
    <div className="flex flex-col bg-[#fafafc] min-h-screen overflow-x-hidden">
      
      {/* ── 1. ARTISTIC FULL-DISPLAY HERO CAROUSEL (3D TILT & LIGHT FLARE) ── */}
      <section className="relative w-full py-10 md:py-16 px-4 md:px-8 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Perspective Container Wrapper */}
          <div className="w-full [perspective:1200px]">
            
            {/* Main Interactive Framing Canvas with 3D Physics & Shimmer Reflection */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateY: tilt.x,
                rotateX: tilt.y,
                transformStyle: "preserve-3d"
              }}
              animate={{
                rotateY: tilt.x,
                rotateX: tilt.y
              }}
              className="relative w-full aspect-[16/9] md:aspect-[2.1/1] bg-[#fdfdfd] rounded-[28px] md:rounded-[44px] overflow-hidden border border-black/[0.04] shadow-[0_25px_60px_rgba(0,0,0,0.04)] group cursor-pointer transition-shadow hover:shadow-[0_35px_80px_rgba(0,0,0,0.06)]"
            >
              
              {/* Dynamic Liquid Glass Flare Overlay */}
              <div 
                className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500 mix-blend-overlay"
                style={{
                  opacity: isHovered ? 0.8 : 0,
                  background: `radial-gradient(circle 350px at ${flarePos.x}% ${flarePos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`
                }}
              />

              {/* Shimmer Border Glow (Artistic platinum line) */}
              <div className="absolute inset-0 rounded-[28px] md:rounded-[44px] border-2 border-transparent group-hover:border-black/5 transition-colors z-20 pointer-events-none" />

              {/* 3D Liquid Slideshow */}
              <div className="absolute inset-0 w-full h-full [transform-style:preserve-3d]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={heroIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <Image
                      src={BANNERS[heroIndex].src}
                      alt={BANNERS[heroIndex].title}
                      fill
                      priority
                      className="object-contain w-full h-full select-none"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Minimal floating navigation elements inside banner */}
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between items-center z-25 pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="w-12 h-12 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-black/5 flex items-center justify-center text-black shadow-md hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="w-12 h-12 rounded-full bg-white/70 hover:bg-white backdrop-blur-md border border-black/5 flex items-center justify-center text-black shadow-md hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* High-End Minimalist Active Tag */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2.5 bg-white/80 backdrop-blur-md px-4.5 py-2 rounded-full border border-black/5 shadow-sm pointer-events-none">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#1d1d1f]">
                  {BANNERS[heroIndex].subtitle} ACTIVE
                </span>
              </div>

            </motion.div>
          </div>

          {/* Minimalist Context & Action Bar (Placed clean below to ensure zero overlap) */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4">
            <div className="space-y-2 text-left">
              <h1 className="text-2xl md:text-3xl font-serif text-[#1d1d1f] font-semibold tracking-tight">
                {BANNERS[heroIndex].title}
              </h1>
              <p className="text-gray-400 font-light text-sm max-w-xl leading-relaxed">
                {BANNERS[heroIndex].tagline}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Slide Indicators */}
              <div className="flex items-center gap-2 mr-4">
                {BANNERS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > heroIndex ? 1 : -1);
                      setHeroIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${heroIndex === idx ? 'w-8 bg-black' : 'w-1.5 bg-gray-200 hover:bg-gray-300'}`}
                  />
                ))}
              </div>

              <Link
                href={BANNERS[heroIndex].href}
                className="inline-flex items-center gap-3 bg-[#1d1d1f] hover:bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm active:scale-[0.98] transition-all group cursor-pointer"
              >
                <span>Shop Edition</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. Curated Landscape Lookbook Track ── */}
      <section className="bg-white py-24 w-full border-b border-black/5">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-6 gap-8">
            <div className="max-w-xl text-left">
              <span className="text-xs tracking-[0.3em] uppercase font-bold text-gray-400 mb-3 block">ARTISTIC PORTFOLIO</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] leading-none">
                Curated Chapters.
              </h2>
            </div>
            
            {/* Sliding Track Controls */}
            <div className="flex gap-3">
              <button 
                onClick={() => scrollLookbook("left")}
                className="w-12 h-12 rounded-full border border-gray-200 hover:border-black flex items-center justify-center text-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scrollLookbook("right")}
                className="w-12 h-12 rounded-full border border-gray-200 hover:border-black flex items-center justify-center text-gray-400 hover:text-black transition-colors cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Lookbook Horizontal scrolling track */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none gap-8 px-6 md:px-12 py-4 snap-x snap-mandatory"
          >
            {BANNERS.map((banner, idx) => (
              <div 
                key={idx}
                className="w-[85vw] sm:w-[60vw] md:w-[48vw] lg:w-[42vw] flex-shrink-0 snap-start space-y-6"
              >
                {/* 100% Display Uncropped banner card */}
                <div className="relative w-full aspect-[16/9] bg-[#fbfbfd] rounded-[20px] overflow-hidden border border-black/[0.04] shadow-sm">
                  <Image
                    src={banner.src}
                    alt={banner.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-contain w-full h-full transition-transform duration-700 hover:scale-[1.015]"
                  />
                </div>

                {/* Details */}
                <div className="text-left space-y-3 px-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gray-400">
                      {banner.subtitle}
                    </span>
                    <div className="h-1 w-1 rounded-full bg-gray-300" />
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                      Sculpted Silhouette
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-[#1d1d1f]">{banner.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
                    {banner.tagline}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={banner.href}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black hover:underline group cursor-pointer"
                    >
                      <span>Shop Collection</span>
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3. Craftsmanship Split Showcase ── */}
      <section className="bg-white py-24 px-6 w-full border-b border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative aspect-[16/9] md:aspect-[1.8/1] lg:aspect-[1.5/1] w-full flex items-center justify-center bg-[#fbfbfd] border border-black/[0.03] shadow-md rounded-[24px] md:rounded-[40px] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeShowcase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image 
                  src={BANNERS[activeShowcase].src} 
                  alt="Showcase detail" 
                  fill
                  className="object-contain w-full h-full"
                />
              </motion.div>
            </AnimatePresence>

            {/* Quick Interactive Thumbnail Buttons Overlaid */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-black/5 flex items-center justify-between gap-4 shadow-sm">
              <span className="text-[9px] text-gray-500 tracking-wider uppercase font-bold hidden sm:inline">Craftsmanship Perspectives</span>
              <div className="flex gap-2">
                {BANNERS.map((ban, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveShowcase(idx)}
                    className={`relative w-10 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${activeShowcase === idx ? 'border-black scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={ban.src} alt="Thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-center text-left max-w-xl">
            <span className="text-xs tracking-[0.3em] uppercase font-bold text-gray-400 mb-4 block">OUR PHILOSOPHY</span>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
              Eucalyptus leather and premium fluid curves.
            </h3>
            <p className="text-lg text-gray-500 leading-relaxed font-light mb-8">
              By rethinking modern proportions, we have developed a weightless standard. Using carbon-neutral derivatives, each silhouette is crafted to blend architectural structure with adaptive fluid contours.
            </p>
            
            {/* Craftsmanship Features List */}
            <div className="space-y-6 border-t border-black/5 pt-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-950 flex-shrink-0">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1d1d1f] mb-1">Liquid Proportions</h4>
                  <p className="text-sm text-gray-400 font-light">Every handbag is sculpted to capture natural evening light seamlessly.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-950 flex-shrink-0">
                  <Compass size={18} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#1d1d1f] mb-1">Insured Concierge Delivery</h4>
                  <p className="text-sm text-gray-400 font-light">Insured white-glove delivery straight to your artisan portal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. INNOVATION BENTO GRID ── */}
      <section className="bg-[#fbfbfd] py-24 px-6 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-20">
            <span className="text-xs tracking-[0.3em] uppercase font-bold text-gray-400 mb-4 block">DESIGNED SYSTEM</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1d1d1f]">Designed differently.</h2>
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
                   className="inline-flex rounded-full bg-[#1d1d1f] hover:bg-black text-white px-10 py-4 font-bold tracking-tight shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
