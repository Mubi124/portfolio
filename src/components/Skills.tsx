"use client";
import { motion } from "motion/react";

const skillGroups = [
  {
    category: "Design & UX",
    items: ["Figma", "Adobe XD", "Sketch", "InVision", "Framer", "Webflow", "Prototyping", "Wireframing"],
  },
  {
    category: "Research & Strategy",
    items: ["User Research", "Usability Testing", "A/B Testing", "Heuristic Evaluation", "Persona Development", "CRO"],
  },
  {
    category: "Systems & Brand",
    items: ["Design Systems", "Design Tokens", "Component Libraries", "Visual Identity", "Typography", "Brand Systems"],
  },
  {
    category: "Front-End",
    items: ["HTML", "CSS", "Webflow (production)", "Framer (production)", "Responsive Layouts"],
  },
  {
    category: "AI & Creative",
    items: ["Figma AI", "ChatGPT", "Claude", "Google Gemini", "MidJourney", "AI-Augmented UX Workflows"],
  },
  {
    category: "Adobe Creative Suite",
    items: ["Photoshop", "Illustrator", "InDesign"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-black text-white py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs uppercase tracking-widest text-zinc-500">What I Use</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">Skills &amp; Tools</h2>
          <p className="text-zinc-400 mt-4 max-w-xl">
            A full-stack design toolkit — from user research and strategy through production-ready UI and front-end implementation.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-8 border border-zinc-800 rounded-2xl"
            >
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-5">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all duration-200 cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 767px) {
          #skills { padding: 4rem 1.5rem !important; }
          #skills .grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          #skills { padding: 5rem 2rem !important; }
          #skills .grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
