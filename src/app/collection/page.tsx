"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Droplets, Wind, Leaf, Recycle, ShieldCheck, Heart, Globe } from "lucide-react";
import ArtisanAnatomy from "@/components/ArtisanAnatomy";

const COLLECTIONS = [
  {
    id: "ember",
    name: "Ember by NOVE",
    description: [
      "Ember was born from fire.\nNot the loud kind — but the quiet, powerful glow that never fades.",
      "Inspired by the element of fire, Ember by NOVE represents strength, ambition, and inner confidence. It’s designed for those who carry determination within them — the ones building, creating, and moving forward every day.",
      "Just like an ember, small yet powerful, this piece is minimal yet bold.\nIts structured silhouette reflects confidence.\nIts timeless design reflects resilience.\nIts purpose reflects conscious luxury.",
      "Crafted from eucalyptus-based vegan leather, Ember stands for a new kind of power — one that doesn’t harm the planet but protects it. Because true strength is not just about standing out — it’s about standing for something.",
      "Ember is for the ambitious mind.\nFor those who move with purpose.\nFor those who carry quiet confidence wherever they go.",
      "Because at NOVE, fire isn’t about destruction —\nIt’s about creation.",
      "Ember by NOVE\nInspired by fire. Designed to last."
    ],
    icon: Flame,
    image: "/products/black.jpeg",
    color: "bg-[#f4f5f7]",
    link: "/store?collection=Ember+Series"
  },
  {
    id: "aqua",
    name: "Aqua by NOVE",
    description: [
      "Aqua wasn’t just designed. It was inspired.",
      "It began with water — calm, powerful, and endlessly adaptable. Just like the modern woman. Always moving, always evolving, yet grounded in purpose.",
      "Aqua by NOVE represents flow.\nFlow between work and life.\nFlow between style and sustainability.\nFlow between luxury and responsibility.",
      "Crafted from eucalyptus-based vegan leather, Aqua carries more than essentials — it carries a mindset. A mindset that fashion can be elegant without harming the planet. That luxury can be conscious. That style can be timeless.",
      "Its clean silhouette mirrors still water.\nIts durability reflects the strength of oceans.\nIts minimal design captures the beauty of simplicity.",
      "Aqua is for the conscious mind.\nFor those who choose thoughtfully.\nFor those who believe less harm, more style.",
      "Because at NOVE, we don’t just design bags —\nWe design pieces that flow with your journey.",
      "Aqua by NOVE\nInspired by water. Designed to last."
    ],
    icon: Droplets,
    image: "/products/Aqua/aqua_4.jpeg",
    color: "bg-blue-50",
    link: "/store?collection=Aqua+Series"
  },
  {
    id: "aero",
    name: "Aero by NOVE",
    description: [
      "Aero was inspired by air — light, effortless, and always in motion.",
      "Designed for those who move freely through their day, Aero by NOVE represents ease, clarity, and quiet confidence. It’s for the modern individual who values simplicity, but never compromises on style.",
      "Light in feel, yet strong in purpose — just like air itself.\nIts sleek silhouette reflects effortless movement.\nIts minimal design reflects clarity.\nIts durability reflects unseen strength.",
      "Crafted from eucalyptus-based vegan leather, Aero carries more than essentials — it carries a conscious choice. A belief that fashion can be light on the planet while remaining timeless and luxurious.",
      "Aero is for the free-spirited mind.\nFor those who move with intention.\nFor those who believe in effortless elegance.",
      "Because at NOVE, air isn’t just about movement —\nIt’s about freedom.",
      "Aero by NOVE\nInspired by air. Designed to last."
    ],
    icon: Wind,
    image: "/products/Aero/ae_v1.png",
    color: "bg-gray-100",
    link: "/store?collection=Aero+Series"
  },
  {
    id: "terra",
    name: "Terra by NOVE",
    description: [
      "Terra was inspired by earth — grounded, timeless, and quietly powerful.",
      "Rooted in nature, Terra by NOVE represents stability, strength, and mindful living. It’s designed for those who move with purpose, who stay grounded while reaching for more.",
      "Just like the earth, Terra is dependable and enduring.\nIts structured silhouette reflects stability.\nIts minimal design reflects timeless elegance.\nIts durability reflects nature’s quiet strength.",
      "Crafted from eucalyptus-based vegan leather, Terra stands for conscious luxury — where style meets sustainability, and fashion respects the planet it comes from.",
      "Terra is for the grounded mind.\nFor those who choose thoughtfully.\nFor those who believe true luxury is built to last.",
      "Because at NOVE, earth isn’t just inspiration —\nIt’s our responsibility.",
      "Terra by NOVE\nInspired by earth. Designed to last."
    ],
    icon: Globe,
    image: "/products/b1.jpeg",
    color: "bg-[#f4f0ec]",
    link: "/store?collection=Terra+Series"
  }
];

const SUSTAINABILITY_STATS = [
  { icon: "💧", label: "Water Savings", value: "85–95%", desc: "Uses significantly less water than animal leather." },
  { icon: "🧴", label: "Plastic Reduction", value: "30–80%", desc: "Drastically reduces dependency on synthetic plastics." },
  { icon: "🌍", label: "Carbon Footprint", value: "Lower", desc: "Mindfully produced with a focus on planet Earth." },
  { icon: "🌱", label: "Plant-based", value: "Renewable", desc: "Crafted from fast-growing eucalyptus derivatives." },
  { icon: "🐄", label: "Cruelty Free", value: "No Animals", desc: "Ethical production without any animal products." },
  { icon: "♻️", label: "Sustainability", value: "Superior", desc: "More sustainable than traditional PU leather." }
];

export default function CollectionPage() {
  return (
    <div className="bg-[#fbfbfd] min-h-screen pt-24 pb-32">
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#1d1d1f] mb-8">Series.</h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
            NOVE started with a simple thought — what if luxury could feel good in every way? Not just in how it looks, but in how it’s made and the impact it leaves behind.
          </p>
        </motion.div>
      </section>

      {/* Eucalyptus Leather Feature - Eye Catching */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-32">
        <div className="bg-white rounded-[60px] p-12 md:p-24 shadow-xl shadow-black/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-1000">
             <Leaf size={400} className="text-green-600" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest mb-8">
                <Leaf size={14} /> Material Innovation
              </span>
              <h2 className="text-5xl md:text-7xl font-bold text-[#1d1d1f] mb-8">Eucalyptus <br/><span className="text-green-600 font-serif italic font-light">Leather</span></h2>
              <p className="text-xl text-[#424245] leading-relaxed font-light mb-12">
                We believe fashion should move with intention. Instead of chasing trends, we focus on creating pieces that are practical, elegant, and durable — something that becomes a part of your everyday moments.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Design</p>
                    <p className="text-[#1d1d1f] font-medium">Timeless & Minimal</p>
                 </div>
                 <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Impact</p>
                    <p className="text-[#1d1d1f] font-medium">Consciously Made</p>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {SUSTAINABILITY_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#fbfbfd] p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-gray-100 hover:border-green-200 transition-colors"
                >
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0">
                    <span className="text-3xl md:mb-4 block shrink-0">{stat.icon}</span>
                    <div>
                      <p className="text-xl md:text-2xl font-bold text-[#1d1d1f] mb-0.5 md:mb-1">{stat.value}</p>
                      <p className="text-[9px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 md:mb-3">{stat.label}</p>
                    </div>
                  </div>
                  <p className="hidden md:block text-[10px] text-gray-500 font-light leading-snug">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ArtisanAnatomy />

      <section className="px-6 md:px-12 max-w-7xl mx-auto space-y-32">
        {COLLECTIONS.map((collection, idx) => (
          <motion.div 
            key={collection.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: idx * 0.1 }}
            className={`relative rounded-[40px] md:rounded-[48px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 overflow-hidden ${collection.color}`}
          >
             {/* Text Content */}
             <div className="flex-1 z-10">
                <div className="flex items-center space-x-3 mb-6">
                   <collection.icon size={24} className="text-[#1d1d1f]" />
                   <span className="text-sm font-bold uppercase tracking-widest text-[#1d1d1f]">Featured Series</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] mb-8">{collection.name}</h2>
                <div className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-8 md:mb-10 max-w-xl space-y-4 md:space-y-6">
                   {collection.description.map((paragraph, i) => (
                     <p key={i} className="whitespace-pre-line text-base md:text-xl">{paragraph}</p>
                   ))}
                </div>
                <Link 
                  href={collection.link}
                  className="inline-flex items-center gap-3 bg-[#1d1d1f] text-white px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform group"
                >
                   Explore Series
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>

             {/* Image */}
             <div className="flex-1 relative aspect-square w-full scale-110">
                <motion.div 
                   whileHover={{ scale: 1.05 }}
                   transition={{ duration: 1 }}
                   className="relative w-full h-full"
                >
                   <Image 
                    src={collection.image} 
                    alt={collection.name} 
                    fill 
                    className="object-contain product-image mix-blend-multiply"
                   />
                </motion.div>
             </div>
          </motion.div>
        ))}
      </section>

      {/* Footer Closing statement on Collection page */}
      <section className="pt-32 pb-12 px-6 text-center max-w-4xl mx-auto">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
           <h3 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-8">NOVE is for the conscious mind.</h3>
           <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
             For those who want their style to be effortless, timeless, and meaningful. Because we believe luxury should not only look good — it should feel right too.
           </p>
           <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-widest uppercase mb-2">NOVE</span>
              <p className="text-sm text-gray-400">Designed to last. Made responsibly.</p>
           </div>
        </motion.div>
      </section>
    </div>
  );
}
