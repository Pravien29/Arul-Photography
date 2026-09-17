import { useEffect, useRef, useState } from "react";

/**
 * Reveal — fades/slides a section into place the first time it enters
 * the viewport. Respects prefers-reduced-motion via CSS (see tokens.css).
 *
 * Props:
 *  - direction: "up" | "left" | "right" | "scale" (default "up")
 *  - delay: ms delay applied via transition-delay
 *  - as: element tag to render (default "div")
 */
function Reveal({ children, direction = "up", delay = 0, className = "", as = "div", ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Tag = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default Reveal;