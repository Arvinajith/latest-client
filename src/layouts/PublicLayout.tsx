import { Outlet } from 'react-router-dom';

import { Navbar } from '../components/Navbar';

export const PublicLayout = () => (
  <div className="min-h-screen bg-mist text-charcoal">
    <Navbar />
    <main className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <Outlet />
    </main>
  </div>
);

