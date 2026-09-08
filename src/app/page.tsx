"use client";
import { useEffect } from "react";
import Navbar         from "@/components/Navbar";
import Hero           from "@/components/Hero";
import Marquee        from "@/components/Marquee";
import ServicePillars from "@/components/ServicePillars";
import FeaturedWork   from "@/components/FeaturedWork";
import About          from "@/components/About";
import Process        from "@/components/Process";
import Services       from "@/components/Services";
import Testimonials   from "@/components/Testimonials";
import Experience     from "@/components/Experience";
import Education      from "@/components/Education";
import FAQ            from "@/components/FAQ";
import Contact        from "@/components/Contact";
import Footer         from "@/components/Footer";

const marqueeItems1 = [
  "Senior Product Engineer", "Headless E-commerce", "B2B Wholesale Systems",
  "Next.js", "Medusa.js", "Supabase", "React", "TypeScript",
  "Framer Motion", "SaaS Architecture", "International Catalog", "API-First Commerce",
];


export default function Home() {
  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      if (!bar) return;
      const p =
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = p + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Global scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee direction="left"  items={marqueeItems1} />
        <ServicePillars />
        <FeaturedWork />
        <About />

        <Process />
        <Services />
        <Testimonials />
        <Experience />
        <FAQ />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}