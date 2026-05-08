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
    if (!headingRef.current || !cardRefs.current.length) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 40%",
        end: "bottom 40%",
        toggleActions: "play reverse play reverse",
        markers: false,
        once: false,
      },
    });

    tl.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      0
    );

    tl.fromTo(
      cardRefs.current.filter(Boolean),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: { each: 0.15, from: "start" },
      },
      "<+0.1"
    );
  }, []);

  const projects = [
    {
      projectName: "HIGH TECH ISP",
      projectDesc:
        "A role-based web application built with Next.js and MongoDB, featuring Stripe payment integration, OpenStreetMap support, customer billing history, subscription plans, and admin dashboards with full CRUD operations.",
      projectImg: "isp.png",
      projectLink: "https://github.com/sohailamjad39/high-tech-isp/",
    },
    {
      projectName: "NSEMS - NUTECH Secure Entrance Management System",
      projectDesc:
        "A role-based web application built with React and Node.js, featuring cryptographic QR-based digital student ID cards, HMAC-SHA256 time-expiring tokens, offline-first PWA support with IndexedDB sync, real-time scan logging, and admin dashboards with full student and access management.",
      projectImg: "nsems.png",
      projectLink: "https://github.com/sohailamjad39/NSEMS/",
    },
    {
      projectName: "HrFlow",
      projectDesc:
        "A modern HR management system built with React and Node.js, featuring employee management, attendance tracking, payroll, and leave management with a responsive, user-friendly interface.",
      projectImg: "hrflow.png",
      projectLink: "https://github.com/sohailamjad39/Simple-HR-Management",
    },
    {
      projectName: "EduTrackon",
      projectDesc:
        "EduTrackon is a smart web app that marks student attendance using face recognition. Built with JavaScript and Node.js, it includes an admin panel and student portal to track attendance and academic progress easily.",
      projectImg: "edutrackon.jpeg",
      projectLink: "https://github.com/sohailamjad39/Student-Face-Recognition-Web-App",
    },
    {
      projectName: "SkyBook",
      projectDesc:
        "An easy-to-use web app where users can search flights, book tickets, and manage bookings online. It includes admin control, user login, and a database-powered backend to handle flights, passengers, and payments.",
      projectImg: "skybook.png",
      projectLink: "https://github.com/sohailamjad39/AirlineTicketBookingSystem",
    },
  ];

  return (
    <section id="projects" className="project-section" ref={sectionRef}>
      <h1 className="project-heading" ref={headingRef}>
        Projects
      </h1>

      <div className="project-card-container">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            projectName={project.projectName}
            projectDesc={project.projectDesc}
            projectImg={project.projectImg}
            projectLink={project.projectLink}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectSection;