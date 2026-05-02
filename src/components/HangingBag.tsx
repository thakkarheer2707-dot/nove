"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect, RefObject } from "react";

// Bag natural viewport-Y center when fixed: top-4px + 190px thread + 135px (half of 270px bag)
const BAG_NATURAL_Y = 4 + 190 + 135; // ≈ 329px

// Scroll position at which the arc landing is complete
const LAND_SCROLL = 500;

export default function HangingBag({
  onDropComplete,
  cardRef,
  scrollYValue,
}: {
  onDropComplete?: () => void;
  cardRef?: RefObject<HTMLDivElement | null>;
  scrollYValue: MotionValue<number>;
}) {
  const [hasDropped, setHasDropped] = useState(false);
  const smooth = scrollYValue;

  // Measured once when entrance animation finishes (scroll is 0 at this moment)
  const landPageY = useRef(700);  // PAGE-coordinate Y of bag center destination
  const landDeltaX = useRef(0);   // X offset from bag center to card center

  const measureCard = () => {
    if (!cardRef?.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // X: align bag center with card center
    landDeltaX.current = rect.left + rect.width / 2 - window.innerWidth / 2;

    // Y: place bag CENTER exactly at the card center
    // Since this is called at scroll 0, rect.top is the page-coordinate
    landPageY.current = rect.top + rect.height / 2;
  };

  // Use the shared springed value passed from parent

  // ─── Unified Y transform ──────────────────────────────────────────────────
  // Phase 1 (0 → LAND_SCROLL): arc from hanging position down to below card
  // Phase 2 (LAND_SCROLL+):    bag tracks page scroll → appears to stay on the page
  const bagY = useTransform(smooth, (s) => {
    if (s <= LAND_SCROLL) {
      // Arc: 0→100 swing left (no Y change), 100→LAND_SCROLL descend toward target
      const progress = s <= 100 ? 0 : (s - 100) / (LAND_SCROLL - 100);
      // At LAND_SCROLL, the card has scrolled up by LAND_SCROLL px,
      // so the target viewport Y = landPageY - LAND_SCROLL
      // The bag transform Y needed = target viewport Y - BAG_NATURAL_Y
      const targetTransformY = (landPageY.current - LAND_SCROLL) - BAG_NATURAL_Y;
      return Math.min(1, progress) * targetTransformY;
    } else {
      // Lock: bag stays at page-coordinate landPageY
      // viewport Y should = landPageY - scrollY
      // transform Y = (landPageY - s) - BAG_NATURAL_Y
      return (landPageY.current - s) - BAG_NATURAL_Y;
    }
  });

  const [responsiveValues, setResponsiveValues] = useState({ swingX: -440, bagSize: 210 });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setResponsiveValues({
        swingX: isMobile ? -window.innerWidth * 0.4 : -440,
        bagSize: isMobile ? 180 : 210,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { swingX, bagSize } = responsiveValues;

  // ─── X: swing left then arc to card center ────────────────────────────────
  const bagX = useTransform(smooth, (s) => {
    const clamped = Math.max(0, Math.min(LAND_SCROLL, s));
    if (clamped <= 100) {
      // Swing left
      return (clamped / 100) * swingX;
    } else {
      // Arc back: swingX → landDeltaX (≈ 0)
      const p = (clamped - 100) / (LAND_SCROLL - 100);
      return swingX + p * (Math.abs(swingX) + landDeltaX.current);
    }
  });

  // ─── Scale ────────────────────────────────────────────────────────────────
  const bagScale = useTransform(smooth, [0, LAND_SCROLL], [1, 1]);

  // ─── Opacity ──────────────────────────────────────────────────────────────
  // Fade out ONLY once the bag has reached its target (LAND_SCROLL = 500)
  // Matches the [500, 650] window in page.tsx for a "placing" sequence
  const bagOpacity = useTransform(smooth, [500, 650], [1, 0]);

  // ─── Thread ───────────────────────────────────────────────────────────────
  const threadHeight  = useTransform(smooth, [0, 100, 800], [190, 190, 0]);
  const threadOpacity = useTransform(smooth, [0, 100, 750], [1, 1, 0]);
  const threadRotate  = useTransform(smooth, [0, 100, 600], [0, -14, 0]);

  // ─── Pendulum sway fades as bag starts its descent ───────────────────────
  const swayOpacity = useTransform(smooth, [400, 750], [1, 0]);

  return (
    <>
      <style>{`
        @keyframes pendulumSway {
          0%   { rotate: -4deg; }
          50%  { rotate:  4deg; }
          100% { rotate: -4deg; }
        }
        .pendulum-sway {
          animation: pendulumSway 6s ease-in-out infinite;
          will-change: rotate;
        }
      `}</style>

      <motion.div
        initial={{ y: -600, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 4.2 }}
        onAnimationComplete={() => {
          if (!hasDropped) {
            setHasDropped(true);
            measureCard(); 
            onDropComplete?.();
          }
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
      >
        {/* Thread */}
        <motion.div
          style={{ height: threadHeight, opacity: threadOpacity, rotate: threadRotate }}
          className="w-[1px] bg-gradient-to-b from-gray-300/0 via-gray-300 to-gray-300/50 origin-top"
        />

        {/* Bag */}
        <motion.div
          style={{
            opacity: bagOpacity,
            y: bagY,
            x: bagX,
            scale: bagScale,
            rotate: threadRotate,
            willChange: "transform",
          }}
          className="relative mt-[-8px]"
          transition={{ duration: 0.1 }}
        >
          <motion.div
            style={{ opacity: swayOpacity, width: bagSize, height: bagSize }}
            className="pendulum-sway relative"
          >
            <div className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.07)]">
              <Image
                src="/products/Ember/ember_v3.png"
                alt="Hanging Masterpiece"
                fill
                sizes="(max-width: 768px) 180px, 270px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
