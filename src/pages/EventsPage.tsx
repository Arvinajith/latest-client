import { useState } from 'react';

import { FilterBar } from '../components/FilterBar';
import { EventCard } from '../components/EventCard';
import { useEvents } from '../hooks/useEvents';

export const EventsPage = () => {
  const [filters, setFilters] = useState({ search: '', category: 'all' });
  const { data, isLoading } = useEvents(filters);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm uppercase text-charcoal/60">Discover</p>
        <h2 className="text-3xl font-display text-charcoal">Curated events near you</h2>
      </div>
      <FilterBar filters={filters} onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))} />
      {isLoading ? (
        <p>Loading…</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

