import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useLenis from "../hooks/useLenis";
import OrbitSection from "./OrbitSection";

gsap.registerPlugin(ScrollTrigger);

function HeroSection() {
  useLenis(); // Enables smooth scrolling

  const aboutContRef = useRef(null);
  const roboContRef = useRef(null);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);

  const titles = [
    "Software Engineer",
    "Full Stack Developer",
    "Logic Engineer",
    "MERN Stack Builder",
    "Backend Thinker",
  ];

  // 🔁 Use ref to always get the latest titles and state
  const stateRef = useRef({ isDeleting, charIndex, titleIndex, titles });
  useEffect(() => {
    stateRef.current = { isDeleting, charIndex, titleIndex, titles };
  }, [isDeleting, charIndex, titleIndex, titles]);

  // 🔁 Typing Animation Logic
  useEffect(() => {
    if (!titles.length) return;

    const handleTyping = () => {
      const { isDeleting, charIndex, titleIndex, titles } = stateRef.current;
      const currentTitle = titles[titleIndex];
      const isEndOfTyping = charIndex === currentTitle.length && !isDeleting;
      const isEndOfErasing = charIndex === 0 && isDeleting;

      const timeout = setTimeout(() => {
        if (!isDeleting && !isEndOfTyping) {
          setCharIndex(charIndex + 1);
        } else if (isEndOfTyping) {
          setIsDeleting(true);
        } else if (isDeleting && isEndOfErasing) {
          setIsDeleting(false);
          setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
          setCharIndex(0);
        } else if (isDeleting) {
          setCharIndex(charIndex - 1);
        }
      }, isDeleting ? 30 : isEndOfTyping ? 1200 : 100);

      return () => clearTimeout(timeout);
    };

    const id = setTimeout(handleTyping);
    return () => clearTimeout(id);
  }, [charIndex, isDeleting, titleIndex]);

  useEffect(() => {
    setTypingText(titles[titleIndex].substring(0, charIndex));
  }, [charIndex, titleIndex]);

  // GSAP animations
  useEffect(() => {
    // Animate robot to the right
    gsap.to(roboContRef.current, {
      x: window.innerWidth > 768 ? 750 : 400,
      y: 150,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".sec-one-cont",
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });

    // Animate about-cont to the left
    gsap.to(aboutContRef.current, {
      x: window.innerWidth > 768 ? -600 : -400,
      y: window.innerWidth > 768 ? 150 : 400,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".sec-one-cont",
        start: "top top",
        end: "bottom top",
        scrub: true,
        markers: false,
      },
    });
  }, []);

  return (
    <>
    <section className="sec-one-cont" id="about">
      <div className="about-cont" ref={aboutContRef}>
        <p className="dot-separated">
          <span className="underlined">
            Minimal <span className="dot"></span> Mythical
            <span className="dot"></span> Mine
          </span>
        </p>
        <p className="myName">
          Hey, I'm <strong>Sohail</strong>
          <span className="dot"></span>
          <span className="typing">{typingText}</span>
        </p>
        <div className="tag-lines">
          <p className="tag-line">I don't just build websites —</p>
          <p className="tag-line">I build consciousness in code.</p>
        </div>
      </div>

      <div className="robo-cont" ref={roboContRef}>
        <img src="../../robo.png" className="robo" alt="Robot" />
      </div>
    </section>
    <OrbitSection/>
    </>
  );
}

export default HeroSection;