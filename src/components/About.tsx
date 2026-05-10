"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

const skills = [
  "SaaS Product Design", "UI/UX Design", "Design Systems", "Figma Advanced",
  "User Research", "Usability Testing", "Webflow", "Framer", "AI Workflows",
  "CRO", "WCAG 2.2", "Adobe Creative Suite",
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        padding:      "7rem 3rem",
        background:   "var(--color-surface)",
        borderTop:    "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          maxWidth:            "1200px",
          margin:              "0 auto",
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "5.5rem",
          alignItems:          "center",
        }}
        className="about-grid"
      >

        {/* ── LEFT: Photo ── */}
        <div
          className="reveal"
          style={{
            borderRadius: "20px",
            overflow:     "hidden",
            border:       "1px solid var(--color-border)",
            aspectRatio:  "3/4",
            background:   "var(--color-surface2)",
            position:     "relative",
            width:        "100%",
          }}
        >
          <Image
            src="/images/mubashir.jpg"
            alt="Mubashir Ali — Senior UI/UX & Product Designer based in Lahore, Pakistan"
            fill
            style={{ 
              objectFit: "cover", 
              objectPosition: "top",
              filter: "grayscale(100%) contrast(1.1) brightness(0.9)",
              transition: "filter 0.5s ease-in-out"
            }}
            onMouseEnter={(e) => e.currentTarget.style.filter = "grayscale(0%) contrast(1) brightness(1)"}
            onMouseLeave={(e) => e.currentTarget.style.filter = "grayscale(100%) contrast(1.1) brightness(0.9)"}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* ── RIGHT: Content ── */}
        <div className="reveal reveal-delay-1">

          {/* Eyebrow */}
          <p
            style={{
              fontSize:      "0.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         "var(--color-accent)",
              marginBottom:  "0.8rem",
            }}
          >
            About Me
          </p>

          {/* Heading */}
          <h2
            style={{
              fontFamily:    "var(--font-display)",
              fontSize:      "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight:    800,
              letterSpacing: "-0.04em",
              lineHeight:    1.1,
              color:         "var(--color-text)",
              marginBottom:  "1.5rem",
            }}
          >
            Meet Mubashir
          </h2>

          {/* Body paragraph 1 */}
          <p
            style={{
              fontSize:     "1.05rem",
              lineHeight:   1.8,
              color:        "var(--color-muted)",
              marginBottom: "1rem",
            }}
          >
            I&apos;m Mubashir, a Senior UI/UX &amp; Product Designer based in Lahore, Pakistan.
            I specialize in designing digital products that do two things well — they work for
            users, and they work for the business.
          </p>

          {/* Body paragraph 2 */}
          <p
            style={{
              fontSize:     "1.05rem",
              lineHeight:   1.8,
              color:        "var(--color-muted)",
              marginBottom: "2rem",
            }}
          >
            Over 5+ years, I&apos;ve owned end-to-end product design for SaaS platforms, B2B
            dashboards, and eCommerce apps — from initial research through shipped design
            systems and live implementations.
          </p>

          {/* Skills pills */}
          <div
            style={{
              display:  "flex",
              flexWrap: "wrap",
              gap:      "0.6rem",
            }}
          >
            {skills.map((s) => (
              <span
                key={s}
                style={{
                  background:   "var(--color-surface2)",
                  border:       "1px solid var(--color-border)",
                  borderRadius: "100px",
                  padding:      "0.4rem 1rem",
                  fontSize:     "0.8rem",
                  color:        "var(--color-muted)",
                  whiteSpace:   "nowrap",
                }}
              >
                {s}
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Responsive rules */}
      <style>{`
        @media (max-width: 767px) {
          #about { padding: 4rem 1.5rem !important; }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-grid > div:first-child {
            aspect-ratio: 4/3 !important;
          }
          .about-grid h2 { font-size: clamp(2rem, 8vw, 2.5rem) !important; }
          .about-grid p { font-size: 1rem !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          #about { padding: 5rem 2rem !important; }
          .about-grid {
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
