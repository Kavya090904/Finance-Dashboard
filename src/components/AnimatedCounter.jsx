import React, { useEffect, useState } from 'react';

const AnimatedCounter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const target = parseFloat(value.toString().replace(/[^\d.-]/g, ''));

  useEffect(() => {
    let start = 0;
    const end = target;
    const duration = 1000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>{prefix}{count.toLocaleString()}{suffix}</span>
  );
};

export default AnimatedCounter;
