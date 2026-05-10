"use client";
import { motion } from "motion/react";

const reasons = [
  {
    icon: "⚡",
    title: "Fast Without Cutting Corners",
    description: "I move quickly because I've built a process that eliminates rework. Clear briefs, structured phases, and clean Figma files mean less back-and-forth and faster launches.",
  },
  {
    icon: "📊",
    title: "Research-Led Decisions",
    description: "Every design choice is traceable to a user insight, a business goal, or a test result. I don't design from taste alone — I design from evidence.",
  },
  {
    icon: "🔗",
    title: "Dev-Ready Handoff",
    description: "Engineers love working with my files. Annotated specs, named components, token-based styles, and responsive rules — everything they need, nothing they don't.",
  },
  {
    icon: "∞",
    title: "Full-Process Thinking",
    description: "I don't just design screens. I think about the product holistically — conversion funnels, onboarding flows, error states, edge cases, and the business metric each screen needs to move.",
  },
];

export default function WhyWorkWithMe() {
  return (
    <section id="why-work" className="bg-black text-white py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500">My Edge</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Why Work With Me</h2>
          <p className="text-zinc-400 mt-4 max-w-xl">
            What separates a designer who ships from one who just delivers files.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 border border-zinc-800 rounded-2xl hover:border-zinc-600 hover:bg-zinc-900/40 transition-all duration-300"
            >
              <div className="text-3xl mb-5">{r.icon}</div>
              <h3 className="text-lg font-semibold mb-3 leading-snug">{r.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #why-work { padding: 4rem 1.5rem !important; }
          #why-work .grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          #why-work { padding: 5rem 2rem !important; }
          #why-work .grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
