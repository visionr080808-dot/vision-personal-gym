/** セクション見出し（細いルール＋広トラッキングEN＋和文） */
export function SectionHead({
  en,
  ja,
  center = false,
  dark = false,
}: {
  en: string;
  ja: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <div
        className={`flex items-center gap-4 ${center ? "justify-center" : ""}`}
      >
        <span className={`h-px w-10 ${dark ? "bg-white/40" : "bg-text/30"}`} />
        <span
          className={`display-en rule-label text-[11px] uppercase ${
            dark ? "text-white/60" : "text-text/50"
          }`}
        >
          {en}
        </span>
      </div>
      <h2 className={`heading-ja fluid-h2 mt-5 ${dark ? "text-white" : ""}`}>
        {ja}
      </h2>
    </div>
  );
}
