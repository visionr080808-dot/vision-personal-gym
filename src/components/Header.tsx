"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/src/data/site";

const nav = [
  { label: "Concept", href: "/#concept" },
  { label: "Trainer", href: "/#trainer" },
  { label: "Menu", href: "/#menu" },
  { label: "Price", href: "/#price" },
  { label: "Results", href: "/results" },
  { label: "Blog", href: "/blog" },
  { label: "Access", href: "/#access" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-bg/70 backdrop-blur-xl border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="/" aria-label={site.fullName}>
          <Image
            src={scrolled ? "/images/logo-black.png" : "/images/logo-white.png"}
            alt={site.fullName}
            width={50}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`display-en link-underline text-[11px] uppercase tracking-[0.2em] transition-colors ${
                scrolled ? "text-text/70" : "text-white/75"
              }`}
            >
              {n.label}
            </a>
          ))}
          <a
            href="/#contact"
            className={`display-en border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors ${
              scrolled
                ? "border-accent bg-accent text-white hover:bg-black"
                : "border-white text-white hover:bg-white hover:text-text"
            }`}
          >
            Reserve
          </a>
        </nav>

        <button
          className="md:hidden"
          aria-label="メニューを開く"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="space-y-1.5">
            <span className={`block h-px w-7 ${scrolled ? "bg-text" : "bg-white"}`} />
            <span className={`block h-px w-7 ${scrolled ? "bg-text" : "bg-white"}`} />
            <span className={`block h-px w-7 ${scrolled ? "bg-text" : "bg-white"}`} />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-white/95 px-6 py-5 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {nav.map((n) => (
              <li key={n.href} className="border-b border-line last:border-0">
                <a
                  href={n.href}
                  className="display-en block py-3 text-sm uppercase tracking-[0.2em] text-text/80"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
