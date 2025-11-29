import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import type { Event } from '../types';
import { Button } from './ui/Button';

interface Props {
  event: Event;
}

export const EventCard = ({ event }: Props) => {
  const cover = event.media?.[0]?.url || 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70';

  return (
    <article className="glass-panel flex flex-col overflow-hidden">
      <img src={cover} alt={event.title} className="h-48 w-full object-cover" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-charcoal/50">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
            {event.category || 'Featured'}
          </span>
          <span>{dayjs(event.startDate).format('MMM D, YYYY')}</span>
        </div>
        <div>
          <h3 className="font-display text-xl text-charcoal">{event.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-charcoal/70">{event.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xs text-charcoal/60">From</p>
            <p className="text-lg font-semibold text-charcoal">
              ${event.pricing?.[0]?.price?.toFixed(0) ?? 0}
            </p>
          </div>
          <Button asChild className="text-sm">
            <Link to={`/events/${event._id}`}>View details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

