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
    <section id="projects" className="project-section" ref={sectionRef}>
      <h1 className="project-heading" ref={headingRef}>
        Projects
      </h1>

      <div className="project-card-container">
        <ProjectCard
          ref={(el) => (cardRefs.current[0] = el)}
          projectName="EduTrackon"
          projectDesc="EduTrackon is a smart web app that marks student attendance using face recognition. Built with JavaScript and Node.js, it includes an admin panel and student portal to track attendance and academic progress easily."
          projectImg="edutrackon.jpeg"
          projectLink="https://github.com/sohailamjad39/Student-Face-Recognition-Web-App "
        />

        <ProjectCard
          ref={(el) => (cardRefs.current[1] = el)}
          projectName="SkyBook"
          projectDesc="An easy-to-use web app where users can search flights, book tickets, and manage bookings online. It includes admin control, user login, and a database-powered backend to handle flights, passengers, and payments."
          projectImg="skybook.png"
          projectLink="https://github.com/sohailamjad39/AirlineTicketBookingSystem"
        />
      </div>
    </section>
  );
}

export default ProjectSection;