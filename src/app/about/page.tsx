"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="bg-white text-[#1a1a1a] selection:bg-stone-200 selection:text-black min-h-screen pt-[29px]">
      {/* ══ 1. HERO SECTION (Mir Kash Exact Hero) ══ */}
      <section className="relative w-full h-[65vh] md:h-[78vh] min-h-[460px] bg-[#1a1a1a] overflow-hidden">
        <Image
          src="/Banners/newban2.jpeg"
          alt="NOVA Story"
          fill
          priority
          className="object-cover object-center brightness-[0.82]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40 pointer-events-none" />

        <div className="absolute inset-0 max-w-[1500px] mx-auto px-6 sm:px-12 flex flex-col justify-end pb-12 sm:pb-20 z-10 text-white">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/80 font-light mb-3">
            Our Story
          </p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal tracking-wide max-w-3xl leading-tight">
            A love letter to dreamers &amp; changemakers.
          </h1>
        </div>
      </section>

      {/* ══ 2. FOUNDER'S LETTER (Mir Kash Exact Format) ══ */}
      <section className="py-20 sm:py-28 px-6 sm:px-12 max-w-4xl mx-auto w-full">
        <div className="space-y-12">
          {/* Eyebrow */}
          <p className="text-center text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium">
            From the Founder
          </p>

          {/* Opening Display Statement */}
          <p className="text-2xl sm:text-3xl md:text-[34px] font-serif font-normal text-[#1a1a1a] leading-relaxed md:leading-[1.4] text-center">
            In a world always chasing the next new thing &mdash; faster, flashier, more &mdash; I longed to create something fundamentally different. A brand that values patience, purpose and personality as much as beauty. That&rsquo;s how NOVA began.
          </p>

          {/* Body Paragraphs */}
          <div className="space-y-6 text-stone-600 font-light text-base sm:text-lg leading-relaxed pt-4">
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

          {/* Signoff */}
          <div className="pt-8 border-t border-stone-200 flex items-center space-x-5">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-stone-200 flex-shrink-0 shadow-sm">
              <Image
                src="/founder.png"
                alt="Heer, Founder of NOVA"
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wider text-stone-400 font-light">
                With gratitude,
              </p>
              <p className="text-xl sm:text-2xl font-serif text-[#1a1a1a]">
                Heer Thakkar
              </p>
              <p className="text-xs tracking-[0.1em] text-stone-500 uppercase font-light">
                Founder, NOVA
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. FULL-BLEED BREAK IMAGE (Mir Kash Exact Section) ══ */}
      <section className="w-full relative aspect-[16/10] sm:aspect-[21/9] md:aspect-[2.4/1] bg-[#1a1a1a] overflow-hidden group">
        <Image
          src="/Banners/newban4.jpeg"
          alt="NOVA woven craftsmanship"
          fill
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000"
        />
      </section>

      {/* ══ 4. OUR ETHICS (Warm Cream Section) ══ */}
      <section className="py-20 sm:py-28 bg-[#faf8f5] border-y border-stone-200 px-6 sm:px-12 w-full">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium">
            Our Ethics
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#1a1a1a] tracking-tight">
            We will never use <em className="italic font-serif">animal leather.</em>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            At NOVA, style should never come at the cost of animals or the planet. Our timeless, luxury bags are crafted from sustainable, cruelty-free materials like eucalyptus plant leather and microfibre leathers &mdash; made in small batches with meticulous attention to detail, full transparency and minimal environmental impact. Every bag lets you carry your style with pride and conscience.
          </p>
        </div>
      </section>

      {/* ══ 5. OUR MATERIALS (Split Image + Text Section) ══ */}
      <section className="py-20 sm:py-28 max-w-[1500px] mx-auto px-6 sm:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#f4f3f0]">
            <Image
              src="/Banners/newban3.jpeg"
              alt="NOVA plant leather"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-6 max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.25em] text-stone-500 font-medium">
              Our Materials
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-[#1a1a1a] leading-tight">
              Not leather. <em className="italic font-serif">Better.</em>
            </h2>
            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
              We craft luxury vegan bags using revolutionary plant-based leathers made from eucalyptus plant derivatives and recycled botanical fibres &mdash; waterproof, durable and ultra-luxe materials that outshine traditional leather without harming the planet. We innovate with microfibre suede for a rich tactile finish, and are actively pioneering new sustainable bio-materials.
            </p>
            <div>
              <Link
                href="/store"
                className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-[#1a1a1a] underline underline-offset-8 hover:text-stone-500 transition-colors"
              >
                <span>Explore our collection &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. CREDENTIALS / 3 VOWS (Mir Kash Exact Format) ══ */}
      <section className="border-t border-stone-200 py-16 sm:py-24 max-w-[1500px] mx-auto px-6 sm:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-stone-200">
          <div className="space-y-2 pt-6 md:pt-0 md:px-6 first:pl-0">
            <span className="text-2xl sm:text-3xl font-serif font-normal text-[#1a1a1a] block">
              Cruelty-free
            </span>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Every bag, lining and detail. Nothing from an animal, ever.
            </p>
          </div>

          <div className="space-y-2 pt-6 md:pt-0 md:px-6">
            <span className="text-2xl sm:text-3xl font-serif font-normal text-[#1a1a1a] block">
              Small batch
            </span>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              A few pieces, perfected each year. Never rushed.
            </p>
          </div>

          <div className="space-y-2 pt-6 md:pt-0 md:px-6 last:pr-0">
            <span className="text-2xl sm:text-3xl font-serif font-normal text-[#1a1a1a] block">
              Independent
            </span>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              Self-funded from day one, so our values lead every decision.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 7. PULL-QUOTE BAND (Mir Kash Exact Format) ══ */}
      <section className="py-20 sm:py-28 bg-[#faf8f5] border-y border-stone-200 text-center px-6">
        <p className="text-2xl sm:text-4xl md:text-5xl font-serif font-normal text-[#1a1a1a] max-w-3xl mx-auto leading-tight">
          The simplest things are the hardest to get <em className="italic font-serif">just right.</em>
        </p>
      </section>

      {/* ══ 8. CLOSING CTA (Mir Kash Exact Format) ══ */}
      <section className="py-24 sm:py-32 text-center px-6 max-w-4xl mx-auto space-y-8">
        <p className="text-3xl sm:text-5xl font-serif font-normal text-[#1a1a1a]">
          Beauty you can feel proud to carry.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-2">
          <Link
            href="/store"
            className="text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-[#1a1a1a] underline underline-offset-8 hover:text-stone-500 transition-colors"
          >
            Explore the collection &rarr;
          </Link>
          <Link
            href="/collection"
            className="text-xs sm:text-sm uppercase tracking-[0.18em] font-medium text-[#1a1a1a] underline underline-offset-8 hover:text-stone-500 transition-colors"
          >
            Our capsule &rarr;
          </Link>
        </div>
      </section>
    </main>
  );
}
