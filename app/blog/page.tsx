"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/src/data/site";
import { Header } from "@/src/components/Header";
import { MobileCTA } from "@/src/components/MobileCTA";
import { Reveal } from "@/src/components/Reveal";
import { SectionHead } from "@/src/components/SectionHead";
import {
  fetchBlogPosts,
  microCmsConfigured,
  type BlogPost,
} from "@/src/lib/microcms";

function excerpt(html: string, length = 80) {
  const text = html.replace(/<[^>]*>/g, "");
  return text.length > length ? `${text.slice(0, length)}…` : text;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export default function BlogPage() {
  const [items, setItems] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    fetchBlogPosts().then(setItems);
  }, []);

  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-32 sm:pt-40">
          <Reveal>
            <SectionHead en="Blog" ja="お知らせ・コラム" />
            <p className="mt-8 max-w-xl text-sm font-light leading-loose tracking-wide text-text/70">
              {site.fullName} からのお知らせやトレーニングコラムをお届けします。
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
                ? "まだ記事が投稿されていません。準備が整い次第、公開します。"
                : "準備中です。もうしばらくお待ちください。"}
            </p>
          )}

          <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {items?.map((post, i) => (
              <Reveal key={post.id} delay={(i % 3) * 0.08}>
                <a
                  href={`/blog/post?id=${post.id}`}
                  className="group flex h-full flex-col bg-white p-6 transition-colors hover:bg-card2 sm:p-8"
                >
                  {post.eyecatch && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-card2">
                      <Image
                        src={post.eyecatch.url}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="mt-5 flex items-center gap-3 text-[11px] tracking-[0.15em] text-text/45">
                    <span className="display-en">{formatDate(post.publishedAt)}</span>
                    {post.category && (
                      <span className="border border-text/20 px-2 py-0.5 text-[10px]">
                        {post.category}
                      </span>
                    )}
                  </div>
                  <h3 className="heading-ja mt-3 text-base leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[13px] font-light leading-loose text-text/60">
                    {excerpt(post.content)}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <MobileCTA />
    </>
  );
}
