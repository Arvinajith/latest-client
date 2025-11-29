import { useEffect, useState } from 'react';

import { useAuth } from '../context/AuthContext';
import { useEvents } from '../hooks/useEvents';
import { useEventAttendees } from '../hooks/useEventAttendees';

export const AttendancePage = () => {
  const { user } = useAuth();
  const { data: eventsData } = useEvents({ organizer: user?._id, limit: 100 });
  const myEvents = eventsData?.events ?? [];
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const { data: attendees, isLoading } = useEventAttendees(selectedEventId);

  useEffect(() => {
    if (!selectedEventId && myEvents.length) {
      setSelectedEventId(myEvents[0]._id);
    }
  }, [myEvents, selectedEventId]);

  if (!user || user.role === 'attendee') {
    return <p className="text-white/60">Organizer access only. Switch to an organizer account.</p>;
  }

  if (!myEvents.length) {
    return <p className="text-white/60">Create an event to start tracking attendees.</p>;
  }

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-white/50">Attendee insights</p>
          <h1 className="text-3xl font-display">Check-ins & transfers</h1>
        </div>
        <select
          value={selectedEventId}
          onChange={(event) => setSelectedEventId(event.target.value)}
          className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 text-sm"
        >
          {myEvents.map((event) => (
            <option key={event._id} value={event._id} className="text-charcoal">
              {event.title}
            </option>
          ))}
        </select>
      </div>

      <div className="glass-panel overflow-hidden rounded-3xl bg-white/5 p-6 text-charcoal">
        <table className="min-w-full text-sm">
          <thead className="text-left text-xs uppercase text-charcoal/60">
            <tr>
              <th className="py-2">Attendee</th>
              <th className="py-2">Email</th>
              <th className="py-2">Ticket</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="py-6 text-center text-charcoal/60" colSpan={4}>
                  Loading attendees…
                </td>
              </tr>
            ) : attendees?.length ? (
              attendees.map((attendee: any) => (
                <tr key={attendee.id} className="border-t border-charcoal/5">
                  <td className="py-3">{attendee.name}</td>
                  <td className="py-3">{attendee.email}</td>
                  <td className="py-3 capitalize">{attendee.ticketType}</td>
                  <td className="py-3 capitalize">{attendee.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-6 text-center text-charcoal/60" colSpan={4}>
                  No attendees yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

