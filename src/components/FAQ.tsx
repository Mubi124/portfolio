"use client";
import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    q: "What types of projects do you take on?",
    a: "Primarily SaaS products, B2B dashboards, eCommerce apps, and marketing websites. I work best on projects where design directly impacts user retention or conversion — not just visual polish.",
  },
  {
    q: "Are you available for freelance projects right now?",
    a: "Yes — I take on select freelance and contract projects alongside my primary work. If you have a project in mind, reach out and we'll figure out if it's a good fit.",
  },
  {
    q: "Do you work with early-stage startups?",
    a: "Yes, and I enjoy it. Early-stage work is where good UX strategy makes the biggest difference. I've helped startups define their product from scratch and avoid costly design mistakes early.",
  },
  {
    q: "What does your design handoff process look like?",
    a: "Everything delivered in Figma with named components, token-based styles, interactive prototypes, and annotated developer specs. I also offer implementation review to ensure design quality through development.",
  },
  {
    q: "Can you work with an existing design system?",
    a: "Absolutely. I've joined projects mid-stream and extended existing Figma design systems without breaking them. I can also audit and improve governance documentation.",
  },
  {
    q: "Do you do front-end development?",
    a: "I produce live websites via Webflow and Framer with production-ready output. I have working knowledge of HTML and CSS. I'm a designer first — my value is in the design layer.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section ref={sectionRef} id="faq" style={{ padding: "7rem 0", background: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="section-container" style={{ maxWidth: "800px" }}>
        <div className="reveal" style={{ marginBottom: "3.5rem", textAlign: "center" }}>
          <p className="eyebrow">Questions</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="reveal reveal-delay-1">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid var(--color-border)",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width:           "100%",
                    textAlign:       "left",
                    background:      "none",
                    border:          "none",
                    color:           "var(--color-text)",
                    fontFamily:      "var(--font-body)",
                    fontSize:        "1rem",
                    padding:         "1.5rem 0",
                    display:         "flex",
                    justifyContent:  "space-between",
                    alignItems:      "center",
                    cursor:          "pointer",
                    gap:             "1rem",
                    lineHeight:      1.5,
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontWeight: isOpen ? 500 : 400 }}>{faq.q}</span>
                  <span
                    style={{
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      width:          "28px",
                      height:         "28px",
                      borderRadius:   "50%",
                      border:         `1px solid ${isOpen ? "var(--color-accent)" : "var(--color-border)"}`,
                      color:          isOpen ? "var(--color-accent)" : "var(--color-muted)",
                      fontSize:       "1.1rem",
                      flexShrink:     0,
                      transform:      isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition:     "transform 0.3s ease, color 0.3s, border-color 0.3s",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight:  isOpen ? "300px" : "0",
                    overflow:   "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >
                  <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", lineHeight: 1.75, paddingBottom: "1.5rem" }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
