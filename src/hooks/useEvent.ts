import { useQuery } from '@tanstack/react-query';

import api from '../services/api';
import type { Event } from '../types';

export const useEvent = (eventId: string) => {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const { data } = await api.get<{ event: Event }>(`/events/${eventId}`);
      return data.event;
    },
    enabled: Boolean(eventId),
  });
};

