import React, { useEffect } from "react";

function Background() {
  useEffect(() => {
    // Load particles.js from CDN if not already loaded
    if (!window.particlesJS) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js ";
      script.async = true;
      script.onload = initParticles;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script); // Cleanup
      };
    } else {
      initParticles();
    }

    function initParticles() {
      /* eslint-disable no-undef */
      particlesJS("particles-js", {
        particles: {
          number: { value: 100, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
            image: { src: "img/github.svg", width: 100, height: 100 },
          },
          opacity: {
            value: 1,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
          },
          line_linked: {
            enable: false,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 600 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false, mode: "bubble" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 250,
              size: 0,
              duration: 2,
              opacity: 0,
              speed: 3,
            },
            repulse: { distance: 400, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
    }
  }, []);

  return (
    <>
      <div className="bg-main">
        <div className="background-fixed"></div>
        <div id="particles-js" className="particles-container"></div>
      </div>
    </>
  );
}

export default Background;
