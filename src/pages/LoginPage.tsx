import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (values: any) => {
    await login(values);
    navigate('/dashboard');
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <div className="text-center">
        <p className="text-sm uppercase text-charcoal/60">Welcome back</p>
        <h1 className="text-3xl font-display">Sign in to Pulse</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="glass-panel space-y-4 p-6">
        <Input label="Email" type="email" {...register('email', { required: true })} />
        <Input label="Password" type="password" {...register('password', { required: true })} />
        <Button className="w-full" type="submit" loading={isSubmitting}>
          Sign in
        </Button>
      </form>
      <p className="text-center text-sm text-charcoal/60">
        New to Pulse?{' '}
        <Link to="/register" className="text-primary">
          Create account
        </Link>
      </p>
    </div>
  );
};

