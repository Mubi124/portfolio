import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import Script from "next/script";
import CustomCursor from "@/components/CustomCursor";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mubashiralidesign.com"),
  title: {
    default: "Mubashir Ali | Senior Product Engineer — Headless E-commerce & B2B Wholesale Platforms",
    template: "%s | Mubashir Ali — Senior Product Engineer",
  },
  description: "Senior Product Engineer & Frontend Developer with 5+ years building scalable SaaS applications, headless Medusa.js storefronts, and B2B wholesale catalog systems. Specialising in Next.js, Supabase, and international e-commerce infrastructure for export manufacturers.",
  keywords: [
    "Senior Product Engineer", "Headless E-commerce Developer", "B2B Wholesale Catalog",
    "Medusa.js Developer", "Supabase Developer", "Next.js Developer Pakistan",
    "Sialkot Export Platform", "International Wholesale System", "React Developer Lahore",
    "SaaS Developer", "B2B E-commerce Engineer", "Headless Commerce",
    "Framer Motion Developer", "Tailwind CSS Developer", "TypeScript Engineer",
    "Surgical Instruments Digital Catalog", "Sportswear Wholesale Platform",
    "Frontend Developer Pakistan", "API-First Commerce", "Supabase SaaS"
  ],
  authors: [{ name: "Mubashir Ali", url: "https://www.mubashiralidesign.com" }],
  creator: "Mubashir Ali",
  publisher: "Mubashir Ali",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: { canonical: "https://www.mubashiralidesign.com" },
  openGraph: {
    type: "website",
    url: "https://www.mubashiralidesign.com",
    siteName: "Mubashir Ali — Senior Product Engineer",
    locale: "en_US",
    title: "Mubashir Ali | Senior Product Engineer — Headless E-commerce & B2B Wholesale Platforms",
    description: "5+ years engineering scalable SaaS, headless Medusa.js storefronts, and B2B wholesale catalog systems for international export manufacturers. Next.js, Supabase, Framer Motion.",
    images: [{
      url: "https://www.mubashiralidesign.com/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Mubashir Ali — Senior Product Engineer Portfolio",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubashir Ali | Senior Product Engineer",
    description: "5+ years building headless e-commerce & B2B SaaS platforms. Next.js, Medusa.js, Supabase. Available for international wholesale projects.",
    images: [{ url: "https://www.mubashiralidesign.com/og-image.jpg", alt: "Mubashir Ali — Senior Product Engineer" }],
  },
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
      jobTitle: "Senior Product Engineer & Frontend Developer",
      description: "Senior Product Engineer & Frontend Developer with 5+ years of experience building scalable SaaS applications, headless Medusa.js storefronts, and B2B wholesale catalog systems for international export manufacturers.",
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
        "React", "Next.js", "TypeScript", "Medusa.js",
        "Supabase", "PostgreSQL", "Tailwind CSS", "Framer Motion",
        "Headless Commerce", "B2B E-commerce", "SaaS Architecture",
        "REST API Design", "Node.js", "Git & CI/CD",
        "B2B Wholesale Catalog Systems", "International E-commerce",
        "Sialkot Export Manufacturers", "Performance Engineering", "Core Web Vitals",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Senior Product Engineer",
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
      name: "Mubashir Ali — Senior Product Engineer",
      description: "Portfolio of Mubashir Ali, Senior Product Engineer specialising in SaaS, headless e-commerce, and B2B wholesale platforms.",
      publisher: { "@id": "https://www.mubashiralidesign.com/#person" },
      inLanguage: "en-US",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.mubashiralidesign.com/#profilepage",
      url: "https://www.mubashiralidesign.com",
      name: "Mubashir Ali | Senior Product Engineer Portfolio",
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
      <body suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
