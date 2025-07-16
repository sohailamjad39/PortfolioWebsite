import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const logoFiles = [
  "html.svg",
  "css.svg",
  "javascript.svg",
  "c++.svg",
  "react.svg",
  "nextjs.svg",
  "java.svg",
  "git.svg",
  "github.svg",
  "vercel.svg",
  "jquery.svg",
  "postman.svg",
  "python.svg"
];

const InfiniteLoopLogos = () => {
  const containerRef = useRef(null);
  const innerOneRef = useRef(null);
  const innerTwoRef = useRef(null);
  const animationRef = useRef(null);

  const createLogos = () => {
    const fragment = document.createDocumentFragment();
    logoFiles.forEach((file) => {
      const img = document.createElement('img');
      img.src = `/logos/${file}`;
      img.alt = file.replace('.svg', '');
      img.loading = 'lazy';
      img.className = 'loop-logo';
      fragment.appendChild(img.cloneNode(true));
    });
    return fragment;
  };

  useEffect(() => {
    const innerOne = innerOneRef.current;
    const innerTwo = innerTwoRef.current;

    if (!innerOne || !innerTwo) return;

    // Clone logos into both containers
    innerOne.innerHTML = '';
    innerTwo.innerHTML = '';

    innerOne.appendChild(createLogos());
    innerTwo.appendChild(createLogos());

    // Start second row right after first
    gsap.set(innerTwo, { x: innerOne.scrollWidth });

    // Create seamless infinite animation
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(innerOne, {
      x: -innerOne.scrollWidth,
      duration: 30,
      ease: "none",
    }).set(innerOne, { x: innerTwo.scrollWidth });

    tl.to(innerTwo, {
      x: -innerTwo.scrollWidth,
      duration: 30,
      ease: "none",
    }, 0);

    animationRef.current = tl;

    return () => {
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  // Optional: Fade in/out based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const opacity = entry.intersectionRatio > 0.9 ? 1 : entry.intersectionRatio;
          gsap.to(containerRef.current, { opacity, duration: 0.5 });
        });
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        rootMargin: "-10% 0% -90% 0%"
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div ref={containerRef} className="loop-container">
      <div className="loop-track">
        <div ref={innerOneRef} className="loop-inner"></div>
        <div ref={innerTwoRef} className="loop-inner"></div>
      </div>
    </div>
  );
};

export default InfiniteLoopLogos;