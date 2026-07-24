import Image from "next/image";
import {
  site,
  concepts,
  trainer,
  menus,
  campaign,
  priceGroups,
  priceNote,
  heroImages,
} from "@/src/data/site";
import { Header } from "@/src/components/Header";
import { MobileCTA } from "@/src/components/MobileCTA";
import { Reveal } from "@/src/components/Reveal";
import { Stats } from "@/src/components/Stats";
import { VoiceCarousel } from "@/src/components/VoiceCarousel";
import { Faq } from "@/src/components/Faq";
import { HeroBackground } from "@/src/components/HeroBackground";
import { SectionHead } from "@/src/components/SectionHead";
import { BtnFill, BtnLine } from "@/src/components/Buttons";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-24 md:pb-0">
        {/* ============ HERO ============ */}
        <section
          id="hero"
          className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
        >
          <HeroBackground
            images={heroImages}
            alt={`${site.fullName} のトレーニング空間`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
            <Reveal>
              <Image
                src="/images/logo-white.png"
                alt={site.fullName}
                width={230}
                height={168}
                priority
                className="mx-auto h-auto w-36 sm:w-48"
              />
            </Reveal>
            <Reveal delay={0.15}>
              <h1 className="fluid-hero heading-ja mt-8">
                あなたが思い描く
                <br />
                理想の自分を
                <br />
                実現する場所
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mx-auto mt-7 max-w-lg text-[13px] font-light leading-loose tracking-wider text-white/80 sm:text-sm">
                {site.area}の完全マンツーマン・パーソナルジム。
                <br className="hidden sm:block" />
                あなただけの空間で、一生使える体づくりを。
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-8 flex items-center justify-center gap-4 text-[11px] tracking-[0.25em] text-white/70">
                <span className="h-px w-6 bg-white/40" />
                入会金 {campaign.before} → {campaign.after}
                <span className="h-px w-6 bg-white/40" />
              </p>
            </Reveal>
            <Reveal delay={0.38}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <BtnFill href="#contact" variant="light" full>
                  体験・ご予約はこちら
                </BtnFill>
                <BtnLine href="#concept" dark full>
                  {site.name} について
                </BtnLine>
              </div>
            </Reveal>
          </div>

          {/* スクロールインジケータ（PCのみ。モバイルは固定CTAと干渉するため非表示） */}
          <div className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
            <span className="display-en text-[10px] tracking-[0.4em] text-white/50">
              SCROLL
            </span>
            <span className="h-12 w-px animate-pulse bg-white/40" />
          </div>
        </section>

        {/* ============ CONCEPT ============ */}
        <section
          id="concept"
          className="mx-auto max-w-6xl px-6 py-28 sm:py-40"
        >
          <Reveal>
            <SectionHead en="Concept" ja="「続けられる」を、設計する。" />
            <p className="mt-8 max-w-xl text-sm font-light leading-loose tracking-wide text-text/70">
              ただ追い込むだけでは続きません。{site.name}
              は、姿勢や動きの質から整え、生活に馴染む強度であなたの変化を伴走します。
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-px border-t border-line md:grid-cols-3">
            {concepts.map((c, i) => (
              <Reveal key={c.no} delay={i * 0.1}>
                <div className="group h-full border-t border-line pt-8 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:first:border-l-0">
                  <span className="display-en text-sm tracking-[0.2em] text-text/35">
                    {c.no}
                  </span>
                  <h3 className="heading-ja mt-5 text-lg">{c.title}</h3>
                  <p className="mt-4 text-[13px] font-light leading-loose text-text/65">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ============ STATS（黒帯） ============ */}
        <section className="bg-accent py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <Reveal>
              <Stats />
            </Reveal>
          </div>
        </section>

        {/* ============ TRAINER ============ */}
        <section
          id="trainer"
          className="mx-auto max-w-6xl px-6 py-28 sm:py-40"
        >
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-12 md:gap-16">
            <Reveal className="md:col-span-5">
              <div className="relative mx-auto w-full max-w-sm">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={trainer.image}
                    alt={trainer.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-4 aspect-square w-28 overflow-hidden border-[6px] border-white sm:-right-6 sm:w-36">
                  <Image
                    src={trainer.imageSub}
                    alt={trainer.imageSubAlt}
                    fill
                    sizes="144px"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-7">
              <SectionHead en="Trainer" ja={trainer.name} />
              <p className="display-en mt-2 text-xs tracking-[0.3em] text-text/40">
                {trainer.nameEn}
              </p>
              <p className="mt-5 text-[13px] tracking-wide text-text/70">
                {trainer.role}
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
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

        {/* ============ MENU ============ */}
        <section id="menu" className="bg-card2 py-28 sm:py-40">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <SectionHead en="Menu" ja="対応メニュー" />
            </Reveal>
            <div className="mt-16 grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-5">
              {menus.map((m, i) => (
                <Reveal key={m} delay={i * 0.06}>
                  <div className="group flex items-baseline gap-4 border-b border-line py-7 lg:flex-col lg:items-start lg:gap-6 lg:border-r lg:py-10 lg:pr-6 lg:last:border-r-0">
                    <span className="display-en text-xs tracking-[0.2em] text-text/30 transition-colors group-hover:text-text/60">
                      0{i + 1}
                    </span>
                    <h3 className="heading-ja text-[15px] lg:text-base">
                      {m}
                    </h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PRICE ============ */}
        <section id="price" className="mx-auto max-w-6xl px-6 py-28 sm:py-40">
          <Reveal>
            <SectionHead en="Price" ja="料金プラン" />
          </Reveal>

          {/* キャンペーン: 入会金0円＋体験 */}
          <div className="mt-16 grid border border-line md:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col justify-center border-b border-line px-8 py-12 text-center md:border-b-0 md:border-r">
                <p className="display-en rule-label text-[11px] uppercase text-text/45">
                  {campaign.item}
                </p>
                <p className="mt-4 text-xs text-text/40 line-through">
                  {campaign.before}
                </p>
                <p className="display-en mt-1 text-6xl font-light leading-none">
                  0<span className="ml-1 text-xl">円</span>
                </p>
                <p className="mx-auto mt-6 max-w-xs text-xs font-light leading-loose text-text/55">
                  {campaign.entryNote}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col justify-center px-8 py-12 sm:px-12">
                <p className="display-en rule-label text-center text-[11px] uppercase text-text/45">
                  {campaign.trial.title}
                </p>
                <div className="mt-6 space-y-4">
                  {campaign.trial.rows.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line pb-3"
                    >
                      <span className="text-[13px] tracking-wide text-text/70">
                        {r.label}
                      </span>
                      <span className="display-en text-2xl font-light">
                        {r.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-xs font-light leading-loose text-text/55">
                  {campaign.trial.note}
                </p>
              </div>
            </Reveal>
          </div>

          {/* 料金グループ */}
          <div className="mt-16 space-y-16">
            {priceGroups.map((g, gi) => (
              <Reveal key={g.name} delay={gi * 0.05}>
                <div>
                  <div className="flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="display-en rule-label text-[11px] uppercase text-text/40">
                        {g.en}
                      </p>
                      <div className="mt-2 flex items-baseline gap-3">
                        <h3 className="heading-ja text-xl sm:text-2xl">
                          {g.name}
                        </h3>
                        {g.note && (
                          <span className="text-[11px] tracking-wide text-text/50">
                            （{g.note}）
                          </span>
                        )}
                      </div>
                    </div>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                      {g.for.map((f) => (
                        <li
                          key={f}
                          className="text-[11px] tracking-[0.12em] text-text/55"
                        >
                          — {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`mt-8 grid grid-cols-2 gap-px bg-line ${
                      g.plans.length >= 4
                        ? "md:grid-cols-4"
                        : "md:mx-auto md:max-w-2xl md:grid-cols-2"
                    }`}
                  >
                    {g.plans.map((p) => (
                      <div
                        key={p.name}
                        className={`relative ${
                          p.recommended
                            ? "bg-accent text-white"
                            : "bg-white text-text"
                        }`}
                      >
                        {p.recommended && (
                          <span className="absolute right-0 top-0 bg-white px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-text">
                            RECOMMEND
                          </span>
                        )}
                        <div className="px-5 py-10 text-center">
                          <p className="display-en text-sm tracking-[0.2em]">
                            {p.name}
                          </p>
                          <p
                            className={`mt-6 text-[10px] tracking-[0.2em] ${
                              p.recommended ? "text-white/55" : "text-text/45"
                            }`}
                          >
                            1回あたり
                          </p>
                          <p className="display-en mt-1 text-4xl font-light">
                            {p.per}
                            <span
                              className={`ml-1 text-sm ${
                                p.recommended
                                  ? "text-white/70"
                                  : "text-text/60"
                              }`}
                            >
                              円
                            </span>
                          </p>
                          <p
                            className={`mt-4 text-[11px] tracking-wide ${
                              p.recommended ? "text-white/60" : "text-text/50"
                            }`}
                          >
                            {g.totalLabel} {p.total}円
                          </p>
                          {p.reason && (
                            <p className="mt-3 text-[11px] font-light leading-snug text-white/75">
                              {p.reason}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-center text-[11px] tracking-wide text-text/45">
            {priceNote}
          </p>
        </section>

        {/* ============ VOICE ============ */}
        <section className="bg-card2 py-28 sm:py-40">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <SectionHead en="Voice" ja="お客様の声" center />
            </Reveal>
            <div className="mt-16">
              <VoiceCarousel />
            </div>
          </div>
        </section>

        {/* ============ ACCESS / FAQ ============ */}
        <section id="access" className="mx-auto max-w-6xl px-6 py-28 sm:py-40">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHead en="Access" ja="アクセス" />
              <p className="mt-8 text-[13px] font-light leading-loose tracking-wide text-text/70">
                完全予約制のプライベートジムです。お車でお越しの際はご予約時にご案内いたします。
              </p>
              <div className="mt-8 aspect-video w-full border border-line grayscale">
                <iframe
                  title={`${site.fullName} 地図`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    site.area
                  )}&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <dl className="mt-8 border-t border-line">
                <div className="flex gap-6 border-b border-line py-4">
                  <dt className="display-en w-24 shrink-0 text-[11px] uppercase tracking-[0.2em] text-text/40">
                    Location
                  </dt>
                  <dd className="text-[13px] text-text/80">{site.area}</dd>
                </div>
                <div className="flex gap-6 border-b border-line py-4">
                  <dt className="display-en w-24 shrink-0 text-[11px] uppercase tracking-[0.2em] text-text/40">
                    Style
                  </dt>
                  <dd className="text-[13px] text-text/80">{site.format}</dd>
                </div>
                <div className="flex gap-6 border-b border-line py-4">
                  <dt className="display-en w-24 shrink-0 text-[11px] uppercase tracking-[0.2em] text-text/40">
                    Hours
                  </dt>
                  <dd className="text-[13px] text-text/80">{site.hours}</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHead en="FAQ" ja="よくある質問" />
              <div className="mt-8">
                <Faq />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============ CONTACT（黒セクション） ============ */}
        <section id="contact" className="bg-accent py-28 text-white sm:py-40">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <SectionHead
                en="Contact"
                ja="まずは、お気軽にご相談を。"
                center
                dark
              />
              <p className="mx-auto mt-8 max-w-xl text-[13px] font-light leading-loose tracking-wide text-white/70">
                ご予約・体験のお申し込み・ご質問は、公式LINE・Instagram の DM・
                お電話で承っています。あなたの目標やお悩みをお聞かせください。
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <BtnFill href={site.line} external variant="light" full>
                  公式LINEで予約する
                </BtnFill>
                <BtnLine href={site.instagram} external dark full>
                  Instagram DM で予約する
                </BtnLine>
                <BtnLine href={`tel:${site.telLink}`} dark full>
                  電話する（{site.tel}）
                </BtnLine>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 flex flex-col items-center gap-3 text-xs tracking-wide text-white/55">
                <a
                  href={site.line}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-white"
                >
                  LINE 公式アカウント
                </a>
                <a
                  href={`tel:${site.telLink}`}
                  className="link-underline transition-colors hover:text-white"
                >
                  TEL {site.tel}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline transition-colors hover:text-white"
                >
                  MAIL {site.email}
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-white"
                >
                  INSTAGRAM {site.instagramHandle}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-line bg-white py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
          <Image
            src="/images/logo-black.png"
            alt={site.fullName}
            width={88}
            height={64}
            className="h-auto w-20"
          />
          <p className="text-[11px] tracking-[0.15em] text-text/50">
            {site.area}　／　TEL {site.tel}
          </p>
          <p className="display-en mt-2 text-[10px] tracking-[0.2em] text-text/35">
            © {new Date().getFullYear()} {site.fullName.toUpperCase()}
          </p>
        </div>
      </footer>

      <MobileCTA />
    </>
  );
}
