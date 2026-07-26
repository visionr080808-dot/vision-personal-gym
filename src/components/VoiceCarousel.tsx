"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { voices } from "@/src/data/site";

export function VoiceCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setI((v) => (v + 1) % voices.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="mx-auto max-w-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[200px] border-y border-line px-2 py-12 text-center sm:px-10">
        <span
          aria-hidden
          className="display-en pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 select-none text-6xl font-light leading-none text-text/15"
        >
          &ldquo;
        </span>
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base font-light leading-loose tracking-wide text-text/85 sm:text-lg">
              {voices[i].text}
            </p>
            <footer className="display-en mt-6 text-xs tracking-[0.2em] text-text/50">
              — {voices[i].name}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {voices.map((_, idx) => (
          <button
            key={idx}
            aria-label={`お客様の声 ${idx + 1} を表示`}
            onClick={() => setI(idx)}
            className={`h-px transition-all ${
              idx === i ? "w-10 bg-accent" : "w-5 bg-text/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
