"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hoverState, setHoverState] = useState<"default" | "hover">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position tracking with specified spring physics (stiffness: 150, damping: 15, mass: 0.1)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect touch / coarse pointer devices to disable custom cursor on mobile
    const touchCheck =
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(pointer: coarse)").matches;

    if (touchCheck) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const clientX = e.clientX;
      const clientY = e.clientY;

      // Detect hover over interactive elements: a, button, or elements with role="button"
      const target = (e.target as HTMLElement | null)?.closest(
        'a, button, [role="button"], input, select, textarea, .card, [data-magnetic]'
      ) as HTMLElement | null;

      if (target) {
        setHoverState("hover");

        // Magnetic Snap: Calculate distance to center of hovered element and apply magnetic pull
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;

        // Apply a magnetic pull factor toward the element center
        const pullFactor = 0.35;
        mouseX.set(clientX - deltaX * pullFactor);
        mouseY.set(clientY - deltaY * pullFactor);
      } else {
        setHoverState("default");
        mouseX.set(clientX);
        mouseY.set(clientY);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  // Variants for default state (solid white dot) and hover state (expanded ring)
  const variants = {
    default: {
      width: 12, // w-3
      height: 12, // h-3
      backgroundColor: "#ffffff", // bg-white
      borderWidth: "0px",
      borderColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "blur(0px)",
    },
    hover: {
      width: 48, // w-12
      height: 48, // h-12
      backgroundColor: "rgba(255, 255, 255, 0)", // bg-transparent
      borderWidth: "1px",
      borderColor: "rgba(255, 255, 255, 0.5)", // border-white/50
      backdropFilter: "blur(4px)", // backdrop-blur-sm
    },
  };

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 pointer-events-none z-50 rounded-full"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: isVisible ? 1 : 0,
      }}
      variants={variants}
      animate={hoverState}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    />
  );
}
