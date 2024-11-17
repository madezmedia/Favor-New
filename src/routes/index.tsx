import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import ProtectedRoute from '@/components/auth/protected-route';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import Landing from '@/pages/landing';
import Dashboard from '@/pages/dashboard';
import Teams from '@/pages/teams';
import TeamPage from '@/pages/team/[id]';
import LiveOdds from '@/pages/odds';
import Agents from '@/pages/agents';
import Analysis from '@/pages/analysis';
import Trends from '@/pages/trends';
import History from '@/pages/history';
import Settings from '@/pages/settings';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
      <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
      
      {/* Protected Routes */}
      <Route path="/app" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="teams/:id" element={<TeamPage />} />
        <Route path="odds" element={<LiveOdds />} />
        <Route path="agents" element={<Agents />} />
        <Route path="analysis" element={<Analysis />} />
        <Route path="trends" element={<Trends />} />
        <Route path="history" element={<History />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}