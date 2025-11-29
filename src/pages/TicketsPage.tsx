import dayjs from 'dayjs';

import { useTickets } from '../hooks/useTickets';
import { Button } from '../components/ui/Button';

export const TicketsPage = () => {
  const { data: tickets = [], isLoading, cancelTicket } = useTickets();

  if (isLoading) return <p>Loading tickets…</p>;

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm uppercase text-charcoal/60">Your access</p>
        <h2 className="text-3xl font-display text-charcoal">Tickets & passes</h2>
      </div>
      <div className="space-y-4">
        {tickets.map((ticket: any) => (
          <div key={ticket._id} className="glass-panel flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <p className="text-xs uppercase text-charcoal/60">{ticket.type}</p>
              <p className="text-xl font-semibold text-charcoal">{ticket.event.title}</p>
              <p className="text-sm text-charcoal/60">
                {dayjs(ticket.event.startDate).format('MMM D, YYYY • h:mm A')}
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => cancelTicket(ticket._id)}>
                Cancel
              </Button>
              <Button variant="ghost">Transfer</Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

