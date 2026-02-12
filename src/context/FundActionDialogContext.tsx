import { createContext, useContext, useState } from 'react';
import { FundActionDialog } from '@/features/actions/components/FundActionDialog';

const FundActionDialogContext = createContext(null);

export function FundActionDialogProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    action: null,
    data: null,
  });

  const openDialog = (action, data) => {
    setState({ open: true, action, data });
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
