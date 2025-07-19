import React, { useRef, useEffect } from 'react';

function Navbar() {
  const hamburgerRef = useRef(null);
  const navsRef = useRef(null);
  const navLinksRef = useRef([]);

  // Scroll to section and set active link
  const handleNavClick = (e, id) => {
    e.preventDefault();

    // Remove active from all links
    navLinksRef.current.forEach(link => link.classList.remove('active'));

    // Add active to clicked link
    const clickedLink = e.target;
    clickedLink.classList.add('active');

    // Close mobile menu
    if (hamburgerRef.current && navsRef.current) {
      hamburgerRef.current.classList.remove('active');
      navsRef.current.classList.remove('active');
    }

    // Delay scroll slightly to allow layout stabilization
    setTimeout(() => {
      const targetSection = document.querySelector(id);
      if (targetSection) {
        // Force reflow to ensure correct offset
        void targetSection.offsetHeight;

        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth',
        });
      }
    }, 30); // Small delay helps avoid layout issues
  };

  // Set active link based on current scroll position
  const handleScroll = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.navs a[href="#${id}"]`);

      if (
        scrollY >= sectionTop - 100 &&
        scrollY < sectionTop + sectionHeight
      ) {
        // Remove active from all
        navLinksRef.current.forEach(link => link.classList.remove('active'));

        // Add active to current
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  };

  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const navs = navsRef.current;

    if (!hamburger || !navs) return;

    // Toggle mobile menu
    const toggleMenu = () => {
      hamburger.classList.toggle('active');
      navs.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Handle nav link clicks
    const navLinks = document.querySelectorAll('.navs a');
    navLinksRef.current = [...navLinks];

    const closeMenu = (e) => {
      e.preventDefault();
      const id = e.target.getAttribute('href');
      handleNavClick(e, id);
    };

    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Scroll handler
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on mount

    // Cleanup
    return () => {
      hamburger.removeEventListener('click', toggleMenu);
      navLinks.forEach(link => {
        link.removeEventListener('click', closeMenu);
      });
      window.removeEventListener('scroll', handleScroll);
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
          <span className="dot-separator"></span>
          <li><a href="#contact" className="tc-dark">Contact</a></li>
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