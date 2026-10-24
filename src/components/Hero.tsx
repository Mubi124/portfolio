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
        position: "relative",
        overflow: "hidden",
        /* Note: top/bottom padding is handled globally by var(--section-gap) */
      }}
    >
      {/* Ambient glow — subtle radial gradient behind content */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Top Label */}
      <div
        className="fade-up fade-up-1"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1rem",
          background: "rgba(232, 201, 122, 0.05)",
          border: "1px solid rgba(232, 201, 122, 0.2)",
          borderRadius: "100px",
          marginBottom: "2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          className="pulse"
          style={{
            width: "8px",
            height: "8px",
            background: "var(--color-accent)",
            borderRadius: "50%",
            boxShadow: "0 0 10px var(--color-accent)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Open to Product Design Roles &amp; SaaS Projects
        </span>
      </div>

      {/* Main Heading */}
      <h1
        className="hero-title fade-up fade-up-2"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3rem, 7vw, 5.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          color: "var(--color-text-primary)",
          maxWidth: "900px",
          marginBottom: "1.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        Senior UI/UX &amp;
        <br />
        <span style={{ color: "var(--color-accent)" }}>Product Designer</span>
      </h1>

      {/* Sub-paragraph */}
      <p
        className="hero-desc fade-up fade-up-3"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
          color: "var(--color-text-secondary)",
          lineHeight: 1.7,
          maxWidth: "640px",
          marginBottom: "3rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        I design web and mobile SaaS products, dashboards, and Figma design systems for B2B and B2C teams, and work closely with developers to ship them with design fidelity. I also have working knowledge of HTML, CSS, JavaScript, and React.
      </p>

      {/* Call to Action Buttons */}
      <div
        className="hero-buttons fade-up fade-up-4"
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <a
          href="#selected-projects"
          className="hero-btn"
          style={{
            padding: "1rem 2rem",
            background: "var(--color-accent)",
            color: "#000",
            fontWeight: 700,
            borderRadius: "8px",
            textDecoration: "none",
            transition: "transform 0.2s ease, background 0.2s ease",
            textAlign: "center",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-2px)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
        >
          See B2B Projects
        </a>
        <a
          href="#contact"
          className="hero-btn"
          style={{
            padding: "1rem 2rem",
            background: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-primary)",
            fontWeight: 600,
            borderRadius: "8px",
            textDecoration: "none",
            transition: "border-color 0.2s ease, transform 0.2s ease",
            textAlign: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-accent)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
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
          .hero-glow { width: 320px !important; height: 320px !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          .hero-title { font-size: 3.5rem !important; }
          .hero-desc { font-size: 1rem !important; }
        }
      `}</style>
    </section>
  );
}