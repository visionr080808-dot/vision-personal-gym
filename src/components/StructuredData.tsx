import { site, priceGroups } from "@/src/data/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pt-vision.com";

export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: site.fullName,
    description: site.description,
    url: siteUrl,
    telephone: site.tel,
    email: site.email,
    image: `${siteUrl}/images/hero-5.jpg`,
    logo: `${siteUrl}/images/logo.jpg`,
    priceRange: site.priceRange,
    address: {
      "@type": "PostalAddress",
      addressRegion: "岡山県",
      addressLocality: "苫田郡鏡野町上森原",
      streetAddress: "353-3",
      addressCountry: "JP",
    },
    sameAs: [site.instagram, site.line],
    makesOffer: priceGroups.flatMap((g) =>
      g.plans.map((p) => ({
        "@type": "Offer",
        name: `${g.name} ${p.name}`,
        price: p.total.replace(/,/g, ""),
        priceCurrency: "JPY",
      }))
    ),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
