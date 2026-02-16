import { createContext, useContext, useState } from 'react';

type Origin = 'table' | 'portfolio';

interface ActionMenuState<T> {
  isOpen: boolean;
  data: T | null;
  anchorRect: DOMRect | null;
  origin: Origin | null;
  open: (data: T, rect: DOMRect, origin: Origin) => void;
  close: () => void;
}

export const ActionMenuContext = createContext<ActionMenuState | null>(null);

export function ActionMenuProvider<T>({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    data: T | null;
    anchorRect: DOMRect | null;
    origin: Origin | null;
  }>({ data: null, anchorRect: null, origin: null });

  const open = (data, rect, origin) => {
    setState({ data, anchorRect: rect, origin });
  };

  return (
    <ActionMenuContext.Provider
      value={{
        isOpen: !!state.data,
        data: state.data,
        anchorRect: state.anchorRect,
        origin: state.origin,
        open,
        close: () => setState({ data: null, anchorRect: null, origin: null }),
      }}
    >
      {children}
    </ActionMenuContext.Provider>
  );
}

export const useActionMenu = <T,>() => {
  const ctx = useContext(ActionMenuContext);
  if (!ctx) throw new Error('useActionMenu must be used inside ActionMenuProvider');
  return ctx as ActionMenuState<T>;
};
