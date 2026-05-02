"use client";

import { motion, useScroll, useTransform, MotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Sparkles, Droplets, Globe, ShieldCheck, Heart, Search, Scan, Layers } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const ZipperReveal = ({ onComplete }: { onComplete: () => void }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-[#080808] opacity-40 mix-blend-overlay" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-leather.png')" }} />

      {/* Top Leather Panel */}
      <motion.div 
        initial={{ y: 0, rotateX: 0 }}
        animate={isAnimating ? { y: "-100%", rotateX: -15, scale: 1.1 } : { y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => onComplete()}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-20 origin-bottom border-b border-yellow-600/20"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-[-6px] left-0 w-full h-10 flex items-end px-2">
           {Array.from({ length: 30 }).map((_, i) => (
             <motion.div 
               key={i}
               animate={isAnimating ? { y: -30, opacity: 0, rotate: 15 } : { y: 0, opacity: 1 }}
               transition={{ duration: 0.5, delay: 1.2 + (i * 0.04) }}
               className="w-[3.33%] h-6 bg-gradient-to-t from-yellow-700 via-yellow-500 to-yellow-200 rounded-[2px] border-x border-black/40 shadow-[0_2px_5px_rgba(0,0,0,0.4)]"
             />
           ))}
        </div>
      </motion.div>

      {/* Bottom Leather Panel */}
      <motion.div 
        initial={{ y: 0, rotateX: 0 }}
        animate={isAnimating ? { y: "100%", rotateX: 15, scale: 1.1 } : { y: 0, rotateX: 0, scale: 1 }}
        transition={{ duration: 2.5, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] z-20 origin-top border-t border-yellow-600/20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute top-[-6px] left-0 w-full h-10 flex items-start px-2">
           {Array.from({ length: 30 }).map((_, i) => (
             <motion.div 
               key={i}
               animate={isAnimating ? { y: 30, opacity: 0, rotate: -15 } : { y: 0, opacity: 1 }}
               transition={{ duration: 0.5, delay: 1.2 + (i * 0.04) }}
               className="w-[3.33%] h-6 bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-200 rounded-[2px] border-x border-black/40 shadow-[0_-2px_5px_rgba(0,0,0,0.4)]"
             />
           ))}
        </div>
      </motion.div>

      {/* Zipper Puller - Mobile Optimized Travel */}
      <motion.div
        initial={{ x: "-20vw", y: "-50%", opacity: 0 }}
        animate={isAnimating ? { x: "120vw", opacity: 1 } : { x: "0vw", opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.8, ease: [0.45, 0, 0.55, 1] }}
        className="absolute top-1/2 left-0 z-40 scale-75 md:scale-100"
      >
        <div className="relative">
           <motion.div 
             animate={{ 
               rotate: isAnimating ? [0, -4, 4, 0] : 0,
               y: isAnimating ? [0, -2, 2, 0] : 0 
             }}
             transition={{ duration: 0.1, repeat: isAnimating ? 25 : 0 }}
             className="w-20 h-32 md:w-24 md:h-36 bg-gradient-to-br from-yellow-100 via-yellow-500 to-yellow-800 rounded-2xl border-2 border-yellow-300 shadow-[0_0_50px_rgba(234,179,8,0.4)] flex flex-col items-center justify-between p-4 md:p-5"
           >
              <div className="w-2 h-12 md:h-16 bg-black/30 rounded-full" />
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-4 border-black/20 flex items-center justify-center">
                 <div className="w-2 h-2 bg-yellow-900/40 rounded-full" />
              </div>
              <span className="text-[10px] md:text-[12px] font-black tracking-tighter text-yellow-950/80 uppercase">NOVE</span>
           </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isAnimating ? { opacity: [0, 0.5, 0], scale: [0.8, 1, 1.2] } : {}}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute z-10 pointer-events-none"
      >
        <h2 className="text-[15vw] md:text-[12vw] font-bold tracking-[0.3em] md:tracking-[0.5em] text-white/5 uppercase italic font-serif text-center px-4">
          Crafted
        </h2>
      </motion.div>
    </motion.div>
  );
};

const SectionWrapper = ({ 
  children, 
  className = "",
  height = "h-[150vh]"
}: { 
  children: (progress: MotionValue<number>) => React.ReactNode; 
  className?: string;
  height?: string;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={ref} className={`relative ${height} w-full ${className}`}>
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </section>
  );
};

const SplitText = ({ text, className = "" }: { text: string; className?: string }) => {
  return (
    <div className={`flex flex-wrap justify-center overflow-hidden ${className}`}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mr-[0.35em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const Chapter1 = () => (
  <SectionWrapper height="h-[180vh] md:h-[200vh]">
    {(progress) => {
      const scale = useTransform(progress, [0.4, 0.6], [1, 15]);
      const opacity = useTransform(progress, [0.5, 0.6], [1, 0]);
      const bgScale = useTransform(progress, [0.3, 0.5, 0.8], [0.8, 1.1, 1.3]);
      const bgOpacity = useTransform(progress, [0.3, 0.5, 0.8], [0, 0.6, 0]);

      return (
        <>
          <motion.div 
            style={{ scale, opacity }}
            className="z-20 text-center px-6 max-w-6xl"
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.6em" }}
              className="text-[8px] md:text-[10px] uppercase text-gray-500 font-bold mb-6 md:mb-8 block"
            >
              The Genesis
            </motion.span>
            <h1 className="text-4xl md:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-8 md:mb-12 text-white">
              A Simple <br/> <span className="font-serif italic font-light text-gray-500">Thought.</span>
            </h1>
            <p className="text-base md:text-2xl text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
              NOVE started with a simple thought — what if luxury could feel good in every way?
            </p>
          </motion.div>

          <motion.div 
            style={{ scale: bgScale, opacity: bgOpacity }}
            className="absolute inset-0 z-10"
          >
             <Image src="/products/Terra/HeatherBrown/product_22.png" alt="Origin" fill className="object-contain p-10 md:p-20 grayscale brightness-75" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
          </motion.div>
        </>
      );
    }}
  </SectionWrapper>
);

const Chapter2 = () => (
  <SectionWrapper height="h-[180vh] md:h-[200vh]">
    {(progress) => {
      const y1 = useTransform(progress, [0.3, 0.5], [50, 0]);
      const y2 = useTransform(progress, [0.4, 0.6], [80, 0]);
      const opacity = useTransform(progress, [0.4, 0.5], [0, 1]);

      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center max-w-7xl mx-auto w-full px-6 md:px-8 text-white">
          <div className="space-y-8 md:y-12">
            <motion.div style={{ y: y1, opacity }} className="space-y-4 text-center lg:text-left">
              <span className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">The Audience</span>
              <h2 className="text-4xl md:text-8xl font-bold leading-[0.85] tracking-tighter">
                For the ones <br/> <span className="text-gray-600 italic font-light">who care.</span>
              </h2>
            </motion.div>
            <motion.p style={{ y: y2, opacity }} className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed text-center lg:text-left">
              We created NOVE for people who care — people who think before they buy, who value quality over quantity.
            </motion.p>
          </div>

          <div className="relative group px-10 md:px-0">
             <motion.div 
               style={{ scale: useTransform(progress, [0.4, 0.6], [0.8, 1]) }}
               className="relative aspect-square rounded-[40px] md:rounded-[60px] overflow-hidden glass-panel border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)]"
             >
                <Image src="/products/Ember/Black/product_4.png" alt="Care" fill className="object-contain p-8 md:p-16 transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
             </motion.div>
          </div>
        </div>
      );
    }}
  </SectionWrapper>
);

const Chapter3 = () => (
  <SectionWrapper height="h-[150vh] md:h-[200vh]" className="bg-white text-black">
    {(progress) => {
      const scale = useTransform(progress, [0.35, 0.5], [0.9, 1]);
      const clip = useTransform(progress, [0.35, 0.5], ["inset(10% 10% 10% 10% round 40px)", "inset(0% 0% 0% 0% round 0px)"]);

      return (
        <motion.div 
          style={{ clipPath: clip }}
          className="w-full h-full flex flex-col items-center justify-center text-center px-6 md:px-8 bg-white"
        >
          <motion.div style={{ scale }} className="space-y-8 md:space-y-12 max-w-5xl">
             <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold block">Philosophy</span>
             <h3 className="text-4xl md:text-[9rem] font-bold tracking-tighter mb-6 md:mb-10 leading-[0.8]">
               Fashion with <br/> <span className="text-gray-300 italic font-light">intention.</span>
             </h3>
             <p className="text-lg md:text-3xl text-gray-600 font-light leading-relaxed max-w-4xl mx-auto">
               Timeless shoulder bags that you can carry every day, for years to come. Designed to be a part of your routine.
             </p>
          </motion.div>
        </motion.div>
      );
    }}
  </SectionWrapper>
);

const Chapter4 = () => (
  <SectionWrapper height="h-[200vh] md:h-[250vh]">
    {(progress) => {
      const scale = useTransform(progress, [0.4, 0.6], [1.1, 1]);
      const opacity = useTransform(progress, [0.4, 0.5, 0.6], [0, 1, 0]);
      const spotlightX = useTransform(progress, [0.4, 0.6], ["-50%", "150%"]);

      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 z-0 bg-[#0a0a0a]" />
          
          <motion.div style={{ opacity }} className="relative z-10 w-full max-w-6xl px-6 md:px-8 flex flex-col lg:flex-row items-center gap-12 md:gap-20">
             <div className="relative w-full lg:w-1/2 aspect-square px-4 md:px-0">
                <motion.div style={{ scale }} className="relative w-full h-full rounded-[30px] md:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                   <Image src="/products/Terra/HeatherBrown/product_23.png" alt="Detail" fill className="object-contain p-4 md:p-8" />
                   <motion.div 
                     style={{ left: spotlightX }}
                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[60%] skew-x-12 blur-3xl pointer-events-none" 
                   />
                </motion.div>
             </div>

             <div className="w-full lg:w-1/2 space-y-8 md:space-y-10 text-center lg:text-left">
                <h4 className="text-3xl md:text-7xl font-bold tracking-tighter text-white leading-[0.9]">Practical. <br/> <span className="text-gray-500 italic font-light">Elegant. Durable.</span></h4>
                <p className="text-base md:text-xl text-gray-400 font-light leading-relaxed">
                  Each piece is designed to be a part of your routine — your workdays, your travels, and your everyday moments.
                </p>
                <div className="grid grid-cols-2 gap-6 md:gap-8 pt-4">
                   <div className="space-y-2">
                      <Layers size={20} className="text-gray-500 mx-auto lg:mx-0" />
                      <span className="block text-[10px] uppercase tracking-widest text-white font-bold">Multi-Layered</span>
                   </div>
                   <div className="space-y-2">
                      <ShieldCheck size={20} className="text-gray-500 mx-auto lg:mx-0" />
                      <span className="block text-[10px] uppercase tracking-widest text-white font-bold">Artisan Craft</span>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>
      );
    }}
  </SectionWrapper>
);

const Chapter5 = () => (
  <SectionWrapper height="h-[200vh] md:h-[250vh]">
    {(progress) => {
      const zoom = useTransform(progress, [0.3, 0.7], [1, 2.5]);
      const opacity = useTransform(progress, [0.4, 0.5, 0.6], [0, 1, 0]);

      return (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div style={{ scale: zoom, opacity }} className="absolute inset-0">
             <Image src="/products/Aqua/CherryWhite/aq_main.png" alt="Texture" fill className="object-cover grayscale brightness-50" />
          </motion.div>
          
          <div className="relative z-10 text-center px-6 md:px-8 max-w-4xl text-white">
            <motion.div style={{ opacity: useTransform(progress, [0.45, 0.55], [0, 1]) }} className="space-y-8 md:space-y-12">
              <Leaf size={48} className="mx-auto text-green-500" />
              <h4 className="text-4xl md:text-[8rem] font-bold tracking-tighter leading-[0.8] mb-6 md:mb-8">Conscious <br/> <span className="text-gray-400">Living.</span></h4>
              <p className="text-lg md:text-2xl text-gray-300 font-light leading-relaxed">
                Plant-based eucalyptus leather — a thoughtful alternative that uses less water and fewer chemicals.
              </p>
            </motion.div>
          </div>
        </div>
      );
    }}
  </SectionWrapper>
);

const ChapterFounder = () => (
  <SectionWrapper height="h-[150vh] md:h-[180vh]" className="bg-[#0a0a0a]">
    {(progress) => {
      const opacity = useTransform(progress, [0.4, 0.5, 0.6], [0, 1, 0]);
      const y = useTransform(progress, [0.4, 0.5, 0.6], [50, 0, -50]);
      
      return (
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-white flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <motion.div style={{ opacity, y }} className="w-full md:w-2/5 aspect-[4/5] relative rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 shadow-2xl">
             <Image src="/founder.png" alt="Founder" fill className="object-cover grayscale hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
          <motion.div style={{ opacity, y }} className="w-full md:w-3/5 space-y-8 md:space-y-12 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold block">The Human Layer</span>
            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9]">Born from a <br/> <span className="text-gray-400 italic font-light">personal quest.</span></h3>
            <div className="space-y-6">
              <p className="text-lg md:text-2xl text-gray-400 font-light leading-relaxed">
                "NOVE didn’t start in a boardroom. It started with a frustration — why was sustainable fashion so often a compromise on style? I wanted to create something that didn't just 'replace' leather, but surpassed it in every sensory dimension."
              </p>
              <p className="text-base md:text-xl text-white font-medium italic">— Heer, Founder</p>
            </div>
          </motion.div>
        </div>
      );
    }}
  </SectionWrapper>
);

const Chapter6 = () => (
  <SectionWrapper height="h-[150vh] md:h-[200vh]">
    {(progress) => {
      const rotate = useTransform(progress, [0.4, 0.6], [-3, 3]);
      const y = useTransform(progress, [0.4, 0.6], [50, -50]);

      return (
        <div className="w-full h-full flex items-center justify-center px-6 md:px-8">
          <motion.div
            style={{ rotate, y }}
            className="relative w-full max-w-6xl aspect-[4/3] md:aspect-[16/9] rounded-[40px] md:rounded-[60px] overflow-hidden bg-white shadow-2xl"
          >
             <Image src="/products/Aero/Black/ae_main.png" alt="Core" fill className="object-contain p-10 md:p-20 opacity-20 grayscale" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12 space-y-6 md:space-y-10">
                <h5 className="text-black text-4xl md:text-8xl font-bold tracking-tighter leading-[0.8]">Design less. <br/> <span className="text-gray-400 italic font-light">Design better.</span></h5>
                <p className="text-sm md:text-2xl text-gray-600 font-light max-w-3xl leading-relaxed">
                  Being conscious goes beyond materials. It’s about products with purpose. Mindful buying starts with pieces that truly last.
                </p>
             </div>
          </motion.div>
        </div>
      );
    }}
  </SectionWrapper>
);

const Chapter7 = () => (
  <SectionWrapper height="h-[120vh] md:h-[150vh]">
    {(progress) => (
      <div className="max-w-5xl mx-auto px-6 md:px-8 text-center text-white">
        <SplitText 
          text="NOVE is for the conscious mind — for people who believe small choices can make a big difference." 
          className="text-2xl md:text-5xl font-light leading-relaxed mb-8 md:mb-12"
        />
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-gray-500 uppercase tracking-[0.4em] text-[10px] font-bold"
        >
          Effortless. Timeless. Meaningful.
        </motion.p>
      </div>
    )}
  </SectionWrapper>
);

const Chapter8 = () => (
  <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 md:px-8 pt-20 pb-40 bg-[#050505]">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5 }}
      className="space-y-20 md:space-y-32 w-full max-w-6xl text-white"
    >
      <div className="space-y-8 md:space-y-12">
         <Heart size={48} className="mx-auto text-white animate-pulse" />
         <h2 className="text-4xl md:text-8xl font-bold tracking-tighter leading-tight max-w-5xl mx-auto">
           Luxury should look good — <br className="hidden md:block" /> and <span className="italic font-serif font-light text-gray-500">feel right</span> too.
         </h2>
      </div>

      <div className="space-y-12 md:space-y-16">
        <div className="space-y-2 md:space-y-4">
           <h3 className="text-7xl md:text-[15rem] font-bold tracking-tighter leading-none opacity-20">NOVE</h3>
           <p className="text-gray-500 text-xs md:text-xl uppercase tracking-[0.5em] md:tracking-[0.8em] font-medium">Designed to last. Made responsibly.</p>
        </div>

        <Link
          href="/store"
          className="group relative inline-flex items-center gap-6 md:gap-10 bg-white text-black px-10 py-5 md:px-16 md:py-8 rounded-full text-xl md:text-2xl font-bold hover:scale-105 transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)] active:scale-95 overflow-hidden"
        >
          <span className="relative z-10">Enter the Store</span>
          <ArrowRight size={24} className="relative z-10 group-hover:translate-x-4 transition-transform" />
          <div className="absolute inset-0 bg-gray-100 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-700" />
        </Link>
      </div>
    </motion.div>
  </section>
);

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="bg-[#050505] selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {!isLoaded && <ZipperReveal key="zipper" onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <Chapter1 />
        <Chapter2 />
        <Chapter3 />
        <Chapter4 />
        <Chapter5 />
        <ChapterFounder />
        <Chapter6 />
        <Chapter7 />
        <Chapter8 />
      </motion.div>
    </main>
  );
}
