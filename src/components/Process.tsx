"use client";
import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discover & Define",
    description:
      "I start by understanding your users, business goals, and constraints — stakeholder interviews, competitive audits, user research, and defining the problem clearly before touching any UI.",
  },
  {
    number: "02",
    title: "UX Strategy & Design",
    description:
      "From research insights, I build user flows, information architecture, wireframes, and interactive prototypes. Every decision ties back to user needs and business outcomes — not aesthetics alone.",
  },
  {
    number: "03",
    title: "High-Fidelity UI & Handoff",
    description:
      "Polished, pixel-perfect UI in Figma — with a scalable design system, component documentation, and dev-ready specs. I stay involved through implementation to ensure quality.",
  },
];

function ProcessCard({ step, i }: { step: { number: string; title: string; description: string }, i: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`reveal reveal-delay-${i + 1}`}
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "20px", padding: "2rem" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: "4rem", fontWeight: 800, color: isHovered ? "var(--color-accent)" : "var(--color-border)", lineHeight: 1, marginBottom: "1.5rem", letterSpacing: "-0.06em", transition: "color 0.3s ease" }}>
        {step.number}
      </div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
        {step.title}
      </h3>
      <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", lineHeight: 1.75 }}>
        {step.description}
      </p>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} id="process" style={{ padding: "7rem 0", background: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}>
      <div className="section-container">
        <div className="reveal" style={{ marginBottom: "3.5rem" }}>
          <p className="eyebrow">How I Work</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1rem" }}>
            My Process
          </h2>
          <p style={{ color: "var(--color-muted)", maxWidth: "520px", lineHeight: 1.7 }}>
            Every project follows a structured process — not a rigid one. I adapt the depth of each phase to fit the project scope, timeline, and team maturity.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }} className="process-grid">
          {steps.map((step, i) => (
            <ProcessCard key={step.number} step={step} i={i} />
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .process-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
