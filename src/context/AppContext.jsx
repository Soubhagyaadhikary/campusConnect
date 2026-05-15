import React, { createContext, useContext, useState, useCallback } from 'react';
import { NOTIFICATIONS } from '../data/events';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [registered, setRegistered] = useState(new Set());
  const [toasts, setToasts] = useState([]);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState('home');

  const isRegistered = (id) => registered.has(id);

    const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

const registerEvent = useCallback((event) => {

  setRegistered((prev) => {

    const next = new Set(prev);

    next.add(event.id);

    return next;
  });

  addToast(
    `Registered! QR code is ready.`,
    'success'
  );

}, [addToast]);



  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <AppContext.Provider
      value={{
        registered,
        isRegistered,
       registerEvent,
        toasts,
        addToast,
        removeToast,
        notifications,
        markAllRead,
        unreadCount,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
