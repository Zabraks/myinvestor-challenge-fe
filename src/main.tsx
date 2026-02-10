import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@app/App.tsx';
import './styles/globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/queryClient.ts';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  throw new Error('Root container not found');
}
