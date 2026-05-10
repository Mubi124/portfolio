"use client";
import React from "react";

export default function FeaturedWorkClient({ projects }: { projects: any[] }) {
  return (
    <section id="selected-projects" style={{ padding: "8rem 2rem", background: "var(--color-bg, #0a0a0a)", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "6rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent, #e8c97a)", marginBottom: "1rem", fontWeight: 700 }}>Featured Work</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#ffffff" }}>Selected Projects</h2>
        </div>
        <div className="projects-stack" style={{ position: "relative" }}>
          {projects.map((project, index) => (
            <div key={index} className="sticky-card" style={{ position: "sticky", top: `calc(10vh + ${index * 40}px)`, height: "75vh", minHeight: "500px", marginBottom: "15vh", background: "#121212", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", display: "flex", flexDirection: "row", zIndex: index, boxShadow: "0 -20px 50px rgba(0,0,0,0.6)" }}>
              <div className="card-content" style={{ flex: "0 0 40%", padding: "4rem", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                <h3 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, marginBottom: "1.5rem" }}>{project.title}</h3>
                <p style={{ fontSize: "1.1rem", color: "#a0a0a0", lineHeight: 1.6, marginBottom: "2.5rem" }}>{project.description}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "auto" }}>
                  {project.tags?.map((tag: string, i: number) => (
                    <span key={i} style={{ padding: "0.4rem 1rem", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "100px", fontSize: "0.75rem", color: "#d0d0d0", letterSpacing: "0.05em" }}>{tag}</span>
                  ))}
                </div>
                {project.caseStudyUrl && (
                  <a href={project.caseStudyUrl} target="_blank" rel="noopener noreferrer" style={{ alignSelf: "flex-start", padding: "1rem 2rem", background: "var(--color-accent, #e8c97a)", color: "#000", fontWeight: 700, borderRadius: "8px", textDecoration: "none", marginTop: "2rem", display: "inline-block" }}>View Case Study</a>
                )}
              </div>
              <div className="card-image" style={{ flex: "1", position: "relative", background: "#0d0d0d" }}>
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .sticky-card { flex-direction: column !important; height: auto !important; min-height: 80vh !important; }
          .card-content { flex: none !important; padding: 2.5rem !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .card-image { flex: none !important; height: 40vh !important; }
        }
      `}</style>
    </section>
  );
}
