"use client";
import React, { useEffect, useState } from "react";

interface SanityImage {
  asset?: {
    _ref?: string;
  };
}

interface Project {
  title?: string;
  description?: string;
  tags?: string[];
  image?: SanityImage;
  imageUrl?: string;
  caseStudyUrl?: string;
}

const defaultProjects: Project[] = [
  // ── B2B-FIRST ORDER: exporters see these immediately ──
  {
    title: "TrueGear Classic — B2B Export Branding",
    description: "International wholesale catalog and brand identity system for a Sialkot sportswear manufacturer. Built to convert buyers from EU and North American markets.",
    tags: ["B2B Wholesale Catalog", "Export Branding", "International Markets", "Sportswear"],
    // TODO: Replace with real screenshot → /images/projects/truegear.jpg
    imageUrl: "/images/projects/luxmode.jpg",
    // TODO: Create case study page → /projects/truegear-classic
    caseStudyUrl: "#contact",
  },
  {
    title: "Dermakinesis — Headless E-commerce",
    description: "Headless Medusa.js storefront with a custom Next.js frontend, Supabase backend, and a B2B wholesale ordering flow optimised for international distributor checkouts.",
    tags: ["Headless Commerce", "Medusa.js", "Next.js", "Supabase", "B2B Wholesale"],
    // TODO: Replace with real screenshot → /images/projects/dermakinesis.jpg
    imageUrl: "/images/projects/nexuses.jpg",
    // TODO: Create case study page → /projects/dermakinesis
    caseStudyUrl: "#contact",
  },
  // ── Existing projects demoted to positions 3–5 ──
  {
    title: "Contrario AI Recruiting Platform",
    description: "AI-powered recruiting platform featuring specialized recruiter dashboards, intelligent AI-assisted workflows, and permission-aware views designed for enterprise hiring teams.",
    tags: ["Recruiter Dashboards", "AI Workflows", "Permission-Aware Views", "Enterprise SaaS"],
    imageUrl: "/images/projects/contrario.jpg",
    caseStudyUrl: "/projects/contrario-ai-recruiting-platform",
  },
  {
    title: "LeadPilot AI Lead Intelligence CRM",
    description: "Next-generation lead intelligence CRM incorporating automated AI lead scoring, dynamic outreach generation, and streamlined pipeline management.",
    tags: ["AI Lead Scoring", "Outreach Generation", "Pipeline Management", "Sales CRM"],
    imageUrl: "/images/projects/spark.jpg",
    caseStudyUrl: "/projects/leadpilot-ai-crm",
  },
  {
    title: "NavSphere — Travel Operations Dashboard",
    description: "High-density travel operations control center featuring data-rich B2B dashboards, multi-parameter filtering, and real-time decision-support interfaces.",
    tags: ["Data-Rich B2B Dashboards", "Advanced Filtering", "Decision Support", "Travel Ops"],
    imageUrl: "/images/projects/nexuses.jpg",
    caseStudyUrl: "/projects/navsphere-travel-ops",
  },
];


export default function FeaturedWork() {
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: Project[]) => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // Keep defaultProjects on error
      });
  }, []);

  const urlFor = (image?: SanityImage) => {
    if (!image?.asset?._ref) return null;
    const ref = image.asset._ref;
    const [,id,dimensions,format] = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/) || [];
    if (!id || !dimensions || !format) return null;
    return `https://cdn.sanity.io/images/6272nx4u/production/${id}-${dimensions}.${format}`;
  };

  const getProjectImage = (project: Project) => {
    if (project.imageUrl) return project.imageUrl;
    if (project.image) {
      const sanityUrl = urlFor(project.image);
      if (sanityUrl) return sanityUrl;
    }
    return "/images/projects/contrario.jpg";
  };

  return (
    <section id="selected-projects" style={{ padding: "8rem 2rem", background: "var(--color-bg, #0a0a0a)", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "6rem", textAlign: "center" }}>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent, #e8c97a)", marginBottom: "1rem", fontWeight: 700 }}>Featured Work</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", color: "#ffffff" }}>Selected Projects</h2>
        </div>
        <div className="projects-stack" style={{ position: "relative" }}>
          {projects.map((project, index) => {
            const imgSrc = getProjectImage(project);
            return (
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
                    <a href={project.caseStudyUrl} style={{ alignSelf: "flex-start", padding: "1rem 2rem", background: "var(--color-accent, #e8c97a)", color: "#000", fontWeight: 700, borderRadius: "8px", textDecoration: "none", marginTop: "2rem", display: "inline-block" }}>View Case Study</a>
                  )}
                </div>
                <div className="card-image" style={{ flex: "1", background: "#0d0d0d" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt={project.title || "Project image"} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          .sticky-card { flex-direction: column !important; height: auto !important; min-height: 80vh !important; }
          .card-content { flex: none !important; padding: 2.5rem !important; border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .card-image { flex: none !important; height: 40vh !important; }
        }
      `}</style>
    </section>
  );
}