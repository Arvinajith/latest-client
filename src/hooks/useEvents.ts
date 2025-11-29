import { useQuery } from '@tanstack/react-query';

import api from '../services/api';
import type { Event } from '../types';

interface EventFilters {
  search?: string;
  category?: string;
  city?: string;
  page?: number;
  organizer?: string;
  limit?: number;
}

export const useEvents = (filters?: EventFilters) => {
  const params = { ...(filters || {}) };
  if (params.category === 'all') delete params.category;

  const key = JSON.stringify(params);

  return useQuery({
    queryKey: ['events', key],
    queryFn: async () => {
      const searchFilters = JSON.parse(key);
      const { data } = await api.get<{ events: Event[]; total: number }>('/events', {
        params: searchFilters,
      });
      return data;
    },
  });
};

