"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos       = useRef({ x: -100, y: -100 });
  const rafId     = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Don't mount on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    // Hide the native cursor globally
    document.body.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      rafId.current = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cursor-blend"
      aria-hidden="true"
    />
  );
}
