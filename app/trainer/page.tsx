"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { site, trainer } from "@/src/data/site";
import { Header } from "@/src/components/Header";
import { MobileCTA } from "@/src/components/MobileCTA";
import { Reveal } from "@/src/components/Reveal";
import { SectionHead } from "@/src/components/SectionHead";
import { BtnFill } from "@/src/components/Buttons";
import {
  fetchAchievements,
  microCmsConfigured,
  type AchievementItem,
} from "@/src/lib/microcms";

// 表示順（このリストにない category は末尾にまとめる）
const CATEGORY_ORDER = ["大会実績", "スポーツ経歴", "資格", "学歴"];

export default function TrainerPage() {
  const [items, setItems] = useState<AchievementItem[] | null>(null);

  useEffect(() => {
    fetchAchievements().then(setItems);
  }, []);

  const grouped = useMemo(() => {
    if (!items) return [];
    const map = new Map<string, AchievementItem[]>();
    for (const item of items) {
      const cat = item.category || "その他";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(item);
    }
    return [...map.entries()].sort(
      (a, b) =>
        (CATEGORY_ORDER.indexOf(a[0]) + 1 || 99) -
        (CATEGORY_ORDER.indexOf(b[0]) + 1 || 99)
    );
  }, [items]);

  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        {/* ============ プロフィール ============ */}
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:pt-40">
          <Reveal>
            <SectionHead en="Trainer" ja="トレーナー紹介" />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-16">
            <Reveal delay={0.05} className="md:col-span-4">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden">
                <Image
                  src={trainer.image}
                  alt={trainer.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-8">
              <h1 className="heading-ja text-2xl sm:text-3xl">
                {trainer.name}
              </h1>
              <p className="display-en mt-2 text-xs tracking-[0.3em] text-text/40">
                {trainer.nameEn}
              </p>
              <p className="mt-4 text-sm tracking-wide text-text/70">
                {trainer.role}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                {trainer.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] tracking-[0.15em] text-text/55"
                  >
                    ／ {t}
                  </span>
                ))}
              </div>
              <div className="mt-8 space-y-5 border-l border-text/20 pl-6">
                {trainer.message.map((m, i) => (
                  <p
                    key={i}
                    className="text-[13px] font-light leading-loose text-text/75"
                  >
                    {m}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ 経歴・実績 ============ */}
        <section className="bg-card2 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <SectionHead en="Career" ja="競技歴・資格・経歴" />
            </Reveal>

            <div className="mt-14">
              {items === null && (
                <p className="py-10 text-center text-sm text-text/50">
                  読み込み中...
                </p>
              )}

              {items !== null && items.length === 0 && (
                <p className="py-10 text-center text-sm text-text/50">
                  {microCmsConfigured
                    ? "近日公開予定です。"
                    : "準備中です。もうしばらくお待ちください。"}
                </p>
              )}

              <div className="space-y-14">
                {grouped.map(([category, list], gi) => (
                  <Reveal key={category} delay={gi * 0.06}>
                    <div>
                      <p className="display-en rule-label text-[11px] uppercase text-text/40">
                        {category}
                      </p>
                      <ul className="mt-5 divide-y divide-line border-t border-line">
                        {list.map((item) => (
                          <li
                            key={item.id}
                            className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                          >
                            {item.year && (
                              <span className="display-en shrink-0 text-xs tracking-[0.15em] text-text/45 sm:w-20">
                                {item.year}
                              </span>
                            )}
                            <div>
                              <p className="text-[13px] tracking-wide text-text">
                                {item.title}
                              </p>
                              {item.description && (
                                <p className="mt-1 text-[12px] font-light leading-relaxed text-text/60">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-accent py-20 text-center text-white sm:py-28">
          <Reveal>
            <p className="mx-auto max-w-lg px-6 text-sm font-light leading-loose tracking-wide text-white/80">
              {trainer.name}が、あなたの理想の変化に伴走します。
            </p>
            <div className="mt-8 flex justify-center">
              <BtnFill href="/#contact" variant="light">
                体験・ご予約はこちら
              </BtnFill>
            </div>
          </Reveal>
        </section>
      </main>
      <MobileCTA />
    </>
  );
}
