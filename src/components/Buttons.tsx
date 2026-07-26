import type { ReactNode } from "react";

/** 主ボタン（塗り・シャープ・矢印） */
export function BtnFill({
  href,
  children,
  external = false,
  variant = "dark",
  full = false,
  icon,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "dark" | "light";
  full?: boolean;
  icon?: ReactNode;
}) {
  const cls =
    variant === "dark"
      ? "bg-accent text-white hover:bg-black"
      : "bg-white text-text hover:bg-white/90";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center justify-center gap-3 px-9 py-4 text-xs font-medium tracking-[0.15em] transition-colors ${cls} ${
        full ? "w-full sm:w-auto" : ""
      }`}
    >
      {icon}
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}

/** 副ボタン（枠線・シャープ） */
export function BtnLine({
  href,
  children,
  external = false,
  dark = false,
  full = false,
  icon,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  dark?: boolean;
  full?: boolean;
  icon?: ReactNode;
}) {
  const cls = dark
    ? "border-white/50 text-white hover:bg-white hover:text-text"
    : "border-text/30 text-text hover:bg-accent hover:text-white hover:border-accent";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-3 border px-9 py-4 text-xs font-medium tracking-[0.15em] transition-colors ${cls} ${
        full ? "w-full sm:w-auto" : ""
      }`}
    >
      {icon}
      {children}
    </a>
  );
}
