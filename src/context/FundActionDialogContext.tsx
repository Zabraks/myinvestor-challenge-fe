import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { FundActionDialog } from '@/features/actions/components/FundActionDialog';
import type { FundTableItem } from '@domain/funds/types';

export type DialogAction = 'buy' | 'sell' | 'transfer' | 'show';

interface DialogState {
  open: boolean;
  action: DialogAction | null;
  id: string | null;
  data: FundTableItem | null;
}

interface FundActionDialogContextType {
  openDialog: (action: DialogAction, id: string, data?: FundTableItem) => void;
  closeDialog: () => void;
}

const FundActionDialogContext = createContext<FundActionDialogContextType | null>(null);

export function FundActionDialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DialogState>({
    open: false,
    action: null,
    id: null,
    data: null,
  });

  const openDialog = (action: DialogAction, id: string, data: FundTableItem | null = null) => {
    setState({ open: true, action, id, data });
  };

  const closeDialog = () => {
    setState({ open: false, action: null, id: null, data: null });
  };

  return (
    <FundActionDialogContext.Provider value={{ openDialog, closeDialog }}>
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
