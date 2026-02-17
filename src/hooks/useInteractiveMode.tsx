import { useEffect, useState } from 'react';

export type InteractionMode = 'touch' | 'mouse' | 'hybrid';

interface InteractionInfo {
  mode: InteractionMode;
  isTouch: boolean;
  isMouse: boolean;
}

export function useInteractionMode(): InteractionInfo {
  const getMode = (): InteractionInfo => {
    if (typeof window === 'undefined') {
      return { mode: 'mouse', isTouch: false, isMouse: true };
    }
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;

    let mode: InteractionMode = 'mouse';

    if (isTouch && !canHover) mode = 'touch';
    else if (isTouch && canHover) mode = 'hybrid';

    return {
      mode,
      isTouch,
      isMouse: !isTouch || canHover,
    };
  };

  const [state, setState] = useState<InteractionInfo>(getMode);

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)');
    const hover = window.matchMedia('(hover: hover)');

    const update = () => setState(getMode());

    coarse.addEventListener('change', update);
    hover.addEventListener('change', update);

    return () => {
      coarse.removeEventListener('change', update);
      hover.removeEventListener('change', update);
    };
  }, []);

  return state;
}
