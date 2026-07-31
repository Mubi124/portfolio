"use client";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop:      "1px solid var(--color-border)",
        padding:        "2rem 3rem",
        background:     "var(--color-bg)",
      }}
    >
      <div
        className="footer-container"
        style={{
          maxWidth:       "1240px",
          margin:         "0 auto",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          flexWrap:       "wrap",
          gap:            "1rem",
        }}
      >
        {/* Left: Logo */}
        <span
          style={{
            fontFamily:    "var(--font-display)",
            fontWeight:    800,
            fontSize:      "0.95rem",
            letterSpacing: "-0.02em",
            color:         "var(--color-text)",
          }}
        >
          Mubashir Ali
        </span>

        {/* Center: copyright */}
        <p
          style={{
            fontSize:      "0.8rem",
            color:         "var(--color-muted)",
            textAlign:     "center",
            letterSpacing: "0.02em",
          }}
        >
          © 2026 · UX/UI &amp; Product Designer · Lahore, Pakistan
        </p>

        {/* Right: social links */}
        <div className="footer-socials" style={{ display: "flex", gap: "1.5rem" }}>
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/mubashir-ali-design/" },
            { label: "Behance", href: "https://www.behance.net/mubashirali512" },
            { label: "Figma", href: "https://www.figma.com/design/wVKfD2BtFeiXymCvYZOWno/Portfolio" },
            { label: "Blog", href: "/blog" },
            { label: "Email", href: "mailto:mubashirjaffari@gmail.com" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{
                color:          "var(--color-muted)",
                textDecoration: "none",
                fontSize:       "0.8rem",
                transition:     "color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-accent)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-muted)"; }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          footer { padding: 3rem 1.5rem !important; }
          .footer-container { flex-direction: column !important; justify-content: center !important; text-align: center !important; gap: 2rem !important; }
          .footer-socials { justify-content: center !important; width: 100% !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          footer { padding: 3rem 2rem !important; }
          .footer-container { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
          .footer-container p { grid-column: span 2; order: 3; }
          .footer-socials { justify-content: flex-end !important; }
        }
      `}</style>
    </footer>
  );
}
