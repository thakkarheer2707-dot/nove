"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Droplets, Layers, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden min-h-screen">
      {/* 1. The Genesis */}
      <section className="relative min-h-[90vh] py-24 flex flex-col items-center justify-center text-center px-6 border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-40">
           <Image 
             src="/products/Terra/HeatherBrown/product_22.png" 
             alt="Origin" 
             fill 
             className="object-contain p-10 md:p-20 grayscale brightness-75 pointer-events-none" 
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-gray-500 font-bold mb-6 block">
            The Genesis
          </span>
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
            A Simple <br/> <span className="font-serif italic font-light text-gray-500">Thought.</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            NOVE started with a simple thought — what if luxury could feel good in every way?
          </p>
        </motion.div>
      </section>

      {/* 2. The Audience */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-xl"
          >
            <span className="text-gray-500 text-[10px] md:text-xs uppercase tracking-widest font-bold block">The Audience</span>
            <h2 className="text-4xl md:text-7xl font-bold leading-[0.9] tracking-tighter">
              For the ones <br/> <span className="text-gray-600 italic font-light">who care.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
              We created NOVE for people who care — people who think before they buy, who value quality over quantity, and believe in luxury with responsibility.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square max-w-[500px] w-full mx-auto rounded-[100px_40px_120px_40px] overflow-hidden bg-white/[0.03] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center p-8 md:p-12 group"
          >
            {/* Subtle grid texture overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative w-[90%] h-[90%] hover:scale-[1.03] transition-transform duration-700">
              <Image 
                src="/products/Ember/Black/product_4.png" 
                alt="Care" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Philosophy (White Section) */}
      <section className="bg-white text-black py-24 px-6 md:px-12 w-full text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto space-y-8"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-gray-400 font-bold block">Philosophy</span>
          <h3 className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.8] mb-6">
            Fashion with <br/> <span className="text-gray-300 italic font-light">intention.</span>
          </h3>
          <p className="text-lg md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            Timeless shoulder bags that you can carry every day, for years to come. Designed to be a seamless part of your daily routine.
          </p>
        </motion.div>
      </section>

      {/* 4. Practical. Elegant. Durable. */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square max-w-[500px] w-full mx-auto rounded-[40px_120px_40px_120px] overflow-hidden bg-white/[0.03] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-center p-8 md:p-12 group"
          >
            {/* Subtle grid texture overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative w-[90%] h-[90%] hover:scale-[1.03] transition-transform duration-700">
              <Image 
                src="/products/Terra/HeatherBrown/product_23.png" 
                alt="Detail" 
                fill 
                className="object-contain" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-xl"
          >
            <h4 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[0.9] text-white">
              Practical. <br/> <span className="text-gray-500 italic font-light">Elegant. Durable.</span>
            </h4>
            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
              Each piece is meticulously designed to be a part of your routine — your workdays, your travels, and your quiet everyday moments.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <Layers size={24} className="text-gray-400 mb-2" />
                <span className="block text-[9px] uppercase tracking-widest text-white/60 font-bold">Multi-Layered</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                <ShieldCheck size={24} className="text-gray-400 mb-2" />
                <span className="block text-[9px] uppercase tracking-widest text-white/60 font-bold">Artisan Craft</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Conscious Living */}
      <section className="relative py-32 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
           <Image 
             src="/products/Aqua/CherryWhite/aq_main.png" 
             alt="Texture" 
             fill 
             className="object-cover grayscale brightness-[0.25] pointer-events-none" 
           />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto space-y-6"
        >
          <Leaf size={40} className="mx-auto text-green-500" />
          <h4 className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.8] text-white">
            Conscious <br/> <span className="text-gray-400">Living.</span>
          </h4>
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Plant-based eucalyptus leather — a thoughtful material innovation that utilizes significantly less water and fewer processing chemicals.
          </p>
        </motion.div>
      </section>

      {/* 6. The Human Layer / Founder */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative aspect-[4/5] max-w-[400px] w-full mx-auto rounded-[120px_40px_120px_40px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
             <Image 
               src="/founder.png" 
               alt="Founder Heer" 
               fill 
               className="object-cover grayscale hover:scale-105 transition-transform duration-1000" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-8 max-w-2xl"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-gray-500 font-bold block">The Human Layer</span>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[0.9]">
              Born from a <br/> <span className="text-gray-400 italic font-light">personal quest.</span>
            </h3>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                &ldquo;NOVE didn&rsquo;t start in a corporate boardroom. It started with a simple frustration — why was sustainable fashion so often a compromise on style? I wanted to create something that didn&rsquo;t just replace traditional leather, but actually surpassed it in every sensory dimension.&rdquo;
              </p>
              <p className="text-base md:text-lg text-white font-medium italic">— Heer, Founder</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Design Less. Design Better. */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[40px] overflow-hidden bg-white/[0.02] border border-white/5 p-8 md:p-16 text-center"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
             <Image src="/products/Aero/Black/ae_main.png" alt="Core" fill className="object-contain p-10 grayscale" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
             <h5 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[0.9] text-white">
               Design less. <br/> <span className="text-gray-400 italic font-light">Design better.</span>
             </h5>
             <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
               Being conscious goes far beyond raw materials. It is about crafting products with a clear, functional purpose. Mindful buying begins with pieces that are truly engineered to endure.
             </p>
          </div>
        </motion.div>
      </section>

      {/* 8. Call To Action / Closing */}
      <section className="relative py-32 flex flex-col items-center justify-center text-center px-6 bg-[#030303] border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="space-y-16 w-full max-w-5xl"
        >
          <div className="space-y-6">
             <Heart size={36} className="mx-auto text-white/60 animate-pulse" />
             <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight max-w-3xl mx-auto">
               Luxury should look good — <br /> and <span className="italic font-serif font-light text-gray-500">feel right</span> too.
             </h2>
          </div>

          <div className="space-y-8">
            <div>
               <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none opacity-20 text-white">NOVE</h3>
               <p className="text-gray-500 text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium mt-2">Designed to last. Made responsibly.</p>
            </div>

            <Link
              href="/store"
              className="inline-flex items-center gap-4 bg-white text-black hover:bg-gray-150 px-12 py-5 rounded-full text-lg font-bold tracking-tight shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Enter the Store</span>
              <ArrowRight size={20} className="hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
