import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  FundActionDialog,
  type FundAction,
  type Fund,
} from '@features/actions/FundActionDialog/FundActionDialog';

interface FundActionDialogState {
  open: boolean;
  action: FundAction | null;
  data: Fund | null;
}

interface FundActionDialogContextType {
  openDialog: (action: FundAction, data?: Fund) => void;
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
    data: null,
  });

  const openDialog = (action: FundAction, data?: Fund) => {
    setState({ open: true, action, data: data ?? null });
  };

  const closeDialog = () => {
    setState({ open: false, action: null, data: null });
  };

  return (
    <FundActionDialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <FundActionDialog
        open={state.open}
        action={state.action}
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
