"use client";

import { motion } from "framer-motion";

export default function ProductStory({ productId }: { productId: string }) {
  if (productId === "ember") {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full mt-24 border-t border-black/5 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold">The Heritage</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1d1d1f] font-semibold tracking-tight">
              Ember by NOVE — The Story
            </h2>
            <div className="w-12 h-[1px] bg-black mx-auto mt-6"></div>
          </div>

          <div className="space-y-8 text-lg font-light leading-relaxed text-[#424245] max-w-2xl mx-auto">
            <p className="font-semibold text-black text-xl tracking-tight leading-snug">
              Ember was born from fire. <br />
              <span className="text-gray-400 font-light text-base block mt-2">Not the loud kind — but the quiet, powerful glow that never fades.</span>
            </p>

            <p>
              Inspired by the element of fire, Ember by NOVE represents strength, ambition, and inner confidence. It’s designed for those who carry determination within them — the ones building, creating, and moving forward every day.
            </p>

            <p>
              Just like an ember, small yet powerful, this piece is minimal yet bold. <br />
              Its structured silhouette reflects confidence. <br />
              Its timeless design reflects resilience. <br />
              Its purpose reflects conscious luxury.
            </p>

            <p>
              Crafted from eucalyptus-based vegan leather, Ember stands for a new kind of power — one that doesn’t harm the planet but protects it. Because true strength is not just about standing out — it’s about standing for something.
            </p>

            <div className="py-8 border-y border-black/5 my-10 max-w-lg mx-auto">
              <p className="font-serif italic text-xl text-black leading-relaxed">
                "Ember is for the ambitious mind. <br />
                For those who move with purpose. <br />
                For those who carry quiet confidence wherever they go."
              </p>
            </div>

            <p className="font-medium text-black">
              Because at NOVE, fire isn’t about destruction — <br />
              <span className="font-serif italic text-[#990f02] text-xl mt-2 block">It’s about creation.</span>
            </p>
          </div>

          <div className="pt-8">
            <span className="text-sm font-serif font-bold tracking-widest uppercase text-[#1d1d1f]">
              Ember by NOVE
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-2 font-bold">
              Inspired by fire. Designed to last.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (productId === "aqua") {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full mt-24 border-t border-black/5 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold">The Heritage</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1d1d1f] font-semibold tracking-tight">
              Aqua by NOVE — The Story
            </h2>
            <div className="w-12 h-[1px] bg-black mx-auto mt-6"></div>
          </div>

          <div className="space-y-8 text-lg font-light leading-relaxed text-[#424245] max-w-2xl mx-auto">
            <p className="font-semibold text-black text-xl tracking-tight leading-snug">
              Aqua wasn’t just designed. It was inspired. <br />
              <span className="text-gray-400 font-light text-base block mt-2">It began with water — calm, powerful, and endlessly adaptable. Just like the modern woman. Always moving, always evolving, yet grounded in purpose.</span>
            </p>

            <p>
              Aqua by NOVE represents flow. <br />
              Flow between work and life. <br />
              Flow between style and sustainability. <br />
              Flow between luxury and responsibility.
            </p>

            <p>
              Crafted from eucalyptus-based vegan leather, Aqua carries more than essentials — it carries a mindset. A mindset that fashion can be elegant without harming the planet. That luxury can be conscious. That style can be timeless.
            </p>

            <p>
              Its clean silhouette mirrors still water. <br />
              Its durability reflects the strength of oceans. <br />
              Its minimal design captures the beauty of simplicity.
            </p>

            <div className="py-8 border-y border-black/5 my-10 max-w-lg mx-auto">
              <p className="font-serif italic text-xl text-black leading-relaxed">
                "Aqua is for the conscious mind. <br />
                For those who choose thoughtfully. <br />
                For those who believe less harm, more style."
              </p>
            </div>

            <p className="font-medium text-black">
              Because at NOVE, we don’t just design bags — <br />
              <span className="font-serif italic text-[#0066cc] text-xl mt-2 block">We design pieces that flow with your journey.</span>
            </p>
          </div>

          <div className="pt-8">
            <span className="text-sm font-serif font-bold tracking-widest uppercase text-[#1d1d1f]">
              Aqua by NOVE
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-2 font-bold">
              Inspired by water. Designed to last.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (productId === "aero") {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full mt-24 border-t border-black/5 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold">The Heritage</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1d1d1f] font-semibold tracking-tight">
              Aero by NOVE — The Story
            </h2>
            <div className="w-12 h-[1px] bg-black mx-auto mt-6"></div>
          </div>

          <div className="space-y-8 text-lg font-light leading-relaxed text-[#424245] max-w-2xl mx-auto">
            <p className="font-semibold text-black text-xl tracking-tight leading-snug">
              Aero was inspired by air — <br />
              <span className="text-gray-400 font-light text-base block mt-2">light, effortless, and always in motion.</span>
            </p>

            <p>
              Designed for those who move freely through their day, Aero by NOVE represents ease, clarity, and quiet confidence. It’s for the modern individual who values simplicity, but never compromises on style.
            </p>

            <p>
              Light in feel, yet strong in purpose — just like air itself. <br />
              Its sleek silhouette reflects effortless movement. <br />
              Its minimal design reflects clarity. <br />
              Its durability reflects unseen strength.
            </p>

            <p>
              Crafted from eucalyptus-based vegan leather, Aero carries more than essentials — it carries a conscious choice. A belief that fashion can be light on the planet while remaining timeless and luxurious.
            </p>

            <div className="py-8 border-y border-black/5 my-10 max-w-lg mx-auto">
              <p className="font-serif italic text-xl text-black leading-relaxed">
                "Aero is for the free-spirited mind. <br />
                For those who move with intention. <br />
                For those who believe in effortless elegance."
              </p>
            </div>

            <p className="font-medium text-black">
              Because at NOVE, air isn’t just about movement — <br />
              <span className="font-serif italic text-[#5c6f84] text-xl mt-2 block">It’s about freedom.</span>
            </p>
          </div>

          <div className="pt-8">
            <span className="text-sm font-serif font-bold tracking-widest uppercase text-[#1d1d1f]">
              Aero by NOVE
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-2 font-bold">
              Inspired by air. Designed to last.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (productId === "terra") {
    return (
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full mt-24 border-t border-black/5 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gray-400 font-bold">The Heritage</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1d1d1f] font-semibold tracking-tight">
              Terra by NOVE — The Story
            </h2>
            <div className="w-12 h-[1px] bg-black mx-auto mt-6"></div>
          </div>

          <div className="space-y-8 text-lg font-light leading-relaxed text-[#424245] max-w-2xl mx-auto">
            <p className="font-semibold text-black text-xl tracking-tight leading-snug">
              Terra was inspired by earth — <br />
              <span className="text-gray-400 font-light text-base block mt-2">grounded, timeless, and quietly powerful.</span>
            </p>

            <p>
              Rooted in nature, Terra by NOVE represents stability, strength, and mindful living. It’s designed for those who move with purpose, who stay grounded while reaching for more.
            </p>

            <p>
              Just like the earth, Terra is dependable and enduring. <br />
              Its structured silhouette reflects stability. <br />
              Its minimal design reflects timeless elegance. <br />
              Its durability reflects nature’s quiet strength.
            </p>

            <p>
              Crafted from eucalyptus-based vegan leather, Terra stands for conscious luxury — where style meets sustainability, and fashion respects the planet it comes from.
            </p>

            <div className="py-8 border-y border-black/5 my-10 max-w-lg mx-auto">
              <p className="font-serif italic text-xl text-black leading-relaxed">
                "Terra is for the grounded mind. <br />
                For those who choose thoughtfully. <br />
                For those who believe true luxury is built to last."
              </p>
            </div>

            <p className="font-medium text-black">
              Because at NOVE, earth isn’t just inspiration — <br />
              <span className="font-serif italic text-[#8c6239] text-xl mt-2 block">It’s our responsibility.</span>
            </p>
          </div>

          <div className="pt-8">
            <span className="text-sm font-serif font-bold tracking-widest uppercase text-[#1d1d1f]">
              Terra by NOVE
            </span>
            <p className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mt-2 font-bold">
              Inspired by earth. Designed to last.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}
