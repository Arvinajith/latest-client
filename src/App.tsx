import { Navigate, Route, Routes } from 'react-router-dom';
import type { ReactElement } from 'react';

import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { TicketsPage } from './pages/TicketsPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ManageEventsPage } from './pages/AdminApprovalsPage';
import { AttendancePage } from './pages/AttendancePage';
import { useAuth } from './context/AuthContext';
import type { UserRole } from './types';

const PrivateRoute = ({ children, roles }: { children: ReactElement; roles?: UserRole[] }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:eventId" element={<EventDetailPage />} />
        <Route
          path="tickets"
          element={
            <PrivateRoute>
              <TicketsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route
        path="dashboard"
        element={
          <PrivateRoute roles={['organizer', 'admin']}>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardOverviewPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="attendees" element={<AttendancePage />} />
        <Route path="events" element={<ManageEventsPage />} />
      </Route>
    </Routes>
  );
}

