import { useState, useEffect, useRef } from "react";

export default function SmartCounter({ value, duration = 2000 }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const animated = useRef(false);

  // Convert formatted numbers into real numbers
  const parseValue = (val) => {
    const num = parseFloat(val);

    if (val.includes("M")) return num * 1_000_000;
    if (val.includes("K")) return num * 1_000;
    if (val.includes("B")) return num * 1_000_000_000;
    return num;
  };

  // Create final formatted output
  const format = (num, original) => {
    if (original.includes("M")) return (num / 1_000_000).toFixed(1) + "M+";
    if (original.includes("K") && !original.includes("km"))
      return (num / 1_000).toFixed(1) + "K+";
    if (original.includes("B"))
      return (num / 1_000_000_000).toFixed(0) + "B USD+";
    if (original.includes("km")) return (num / 1_000).toFixed(1) + "K km2+";
    return num.toLocaleString();
  };

  useEffect(() => {
    const end = parseValue(value);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;

          let start = 0;
          const increment = end / (duration / 16);

          const animate = () => {
            start += increment;

            if (start < end) {
              setDisplay(format(start, value));
              requestAnimationFrame(animate);
            } else {
              setDisplay(value); // final output exactly as given
            }
          };

          animate();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
