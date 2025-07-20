import React, { useRef, useEffect, useState } from 'react';

function Navbar() {
  const hamburgerRef = useRef(null);
  const navsRef = useRef(null);
  const navLinksRef = useRef([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get system theme preference
  const getSystemTheme = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    updateDocumentClass(newMode);
  };

  // Utility to update document class
  const updateDocumentClass = (isDark) => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    const hamburger = hamburgerRef.current;
    const navs = navsRef.current;
    if (hamburger && navs) {
      hamburger.classList.toggle('active');
      navs.classList.toggle('active');
    }
  };

  // Scroll to section and set active link
  const handleNavClick = (e, id) => {
    e.preventDefault();

    navLinksRef.current.forEach(link => link.classList.remove('active'));

    const clickedLink = e.target;
    clickedLink.classList.add('active');

    const hamburger = hamburgerRef.current;
    const navs = navsRef.current;

    if (hamburger && navs) {
      hamburger.classList.remove('active');
      navs.classList.remove('active');
    }

    const targetId = id;
    let attempts = 0;
    const tryScroll = () => {
      const targetSection = document.querySelector(targetId);
      if (targetSection && targetSection.offsetTop > 0) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth',
        });
      } else if (attempts < 50) {
        attempts++;
        setTimeout(tryScroll, 30);
      } else {
        const fallbackSection = document.querySelector(targetId);
        if (fallbackSection) {
          window.scrollTo({
            top: fallbackSection.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    };

    tryScroll();
  };

  // Set active link based on scroll
  const handleScroll = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = document.querySelector(`.navs a[href="#${id}"]`);

      if (scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight) {
        navLinksRef.current.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  };

  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const navs = navsRef.current;

    // Load saved theme or fallback to system theme
    const savedTheme = localStorage.getItem('theme');
    let initialTheme;

    if (savedTheme === 'dark' || savedTheme === 'light') {
      initialTheme = savedTheme === 'dark';
    } else {
      initialTheme = getSystemTheme();
    }

    setIsDarkMode(initialTheme);
    updateDocumentClass(initialTheme);

    // Attach hamburger click event immediately
    if (hamburger) {
      hamburger.addEventListener('click', toggleMenu);
    }

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
    handleScroll();

    // Cleanup
    return () => {
      if (hamburger) {
        hamburger.removeEventListener('click', toggleMenu);
      }
      navLinks.forEach(link => link.removeEventListener('click', closeMenu));
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

      <div className="switch-mode-btn" id="modeToggle" onClick={toggleDarkMode}>
        <span className="moon">
          <img src={isDarkMode ? "sun.svg" : "moon.svg"} alt={isDarkMode ? "Light Mode" : "Dark Mode"} />
        </span>
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