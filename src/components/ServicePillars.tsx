"use client";

import { useEffect, useRef } from "react";

const pillars = [
  {
    num: "01",
    title: "SaaS & Web Applications",
    description:
      "End-to-end engineering for modern SaaS products — from database schema and auth to polished, production-ready React UI.",
    stack: ["React", "Next.js", "Supabase", "TypeScript", "Framer Motion"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "E-commerce & B2B Infrastructure",
    description:
      "Headless storefronts and international wholesale catalog systems built for scale — optimised for export manufacturers and global distributor checkouts.",
    stack: ["Medusa.js", "Next.js", "Tailwind CSS", "REST APIs", "Framer Motion"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

export default function ServicePillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="service-pillars"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        padding: "7rem 3rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "0.8rem",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
            }}
          >
            Specialisations
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
              marginBottom: "1rem",
            }}
          >
            What I Build
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Two focused engineering disciplines — each serving a distinct market need,
            both built to production standard.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="pillars-grid">
          {pillars.map((pillar, i) => (
            <div key={pillar.num} className={`pillar-card reveal reveal-delay-${i + 1}`}>

              {/* Icon + number row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "rgba(232, 201, 122, 0.07)",
                    border: "1px solid rgba(232, 201, 122, 0.2)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    flexShrink: 0,
                  }}
                >
                  {pillar.icon}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "3.5rem",
                    fontWeight: 900,
                    color: "rgba(232, 201, 122, 0.08)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {pillar.num}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 2.2vw, 1.75rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.75,
                  marginBottom: "2rem",
                  flex: 1,
                }}
              >
                {pillar.description}
              </p>

              {/* Divider */}
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid var(--color-border)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Tech stack pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {pillar.stack.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (max-width: 767px) {
          #service-pillars { padding: 4rem 1.5rem !important; }
          .pillars-grid { grid-template-columns: 1fr !important; }
          .pillar-card { padding: 2rem !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          #service-pillars { padding: 5rem 2rem !important; }
        }
      `}</style>
    </section>
  );
}
