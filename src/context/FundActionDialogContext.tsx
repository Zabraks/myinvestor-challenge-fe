import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import { FundActionDialog } from '@features/actions/FundActionDialog/FundActionDialog';
import type { ActionType, ActionData } from '@domain/action';

interface FundActionDialogState {
  open: boolean;
  action: ActionType | null;
  data: ActionData | null;
  id: string | null;
}

interface FundActionDialogContextType {
  openDialog: (action: ActionType, data?: ActionData) => void;
  closeDialog: () => void;
}

const FundActionDialogContext = createContext<FundActionDialogContextType | null>(null);

interface FundActionDialogProviderProps {
  readonly children: ReactNode;
}

export function FundActionDialogProvider({ children }: FundActionDialogProviderProps) {
  const [state, setState] = useState<FundActionDialogState>({
    open: false,
    action: null,
    id: null,
    data: null,
  });

  const openDialog = (action: ActionType, data?: ActionData) => {
    setState({ open: true, action, data: data ?? null, id: data?.id ?? null });
  };

  const closeDialog = () => {
    setState({ open: false, action: null, id: null, data: null });
  };

  const contextValue = useMemo(() => ({ openDialog, closeDialog }), []);

  return (
    <FundActionDialogContext.Provider value={contextValue}>
      {children}
      <FundActionDialog
        open={state.open}
        action={state.action}
        fundId={state.id}
        data={state.data}
        onClose={closeDialog}
      />
    </FundActionDialogContext.Provider>
  );
}

export const useFundActionDialog = () => {
  const ctx = useContext(FundActionDialogContext);
  if (!ctx) {
    throw new Error('useFundActionDialog must be used within FundActionDialogProvider');
  }
  return ctx;
};
