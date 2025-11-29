import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    await registerUser(values);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <p className="text-sm uppercase text-charcoal/60">Get started</p>
        <h1 className="text-3xl font-display">Create account</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel space-y-4 p-6">
        <Input label="Full name" {...register('name', { required: true })} />
        <Input label="Email" type="email" {...register('email', { required: true })} />
        <Input label="Password" type="password" {...register('password', { required: true, minLength: 8 })} />
        <label className="flex flex-col gap-2 text-sm text-charcoal/70">
          Role
          <select
            {...register('role')}
            className="rounded-2xl border border-charcoal/10 bg-white/80 px-4 py-2 focus:border-primary focus:outline-none"
          >
            <option value="attendee">Attendee</option>
            <option value="organizer">Organizer</option>
          </select>
        </label>
        <Button className="w-full" type="submit" loading={isSubmitting}>
          Create account
        </Button>
      </form>
      <p className="text-center text-sm text-charcoal/60">
        Already have an account?{' '}
        <Link to="/login" className="text-primary">
          Sign in
        </Link>
      </p>
    </div>
  );
};

