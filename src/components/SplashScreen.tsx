"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Show splash for 2.4s then start exit animation
    const timer = setTimeout(() => {
      setLeaving(true);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  // After exit animation (600ms), call onComplete
  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 700);
    return () => clearTimeout(timer);
  }, [leaving, onComplete]);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fafaf8]"
        >
          {/* Subtle background texture */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(210,195,175,0.13) 0%, transparent 70%)",
            }}
          />

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative flex flex-col items-center gap-4"
          >


            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.45em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
              className="text-[#1d1d1f] text-2xl font-light tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-bodoni), serif" }}
            >
              NOVE
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
              className="text-[10px] tracking-[0.28em] text-[#9a8c7e] uppercase font-medium"
            >
              Luxury, Redefined
            </motion.p>

            {/* Animated shimmer line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
              className="mt-3 h-px w-24 origin-left rounded-full overflow-hidden"
              style={{ background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }}
            />
          </motion.div>

          {/* Bottom loading bar */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-24 h-[1.5px] bg-black/8 rounded-full overflow-hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
