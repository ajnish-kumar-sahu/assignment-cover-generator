import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export default function Toaster() {
  const { notifications, removeNotification } = useAppStore();

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 4000);
      return () => clearTimeout(timer);
    });
  }, [notifications, removeNotification]);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className={`min-w-[300px] px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 ${
              notification.type === 'error'
                ? 'bg-red-50 text-red-700 border border-red-200'
                : notification.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
            }`}
          >
            <span className="material-symbols-outlined">
              {notification.type === 'error' ? 'error' : notification.type === 'success' ? 'check_circle' : 'info'}
            </span>
            <span className="font-medium text-sm">{notification.message}</span>
            <button
              type="button"
              onClick={() => removeNotification(notification.id)}
              className="ml-auto opacity-50 hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
