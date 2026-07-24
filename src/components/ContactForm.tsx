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

  const fieldCls =
    "mt-2 w-full border border-white/25 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-white focus:bg-white/[0.07] focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-14 max-w-xl text-left">
      <div className="space-y-6">
        <div>
          <label className="display-en rule-label block text-[11px] uppercase tracking-[0.15em] text-white/80">
            お名前 <span className="normal-case text-white/50">（必須）</span>
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="山田 太郎"
            className={fieldCls}
          />
        </div>
        <div>
          <label className="display-en rule-label block text-[11px] uppercase tracking-[0.15em] text-white/80">
            電話番号 <span className="normal-case text-white/40">（任意）</span>
          </label>
          <input
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="080-1234-5678"
            className={fieldCls}
          />
        </div>
        <div>
          <label className="display-en rule-label block text-[11px] uppercase tracking-[0.15em] text-white/80">
            お問い合わせ内容 <span className="normal-case text-white/50">（必須）</span>
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="ご質問・ご予約希望日時など"
            className={`${fieldCls} resize-none`}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`group mt-8 inline-flex w-full items-center justify-center gap-3 px-9 py-4 text-xs font-medium tracking-[0.15em] transition-colors sm:w-auto ${
          canSubmit
            ? "cursor-pointer bg-white text-text hover:bg-white/90"
            : "cursor-not-allowed border border-white/25 bg-transparent text-white/40"
        }`}
      >
        メールで送信する
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </button>
      <p className="mt-4 text-[11px] leading-relaxed text-white/55">
        送信ボタンを押すと、お使いのメールアプリが開き内容が自動入力されます。
      </p>
    </form>
  );
}
