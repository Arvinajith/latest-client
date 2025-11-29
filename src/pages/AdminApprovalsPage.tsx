import dayjs from 'dayjs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useEvents } from '../hooks/useEvents';

type EventFormValues = {
  title: string;
  description: string;
  category: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  city: string;
  country: string;
  address: string;
  capacity: string;
  generalPrice: string;
  vipPrice: string;
  imageUrl: string;
};

const buildDateTime = (date: string, time: string) => {
  if (!date || !time) return null;
  return new Date(`${date}T${time}`).toISOString();
};

export const ManageEventsPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isAdmin = user?.role === 'admin';
  const isOrganizer = Boolean(user && user.role !== 'attendee');

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<EventFormValues>({
    defaultValues: {
      title: '',
      description: '',
      category: 'Conference',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      city: '',
      country: '',
      address: '',
      capacity: '',
      generalPrice: '',
      vipPrice: '',
      imageUrl: '',
    },
  });

  const { data: myEventsData, isLoading: myEventsLoading } = useEvents(
    isOrganizer ? { organizer: user?._id, limit: 50 } : undefined
  );
  const myEvents = myEventsData?.events ?? [];

  const createMutation = useMutation({
    mutationFn: (payload: any) => api.post('/events', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      reset({
        title: '',
        description: '',
        category: 'Conference',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        city: '',
        country: '',
        address: '',
        capacity: '',
        generalPrice: '',
        vipPrice: '',
        imageUrl: '',
      });
    },
  });

  const onSubmit = (values: EventFormValues) => {
    const pricing = [
      {
        tier: 'general',
        label: 'General Admission',
        price: Number(values.generalPrice),
        currency: 'usd',
      },
      {
        tier: 'vip',
        label: 'VIP',
        price: Number(values.vipPrice),
        currency: 'usd',
      },
    ].filter((tier) => !Number.isNaN(tier.price) && tier.price > 0);

    if (!pricing.length) {
      setError('generalPrice', { type: 'manual', message: 'Enter at least one ticket price' });
      return;
    }

    const payload = {
      title: values.title,
      description: values.description,
      category: values.category,
      startDate: buildDateTime(values.startDate, values.startTime),
      endDate: buildDateTime(values.endDate || values.startDate, values.endTime || values.startTime),
      location: {
        address: values.address,
        city: values.city,
        country: values.country,
        isVirtual: !values.address,
      },
      capacity: values.capacity ? Number(values.capacity) : undefined,
      pricing,
      media: values.imageUrl
        ? [
            {
              type: 'image',
              url: values.imageUrl,
            },
          ]
        : undefined,
      status: 'pending',
    };

    createMutation.mutate(payload);
  };

  return (
    <div className="space-y-8 text-white">
      {isOrganizer && (
        <section className="glass-panel bg-white/5 p-6 text-charcoal">
          <p className="text-xs uppercase text-charcoal/60">Organizer tools</p>
          <h2 className="text-2xl font-display text-charcoal">Create a new event</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid gap-4 md:grid-cols-2">
            <Input label="Event title" {...register('title', { required: 'Title is required' })} error={errors.title?.message} />
            <Input label="Category" {...register('category')} />
            <Input label="Start date" type="date" {...register('startDate', { required: 'Start date required' })} error={errors.startDate?.message} />
            <Input label="Start time" type="time" {...register('startTime', { required: 'Start time required' })} error={errors.startTime?.message} />
            <Input label="End date" type="date" {...register('endDate')} />
            <Input label="End time" type="time" {...register('endTime')} />
            <Input label="City" {...register('city')} />
            <Input label="Country" {...register('country')} />
            <Input label="Venue address or meeting link" {...register('address')} className="md:col-span-2" />
            <Input label="Capacity" type="number" {...register('capacity')} />
            <Input
              label="General admission price (USD)"
              type="number"
              step="0.01"
              {...register('generalPrice', { required: 'General ticket price required' })}
              error={errors.generalPrice?.message}
            />
            <Input label="VIP price (optional)" type="number" step="0.01" {...register('vipPrice')} />
            <Input label="Cover image URL" {...register('imageUrl')} className="md:col-span-2" />
            <label className="md:col-span-2 text-sm text-charcoal/70">
              Description
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-charcoal/10 px-4 py-2 focus:border-primary focus:outline-none"
              />
              {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
            </label>
            <div className="md:col-span-2">
              <Button type="submit" loading={createMutation.isPending}>
                Publish event
              </Button>
              {createMutation.isSuccess && (
                <p className="mt-2 text-sm text-emerald-600">Event submitted for approval.</p>
              )}
            </div>
          </form>
        </section>
      )}

      {isOrganizer && (
        <section className="space-y-4">
          <div>
            <p className="text-sm uppercase text-white/50">Your events</p>
            <h3 className="text-2xl font-display">Latest drafts & submissions</h3>
          </div>
          {myEventsLoading ? (
            <p className="text-white/60">Loading your events…</p>
          ) : myEvents.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {myEvents.map((event: any) => (
                <div key={event._id} className="glass-panel p-5 text-charcoal">
                  <p className="text-xs uppercase text-charcoal/60">{event.category}</p>
                  <p className="text-xl font-semibold text-charcoal">{event.title}</p>
                  <p className="text-sm text-charcoal/60">
                    {event.startDate ? dayjs(event.startDate).format('MMM D, YYYY h:mm A') : 'TBD'}
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white/60">No events yet. Use the form above to add your first event.</p>
          )}
        </section>
      )}

      {isAdmin && <PendingApprovals />}
    </div>
  );
};

const PendingApprovals = () => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['pending-events'],
    queryFn: async () => {
      const { data } = await api.get('/admin/events/pending');
      return data.events;
    },
    enabled: true,
  });

  const approveMutation = useMutation({
    mutationFn: (eventId: string) => api.post(`/events/${eventId}/approve`, { status: 'approved' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['pending-events'] }),
  });

  if (isLoading) return <p className="text-white/60">Loading pending events…</p>;

  return (
    <section className="space-y-4 text-white">
      <div>
        <p className="text-sm uppercase text-white/50">Admin only</p>
        <h2 className="text-3xl font-display">Pending approvals</h2>
      </div>
      <div className="space-y-4">
        {data?.length ? (
          data.map((event: any) => (
            <div key={event._id} className="glass-panel flex items-center justify-between p-6 text-charcoal">
              <div>
                <p className="text-sm uppercase text-charcoal/60">{event.category}</p>
                <p className="text-2xl font-semibold text-charcoal">{event.title}</p>
                <p className="text-sm text-charcoal/60 line-clamp-2">{event.description}</p>
              </div>
              <Button onClick={() => approveMutation.mutate(event._id)} loading={approveMutation.isPending}>
                Approve
              </Button>
            </div>
          ))
        ) : (
          <div className="rounded-3xl border border-white/10 p-6 text-white/60">
            Nothing pending right now. Submitted events will appear here for review.
          </div>
        )}
      </div>
    </section>
  );
};

