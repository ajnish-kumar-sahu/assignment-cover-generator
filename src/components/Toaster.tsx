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
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.8, x: 100 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.9, x: 100 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
            className={`min-w-[320px] px-5 py-4 rounded-xl shadow-2xl flex items-start gap-3 pointer-events-auto border backdrop-blur-sm ${
              notification.type === 'error'
                ? 'bg-red-50/95 text-red-900 border-red-200/60'
                : notification.type === 'success'
                ? 'bg-emerald-50/95 text-emerald-900 border-emerald-200/60'
                : 'bg-indigo-50/95 text-indigo-900 border-indigo-200/60'
            }`}
          >
            <span className={`material-symbols-outlined text-lg flex-shrink-0 mt-0.5 ${
              notification.type === 'error'
                ? 'text-red-600'
                : notification.type === 'success'
                ? 'text-emerald-600'
                : 'text-indigo-600'
            }`}>
              {notification.type === 'error' ? 'error' : notification.type === 'success' ? 'check_circle' : 'info'}
            </span>
            <span className="font-medium text-sm flex-1 leading-relaxed">{notification.message}</span>
            <button
              type="button"
              onClick={() => removeNotification(notification.id)}
              className={`flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-200 ${
                notification.type === 'error'
                  ? 'hover:text-red-700'
                  : notification.type === 'success'
                  ? 'hover:text-emerald-700'
                  : 'hover:text-indigo-700'
              }`}
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
