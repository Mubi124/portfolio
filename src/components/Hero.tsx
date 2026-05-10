"use client";

export default function Hero() {
  return (
    <section 
      id="hero"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "90vh",
        textAlign: "center",
        padding: "0 2rem",
        /* Note: top/bottom padding is handled globally by var(--section-gap) */
      }}
    >
      {/* Top Label */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 1rem",
        background: "rgba(232, 201, 122, 0.05)",
        border: "1px solid rgba(232, 201, 122, 0.2)",
        borderRadius: "100px",
        marginBottom: "2rem",
      }}>
        <span style={{ 
          width: "8px", 
          height: "8px", 
          background: "var(--color-accent)", 
          borderRadius: "50%",
          boxShadow: "0 0 10px var(--color-accent)"
        }}></span>
        <span style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--color-accent)",
          letterSpacing: "0.1em",
          textTransform: "uppercase"
        }}>
          Available for New Opportunities
        </span>
      </div>

      {/* Main Heading - Adjusted clamp for better scaling */}
      <h1 className="hero-title" style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(3rem, 7vw, 5.5rem)", 
        fontWeight: 900,
        lineHeight: 1.05,
        letterSpacing: "-0.03em",
        color: "var(--color-text-primary)",
        maxWidth: "900px",
        marginBottom: "1.5rem",
      }}>
        Senior UI/UX <br />
        <span style={{ color: "var(--color-accent)" }}>& Product Designer</span>
      </h1>

      {/* Sub-paragraph - Increased size and legibility */}
      <p className="hero-desc" style={{
        fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
        color: "var(--color-text-secondary)", /* Uses new accessible variable */
        lineHeight: 1.6,
        maxWidth: "600px",
        marginBottom: "3rem",
      }}>
        Crafting high-fidelity interfaces and scalable design systems for forward-thinking tech companies. I design from evidence, not assumptions.
      </p>

      {/* Call to Action Buttons */}
      <div className="hero-buttons" style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
      }}>
        <a href="#selected-projects" className="hero-btn" style={{
          padding: "1rem 2rem",
          background: "var(--color-accent)",
          color: "#000",
          fontWeight: 700,
          borderRadius: "8px",
          textDecoration: "none",
          transition: "transform 0.2s ease",
          textAlign: "center"
        }}>
          View Work
        </a>
        <a href="#contact" className="hero-btn" style={{
          padding: "1rem 2rem",
          background: "transparent",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-primary)",
          fontWeight: 600,
          borderRadius: "8px",
          textDecoration: "none",
          transition: "background 0.2s ease",
          textAlign: "center"
        }}>
          Let&apos;s Talk
        </a>
      </div>

      <style>{`
        #hero { padding: 0 2rem; }
        .hero-title { font-size: clamp(3rem, 7vw, 5.5rem); }
        .hero-desc { font-size: clamp(1.1rem, 2vw, 1.25rem); }
        .hero-buttons { flex-direction: row; }

        @media (max-width: 767px) {
          #hero { padding: 0 1.5rem !important; }
          .hero-title { font-size: 2rem !important; }
          .hero-desc { font-size: 0.9rem !important; }
          .hero-buttons { flex-direction: column !important; width: 100%; }
          .hero-btn { width: 100%; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .hero-title { font-size: 3.5rem !important; }
          .hero-desc { font-size: 1rem !important; }
        }
      `}</style>
    </section>
  );
}