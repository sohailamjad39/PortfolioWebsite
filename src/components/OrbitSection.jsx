import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function OrbitSection() {
  const sunRef = useRef(null);
  const planet1Ref = useRef(null); // Frontend
  const planet2Ref = useRef(null); // Backend
  const planet3Ref = useRef(null); // API
  const textHeadingRef = useRef(null);
  const textParagraphRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
        scrub: false,
        once: false,
        markers: false,
      },
    });

    // Animate orbit system (sun + planets)
    tl.fromTo(
      [sunRef.current, planet1Ref.current, planet2Ref.current, planet3Ref.current],
      {
        scale: 0.5,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.2,
      }
    );

    // Smooth fade-in + move-up for heading
    tl.fromTo(
      textHeadingRef.current,
      {
        y: 30,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
      },
      "<+0.4"
    );

    // Smooth fade-in + move-up for paragraph, delayed slightly
    tl.fromTo(
      textParagraphRef.current,
      {
        y: 30,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
      },
      "<+0.3"
    );

    // Orbit rotation animations
    const orbitDuration = 6;
    const orbitEase = "none";

    gsap.to(planet1Ref.current, {
      rotation: "+=360",
      transformOrigin: "50% 50%",
      duration: orbitDuration,
      repeat: -1,
      ease: orbitEase,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play pause resume pause",
        once: false,
      },
    });

    gsap.to(planet2Ref.current, {
      rotation: "+=360",
      transformOrigin: "50% 50%",
      duration: orbitDuration * 1.4,
      repeat: -1,
      ease: orbitEase,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play pause resume pause",
        once: false,
      },
    });

    gsap.to(planet3Ref.current, {
      rotation: "+=360",
      transformOrigin: "50% 50%",
      duration: orbitDuration * 1.8,
      repeat: -1,
      ease: orbitEase,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play pause resume pause",
        once: false,
      },
    });
  }, []);

  return (
    <div className="orbit-section" ref={containerRef}>
      <div className="orbit-container">
        {/* Sun (Full Stack) */}
        <div className="sun" ref={sunRef}>
          <span>Full Stack</span>
        </div>

        {/* Planet 1 - Frontend */}
        <div className="planet orbit orbit1" ref={planet1Ref}>
          <div className="planet-label">Frontend</div>
        </div>

        {/* Planet 2 - Backend */}
        <div className="planet orbit orbit2" ref={planet2Ref}>
          <div className="planet-label">Backend</div>
        </div>

        {/* Planet 3 - API */}
        <div className="planet orbit orbit3" ref={planet3Ref}>
          <div className="planet-label">API</div>
        </div>
      </div>

      {/* Right-side Description */}
      <div className="orbit-text">
        <h2 ref={textHeadingRef}>What I Can Do</h2>
        <p ref={textParagraphRef}>
          I bring all parts of a web application together — from what users see to how it all works behind the scenes.
          Whether it's building clean user interfaces, managing powerful servers, or connecting everything through smart APIs — I make it work as one smooth system.
          Frontend, Backend, or the logic in between — I orbit around the full stack.
        </p>
      </div>
    </div>
  );
}

export default OrbitSection;