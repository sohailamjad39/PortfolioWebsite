// src/components/Footer.jsx
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    // GSAP entrance animation
    gsap.fromTo(
      footerRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-inner">
        {/* Developer Quote */}
        <p className="footer-quote">
          "Every line of code is a step toward the future."
        </p>

        {/* Scroll to top button */}
        <button
          className="btn-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <span>🚀</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;