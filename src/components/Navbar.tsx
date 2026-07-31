"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Work",       href: "/#projects"   },
  { name: "Process",    href: "/#process"    },
  { name: "Services",   href: "/#services"   },
  { name: "Experience", href: "/#experience" },
  { name: "FAQ",        href: "/#faq"        },
  { name: "Blog",       href: "/blog"        },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: "sticky",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: "1.1rem 3rem",
    transition: "background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
    background: scrolled ? "rgba(10, 10, 10, 0.85)" : "rgba(10, 10, 10, 0.65)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid rgba(255, 255, 255, 0.08)",
  };

  const linkStyle: React.CSSProperties = {
    color: "var(--color-muted)",
    textDecoration: "none",
    fontSize: "0.875rem",
    letterSpacing: "0.02em",
    transition: "color 0.2s",
    fontFamily: "var(--font-body)",
  };

  return (
    <nav style={navStyle}>
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => {
            if (typeof window !== "undefined" && window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.1rem",
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            textDecoration: "none",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          Mubashir
        </a>

        {/* Desktop nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="/#contact"
            style={{
              background: "var(--color-accent)",
              color: "#0a0a0a",
              padding: "0.55rem 1.4rem",
              borderRadius: "100px",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-accent-hover)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-accent)";
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            Let&apos;s Talk
          </a>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text)",
              fontSize: "1.5rem",
              lineHeight: 1,
              padding: "0.25rem",
              display: "none",
              zIndex: 1000,
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown / overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#0a0a0a",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "2rem",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          /* tablet specific if needed, but nav seems okay on tablet */
        }
      `}</style>
    </nav>
  );
}
