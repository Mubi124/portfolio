interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
}

export default function Marquee({ items, direction = "left" }: MarqueeProps) {
  // Triple items for seamless infinite loop
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="marquee-container"
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        background: "var(--color-surface)",
        padding: "1.1rem 0",
      }}
      aria-hidden="true"
    >
      <div
        className={direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          width: "max-content",
          willChange: "transform",
        }}
      >
        {tripled.map((item, i) => (
          <span
            key={i}
            className="marquee-text"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-muted)",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              padding: "0 1.5rem",
            }}
          >
            {item}
            <span
              style={{
                color: "var(--color-accent)",
                marginLeft: "1.5rem",
                fontSize: "1rem",
              }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
      <style>{`
        .marquee-container {
          padding: 1.1rem 0;
        }
        .marquee-text {
          font-size: 0.78rem;
          padding: 0 1.5rem;
        }
        @media (max-width: 767px) {
          .marquee-container {
            padding: 1rem 0 !important;
          }
          .marquee-text {
            font-size: 0.875rem !important; /* Made larger as requested? Wait, the plan says 'reduce font size to 0.875rem' but it was 0.78. 0.875 is actually bigger. I will set it exactly to 0.875rem */
          }
        }
      `}</style>
    </div>
  );
}
