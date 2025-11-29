import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

const links = [
  { to: '/events', label: 'Events' },
  { to: '/tickets', label: 'My Tickets' },
];

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl text-primary">
          Pulse
        </Link>
        <ul className="flex items-center gap-6 text-sm font-medium text-charcoal/70">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? 'text-charcoal' : 'text-charcoal/60 hover:text-charcoal'
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          {user && user.role !== 'attendee' && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'text-charcoal' : 'text-charcoal/60 hover:text-charcoal'
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden text-charcoal/70 md:block">Hi, {user.name}</span>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link to="/login">Sign in</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

