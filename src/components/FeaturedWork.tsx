"use client";

import React from "react";

const projects = [
  {
    title: "Contrario — AI Recruiting Platform",
    description: "Designed AI-powered recruiter dashboards, candidate pipeline views, and onboarding flows. Reduced drop-off by 30%.",
    tags: ["SaaS", "AI", "Dashboard", "Web"],
    image: "/images/projects/contrario.jpg",
  },
  {
    title: "SparkAI — AI Venture Platform",
    description: "Led end-to-end UI/UX for a Dubai-based AI SaaS product — from research and wireframes through a scalable design system.",
    tags: ["SaaS", "AI", "Web", "Mobile"],
    image: "/images/projects/spark.jpg",
  },
  {
    title: "Fresh Fit — Fashion eCommerce",
    description: "Designed a mobile-first shopping experience covering product discovery, filtering, and checkout. Achieved 91% user satisfaction.",
    tags: ["eCommerce", "Mobile", "iOS"],
    image: "/images/projects/luxmode.jpg",
  },
  {
    title: "NavSphere — Travel Operations Dashboard",
    description: "Designed B2B analytics dashboards for travel teams, translating dense operational data into clear, scannable visual patterns.",
    tags: ["B2B", "Dashboard", "SaaS", "Data Viz"],
    image: "/images/projects/nexuses.jpg",
  }
];

export default function FeaturedWork() {
  return (
    <section
      id="selected-projects"
      style={{
        padding: "8rem 2rem",
        background: "var(--color-bg, #0a0a0a)",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section Header */}
        <div style={{ marginBottom: "6rem", textAlign: "center" }}>
          <p style={{
            fontSize: "0.75rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-accent, #e8c97a)",
            marginBottom: "1rem",
            fontWeight: 700,
          }}>
            Featured Work
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "#ffffff",
          }}>
            Selected Projects
          </h2>
        </div>

        {/* The Sticky Deck Container */}
        <div className="projects-stack" style={{ position: "relative" }}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="sticky-card"
              style={{
                /* THE MAGIC: Sticky positioning with dynamic top offset */
                position: "sticky",
                top: `calc(10vh + ${index * 40}px)`,

                /* Layout */
                height: "75vh",
                minHeight: "500px",
                marginBottom: "15vh", // Controls how far you scroll before the next card hits
                background: "#121212",
                borderRadius: "24px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "row",

                /* Depth & Layering */
                zIndex: index,
                boxShadow: "0 -20px 50px rgba(0, 0, 0, 0.6)", // Casts shadow on card underneath
              }}
            >

              {/* Left Column: Content (40%) */}
              <div className="card-content" style={{
                flex: "0 0 40%",
                padding: "4rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRight: "1px solid rgba(255, 255, 255, 0.05)",
              }}>
                <h3 style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)",
                  fontWeight: 800,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  marginBottom: "1.5rem",
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: "1.1rem",
                  color: "#a0a0a0",
                  lineHeight: 1.6,
                  marginBottom: "2.5rem",
                }}>
                  {project.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "auto" }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{
                      padding: "0.4rem 1rem",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "100px",
                      fontSize: "0.75rem",
                      color: "#d0d0d0",
                      letterSpacing: "0.05em",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <button style={{
                  alignSelf: "flex-start",
                  padding: "1rem 2rem",
                  background: "var(--color-accent, #e8c97a)",
                  color: "#000",
                  fontWeight: 700,
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "2rem",
                }}>
                  View Case Study
                </button>
              </div>

              {/* Right Column: Full Bleed Image (60%) */}
              <div className="card-image" style={{
                flex: "1",
                position: "relative",
                background: "#0d0d0d",
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                />
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Responsive adjustments for mobile */}
      <style>{`
        @media (max-width: 1024px) {
          .sticky-card {
            flex-direction: column !important;
            height: auto !important;
            min-height: 80vh !important;
          }
          .card-content {
            flex: none !important;
            padding: 2.5rem !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.05);
          }
          .card-image {
            flex: none !important;
            height: 40vh !important;
          }
        }
      `}</style>
    </section>
  );
}