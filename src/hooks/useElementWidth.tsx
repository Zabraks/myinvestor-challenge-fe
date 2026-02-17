import { useLayoutEffect, useState } from 'react';

export function useElementWidth<T extends HTMLElement>() {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!width) return;
  }, [width]);

  const ref = (node: T | null) => {
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(node);

    return () => observer.disconnect();
  };

  return { ref, width };
}
