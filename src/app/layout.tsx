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
  metadataBase: new URL("https://www.mubashiralidesign.com"),
  title: {
    default: "Mubashir Ali | Senior UI/UX & Product Designer — SaaS, B2B, eCommerce",
    template: "%s | Mubashir Ali — UI/UX Designer",
  },
  description: "Senior UI/UX & Product Designer with 5+ years experience designing scalable SaaS, B2B, and eCommerce products. Specialist in Figma, design systems, and high-fidelity prototypes. Available for remote work globally.",
  keywords: [
    "UI/UX Designer", "Product Designer", "SaaS Designer", "B2B Dashboard Design",
    "Figma Expert", "Design Systems", "eCommerce UX", "Mobile App Designer",
    "Remote UI Designer", "Lahore Designer", "Senior UX Designer",
    "Webflow Designer", "Framer Designer", "User Research", "Usability Testing",
    "UI Designer for hire", "Freelance UI/UX Designer", "Pakistani Designer",
    "AI Product Designer", "SaaS UI Designer"
  ],
  authors: [{ name: "Mubashir Ali", url: "https://www.mubashiralidesign.com" }],
  creator: "Mubashir Ali",
  publisher: "Mubashir Ali",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  alternates: { canonical: "https://www.mubashiralidesign.com" },
  openGraph: {
    type: "website",
    url: "https://www.mubashiralidesign.com",
    siteName: "Mubashir Ali — Senior UI/UX & Product Designer",
    locale: "en_US",
    title: "Mubashir Ali | Senior UI/UX & Product Designer — SaaS, B2B, eCommerce",
    description: "5+ years designing scalable SaaS, B2B, and eCommerce products. Figma expert. Design systems specialist. Available for remote work.",
    images: [{
      url: "https://www.mubashiralidesign.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Mubashir Ali — Senior UI/UX & Product Designer Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubashir Ali | Senior UI/UX & Product Designer",
    description: "5+ years designing SaaS, B2B & eCommerce products. Figma expert. Remote designer.",
    images: [{ url: "https://www.mubashiralidesign.com/og-image.jpg", alt: "Mubashir Ali UI/UX Designer" }],
  },
  icons: { icon: "/favicon.ico" },
  other: { "theme-color": "#0a0a0a" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.mubashiralidesign.com/#person",
      name: "Mubashir Ali",
      givenName: "Mubashir",
      familyName: "Ali",
      jobTitle: "Senior UI/UX & Product Designer",
      description: "Senior UI/UX & Product Designer with 5+ years of experience designing scalable SaaS, B2B, and eCommerce products for startups and growing companies. Specialist in Figma, design systems, and high-fidelity prototypes.",
      url: "https://www.mubashiralidesign.com",
      email: "mubashirjaffari@gmail.com",
      telephone: "+923121844917",
      image: "https://www.mubashiralidesign.com/images/mubashir.jpg",
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
        "B2B Dashboard Design", "eCommerce UX", "Design Systems", "Figma",
        "Webflow", "Framer", "User Research", "Usability Testing",
        "Mobile App Design", "Wireframing", "Prototyping", "AI-Augmented Design",
        "WCAG Accessibility", "Conversion Rate Optimization"
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "UI/UX Designer",
        occupationLocation: { "@type": "Country", name: "Pakistan" },
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          currency: "USD",
          unitText: "YEAR"
        }
      },
      worksFor: {
        "@type": "Organization",
        name: "SparkAI",
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Central Punjab",
        address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" }
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.mubashiralidesign.com/#website",
      url: "https://www.mubashiralidesign.com",
      name: "Mubashir Ali — Senior UI/UX & Product Designer",
      description: "Portfolio of Mubashir Ali, Senior UI/UX & Product Designer specializing in SaaS, B2B, and eCommerce products.",
      publisher: { "@id": "https://www.mubashiralidesign.com/#person" },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.mubashiralidesign.com/#profilepage",
      url: "https://www.mubashiralidesign.com",
      name: "Mubashir Ali | Senior UI/UX & Product Designer Portfolio",
      about: { "@id": "https://www.mubashiralidesign.com/#person" },
      mainEntity: { "@id": "https://www.mubashiralidesign.com/#person" }
    }
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
