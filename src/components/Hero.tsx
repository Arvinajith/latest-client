import { Link } from 'react-router-dom';

import { Button } from './ui/Button';

export const Hero = () => (
  <section className="relative overflow-hidden rounded-4xl bg-charcoal text-white shadow-glow">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#5E4AE3,transparent_55%)] opacity-80" />
    <div className="relative z-10 grid gap-10 p-10 md:grid-cols-2 md:items-center">
      <div className="space-y-6">
        <p className="rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em]">
          Online + Hybrid Events
        </p>
        <h1 className="font-display text-4xl md:text-5xl">
          Curate premium experiences, sell tickets, and track performance in one platform.
        </h1>
        <p className="text-white/70">
          Launch Stripe-ready ticketing, visualize attendee insights, and keep audiences engaged with schedule
          updates and real-time notifications.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button>
            <Link to="/events">Explore events</Link>
          </Button>
          <Button variant="ghost">
            <Link to="/dashboard">Create event</Link>
          </Button>
        </div>
      </div>
      <div className="glass-panel border-white/30 bg-white/10 p-6">
        <p className="text-sm uppercase tracking-wide text-white/70">Live metrics</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {[
            { label: 'Ticket sales', value: '$218,400', change: '+18%' },
            { label: 'Active attendees', value: '4,820', change: '+12%' },
            { label: 'Net promoter score', value: '72', change: '+6' },
            { label: 'Avg. conversion', value: '8.4%', change: '+1.2%' },
          ].map((metric) => (
            <div key={metric.label} className="rounded-3xl bg-white/10 p-4">
              <p className="text-xs text-white/60">{metric.label}</p>
              <p className="text-2xl font-semibold">{metric.value}</p>
              <p className="text-xs text-emerald-300">{metric.change} vs last event</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

