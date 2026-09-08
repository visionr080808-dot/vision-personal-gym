"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

/** 複数枚の写真を一定間隔でクロスフェード表示（endlessループ） */
export function PhotoCrossfade({
  images,
  alt,
  intervalMs = 2000,
  sizes,
  className = "object-cover",
}: {
  images: string[];
  alt: string;
  intervalMs?: number;
  sizes?: string;
  className?: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setI((v) => (v + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={images[i]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={images[i]}
          alt={alt}
          fill
          priority={i === 0}
          sizes={sizes ?? "(max-width: 768px) 100vw, 400px"}
          className={className}
        />
      </motion.div>
    </AnimatePresence>
  );
}
