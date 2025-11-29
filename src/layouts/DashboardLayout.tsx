import { NavLink, Outlet } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

const dashboardLinks = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/dashboard/events', label: 'Manage events' },
  { to: '/dashboard/analytics', label: 'Analytics' },
  { to: '/dashboard/attendees', label: 'Attendees' },
];

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const links = dashboardLinks.filter((link) => {
    if (link.to === '/dashboard/events') {
      return user && user.role !== 'attendee';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-charcoal text-white">
      <aside className="fixed hidden h-screen w-64 flex-col border-r border-white/10 bg-[#0D0B18] p-6 md:flex">
        <p className="text-2xl font-display text-primary">Pulse Admin</p>
        <nav className="mt-10 flex flex-col gap-2 text-sm text-white/60">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-2xl px-4 py-3 transition ${
                  isActive ? 'bg-white/10 text-white' : 'hover:bg-white/10 hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-2 rounded-2xl bg-white/5 p-4">
          <p className="text-xs uppercase tracking-wide text-white/50">Organizer</p>
          <p className="text-lg">{user?.name}</p>
          <Button variant="ghost" className="w-full" onClick={logout}>
            Logout
          </Button>
        </div>
      </aside>
      <main className="min-h-screen bg-gradient-to-br from-[#0D0B18] to-[#1C1731] px-6 py-10 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

