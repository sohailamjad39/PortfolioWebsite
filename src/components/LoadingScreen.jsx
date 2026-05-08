import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const developerQuotes = [
  "Code is like humor. When you have to explain it, it's bad.",
  "Software is a great combination between art and engineering.",
  "Every great developer you know got there by solving problems they were unqualified to solve until they actually did it.",
  "The computer was born to solve problems that did not exist before.",
  "Good code is its own best documentation.",
];

function LoadingScreen({ onComplete }) {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const barFillRef = useRef(null);
  const percentRef = useRef(null);
  const titleRef = useRef(null);
  const quoteRef = useRef(null);

  const quote = developerQuotes[Math.floor(Math.random() * developerQuotes.length)];

  useEffect(() => {
    const top = topRef.current;
    const bottom = bottomRef.current;
    const barFill = barFillRef.current;
    const percent = percentRef.current;
    const title = titleRef.current;
    const quoteEl = quoteRef.current;

    let loaded = 0;

    gsap.fromTo(title, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 });
    gsap.fromTo(quoteEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 });

    const interval = setInterval(() => {
      loaded += 2;
      if (barFill && percent) {
        barFill.style.width = `${loaded}%`;
        percent.textContent = `${loaded}%`;
      }

      if (loaded >= 100) {
        clearInterval(interval);

        gsap.to([top, bottom], {
          yPercent: (i) => (i === 0 ? -100 : 100),
          opacity: 0.05,
          duration: 1.6,
          ease: "power4.inOut",
          stagger: { each: 0.15, from: "center" },
          onComplete: () => {
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 50);
          },
        });
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader-container">
      <div className="loader-top" ref={topRef}>
        <h1 className="loader-title" ref={titleRef}>
          Heading to My Universe
        </h1>
        <div className="loader-progress-container">
          <div className="loader-progress-fill" ref={barFillRef}></div>
        </div>
      </div>

      <div className="loader-bottom" ref={bottomRef}>
        <p className="loader-percent" ref={percentRef}>
          0%
        </p>
        <p className="loader-quote" ref={quoteRef}>
          {quote}
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;