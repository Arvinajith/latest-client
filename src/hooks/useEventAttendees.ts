import { useQuery } from '@tanstack/react-query';

import api from '../services/api';

export const useEventAttendees = (eventId?: string) => {
  return useQuery({
    queryKey: ['event-attendees', eventId],
    queryFn: async () => {
      const { data } = await api.get(`/events/${eventId}/attendees`);
      return data.attendees;
    },
    enabled: Boolean(eventId),
  });
};

