import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/queryClient';
import { FundActionDialogProvider } from '@context/FundActionDialogContext';
import { ActionMenuProvider } from '@context/ActionMenuContext';
import App from '@app/App.tsx';
import './styles/globals.css';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <FundActionDialogProvider>
          <ActionMenuProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ActionMenuProvider>
        </FundActionDialogProvider>
      </QueryClientProvider>
    </StrictMode>
  );
} else {
  throw new Error('Root container not found');
}
