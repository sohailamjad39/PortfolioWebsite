import React, { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillIcons from "./SkillIcons";

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const serviceRefs = useRef([]);
  const skillIconsRef = useRef(null); // Ref for SkillIcons

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 30%",
        toggleActions: "play reverse play reverse",
        scrub: false,
        markers: false,
        once: false,
      },
    });

    // Animate heading
    tl.fromTo(
      headingRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      },
      0
    );

    // Animate each service row
    serviceRefs.current.forEach((ref, index) => {
      tl.fromTo(
        ref,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        "<+0.1"
      );
    });

    // Animate SkillIcons at the same time
    if (skillIconsRef.current) {
      tl.fromTo(
        skillIconsRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );
    }
  }, []);

  return (
    <>
      <section className="services-section" ref={containerRef}>
        <h2 className="services-heading" ref={headingRef}>
          Services I Provide
        </h2>

        <div className="services-table">
          {[
            {
              title: "Frontend Development",
              description: "Interfaces that feel fast, clean, and right.",
            },
            {
              title: "Backend Development",
              description: "Scalable logic that just works.",
            },
            {
              title: "Full Stack Web Apps",
              description: "End-to-end solutions, from UI to DB.",
            },
            {
              title: "API Design & Integration",
              description: "Connecting systems the smart way.",
            },
            {
              title: "UI/UX Focused Builds",
              description: "Built not just to work — but to feel right.",
            },
            {
              title: "Project Setup & Deployment",
              description: "Get your app live — clean, fast, and hosted.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="service-row"
              ref={(el) => (serviceRefs.current[index] = el)}
            >
              <div className="service-content">
                <div className="service-left">
                  <span>{service.title}</span>
                </div>
                <div className="service-right">
                  <p>{service.description}</p>
                </div>
              </div>

              <div className="service-divider"></div>
              {index === 0 && <div className="service-divider top"></div>}
            </div>
          ))}
        </div>
      </section>

      {/* Pass ref to SkillIcons */}
      <SkillIcons ref={skillIconsRef} />
    </>
  );
};

export default ServicesSection;