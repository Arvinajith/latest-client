import { useForm } from 'react-hook-form';

import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ProfilePage = () => {
  const { user, refreshProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { name: user?.name ?? '', bio: '' } });

  const onSubmit = async (values: any) => {
    await api.put('/auth/me', values);
    await refreshProfile();
  };

  if (!user) return null;

  return (
    <section className="mx-auto max-w-xl space-y-6">
      <div>
        <p className="text-sm uppercase text-charcoal/60">Account</p>
        <h2 className="text-3xl font-display text-charcoal">Profile</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel space-y-4 p-6">
        <Input label="Full name" {...register('name', { required: true })} />
        <label className="flex flex-col gap-2 text-sm text-charcoal/70">
          Bio
          <textarea
            {...register('bio')}
            className="rounded-2xl border border-charcoal/10 px-4 py-2"
            rows={4}
          />
        </label>
        <Button type="submit" loading={isSubmitting}>
          Save profile
        </Button>
      </form>
    </section>
  );
};

