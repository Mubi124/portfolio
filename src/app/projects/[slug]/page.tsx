import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const revalidate = 60;

interface ChallengeSolution {
  title: string;
  problem: string;
  solution: string;
}

interface ProjectData {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  category?: string;
  role?: string;
  timeline?: string;
  client?: string;
  tags: string[];
  image?: { asset?: { _ref?: string } } | null;
  imageUrl?: string;
  caseStudyUrl?: string;
  techStack: string[];
  challenges: ChallengeSolution[];
  githubUrl?: string;
  liveUrl?: string;
}

// Rich fallback case study data for key projects
const fallbackProjectsData: Record<string, ProjectData> = {
  "contrario-ai-recruiting-platform": {
    slug: "contrario-ai-recruiting-platform",
    title: "Contrario AI Recruiting Platform",
    subtitle: "Enterprise Talent Intelligence & AI-Powered Workflow Engine",
    description: "AI-powered recruiting platform featuring specialized recruiter dashboards, intelligent AI-assisted workflows, and permission-aware views designed for enterprise hiring teams.",
    category: "Enterprise SaaS",
    role: "Lead Frontend Engineer & Product Designer",
    timeline: "Q3 - Q4 2025",
    client: "Contrario Inc.",
    tags: ["Recruiter Dashboards", "AI Workflows", "Permission-Aware Views", "Enterprise SaaS"],
    imageUrl: "/images/projects/contrario.jpg",
    techStack: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Zustand State Engine",
      "WebSockets / SSE",
      "Sanity CMS",
      "OpenAI API Integration",
      "Framer Motion",
    ],
    challenges: [
      {
        title: "Real-Time AI Candidate Matching & State Synchronization",
        problem: "Synchronizing high-frequency streaming AI match updates across multi-tenant recruiter dashboards without triggering layout shifts or dropping render frames.",
        solution: "Implemented optimistic UI updates powered by Zustand state slicing and WebSocket subscriptions. Offloaded heavy candidate scoring computations to dedicated Web Workers to ensure a locked 60fps main thread.",
      },
      {
        title: "Permission-Aware Dynamic Layout Engine",
        problem: "Rendering complex RBAC data restrictions and customizable widget views for multi-tier hiring teams without duplicating UI components or degrading bundle size.",
        solution: "Engineered a dynamic higher-order layout resolution engine using Next.js Server Components. Restricted data attributes are safely stripped at the server boundary before payload transport.",
      },
      {
        title: "High-Density Candidate Pipeline Kanban Board",
        problem: "Managing drag-and-drop interactions across thousands of candidate cards with smooth 60fps animation during concurrent live updates.",
        solution: "Built a virtualized Kanban architecture with HTML5 drag-and-drop combined with GPU-accelerated CSS transforms and debounced position state persistence.",
      },
    ],
    githubUrl: "https://github.com/mubashirali/contrario-ai-platform",
    liveUrl: "https://contrario-ai.demo.app",
  },
  "leadpilot-ai-crm": {
    slug: "leadpilot-ai-crm",
    title: "LeadPilot AI Lead Intelligence CRM",
    subtitle: "Automated Lead Scoring & High-Velocity Pipeline Engine",
    description: "Next-generation lead intelligence CRM incorporating automated AI lead scoring, dynamic outreach generation, and streamlined pipeline management.",
    category: "Sales Automation & CRM",
    role: "Senior Frontend Engineer",
    timeline: "Q1 - Q2 2025",
    client: "LeadPilot",
    tags: ["AI Lead Scoring", "Outreach Generation", "Pipeline Management", "Sales CRM"],
    imageUrl: "/images/projects/spark.jpg",
    techStack: [
      "React 19",
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS v4",
      "GraphQL / Apollo",
      "Redis Caching",
      "Pinecone Vector Search",
      "Recharts Data Viz",
    ],
    challenges: [
      {
        title: "Sub-100ms Vector Search for Lead Scoring",
        problem: "Querying vector embeddings across millions of lead profiles in real time while maintaining instantaneous filter feedback in the UI.",
        solution: "Architected a client-side query strategy with intelligent SWR caching, prefetching top candidate matches on card hover, and batching GraphQL requests.",
      },
      {
        title: "AI Outreach Generator UI with Live Token Streaming",
        problem: "Streaming AI-generated emails and personalized sequences with word-by-word typing effects without clogging React re-render cycles.",
        solution: "Created custom custom SSE hooks that bypass React state updates for fast string mutation, directly updating text DOM nodes before batching state commits.",
      },
    ],
    githubUrl: "https://github.com/mubashirali/leadpilot-crm",
    liveUrl: "https://leadpilot-crm.demo.app",
  },
  "navsphere-travel-ops": {
    slug: "navsphere-travel-ops",
    title: "NavSphere - Travel Operations Dashboard",
    subtitle: "Real-Time Travel Telemetry & Logistics Control Center",
    description: "High-density travel operations control center featuring data-rich B2B dashboards, multi-parameter filtering, and real-time decision-support interfaces.",
    category: "Logistics & Operations",
    role: "Frontend Architect",
    timeline: "Q3 2024",
    client: "NavSphere Logistics",
    tags: ["Data-Rich B2B Dashboards", "Advanced Filtering", "Decision Support", "Travel Ops"],
    imageUrl: "/images/projects/nexuses.jpg",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "RxJS Event Streams",
      "Canvas / SVG Maps",
      "Zustand",
      "WebSockets",
    ],
    challenges: [
      {
        title: "Client-Side Multi-Parameter Filtering across 50k Records",
        problem: "Filtering massive flight telemetry and travel itinerary data sets instantly based on complex multi-select criteria without UI freeze.",
        solution: "Built a custom Web Worker index engine utilizing Bitmaps for ultra-fast bitwise set operations, returning filtered arrays in under 12ms.",
      },
      {
        title: "High-Density Data Visualization for Critical Telemetry",
        problem: "Presenting dense flight status indicators and real-time alerts without visually overwhelming operations managers.",
        solution: "Designed a dark-mode optimized visual hierarchy with adaptive zoom levels, contextual tooltip popovers, and color-coded status badges.",
      },
    ],
    githubUrl: "https://github.com/mubashirali/navsphere-ops",
    liveUrl: "https://navsphere.demo.app",
  },
};

export async function generateStaticParams() {
  try {
    const sanitySlugs = await client.fetch<{ slug: { current: string } }[]>(
      `*[_type == "project" && defined(slug.current)]{ slug }`
    );
    const slugsSet = new Set([
      ...Object.keys(fallbackProjectsData),
      ...sanitySlugs.map((s) => s.slug.current),
    ]);
    return Array.from(slugsSet).map((slug) => ({ slug }));
  } catch {
    return Object.keys(fallbackProjectsData).map((slug) => ({ slug }));
  }
}

async function getProject(slug: string): Promise<ProjectData | null> {
  const fallback = fallbackProjectsData[slug];
  try {
    const sanityProject = await client.fetch<Partial<ProjectData> | null>(
      `*[_type == "project" && slug.current == $slug][0] {
        title,
        description,
        tags,
        image,
        caseStudyUrl,
        techStack,
        challenges,
        githubUrl,
        liveUrl
      }`,
      { slug }
    );

    if (!sanityProject && !fallback) return null;

    return {
      slug,
      title: sanityProject?.title || fallback?.title || "Case Study",
      subtitle: fallback?.subtitle || "Frontend Engineering & System Architecture",
      description: sanityProject?.description || fallback?.description || "",
      category: fallback?.category || "Featured Case Study",
      role: fallback?.role || "Lead Frontend Engineer",
      timeline: fallback?.timeline || "2025",
      client: fallback?.client || "Client Work",
      tags: sanityProject?.tags || fallback?.tags || [],
      image: sanityProject?.image,
      imageUrl: fallback?.imageUrl,
      techStack: sanityProject?.techStack && sanityProject.techStack.length > 0
        ? sanityProject.techStack
        : fallback?.techStack || ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      challenges: sanityProject?.challenges && sanityProject.challenges.length > 0
        ? sanityProject.challenges
        : fallback?.challenges || [],
      githubUrl: sanityProject?.githubUrl || fallback?.githubUrl,
      liveUrl: sanityProject?.liveUrl || fallback?.liveUrl,
    };
  } catch {
    return fallback || null;
  }
}

function getImageUrl(image?: { asset?: { _ref?: string } } | null): string | null {
  if (!image?.asset?._ref) return null;
  try {
    return urlFor(image).width(1400).auto('format').url();
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  const fallbackTitle = "Case Study | Mubashir Ali — Frontend Engineer & Product Designer";
  const fallbackDesc = "In-depth frontend technical architecture, challenges, and solutions by Mubashir Ali.";

  if (!project) {
    return {
      title: fallbackTitle,
      description: fallbackDesc,
    };
  }

  return {
    title: `${project.title} — Technical Case Study | Mubashir Ali`,
    description: project.description || fallbackDesc,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  const sanityCover = getImageUrl(project.image);
  const heroImageSrc = sanityCover || project.imageUrl || "/images/projects/contrario.jpg";

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#ffffff" }}>
      <Navbar />

      <main className="pt-28 pb-20">
        {/* Header Breadcrumb & Back Link */}
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <Link
            href="/#selected-projects"
            className="inline-flex items-center text-sm font-semibold text-[#e8c97a] hover:underline transition-all gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Selected Projects
          </Link>
        </div>

        {/* Case Study Hero Section */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest bg-[#e8c97a]/10 text-[#e8c97a] border border-[#e8c97a]/30 rounded-full">
              {project.category}
            </span>
            <span className="text-xs text-neutral-400 font-medium">Case Study</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight font-[var(--font-display)]">
            {project.title}
          </h1>

          {project.subtitle && (
            <p className="text-xl md:text-2xl text-neutral-300 font-medium mb-8 leading-relaxed">
              {project.subtitle}
            </p>
          )}

          <p className="text-base md:text-lg text-[#a0a0a0] leading-relaxed max-w-4xl mb-12">
            {project.description}
          </p>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-[#121212] border border-white/10 rounded-2xl">
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Role</p>
              <p className="text-sm font-semibold text-white">{project.role}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Timeline</p>
              <p className="text-sm font-semibold text-white">{project.timeline}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Client</p>
              <p className="text-sm font-semibold text-white">{project.client}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-1">Domain</p>
              <p className="text-sm font-semibold text-[#e8c97a]">{project.category}</p>
            </div>
          </div>
        </section>

        {/* Main Visual Display */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#121212] shadow-2xl">
            <div className="w-full aspect-[16/9] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImageSrc}
                alt={`${project.title} Visual Display`}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-4 bg-[#121212]/95 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400">
              <span className="font-mono">Visual Interface & Component Showcase</span>
              <div className="flex gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL ARCHITECTURE SECTION */}
        <section className="bg-[#0a0a0a] border-y border-white/10 py-16">
          <div className="max-w-6xl mx-auto px-6 flex flex-col gap-12">
            
            {/* Section Header */}
            <div>
              <p className="text-xs uppercase tracking-widest text-[#e8c97a] font-bold mb-2">
                Engineering & Systems
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight font-[var(--font-display)]">
                Technical Architecture
              </h2>
              <p className="text-base text-[#a0a0a0] mt-3 max-w-2xl">
                A detailed overview of the technologies, frontend system designs, and engineering solutions powering this project.
              </p>
            </div>

            {/* Tech Stack Grid Layout */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8c97a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
                Tech Stack & Libraries
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                {project.techStack.map((tech, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#121212] border border-white/10 rounded-xl hover:border-[#e8c97a]/40 transition-colors flex items-center space-x-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#e8c97a]/10 border border-[#e8c97a]/20 flex items-center justify-center text-[#e8c97a] font-mono text-xs font-bold shrink-0">
                      {tech.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Challenges & Solutions Text Block */}
            <div className="flex flex-col gap-6 pt-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8c97a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                Engineering Challenges & Solutions
              </h3>

              <div className="flex flex-col gap-6">
                {project.challenges.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 md:p-8 bg-[#121212] border border-white/10 rounded-2xl flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#e8c97a]/20 text-[#e8c97a] text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h4 className="text-lg md:text-xl font-bold text-white">
                        {item.title}
                      </h4>
                    </div>

                    <div className="space-y-3 pl-0 md:pl-10">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-neutral-500 font-bold block mb-1">
                          Problem / Challenge
                        </span>
                        <p className="text-sm md:text-base text-[#a0a0a0] leading-relaxed">
                          {item.problem}
                        </p>
                      </div>

                      <div className="p-4 bg-[#161616] border-l-2 border-[#e8c97a] rounded-r-lg">
                        <span className="text-xs uppercase tracking-wider text-[#e8c97a] font-bold block mb-1">
                          Architectural Solution
                        </span>
                        <p className="text-sm md:text-base text-neutral-200 leading-relaxed">
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Styled Action Buttons: GitHub Repository & Live Build */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-transparent text-white border border-white/20 hover:border-[#e8c97a] hover:text-[#e8c97a] transition-all shadow-md"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub Repository
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#e8c97a] text-black hover:bg-[#f0d88a] transition-all shadow-lg"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Live Build Demo
                </a>
              )}
            </div>

          </div>
        </section>

        {/* Footer Navigation Back to Projects */}
        <section className="max-w-6xl mx-auto px-6 pt-16 text-center">
          <Link
            href="/#selected-projects"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#121212] border border-white/10 hover:border-[#e8c97a] text-white font-bold transition-all"
          >
            ← View All Selected Projects
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
