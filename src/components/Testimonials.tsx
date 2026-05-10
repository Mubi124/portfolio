"use client";

import React, { useState, useRef } from "react";

const Testimonials = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const stats = [
    { label: "Projects Delivered", value: "40+", size: "small" },
    { label: "Years Experience", value: "5+", size: "small" },
    { label: "Satisfaction Score", value: "91%", size: "small" },
  ];

  const quotes = [
    {
      text: "Mubashir has a rare ability to take a vague brief and return something that feels exactly right — both visually and strategically.",
      author: "Product Manager",
      company: "SaaS Startup",
      size: "large",
    },
    {
      text: "The design system Mubashir built cut our dev cycle time significantly. Clean components and clear documentation.",
      author: "Lead Engineer",
      company: "Tech Company",
      size: "medium",
    },
    {
      text: "Working with Mubashir felt like having a co-founder on the design side. He pushed back on bad ideas and brought research.",
      author: "Founder",
      company: "eCommerce Platform",
      size: "medium",
    },
  ];

  return (
    <section 
      id="testimonials" 
      style={{ padding: "8rem 2rem", background: "#0a0a0a", maxWidth: "1200px", margin: "0 auto" }}
    >
      <div style={{ marginBottom: "4rem" }}>
        <p style={{ color: "var(--color-accent)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Social Proof</p>
        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: "#fff", marginTop: "0.5rem", fontFamily: "var(--font-display)" }}>What Clients & Teams Say</h2>
      </div>

      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="bento-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridAutoRows: "minmax(200px, auto)",
          gap: "20px",
          position: "relative",
          // The CSS variables for the spotlight
          "--mouse-x": `${mousePos.x}px`,
          "--mouse-y": `${mousePos.y}px`,
        } as React.CSSProperties}
      >
        {/* STAT 1 */}
        <div className="bento-card stat-card" style={{ gridColumn: "span 1" }}>
          <h3>{stats[0].value}</h3>
          <p>{stats[0].label}</p>
        </div>

        {/* MAIN QUOTE */}
        <div className="bento-card quote-card" style={{ gridColumn: "span 2", gridRow: "span 1" }}>
          <div className="stars">★★★★★</div>
          <p className="quote-text">&quot;{quotes[0].text}&quot;</p>
          <div className="author">
            <div className="avatar">C</div>
            <div>
              <p className="name">{quotes[0].author}</p>
              <p className="meta">{quotes[0].company}</p>
            </div>
          </div>
        </div>

        {/* STAT 2 */}
        <div className="bento-card stat-card" style={{ gridColumn: "span 1" }}>
          <h3>{stats[1].value}</h3>
          <p>{stats[1].label}</p>
        </div>

        {/* SECOND QUOTE */}
        <div className="bento-card quote-card" style={{ gridColumn: "span 1" }}>
          <p className="quote-text small">&quot;{quotes[1].text}&quot;</p>
          <p className="name">{quotes[1].author}</p>
        </div>

        {/* THIRD QUOTE */}
        <div className="bento-card quote-card" style={{ gridColumn: "span 1" }}>
          <p className="quote-text small">&quot;{quotes[2].text}&quot;</p>
          <p className="name">{quotes[2].author}</p>
        </div>
      </div>

      <style>{`
        .bento-card {
          position: relative;
          background: #121212;
          border-radius: 24px;
          padding: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: border-color 0.3s ease;
        }

        /* The Spotlight Effect Overlay */
        .bento-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(232, 201, 122, 0.15),
            transparent 40%
          );
          z-index: 0;
          pointer-events: none;
        }

        .stat-card h3 { font-size: 3.5rem; color: #e8c97a; font-weight: 900; margin-bottom: 0.5rem; z-index: 1; fontFamily: var(--font-display); }
        .stat-card p { color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; z-index: 1; }
        
        .quote-card { justify-content: space-between; z-index: 1; }
        .quote-text { font-size: 1.25rem; color: #e0e0e0; line-height: 1.6; font-style: italic; margin: 1.5rem 0; z-index: 1; }
        .quote-text.small { font-size: 1rem; }
        .stars { color: #e8c97a; font-size: 0.9rem; z-index: 1; }
        
        .author { display: flex; align-items: center; gap: 1rem; z-index: 1; }
        .avatar { width: 40px; height: 40px; background: #222; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #e8c97a; border: 1px solid rgba(232,201,122,0.2); }
        .name { color: #fff; font-weight: 600; font-size: 0.9rem; }
        .meta { color: #666; font-size: 0.8rem; }

        @media (max-width: 767px) {
          #testimonials { padding: 4rem 1.5rem !important; }
          .bento-grid { grid-template-columns: 1fr !important; }
          .bento-card { grid-column: span 1 !important; padding: 1.5rem !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          #testimonials { padding: 5rem 2rem !important; }
          .bento-grid { grid-template-columns: 1fr 1fr !important; }
          .bento-card { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
