import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import api from '../services/api';

export const useTickets = () => {
  const queryClient = useQueryClient();

  const ticketsQuery = useQuery({
    queryKey: ['tickets'],
    queryFn: async () => {
      const { data } = await api.get('/tickets/me');
      return data.tickets;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: (ticketId: string) => api.patch(`/tickets/${ticketId}/cancel`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tickets'] }),
  });

  return { ...ticketsQuery, cancelTicket: cancelMutation.mutateAsync };
};

