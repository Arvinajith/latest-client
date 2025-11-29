import { useState } from 'react';
import type { FormEvent } from 'react';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useMutation } from '@tanstack/react-query';

import { useStripePromise } from '../providers/StripeGatewayProvider';
import api from '../services/api';
import type { Event } from '../types';
import { Button } from './ui/Button';

interface TicketCheckoutProps {
  event: Event;
  tier: string;
  onClose: () => void;
}

const CheckoutPayment = ({
  paymentIntentId,
  eventId,
  tickets,
  onClose,
}: {
  paymentIntentId: string;
  eventId: string;
  tickets: { type: string; quantity: number }[];
  onClose: () => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { error: stripeError } = await stripe.confirmPayment({ elements, redirect: 'if_required' });
    if (stripeError) {
      setError(stripeError.message || 'Payment failed');
      setLoading(false);
      return;
    }
    await api.post('/tickets/confirm', {
      eventId,
      tickets,
      paymentIntentId,
    });
    setLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" loading={loading} className="w-full">
        Confirm purchase
      </Button>
    </form>
  );
};

export const TicketCheckout = ({ event, tier, onClose }: TicketCheckoutProps) => {
  const stripePromise = useStripePromise();
  const [quantity, setQuantity] = useState(1);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntentId, setPaymentIntentId] = useState('');

  const checkoutMutation = useMutation({
    mutationFn: () =>
      api.post('/tickets/checkout', {
        eventId: event._id,
        tickets: [{ type: tier, quantity }],
      }),
    onSuccess: ({ data }) => {
      setClientSecret(data.clientSecret);
      setPaymentIntentId(data.paymentIntentId);
    },
  });

  const price = event.pricing.find((option) => option.tier === tier)?.price ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/70 p-4">
      <div className="glass-panel max-w-lg flex-1 space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase text-charcoal/60">Checkout</p>
            <p className="text-xl font-semibold text-charcoal">{event.title}</p>
          </div>
          <button onClick={onClose} className="text-charcoal/50 hover:text-charcoal">
            Close
          </button>
        </div>

        {!clientSecret ? (
          <div className="space-y-4">
            <label className="flex flex-col gap-2 text-sm text-charcoal/70">
              Quantity
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                className="rounded-2xl border border-charcoal/10 px-4 py-2"
              />
            </label>
            <div className="flex items-center justify-between text-lg font-semibold text-charcoal">
              <span>Total</span>
              <span>${(price * quantity).toFixed(2)}</span>
            </div>
            <Button className="w-full" onClick={() => checkoutMutation.mutate()} loading={checkoutMutation.isPending}>
              Continue to payment
            </Button>
          </div>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutPayment
              paymentIntentId={paymentIntentId}
              eventId={event._id}
              tickets={[{ type: tier, quantity }]}
              onClose={onClose}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

