"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-white text-[#1a1a1a] selection:bg-[#a84832]/15 selection:text-[#a84832] min-h-screen pt-[29px]">
      {/* ══ 1. HERO SECTION (Mir Kash Exact Structure) ══ */}
      <section className="relative w-full h-[70vh] md:h-[82vh] min-h-[480px] bg-[#1a1a1a] overflow-hidden flex items-end">
        <Image
          src="/Banners/newban2.jpeg"
          alt="NOVA Story"
          fill
          priority
          className="object-cover object-center brightness-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/30 pointer-events-none" />

        <div className="relative max-w-[1500px] w-full mx-auto px-6 sm:px-12 pb-14 sm:pb-20 z-10 text-white text-center sm:text-left">
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium text-[#f0ded9] mb-3">
            OUR STORY
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal tracking-wide max-w-3xl leading-tight text-white">
            A love letter to dreamers &amp; changemakers.
          </h1>
        </div>
      </section>

      {/* ══ 2. LETTER FROM FOUNDER (Mir Kash Exact Format) ══ */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 max-w-[820px] mx-auto w-full text-center">
        <div className="space-y-12">
          {/* Rust Red Eyebrow */}
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium text-[#a84832]">
            FROM THE FOUNDER
          </p>

          {/* Opening Display Statement */}
          <p className="text-2xl sm:text-3xl md:text-[32px] font-serif font-normal text-[#1a1a1a] leading-relaxed md:leading-[1.4] text-center">
            In a world always chasing the next new thing &mdash; faster, flashier, more &mdash; I longed to create something fundamentally different. A brand that values patience, purpose and personality as much as beauty. That&rsquo;s how NOVA began.
          </p>

          {/* Body Paragraphs */}
          <div className="space-y-6 text-[#333333] font-light text-[15px] sm:text-[16px] leading-[1.8] text-center sm:text-justify max-w-[740px] mx-auto pt-2">
            <p>
              Two years and countless sketches, samples and soulful conversations later, I&rsquo;m immensely grateful for the community that has grown around NOVA. We&rsquo;re a small but passionate group who care deeply about quality, meaning and mindful living. We don&rsquo;t flood the world with endless products &mdash; instead, we obsess over the details and perfect a few pieces each year, because I truly believe the simplest things are the hardest to get just right.
            </p>
            <p>
              From day one, NOVA has been self-funded and independent. This freedom lets us move at our own rhythm and stay true to our values, ensuring every decision echoes our commitment to sustainability and integrity. My hope has always been to create pieces for those who genuinely connect with our story &mdash; pieces that add something thoughtful to your life, and that positively impact every pair of hands, from our craftspeople to you.
            </p>
            <p>
              NOVA is my love letter to dreamers and changemakers. We exist to advocate for an inclusive, responsible and inspiring future &mdash; empowering like-minded souls to choose what truly matters. I hope our designs spark joy and offer beauty you can feel proud to carry.
            </p>
            <p>
              Thank you, from the bottom of my heart, for joining us and believing in NOVA. If you ever want to chat, my inbox is always open &mdash; I love hearing your stories.
            </p>
          </div>

          {/* Founder Signature Block */}
          <div className="pt-8 flex items-center justify-center space-x-5">
            <div className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full overflow-hidden border border-stone-200 flex-shrink-0 shadow-xs">
              <Image
                src="/founder.png"
                alt="Heer Thakkar, Founder of NOVA"
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="text-left space-y-0.5">
              <p className="font-serif italic text-stone-500 text-[14px]">
                With gratitude,
              </p>
              <p className="text-xl sm:text-[22px] font-serif font-normal text-[#1a1a1a]">
                Heer Thakkar
              </p>
              <p className="text-[10.5px] uppercase tracking-[0.16em] text-stone-500 font-light">
                FOUNDER, NOVA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. FULL-BLEED CRAFTSMANSHIP BANNER (Mir Kash Exact Section) ══ */}
      <section className="w-full relative h-[450px] sm:h-[550px] md:h-[620px] bg-[#1a1a1a] overflow-hidden group">
        <Image
          src="/Banners/newban4.jpeg"
          alt="NOVA woven craftsmanship"
          fill
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000"
        />
      </section>

      {/* ══ 4. OUR ETHICS (Warm Cream Section #f6f3ee) ══ */}
      <section className="py-24 sm:py-32 bg-[#f6f3ee] border-y border-[#eae5dd] px-6 sm:px-12 w-full text-center">
        <div className="max-w-[780px] mx-auto space-y-6">
          <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium text-[#a84832]">
            OUR ETHICS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-serif font-normal text-[#1a1a1a] tracking-tight leading-tight">
            We will never use <span className="text-[#a84832]">animal leather.</span>
          </h2>
          <p className="text-[#444444] text-[15px] sm:text-[16px] font-light leading-[1.8] max-w-[700px] mx-auto">
            At NOVA, style should never come at the cost of animals or the planet. Our timeless, luxury bags are crafted from sustainable, cruelty-free materials like plant-based eucalyptus and microfibre leathers &mdash; made in small batches with meticulous attention to detail, full transparency and minimal environmental impact. Every bag lets you carry your style with pride and conscience.
          </p>
        </div>
      </section>

      {/* ══ 5. OUR MATERIALS (2-Column Split Section) ══ */}
      <section id="materials" className="py-24 sm:py-32 max-w-[1200px] mx-auto px-6 sm:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Image */}
          <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto rounded-2xl overflow-hidden bg-[#f4f3f0] shadow-sm">
            <Image
              src="/products/Terra/HeatherBrown/IMG_3161.png"
              alt="NOVA plant-based material"
              fill
              className="object-contain p-8"
            />
          </div>

          {/* Right Column: Text Content */}
          <div className="space-y-6 max-w-xl">
            <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.2em] font-medium text-[#a84832]">
              OUR MATERIALS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-[46px] font-serif font-normal text-[#1a1a1a] leading-tight">
              Not leather. <span className="text-[#a84832]">Better.</span>
            </h2>
            <p className="text-[#444444] text-[15px] sm:text-[16px] font-light leading-[1.8]">
              We craft luxury vegan bags using revolutionary plant-based leathers made from eucalyptus plant derivatives and recycled botanical fibres &mdash; waterproof, durable and ultra-luxe materials that outshine traditional leather without harming the planet. We innovate with microfibre suede for a rich tactile finish, and are actively pioneering new sustainable bio-materials.
            </p>
            <div className="pt-2">
              <Link
                href="/store"
                className="inline-block text-[12px] uppercase tracking-[0.16em] font-semibold text-[#1a1a1a] underline underline-offset-8 hover:text-[#a84832] transition-colors"
              >
                EXPLORE OUR MATERIALS &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. THREE VOWS / CREDENTIALS (Mir Kash Exact Format) ══ */}
      <section className="border-t border-[#e5e5e5] py-20 sm:py-28 max-w-[1100px] mx-auto px-6 sm:px-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 text-center">
          <div className="space-y-3">
            <span className="text-2xl sm:text-[26px] font-serif font-normal text-[#1a1a1a] block">
              Cruelty-free
            </span>
            <p className="text-[14px] text-[#666666] font-light leading-[1.6] max-w-[280px] mx-auto">
              Every bag, lining and detail. Nothing from an animal, ever.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-2xl sm:text-[26px] font-serif font-normal text-[#1a1a1a] block">
              Small batch
            </span>
            <p className="text-[14px] text-[#666666] font-light leading-[1.6] max-w-[280px] mx-auto">
              A few pieces, perfected each year. Never rushed.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-2xl sm:text-[26px] font-serif font-normal text-[#1a1a1a] block">
              Independent
            </span>
            <p className="text-[14px] text-[#666666] font-light leading-[1.6] max-w-[280px] mx-auto">
              Self-funded from day one, so our values lead every decision.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 7. PULL-QUOTE BAND (Warm Beige / Stone Section #eae5dc) ══ */}
      <section className="py-24 sm:py-32 bg-[#eae5dc] border-y border-[#ded8cd] text-center px-6 sm:px-12">
        <p className="text-2xl sm:text-4xl md:text-[50px] font-serif font-normal text-[#1a1a1a] max-w-[850px] mx-auto leading-[1.3]">
          The simplest things are the hardest to get <span className="text-[#a84832]">just right.</span>
        </p>
      </section>

      {/* ══ 8. CLOSING CTA (Mir Kash Exact Format) ══ */}
      <section className="py-28 sm:py-36 text-center px-6 max-w-4xl mx-auto space-y-8">
        <p className="text-3xl sm:text-4xl md:text-[42px] font-serif font-normal text-[#1a1a1a]">
          Beauty you can feel proud to carry.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 pt-2">
          <Link
            href="/store"
            className="text-[12px] uppercase tracking-[0.16em] font-semibold text-[#1a1a1a] underline underline-offset-8 hover:text-[#a84832] transition-colors"
          >
            EXPLORE THE COLLECTION &rarr;
          </Link>
          <Link
            href="#materials"
            className="text-[12px] uppercase tracking-[0.16em] font-semibold text-[#1a1a1a] underline underline-offset-8 hover:text-[#a84832] transition-colors"
          >
            OUR MATERIALS &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
