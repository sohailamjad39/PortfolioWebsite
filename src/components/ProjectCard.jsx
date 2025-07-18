import React, { forwardRef, useRef, useEffect } from "react";
import VanillaTilt from "vanilla-tilt";

const ProjectCard = forwardRef(
  (
    {
      projectImg = "https://picsum.photos/400/300 ",
      projectName = "Project Name",
      projectDesc = "Project description goes here.",
      projectLink = "https://github.com ",
    },
    ref
  ) => {
    const internalRef = useRef(null);

    // Make sure the forwarded ref points to the actual DOM node
    useEffect(() => {
      if (ref) ref(internalRef.current);
    }, [ref]);

    // Initialize VanillaTilt
    useEffect(() => {
      if (internalRef.current) {
        VanillaTilt.init(internalRef.current, {
          max: 15,
          speed: 400,
          glare: true,
          "max-glare": 0.05,
          perspective: 900,
          scale: 1.02,
        });
      }
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