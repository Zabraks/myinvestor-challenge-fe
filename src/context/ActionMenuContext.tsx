import { createContext, useContext, useState, useMemo, useCallback } from 'react';

type Origin = 'table' | 'portfolio';

interface ActionMenuState<T = unknown> {
  isOpen: boolean;
  data: T | null;
  anchorRect: DOMRect | null;
  origin: Origin | null;
  open: (data: T, rect: DOMRect, origin: Origin) => void;
  close: () => void;
}

export const ActionMenuContext = createContext<ActionMenuState | null>(null);

export function ActionMenuProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    data: unknown;
    anchorRect: DOMRect | null;
    origin: Origin | null;
  }>({ data: null, anchorRect: null, origin: null });

  const open = useCallback((data: unknown, rect: DOMRect, origin: Origin) => {
    setState({ data, anchorRect: rect, origin });
  }, []);

  const close = useCallback(() => {
    setState({ data: null, anchorRect: null, origin: null });
  }, []);

  const value = useMemo(
    () => ({
      isOpen: !!state.data,
      data: state.data,
      anchorRect: state.anchorRect,
      origin: state.origin,
      open,
      close,
    }),
    [state.data, state.anchorRect, state.origin, open, close]
  );

  return <ActionMenuContext.Provider value={value}>{children}</ActionMenuContext.Provider>;
}

export const useActionMenu = <T,>() => {
  const ctx = useContext(ActionMenuContext);
  if (!ctx) throw new Error('useActionMenu must be used inside ActionMenuProvider');
  return ctx as ActionMenuState<T>;
};
