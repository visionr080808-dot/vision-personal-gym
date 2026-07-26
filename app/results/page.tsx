"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/src/data/site";
import { Header } from "@/src/components/Header";
import { MobileCTA } from "@/src/components/MobileCTA";
import { Reveal } from "@/src/components/Reveal";
import { SectionHead } from "@/src/components/SectionHead";
import { BtnFill } from "@/src/components/Buttons";
import {
  fetchResults,
  microCmsConfigured,
  type ResultItem,
} from "@/src/lib/microcms";

export default function ResultsPage() {
  const [items, setItems] = useState<ResultItem[] | null>(null);
  const [selected, setSelected] = useState<ResultItem | null>(null);

  useEffect(() => {
    fetchResults().then(setItems);
  }, []);

  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:pt-40">
          <Reveal>
            <SectionHead en="Results" ja="お客様の実績" />
            <p className="mt-8 max-w-xl text-sm font-light leading-loose tracking-wide text-text/70">
              {site.fullName} でトレーニングされたお客様の実際の変化をご紹介します。
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-28">
          {items === null && (
            <p className="py-16 text-center text-sm text-text/50">
              読み込み中...
            </p>
          )}

          {items !== null && items.length === 0 && (
            <p className="py-16 text-center text-sm text-text/50">
              {microCmsConfigured
                ? "まだ実績が登録されていません。準備が整い次第、公開します。"
                : "準備中です。もうしばらくお待ちください。"}
            </p>
          )}

          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {items?.map((item, i) => (
              <Reveal key={item.id} delay={(i % 2) * 0.08}>
                <article className="h-full bg-white p-6 sm:p-8">
                  <button
                    type="button"
                    onClick={() =>
                      (item.beforeImage || item.afterImage) &&
                      setSelected(item)
                    }
                    className="grid w-full grid-cols-2 gap-2 text-left"
                  >
                    {item.beforeImage && (
                      <div className="relative aspect-[3/4] overflow-hidden bg-card2">
                        <Image
                          src={item.beforeImage.url}
                          alt={`${item.title} Before`}
                          fill
                          sizes="(max-width: 640px) 50vw, 300px"
                          className="object-cover"
                        />
                        <span className="display-en absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 text-[10px] tracking-[0.2em] text-white">
                          BEFORE
                        </span>
                      </div>
                    )}
                    {item.afterImage && (
                      <div className="relative aspect-[3/4] overflow-hidden bg-card2">
                        <Image
                          src={item.afterImage.url}
                          alt={`${item.title} After`}
                          fill
                          sizes="(max-width: 640px) 50vw, 300px"
                          className="object-cover"
                        />
                        <span className="display-en absolute bottom-2 left-2 bg-accent px-2 py-0.5 text-[10px] tracking-[0.2em] text-white">
                          AFTER
                        </span>
                      </div>
                    )}
                  </button>

                  <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="heading-ja text-lg">{item.title}</h3>
                    {item.category && (
                      <span className="text-[11px] tracking-[0.12em] text-text/55">
                        {item.category}
                      </span>
                    )}
                    {item.period && (
                      <span className="text-[11px] tracking-[0.12em] text-text/45">
                        {item.period}
                      </span>
                    )}
                  </div>

                  {item.comment && (
                    <p className="mt-4 text-[13px] font-light leading-loose text-text/70">
                      {item.comment}
                    </p>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-accent py-20 text-center text-white sm:py-28">
          <Reveal>
            <p className="mx-auto max-w-lg px-6 text-sm font-light leading-loose tracking-wide text-white/80">
              あなたの理想の変化も、ここから始まります。
            </p>
            <div className="mt-8 flex justify-center">
              <BtnFill href="/#contact" variant="light">
                体験・ご予約はこちら
              </BtnFill>
            </div>
          </Reveal>
        </section>
      </main>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setSelected(null)}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="閉じる"
            className="absolute right-5 top-5 text-2xl text-white/70 transition-colors hover:text-white"
          >
            ✕
          </button>
          <div
            className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {selected.beforeImage && (
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
                <Image
                  src={selected.beforeImage.url}
                  alt={`${selected.title} Before`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
                <span className="display-en absolute bottom-3 left-3 bg-black/60 px-2 py-0.5 text-[10px] tracking-[0.2em] text-white">
                  BEFORE
                </span>
              </div>
            )}
            {selected.afterImage && (
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-white/5">
                <Image
                  src={selected.afterImage.url}
                  alt={`${selected.title} After`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
                <span className="display-en absolute bottom-3 left-3 bg-accent px-2 py-0.5 text-[10px] tracking-[0.2em] text-white">
                  AFTER
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <MobileCTA />
    </>
  );
}
