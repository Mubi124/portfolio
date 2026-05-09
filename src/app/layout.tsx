import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const DOMAIN = "https://mubashirali.design";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Mubashir Ali | Senior UI/UX & Product Designer",
    template: "%s | Mubashir Ali",
  },
  description:
    "Senior UI/UX and Product Designer specializing in high-fidelity SaaS platforms, B2B dashboards, and scalable design systems.",
  keywords: ["UI/UX Designer", "Product Designer", "SaaS Design", "Frontend Developer", "Lahore", "Remote Designer"],
  authors: [{ name: "Mubashir Ali", url: "https://yourdomain.com" }],
  creator: "Mubashir Ali",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://yourdomain.com" },
  openGraph: {
    type: "website",
    url: "https://yourdomain.com",
    siteName: "Mubashir Ali Portfolio",
    locale: "en_US",
    title: "Mubashir Ali | Senior UI/UX & Product Designer",
    description:
      "Senior UI/UX and Product Designer specializing in high-fidelity SaaS platforms, B2B dashboards, and scalable design systems.",
    images: [
      {
        url: `https://yourdomain.com/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Mubashir Ali — Senior UI/UX & Product Designer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubashir Ali | Senior UI/UX & Product Designer",
    description:
      "Senior UI/UX and Product Designer specializing in high-fidelity SaaS platforms, B2B dashboards, and scalable design systems.",
    images: [{ url: `https://yourdomain.com/og-image.jpg`, alt: "Mubashir Ali UI/UX Designer Portfolio" }],
  },
  icons: { icon: "/favicon.ico" },
  other: { "theme-color": "#0a0a0a" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${DOMAIN}/#person`,
      name: "Mubashir Ali",
      givenName: "Mubashir",
      familyName: "Ali",
      jobTitle: "Senior UI/UX & Product Designer",
      description:
        "Senior UI/UX & Product Designer with 5+ years of experience designing scalable SaaS, B2B, and eCommerce products for startups and growing companies.",
      url: DOMAIN,
      email: "mubashirjaffari@gmail.com",
      telephone: "+923121844917",
      image: `${DOMAIN}/images/mubashir.jpg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressRegion: "Punjab",
        addressCountry: "PK",
      },
      sameAs: [
        "https://www.linkedin.com/in/mubashir-ali-design/",
        "https://www.figma.com/design/wVKfD2BtFeiXymCvYZOWno/Portfolio",
      ],
      knowsAbout: [
        "UI Design", "UX Design", "Product Design", "SaaS Product Design",
        "Design Systems", "Figma", "Webflow", "Framer",
        "User Research", "Usability Testing", "eCommerce UX", "B2B Dashboard Design",
      ],
      worksFor: {
        "@type": "Organization",
        name: "SparkAI",
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
      },
    },
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      url: DOMAIN,
      name: "Mubashir Ali — UI/UX & Product Designer",
      publisher: { "@id": `${DOMAIN}/#person` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/mubashir.jpg" />
        <Script
          id="json-ld-person"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
