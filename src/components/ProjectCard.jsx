import React, { forwardRef, useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

const ProjectCard = forwardRef(
  (
    {
      projectImg = "https://picsum.photos/400/300",
      projectName = "Project Name",
      projectDesc = "Project description goes here.",
      projectLink = "https://github.com",
    },
    ref
  ) => {
    const internalRef = useRef(null);

    // Forward ref to the DOM node
    useEffect(() => {
      if (ref) ref(internalRef.current);
    }, [ref]);

    // Initialize VanillaTilt only on desktop (width >= 768px)
    useEffect(() => {
      const handleInitTilt = () => {
        if (window.innerWidth >= 768 && internalRef.current) {
          VanillaTilt.init(internalRef.current, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.05,
            perspective: 900,
            scale: 1.02,
          });
        }
      };

      handleInitTilt();

      // Optional: re-check on resize (if needed)
      const handleResize = () => {
        // Destroy tilt instance if it exists and we're now on mobile
        if (window.innerWidth < 768 && internalRef.current?._vanillaTilt) {
          internalRef.current._vanillaTilt.destroy();
        } else if (window.innerWidth >= 768 && internalRef.current && !internalRef.current._vanillaTilt) {
          handleInitTilt();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        // Cleanup tilt instance on unmount
        if (internalRef.current?._vanillaTilt) {
          internalRef.current._vanillaTilt.destroy();
        }
      };
    }, []);

    return (
      <div ref={internalRef} className="project-card">
        <div className="project-card-inner">
          <div className="project-card-image">
            <img src={projectImg} alt={projectName} />
          </div>
          <div className="project-card-info">
            <h2>{projectName}</h2>
            <p>{projectDesc}</p>
            <div className="link-to-github">
              <a href={projectLink} target="_blank" rel="noopener noreferrer">
                View on Github
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default ProjectCard;