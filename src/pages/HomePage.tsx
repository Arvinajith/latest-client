import { useState } from 'react';

import { Hero } from '../components/Hero';
import { FilterBar } from '../components/FilterBar';
import { EventCard } from '../components/EventCard';
import { useEvents } from '../hooks/useEvents';

export const HomePage = () => {
  const [filters, setFilters] = useState({ search: '', category: 'all' });
  const { data, isLoading } = useEvents(filters);

  return (
    <section className="space-y-8">
      <Hero />
      <FilterBar filters={filters} onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))} />

      {isLoading ? (
        <p>Loading events…</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
};

