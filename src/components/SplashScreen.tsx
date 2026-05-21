"use client";

import { useEffect } from "react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return null;
}
