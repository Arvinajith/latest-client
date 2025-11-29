import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { useEvent } from '../hooks/useEvent';
import { Button } from '../components/ui/Button';
import { TicketCheckout } from '../components/TicketCheckout';
import type { EventPricing } from '../types';

export const EventDetailPage = () => {
  const { eventId = '' } = useParams();
  const { data: event, isLoading } = useEvent(eventId);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedTier, setSelectedTier] = useState('general');

  useEffect(() => {
    if (event && !event.pricing.find((tier) => tier.tier === selectedTier)) {
      setSelectedTier(event.pricing[0]?.tier || 'general');
    }
  }, [event, selectedTier]);

  const tiers: EventPricing[] = event?.pricing ?? [];

  if (isLoading || !event) return <p>Loading event…</p>;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <img
            src={event.media?.[0]?.url || 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef'}
            alt={event.title}
            className="h-96 w-full rounded-4xl object-cover"
          />
          <div className="glass-panel space-y-3 p-6">
            <p className="text-sm uppercase tracking-wide text-charcoal/60">{event.category}</p>
            <h1 className="font-display text-4xl">{event.title}</h1>
            <p className="text-charcoal/70">{event.description}</p>
            <div className="flex flex-wrap gap-6 text-sm text-charcoal/60">
              <span>{dayjs(event.startDate).format('MMM D, YYYY h:mm A')}</span>
              <span>{event.location.city}</span>
              <span>{event.status}</span>
            </div>
          </div>
          <section className="space-y-4">
            <h2 className="text-2xl font-display">Ticket options</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {tiers.map((tier) => (
                <button
                  key={tier.tier}
                  onClick={() => setSelectedTier(tier.tier)}
                  className={`rounded-3xl border px-4 py-4 text-left transition ${
                    selectedTier === tier.tier
                      ? 'border-primary bg-primary/5 shadow-glow'
                      : 'border-charcoal/10 hover:border-primary/60'
                  }`}
                >
                  <p className="text-sm uppercase text-charcoal/60">{tier.label}</p>
                  <p className="text-2xl font-semibold text-charcoal">${tier.price}</p>
                  <p className="text-sm text-charcoal/60">
                    {tier.benefits?.slice(0, 3).join(' · ') ?? 'Includes general access'}
                  </p>
                </button>
              ))}
            </div>
          </section>
        </div>

        <aside className="glass-panel h-fit space-y-4 p-6">
          <p className="text-sm uppercase text-charcoal/60">Reserve seat</p>
          <p className="text-3xl font-display text-charcoal">
            $
            {tiers.find((tier) => tier.tier === selectedTier)?.price ??
              tiers[0]?.price ??
              0}
          </p>
          <Button onClick={() => setShowCheckout(true)}>Purchase ticket</Button>
          <div className="space-y-2 text-sm text-charcoal/60">
            <p>Secure payments via Stripe</p>
            <p>Instant email confirmation + Apple Wallet pass</p>
            <p>Free cancellation up to 48h</p>
          </div>
        </aside>
      </div>

      {showCheckout && (
        <TicketCheckout event={event} tier={selectedTier} onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
};

