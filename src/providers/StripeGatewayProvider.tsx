import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

const StripeContext = createContext<Promise<Stripe | null> | null>(stripePromise);

export const StripeGatewayProvider = ({ children }: { children: ReactNode }) => (
  <StripeContext.Provider value={stripePromise}>{children}</StripeContext.Provider>
);

export const useStripePromise = () => {
  const ctx = useContext(StripeContext);
  if (!ctx) throw new Error('Stripe promise not available');
  return ctx;
};

