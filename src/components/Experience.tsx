"use client";
import { useEffect, useRef } from "react";

const experiences = [
  {
    role: "Senior UI/UX & Product Designer",
    company: "SparkAI",
    location: "Dubai, UAE",
    duration: "Feb 2025 – Mar 2026",
    type: "Full-time · Remote",
    current: true,
    points: [
      "Led end-to-end UI/UX for AI-powered SaaS products across web and mobile",
      "Built and governed a scalable Figma design system — improved handoff efficiency by 40%",
      "Ran usability testing cycles — lifted measured usability by 30%",
      "Embedded AI workflows (Figma AI, ChatGPT, Claude) into daily practice",
      "Mentored junior designers across concurrent projects",
    ],
  },
  {
    role: "Senior UI/UX Designer",
    company: "Core Edge Solutions",
    location: "Lahore, Pakistan",
    duration: "Mar 2023 – Feb 2025",
    type: "Full-time · Remote",
    current: false,
    points: [
      "Owned design for multiple concurrent SaaS products — wireframes through shipped UI",
      "Redesigned SaaS marketing platform — delivered 40% uplift in lead conversion",
      "Shipped production pages via Webflow and Framer",
      "Built shared design system and brand guidelines across 2–4 client projects",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "HAZTECH",
    location: "Lahore, Pakistan",
    duration: "Nov 2022 – Nov 2023",
    type: "Full-time · On-site",
    current: false,
    points: [
      "Designed healthcare and telemedicine interfaces across 6 major projects",
      "Built and maintained design systems and style guides",
      "Validated designs through moderated usability testing",
    ],
  },
  {
    role: "UI/UX Designer",
    company: "NS IT & Marketing",
    location: "Lahore, Pakistan",
    duration: "Dec 2020 – Nov 2022",
    type: "Full-time",
    current: false,
    points: [
      "Designed end-to-end UI/UX for SaaS and eCommerce platforms",
      "Built Figma design systems used across internal teams",
      "Optimized onboarding, checkout, and lead capture flows through iterative testing",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" style={{ padding: "7rem 0", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: "3.5rem" }}>
          <p className="eyebrow">Career</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Experience
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {experiences.map((exp, i) => (
            <div
              key={exp.company}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)}`}
              style={{
                background:   "var(--color-bg)",
                border:       `1px solid ${exp.current ? "rgba(232,201,122,0.3)" : "var(--color-border)"}`,
                borderRadius: "20px",
                padding:      "2rem",
                transition:   "border-color 0.3s",
              }}
              onMouseEnter={(e) => { if (!exp.current) (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent-dim)"; }}
              onMouseLeave={(e) => { if (!exp.current) (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)"; }}
            >
              {/* Card header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.3rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>
                      {exp.company}
                    </h3>
                    {exp.current && (
                      <span style={{ background: "rgba(232,201,122,0.12)", color: "var(--color-accent)", fontSize: "0.68rem", padding: "0.2rem 0.65rem", borderRadius: "100px", border: "1px solid rgba(232,201,122,0.25)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
                        Current
                      </span>
                    )}
                    <span style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-muted)", fontSize: "0.68rem", padding: "0.2rem 0.65rem", borderRadius: "100px", letterSpacing: "0.04em" }}>
                      {exp.type}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}>
                    {exp.role} · {exp.location}
                  </p>
                </div>
                <span style={{ fontSize: "0.8rem", color: "var(--color-muted)", flexShrink: 0, paddingTop: "0.2rem" }}>
                  {exp.duration}
                </span>
              </div>

              {/* Bullet points */}
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {exp.points.map((point, j) => (
                  <li key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--color-accent)", fontSize: "0.9rem", flexShrink: 0, marginTop: "0.1rem" }}>→</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.65 }}>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #experience { padding: 4rem 1.5rem !important; }
          #experience h3 { font-size: 1rem !important; }
          #experience p { font-size: 0.8rem !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          #experience { padding: 5rem 2rem !important; }
        }
      `}</style>
    </section>
  );
}
