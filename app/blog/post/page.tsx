"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Header } from "@/src/components/Header";
import { MobileCTA } from "@/src/components/MobileCTA";
import { Reveal } from "@/src/components/Reveal";
import { BtnFill } from "@/src/components/Buttons";
import { fetchBlogPost, type BlogPost } from "@/src/lib/microcms";

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

function BlogPostContent() {
  const params = useSearchParams();
  const id = params.get("id");
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      setPost(null);
      return;
    }
    fetchBlogPost(id).then(setPost);
  }, [id]);

  return (
    <main className="pb-24 md:pb-0">
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-32 sm:pt-40">
        {post === undefined && (
          <p className="py-16 text-center text-sm text-text/50">
            読み込み中...
          </p>
        )}

        {post === null && (
          <div className="py-16 text-center">
            <p className="text-sm text-text/50">記事が見つかりませんでした。</p>
            <div className="mt-8 flex justify-center">
              <BtnFill href="/blog">ブログ一覧へ戻る</BtnFill>
            </div>
          </div>
        )}

        {post && (
          <Reveal>
            <div className="flex items-center gap-3 text-[11px] tracking-[0.15em] text-text/45">
              <span className="display-en">{formatDate(post.publishedAt)}</span>
              {post.category && (
                <span className="border border-text/20 px-2 py-0.5 text-[10px]">
                  {post.category.name}
                </span>
              )}
            </div>
            <h1 className="heading-ja mt-4 text-2xl leading-snug sm:text-3xl">
              {post.title}
            </h1>

            {post.eyecatch && (
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden bg-card2">
                <Image
                  src={post.eyecatch.url}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                />
              </div>
            )}

            <div
              className="prose-blog mt-10 text-sm font-light leading-loose text-text/80"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 border-t border-line pt-10 text-center">
              <BtnFill href="/blog">ブログ一覧へ戻る</BtnFill>
            </div>
          </Reveal>
        )}
      </section>
    </main>
  );
}

export default function BlogPostPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="pb-24 pt-32 text-center text-sm text-text/50 sm:pt-40">
            読み込み中...
          </main>
        }
      >
        <BlogPostContent />
      </Suspense>
      <MobileCTA />
    </>
  );
}
