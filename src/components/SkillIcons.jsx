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

// Wrap component with forwardRef
const TickerTape = forwardRef((props, ref) => {
  const tickerWrapperRef = useRef(null);

  // Forward the internal ref to parent
  useEffect(() => {
    if (ref && typeof ref === 'object' && ref !== null) {
      ref.current = tickerWrapperRef.current;
    }
  }, [ref]);

  return (
    <div className="ticker-wrapper" ref={tickerWrapperRef}>
      <div className="ticker-container">
        <div className="ticker-track">
          {skillIcons.map((icon, index) => (
            <div className="ticker-item" key={`first-${index}`}>
              <img
                src={`/logos/${icon}`}
                alt={icon}
                className="ticker-icon"
                loading="lazy"
              />
            </div>
          ))}
          {skillIcons.map((icon, index) => (
            <div className="ticker-item" key={`second-${index}`}>
              <img
                src={`/logos/${icon}`}
                alt={icon}
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