import DocLayout from '../components/DocLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Notifications() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'update',
      icon: 'update',
      title: 'ScholarFlow UI Version 1.2 Available',
      desc: 'Significant structural enhancements have been applied to the Index Designer layout algorithms.',
      time: '2 hours ago',
      color: 'text-primary',
      bg: 'bg-primary/10'
    },
    {
      id: 2,
      type: 'sync',
      icon: 'cloud_done',
      title: 'Dossier Backup Complete',
      desc: 'All 42 assignment covers were successfully synchronized to your local secondary storage.',
      time: '1 day ago',
      color: 'text-secondary',
      bg: 'bg-secondary/10'
    },
    {
      id: 3,
      type: 'system',
      icon: 'auto_stories',
      title: 'New Institutional Styles Generated',
      desc: 'Three new templates (Oxford Format, Stanford Dual-Column, MIT Standard) were injected into your library.',
      time: '3 days ago',
      color: 'text-tertiary',
      bg: 'bg-tertiary/10'
    }
  ]);

  const clearFeed = () => {
    setAlerts([]);
  };

  const removeAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring' as const, bounce: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <DocLayout title="Notifications">
      <div className="max-w-4xl mx-auto mt-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-10 border-b border-outline-variant/20 pb-4"
        >
          <p className="text-slate-500 font-light text-lg tracking-wide">System Alerts & Pipeline Updates</p>
          <button 
            onClick={clearFeed}
            disabled={alerts.length === 0}
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:bg-primary/5 px-6 py-2.5 rounded-full transition-all border border-primary/20 hover:border-primary/50 shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[14px]">clear_all</span>
            Clear Feed
          </button>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6 relative min-h-[400px]"
        >
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div 
                key={alert.id}
                variants={itemVariants}
                exit="exit"
                layout
                className="group bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 hover:border-slate-300 transition-all flex md:flex-row flex-col gap-6 items-start md:items-center relative overflow-hidden"
              >
                {/* Accent Color bar */}
                <div className={`absolute top-0 left-0 w-1.5 h-full opacity-0 group-hover:opacity-100 transition-opacity bg-current ${alert.color}`}></div>
                
                <div className={`w-16 h-16 rounded-2xl ${alert.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                   <span className={`material-symbols-outlined ${alert.color} text-3xl`}>{alert.icon}</span>
                </div>
                
                <div className="flex-1 pr-8">
                   <h4 className="text-xl font-bold text-slate-800 mb-2 font-headline">{alert.title}</h4>
                   <p className="text-slate-500 text-sm leading-relaxed">{alert.desc}</p>
                </div>
                
                <div className="md:text-right mt-2 md:mt-0 shrink-0 border-t md:border-none border-slate-100 pt-4 md:pt-0 w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end gap-4">
                   <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{alert.time}</span>
                   <button 
                     onClick={() => removeAlert(alert.id)}
                     className="w-8 h-8 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 flex items-center justify-center transition-colors focus:outline-none"
                     title="Dismiss"
                   >
                     <span className="material-symbols-outlined text-sm">close</span>
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* All Caught Up state */}
          <AnimatePresence>
            {alerts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                className="absolute inset-x-0 top-10 text-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200"
              >
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-5xl text-green-500 drop-shadow-sm block">check_circle</span>
                </div>
                <p className="font-headline text-4xl text-slate-800 mb-2">Feed End</p>
                <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400">No further alerts available</p>
                
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-8 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-2 mx-auto"
                >
                  <span className="material-symbols-outlined text-sm">refresh</span> Refresh System
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </DocLayout>
  );
}
