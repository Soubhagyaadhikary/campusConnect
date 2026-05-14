import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import BottomNav from './components/BottomNav';
import ToastContainer from './components/Toast';

import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import MyEvents from './pages/MyEvents';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import ScrollTopButton from './components/ScrollTopButton';

import LoginSelect from './pages/LoginSelect';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
//admin panel import

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CreateEvent from './pages/CreateEvent';
import Attendance from './pages/Attendance';

import AdminRoute from './components/AdminRoute';
import Users from './pages/Users';
import Organizers from './pages/Organizers';
import NotificationsAdmin from './pages/NotificationsAdmin';
import Reports from './pages/Reports';

const appShell = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  maxWidth: 480,
  margin: '0 auto',
  background: '#0f172a',
  position: 'relative',
  overflow: 'hidden',
};

const screenArea = {
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBottom: 72, // nav height
};

function LayoutContent() {

  const location = useLocation();

const hideBottomNav =
  location.pathname === '/' ||
  location.pathname === '/student-login' ||
  location.pathname === '/student-register' ||
  location.pathname.includes('/admin') ||
  location.pathname.includes('/users') ||
  location.pathname.includes('/organizers') ||
  location.pathname.includes('/attendance') ||
  location.pathname.includes('/reports') ||
  location.pathname.includes('/notifications-admin') ||
  location.pathname.includes('/create-event');

  return (
    <>
      <div style={screenArea}>

        <Routes>

          {/* Student Routes */}
          <Route
  path="/"
  element={<LoginSelect />}
/>

<Route
  path="/student-login"
  element={<StudentLogin />}
/>

<Route
  path="/student-register"
  element={<StudentRegister />}
/>

<Route
  path="/student-home"
  element={<Home />}
/>
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route path="/admin-login" element={<AdminLogin />} />

          <Route
            path="/create-event"
            element={
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <AdminRoute>
                <Attendance />
              </AdminRoute>
            }
          />

          <Route
            path="/users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />

          <Route
            path="/organizers"
            element={
              <AdminRoute>
                <Organizers />
              </AdminRoute>
            }
          />

          <Route
            path="/notifications-admin"
            element={
              <AdminRoute>
                <NotificationsAdmin />
              </AdminRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <AdminRoute>
                <Reports />
              </AdminRoute>
            }
          />

        </Routes>

      </div>

      {/* Show BottomNav only for student pages */}
      {!hideBottomNav && <BottomNav />}

      <ToastContainer />
      <ScrollTopButton />

    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>

        <div style={appShell}>

          <div style={screenArea}>
            <LayoutContent />
          </div>

        </div>

      </BrowserRouter>
    </AppProvider>
  );
}
