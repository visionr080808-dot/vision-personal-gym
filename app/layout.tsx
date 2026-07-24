import type { Metadata } from "next";
import { Outfit, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { site } from "@/src/data/site";
import { StructuredData } from "@/src/components/StructuredData";
import { Analytics } from "@/src/components/Analytics";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pt-vision.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.fullName} | 岡山県苫田郡鏡野町のパーソナルジム`,
  description: site.description,
  keywords: [
    "VISION",
    "VISION Personal Gym",
    "パーソナルジム",
    "鏡野町",
    "岡山",
    "ダイエット",
    "ボディメイク",
    "ピラティス",
    "姿勢改善",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    title: `${site.fullName} | 岡山県苫田郡鏡野町のパーソナルジム`,
    description: site.description,
    siteName: site.fullName,
    images: [{ url: "/images/gym-interior.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} | 岡山県苫田郡鏡野町のパーソナルジム`,
    description: site.description,
    images: ["/images/gym-interior.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${outfit.variable} ${noto.variable}`}>
      <body>
        <StructuredData />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
