import { motion, useMotionValue } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { useElementWidth } from '@hooks/useElementWidth';

interface SwipeableRowProps {
  children: ReactNode;
  actions: ReactNode;
}

export function SwipeableRow({ children, actions }: SwipeableRowProps) {
  const { ref: actionsRef, width: actionWidth } = useElementWidth<HTMLDivElement>();
  const x = useMotionValue(0);

  useEffect(() => {
    if (actionWidth > 0) {
      x.set(actionWidth);
    }
  }, [actionWidth, x]);

  const clamp = (value: number) => Math.min(actionWidth, Math.max(0, value));

  const handlePan = (deltaX: number) => {
    const nextX = clamp(x.get() + deltaX);
    x.set(nextX);
  };

  return (
    <div className="relative overflow-hidden touch-pan-y">
      <motion.div
        ref={actionsRef}
        className="absolute right-0 top-0 z-20 h-full"
        style={{ x }}
        onPan={(_, info) => handlePan(info.delta.x)}
      >
        {actions}
      </motion.div>

      <motion.div className="relative z-10" onPan={(_, info) => handlePan(info.delta.x)}>
        {children}
      </motion.div>
    </div>
  );
}
