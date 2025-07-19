// hooks/useLenis.js
import { useEffect } from "react";
import Lenis from "lenis";

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2, // longer duration = slower animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.6, // slows down mouse wheel scroll
      touchMultiplier: 1.5, // controls touch scroll speed
      infinite: false,
    });

    // Optional: intercept wheel events for fine-tuned control
    function onWheel(e) {
      e.preventDefault(); // prevent default browser scroll
      const deltaY = e.deltaY * 0.8; // scale down scroll amount
      lenis.scrollTo(window.scrollY + deltaY);
    }

    window.addEventListener("wheel", onWheel, { passive: false });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("wheel", onWheel);
      lenis.destroy();
    };
  }, []);
}