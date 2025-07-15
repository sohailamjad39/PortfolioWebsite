import React, { useRef, useEffect } from 'react';

function Navbar() {
  const hamburgerRef = useRef(null);
  const navsRef = useRef(null);

  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const navs = navsRef.current;

    if (!hamburger || !navs) return;

    // Toggle menu on hamburger click
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navs.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Close menu when a nav link is clicked
    const navLinks = navs.querySelectorAll('a');
    const closeMenu = () => {
      navs.classList.remove('active');
      hamburger.classList.remove('active');
    };

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Cleanup event listeners on unmount
    return () => {
      hamburger.removeEventListener('click', toggleMenu);
      navLinks.forEach(link => {
        link.removeEventListener('click', closeMenu);
      });
    };
  }, []);

  return (
    <div className="navbar">
      <div className="logo">LOGO</div>

      <div className="navs" id="navs" ref={navsRef}>
        <ul>
          <li><a href="#about" className="tc-dark">About</a></li>
          <span className="dot-separator"></span>
          <li><a href="#services" className="tc-dark">Services</a></li>
          <span className="dot-separator"></span>
          <li><a href="#projects" className="tc-dark">Projects</a></li>
        </ul>
      </div>

      <div className="switch-mode-btn" id="modeToggle">
        <span className="bi--moon-stars"></span>
      </div>

      <div className="hamburger" id="hamburger" ref={hamburgerRef}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Navbar;