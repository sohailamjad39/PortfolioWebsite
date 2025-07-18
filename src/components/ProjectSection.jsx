import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

function ProjectSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Only animate if all refs are available
    if (!headingRef.current || !cardRefs.current.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 40%", 
        end: "bottom 40%",
        toggleActions: "play reverse play reverse", // Play on enter, reverse on exit
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

    // Animate cards with stagger
    tl.fromTo(
      cardRefs.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: {
          each: 0.15,
          from: "start",
        },
      },
      "<+0.1"
    );
  }, []);

  return (
    <section className="project-section" ref={sectionRef}>
      <h1 className="project-heading" ref={headingRef}>
        Projects
      </h1>

      <div className="project-card-container">
        <ProjectCard
          ref={(el) => (cardRefs.current[0] = el)}
          projectName="Project 1"
          projectDesc="This is a sample project description. It should animate in smoothly."
          projectImg="https://picsum.photos/id/1018/400/300 "
          projectLink="https://github.com "
        />

        <ProjectCard
          ref={(el) => (cardRefs.current[1] = el)}
          projectName="Project 2"
          projectDesc="This is another sample project description. It should animate in smoothly after the first one."
          projectImg="https://picsum.photos/id/1015/400/300 "
          projectLink="https://github.com "
        />
      </div>
    </section>
  );
}

export default ProjectSection;