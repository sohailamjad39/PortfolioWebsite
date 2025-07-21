import React from "react";

function Footer() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <button className="back-to-top" onClick={handleScrollToTop}>
        ↑
      </button>
      <footer className="footer">
        <p>© 2025 Sohail Amjad. Built with passion and React.</p>
      </footer>
    </>
  );
}

export default Footer;