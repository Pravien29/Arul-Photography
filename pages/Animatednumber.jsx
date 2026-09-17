import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 to the numeric part of `value` once visible.
 * Preserves any trailing suffix, e.g. "500+" -> counts to 500, keeps "+".
 */
function AnimatedNumber({ value, duration = 1400 }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const hasRun = useRef(false);

  const numeric = parseInt(String(value).replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = String(value).replace(/[0-9]/g, "");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();

          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * numeric).toString());
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.unobserve(node);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [numeric, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default AnimatedNumber;