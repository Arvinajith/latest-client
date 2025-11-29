import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import './index.css';
import { queryClient } from './services/queryClient';
import { AuthProvider } from './context/AuthContext';
import { StripeGatewayProvider } from './providers/StripeGatewayProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StripeGatewayProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </StripeGatewayProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

