"use client";
import { useEffect, useRef, useActionState } from "react";
import { sendEmailAction } from "../actions/sendEmail";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(sendEmailAction, {});

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

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

  const inputStyle: React.CSSProperties = {
    width:          "100%",
    padding:        "0.9rem 1.2rem",
    background:     "var(--color-surface)",
    border:         "1px solid var(--color-border)",
    borderRadius:   "10px",
    color:          "var(--color-text)",
    fontFamily:     "var(--font-body)",
    fontSize:       "0.9rem",
    outline:        "none",
    transition:     "border-color 0.2s",
  };

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--color-accent)";
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "var(--color-border)";
  };

  return (
    <section ref={sectionRef} id="contact" style={{ padding: "7rem 0", background: "var(--color-surface)", borderTop: "1px solid var(--color-border)" }}>
      <div className="section-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }} className="contact-grid">

          {/* Left: CTA text */}
          <div className="reveal">
            {/* Available badge */}
            <div className="available-badge" style={{ marginBottom: "2rem" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", flexShrink: 0 }} className="pulse" />
              Available for Work
            </div>

            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "1.2rem" }}>
              Ready to Work<br />Together?
            </h2>
            <p style={{ color: "var(--color-muted)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "420px" }}>
              Whether you&apos;re building a product from scratch, redesigning something that isn&apos;t working, or need a reliable design partner for an ongoing project — let&apos;s talk.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2.5rem" }}>
              {[
                { icon: "✉", label: "mubashirjaffari@gmail.com", href: "mailto:mubashirjaffari@gmail.com" },
                { icon: "📱", label: "+92 312 1844917", href: "tel:+923121844917" },
                { icon: "📍", label: "Lahore, Pakistan · Available Remotely Worldwide", href: null },
              ].map((item, i) => (
                item.href ? (
                  <a key={i} href={item.href} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--color-muted)", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-text)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--color-muted)"; }}
                  >
                    <span style={{ width: "38px", height: "38px", border: "1px solid var(--color-border)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, background: "var(--color-surface2)" }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </a>
                ) : (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--color-muted)", fontSize: "0.9rem" }}>
                    <span style={{ width: "38px", height: "38px", border: "1px solid var(--color-border)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, background: "var(--color-surface2)" }}>
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                )
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/mubashir-ali-design/" },
                { label: "Figma Portfolio", href: "https://www.figma.com/design/wVKfD2BtFeiXymCvYZOWno/Portfolio" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ fontSize: "0.8rem", padding: "0.6rem 1.2rem" }}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="reveal reveal-delay-1">
            <form ref={formRef} action={formAction} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                  disabled={isPending}
                />
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                  disabled={isPending}
                />
              </div>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Subject"
                required
                style={inputStyle}
                onFocus={focusInput}
                onBlur={blurInput}
                disabled={isPending}
              />
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project..."
                required
                style={{ ...inputStyle, resize: "vertical", minHeight: "220px" }}
                onFocus={focusInput}
                onBlur={blurInput}
                disabled={isPending}
              />
              <button
                type="submit"
                disabled={isPending}
                className={`btn-primary ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
                style={{ justifyContent: "center", padding: "1rem 2rem", fontSize: "0.95rem" }}
              >
                {isPending ? "Sending..." : "Send Message →"}
              </button>

              {state?.success && (
                <div style={{ color: "#4ade80", background: "rgba(74, 222, 128, 0.1)", padding: "1rem", borderRadius: "8px", marginTop: "0.5rem", fontSize: "0.9rem", border: "1px solid rgba(74, 222, 128, 0.2)" }}>
                  Message sent successfully. I&apos;ll be in touch soon.
                </div>
              )}
              {state?.error && (
                <div style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.1)", padding: "1rem", borderRadius: "8px", marginTop: "0.5rem", fontSize: "0.9rem", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                  {state.error}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #contact { padding: 4rem 1.5rem !important; }
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .contact-grid > div > form > div { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          #contact { padding: 5rem 2rem !important; }
          .contact-grid { gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
