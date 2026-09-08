"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    num: "01",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: "SaaS Application Development",
    description: "Full-stack SaaS product engineering — authentication, database architecture, API design, and polished React UI — shipped to production standard.",
    deliverables: ["Next.js App Router (full-stack)", "Supabase auth & PostgreSQL", "REST / tRPC API design", "TypeScript throughout"],
  },
  {
    num: "02",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: "Headless E-commerce Storefronts",
    description: "Custom Medusa.js backends paired with high-performance Next.js frontends — optimised for international wholesale flows, multi-currency, and B2B buyer portals.",
    deliverables: ["Medusa.js storefront & admin", "B2B checkout & buyer portal", "Inventory & product APIs", "Multi-currency & tax logic"],
  },
  {
    num: "03",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "B2B Wholesale Catalog Systems",
    description: "International product catalog architecture for export manufacturers — structured for EU and North American buyer UX, with bulk ordering and PDF export capability.",
    deliverables: ["Product schema & taxonomy", "Bulk ordering & MOQ logic", "PDF catalog generation", "Buyer-facing portal & filters"],
  },
  {
    num: "04",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Frontend Engineering & UI Systems",
    description: "Pixel-perfect, fully responsive frontends built with React and Tailwind CSS, animated with Framer Motion — component libraries and design-token systems included.",
    deliverables: ["React component libraries", "Tailwind CSS design tokens", "Framer Motion animations", "WCAG-compliant responsive UI"],
  },
  {
    num: "05",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
    title: "API Integration & Backend Services",
    description: "Connecting storefronts and SaaS products to ERP systems, shipping APIs, payment gateways, and third-party wholesale platforms via reliable webhook pipelines.",
    deliverables: ["Stripe / PayPal integration", "Shipment & logistics APIs", "ERP & CRM connectors", "Webhook & event pipelines"],
  },
  {
    num: "06",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Performance & SEO Engineering",
    description: "Core Web Vitals optimisation, server-side rendering strategies, and structured data markup for international search visibility — measured, not guessed.",
    deliverables: ["LCP / CLS / INP audits", "SSR / ISR / Edge strategy", "Schema.org structured data", "Sitemap & robots engineering"],
  },
];

export default function Services() {
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCardClick = (index: number) => {
    if (flippedIndex === index) {
      setFlippedIndex(null);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    setFlippedIndex(index);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setFlippedIndex(null);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{
        padding: "7rem 3rem",
        background: "var(--color-bg)",
        maxWidth: "1200px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* Section header */}
      <div className="reveal" style={{ marginBottom: "4rem" }}>
        <p style={{
          fontSize: "0.75rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--color-accent)",
          marginBottom: "0.8rem",
          fontFamily: "var(--font-body)",
        }}>
          Services
        </p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          marginBottom: "1.2rem",
          color: "var(--color-text)",
        }}>
          How I Deliver
        </h2>
        <p style={{
          fontSize: "1rem",
          color: "var(--color-muted)",
          lineHeight: 1.7,
          maxWidth: "560px",
        }}>
          From scalable SaaS architecture to production-ready B2B storefronts — engineered to perform in international markets.
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem",
      }}>
        {services.map((service, i) => (
          <div
            key={i}
            className={`reveal reveal-delay-${i}`}
            onClick={() => handleCardClick(i)}
            style={{
              perspective: "1200px",
              minHeight: "430px",
              cursor: "pointer",
            }}
          >
            {/* Inner flipper — THIS is what rotates */}
            <div
              className="card-inner"
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                minHeight: "430px",
                transformStyle: "preserve-3d",           /* CRITICAL */
                transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: flippedIndex === i ? "rotateY(180deg)" : "rotateY(0deg)",
              }}
            >

              {/* ── FRONT FACE ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",           /* CRITICAL */
                  WebkitBackfaceVisibility: "hidden",     /* Safari fix */
                  transform: "rotateY(0deg)",             /* faces viewer */
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "20px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {/* Icon */}
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "rgba(232, 201, 122, 0.08)",
                  border: "1px solid rgba(232, 201, 122, 0.2)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-accent)",
                  marginBottom: "1.8rem",
                  flexShrink: 0,
                }}>
                  {service.icon}
                </div>

                {/* Number */}
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  marginBottom: "0.5rem",
                }}>
                  {service.num}
                </p>

                {/* Title */}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.3,
                  flex: 1,
                }}>
                  {service.title}
                </h3>

                {/* Hint */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.78rem",
                  color: "var(--color-muted)",
                  marginTop: "1.5rem",
                }}>
                  Click to explore
                  <span style={{ color: "var(--color-accent)" }}>→</span>
                </div>
              </div>

              {/* ── BACK FACE ── */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backfaceVisibility: "hidden",           /* CRITICAL */
                  WebkitBackfaceVisibility: "hidden",     /* Safari fix */
                  transform: "rotateY(180deg)",           /* pre-rotated AWAY */
                  background: "rgba(232, 201, 122, 0.06)",
                  border: "1px solid rgba(232, 201, 122, 0.25)",
                  borderRadius: "20px",
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {/* Title */}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.8rem",
                  lineHeight: 1.3,
                }}>
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: "0.875rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.75,
                  marginBottom: "1.5rem",
                }}>
                  {service.description}
                </p>

                {/* Deliverables */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {service.deliverables.map((item, j) => (
                    <div key={j} style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontSize: "0.82rem",
                      color: "var(--color-muted)",
                      lineHeight: 1.6,
                    }}>
                      <span style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.1rem" }}>·</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* end card-inner */}
          </div>
        ))}
      </div>

      {/* Flip hover CSS */}
      <style>{`
        /* Responsive */
        @media (max-width: 767px) {
          #services { padding: 4rem 1.5rem !important; }
          #services > div:last-child {
            grid-template-columns: 1fr !important;
          }
          /* On mobile — no flip, show back content always */
          .card-inner {
            transform: none !important;
            transform-style: flat !important;
          }
          .card-inner > div:first-child {
            display: none !important;
          }
          .card-inner > div:last-child {
            position: relative !important;
            transform: none !important;
            backface-visibility: visible !important;
            -webkit-backface-visibility: visible !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          #services { padding: 5rem 2rem !important; }
          #services > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

    </section>
  );
}