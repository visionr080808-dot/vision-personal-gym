"use client";

import { useState } from "react";
import { site } from "@/src/data/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = name.trim() !== "" && message.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = encodeURIComponent(`【${site.fullName}】お問い合わせ`);
    const body = encodeURIComponent(
      `お名前: ${name}\n電話番号: ${tel || "（未記入）"}\n\nお問い合わせ内容:\n${message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-14 max-w-xl text-left">
      <div className="space-y-6">
        <div>
          <label className="display-en rule-label block text-[11px] uppercase text-white/50">
            お名前 <span className="text-white/40">※必須</span>
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田 太郎"
            className="mt-2 w-full border-b border-white/30 bg-transparent py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <label className="display-en rule-label block text-[11px] uppercase text-white/50">
            電話番号
          </label>
          <input
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="080-1234-5678"
            className="mt-2 w-full border-b border-white/30 bg-transparent py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
          />
        </div>
        <div>
          <label className="display-en rule-label block text-[11px] uppercase text-white/50">
            お問い合わせ内容 <span className="text-white/40">※必須</span>
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ご質問・ご予約希望日時など"
            className="mt-2 w-full resize-none border-b border-white/30 bg-transparent py-2 text-sm text-white placeholder:text-white/30 focus:border-white focus:outline-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-white px-9 py-4 text-xs font-medium tracking-[0.15em] text-text transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
      >
        メールで送信する
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
      <p className="mt-4 text-[11px] leading-relaxed text-white/45">
        送信ボタンを押すと、お使いのメールアプリが開き内容が自動入力されます。
      </p>
    </form>
  );
}
