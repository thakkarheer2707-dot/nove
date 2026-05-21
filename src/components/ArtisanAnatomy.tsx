"use client";

import Image from "next/image";
import { ShieldCheck, Cpu, Layers, Award } from "lucide-react";

const DETAILS = [
  {
    id: "strap",
    label: "Hand-stitched Bio-Strap",
    desc: "Eucalyptus fiber material custom-woven for superior weight distribution, natural elasticity, and timeless durability.",
    icon: Award,
  },
  {
    id: "hardware",
    label: "Solid Titanium Hardware",
    desc: "Aerospace-grade lightweight alloy clasp custom-molded to fit the bag's elegant organic contours perfectly.",
    icon: ShieldCheck,
  },
  {
    id: "buckles",
    label: "Laser-Locked Buckles",
    desc: "Ultra-precise interlocking snaps engineered to firmly secure the bag's signature profile even under daily stress.",
    icon: Cpu,
  },
  {
    id: "lining",
    label: "Eucalyptus Silk Lining",
    desc: "Delicate, ultra-soft plant-based interior padding that naturally resists moisture and safeguards your absolute essentials.",
    icon: Layers,
  },
];

export default function ArtisanAnatomy() {
  return (
    <section className="bg-[#1d1d1f] py-24 md:py-32 w-full overflow-hidden text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/40 mb-4 block">
            Precision Engineering
          </span>
          <h2 className="text-3xl md:text-5xl font-serif italic text-white font-light tracking-tight max-w-2xl mx-auto leading-tight">
            Separating the masterpiece from the mundane.
          </h2>
        </div>

        {/* Dynamic Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Main Visual - 5 cols */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[450px] aspect-square md:aspect-[4/3] lg:aspect-square bg-white/[0.02] border border-white/5 rounded-[40px] p-8 md:p-12 flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_75%)] pointer-events-none" />
              
              {/* Luxury ambient shadow */}
              <div className="absolute bottom-[10%] w-[70%] h-[30px] bg-black/40 blur-2xl rounded-full pointer-events-none" />
              
              <div className="relative w-[90%] h-[90%] hover:scale-[1.03] transition-transform duration-700">
                <Image
                  src="/products/Terra/terra_3.png"
                  alt="NOVE Artisan Anatomy"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Details list - 7 cols */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {DETAILS.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.id}
                  className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 p-8 rounded-[32px] transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center border border-white/5">
                      <Icon size={20} className="text-white/80" />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-semibold text-white/30 block mb-1">
                        {detail.id}
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {detail.label}
                      </h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 font-light leading-relaxed mt-4">
                    {detail.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer closing line */}
        <div className="text-center mt-20 md:mt-28">
          <p className="text-lg md:text-2xl font-serif italic text-white/60 font-light max-w-xl mx-auto">
            A unified vision of sustainable luxury.
          </p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent mx-auto mt-8" />
        </div>
      </div>
    </section>
  );
}
