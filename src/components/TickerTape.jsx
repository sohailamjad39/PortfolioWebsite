import React, { forwardRef, useRef, useEffect } from 'react';
import { gsap } from "gsap";

const skillIcons = [
  "html.svg",
  "css.svg",
  "javascript.svg",
  "c++.svg",
  "react.svg",
  "nextjs.svg",
  "java.svg",
  "git.svg",
  "github.svg",
  "vercel.svg",
  "jquery.svg",
  "postman.svg",
  "python.svg"
];

const TickerTape = forwardRef((props, ref) => {
  const tickerWrapperRef = useRef(null);
  const tickerTrackRef = useRef(null);
  const animationRef = useRef(null);

  // Forward the ref to parent component
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(tickerWrapperRef.current);
      } else {
        ref.current = tickerWrapperRef.current;
      }
    }
  }, [ref]);

  useEffect(() => {
    const tickerWrapper = tickerWrapperRef.current;
    const tickerTrack = tickerTrackRef.current;

    if (!tickerWrapper || !tickerTrack) return;

    const startAnimation = () => {
      const firstItem = tickerTrack.querySelector('.ticker-item');

      if (!firstItem) {
        console.warn("No .ticker-item found");
        return;
      }

      const itemWidth = firstItem.offsetWidth + 20; // safe fallback
      const totalScrollWidth = itemWidth * skillIcons.length;

      gsap.set(tickerTrack, { x: 0 });

      animationRef.current = gsap.to(tickerTrack, {
        x: -totalScrollWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalScrollWidth)
        }
      });
    };

    const timer = setTimeout(startAnimation, 500);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <div className="ticker-wrapper" ref={tickerWrapperRef}>
      <div className="ticker-container">
        <div className="ticker-track" ref={tickerTrackRef}>
          {skillIcons.map((icon, index) => (
            <div className="ticker-item" key={`first-${index}`}>
              <img
                src={`/logos/${icon}`}
                alt={icon.replace('.svg', '')}
                className="ticker-icon"
                loading="lazy"
              />
            </div>
          ))}
          {skillIcons.map((icon, index) => (
            <div className="ticker-item" key={`second-${index}`}>
              <img
                src={`/logos/${icon}`}
                alt={icon.replace('.svg', '')}
                className="ticker-icon"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default TickerTape;