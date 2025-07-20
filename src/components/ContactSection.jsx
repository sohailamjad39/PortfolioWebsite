import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const iconsRef = useRef(null);

  useEffect(() => {
    // Animate left section
    gsap.fromTo(
      leftRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 40%", // 10% from top
          toggleActions: "play none none reverse",
          once: true,
        },
      }
    );
  
    // Animate right section
    gsap.fromTo(
      rightRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 40%",
          toggleActions: "play none none reverse",
          once: true,
        },
      }
    );
  
    // Animate icons with stagger
    gsap.fromTo(
      iconsRef.current?.querySelectorAll("a"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 40%",
          once: true,
        },
      }
    );
  }, []);

  return (
    <section className="contact-section" id="contact">
      <div className="contact-wrapper">
      <div className="contact-left" ref={leftRef}>
        <h1>You Think It,</h1>
        <h1>I Build It</h1>
      </div>

      <div className="contact-right" ref={rightRef}>
        <div className="contact-card">
          <h2>Let's Get in Touch!</h2>
          <p><strong>Email:</strong> sohailamjad39sgd@gmail.com</p>
          <p><strong>Phone:</strong> +92-325-957-1047</p>
          <h3>Or Connect On</h3>
          <div className="contact-icons" ref={iconsRef}>
            <a href="https://www.linkedin.com/in/sohailamjad39/ " target="_blank" rel="noopener noreferrer">
              <img src="linkedIn.svg" alt="LinkedIn" />
              LinkedIn
            </a>
            <a href="https://github.com/sohailamjad39/ " target="_blank" rel="noopener noreferrer">
              <img src="github.svg" alt="GitHub" />
              GitHub
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default ContactSection;