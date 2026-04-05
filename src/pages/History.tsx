import DocLayout from '../components/DocLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';

const HISTORY_ROWS = [
  { id: 1, name: 'assignment-data-structures.pdf', template: 'Classic Oxford', size: '340 KB', type: 'PDF', status: 'Success', time: 'Mar 28, 2024 · 14:02 UTC', icon: 'picture_as_pdf', iconColor: 'text-red-500 bg-red-50' },
  { id: 2, name: 'neural-networks-cover.pdf', template: 'Stanford Quantitative', size: '510 KB', type: 'PDF', status: 'Success', time: 'Mar 15, 2024 · 11:34 UTC', icon: 'picture_as_pdf', iconColor: 'text-red-500 bg-red-50' },
  { id: 3, name: 'lab-report-cover.jpg', template: 'Minimal', size: '120 KB', type: 'JPG', status: 'Success', time: 'Feb 24, 2024 · 09:14 UTC', icon: 'image', iconColor: 'text-blue-500 bg-blue-50' },
  { id: 4, name: 'thesis-intro-cover.pdf', template: 'Institutional Atelier', size: '488 KB', type: 'PDF', status: 'Success', time: 'Feb 10, 2024 · 16:47 UTC', icon: 'picture_as_pdf', iconColor: 'text-red-500 bg-red-50' },
  { id: 5, name: 'chemistry-lab-v2.jpg', template: 'Modern', size: '98 KB', type: 'JPG', status: 'Success', time: 'Jan 30, 2024 · 08:22 UTC', icon: 'image', iconColor: 'text-blue-500 bg-blue-50' },
];

const FILTERS = ['All', 'PDF', 'JPG'];

const tableVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.2 } },
};

export default function History() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? HISTORY_ROWS : HISTORY_ROWS.filter(r => r.type === filter);

  return (
    <DocLayout title="Document History">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl text-slate-500 mb-8 mt-[-2rem] font-light"
      >
        Audit logs and export traces for your current session.
      </motion.p>

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap gap-4 justify-between items-center border-b border-slate-200 pb-6 mb-8"
      >
        <div>
          <h3 className="text-3xl font-headline text-slate-900">Recent Exports</h3>
          <p className="text-slate-500 text-sm mt-1">An automated timeline of your exported PDFs and JPGs.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  filter === f ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors border border-indigo-100 shadow-sm active:scale-95 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">download</span> Download CSV
          </button>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={tableVariants}
        initial="hidden"
        animate="show"
        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Column Headers */}
        <div className="px-8 py-5 bg-slate-50/80 border-b border-slate-200 flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 gap-4">
          <span className="flex-1">Export Action</span>
          <span className="hidden md:block w-32 text-center">Type</span>
          <span className="hidden md:block w-24 text-center">Size</span>
          <span className="hidden lg:block w-40">Date & Time</span>
          <span className="w-20 text-center">Status</span>
        </div>

        {filtered.map(row => (
          <motion.div
            key={row.id}
            variants={rowVariants}
            className="px-8 py-5 border-b border-slate-50 last:border-0 flex items-center gap-4 hover:bg-slate-50/60 transition-colors group"
          >
            {/* File Icon + Name */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${row.iconColor}`}>
                <span className="material-symbols-outlined text-lg">{row.icon}</span>
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-slate-800 text-sm truncate">{row.name}</p>
                <p className="text-xs text-slate-400">{row.template}</p>
              </div>
            </div>

            {/* Type badge */}
            <div className="hidden md:flex w-32 justify-center">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${row.type === 'PDF' ? 'text-red-500 bg-red-50 border-red-100' : 'text-blue-500 bg-blue-50 border-blue-100'}`}>
                {row.type}
              </span>
            </div>

            {/* Size */}
            <span className="hidden md:block w-24 text-xs text-slate-400 text-center">{row.size}</span>

            {/* Date */}
            <span className="hidden lg:block w-40 text-xs font-mono text-slate-400">{row.time}</span>

            {/* Status */}
            <div className="w-20 flex justify-center items-center gap-2">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">{row.status}</span>
            </div>

            {/* Download icon — hover only */}
            <button className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100">
              <span className="material-symbols-outlined text-slate-400 text-sm">download</span>
            </button>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="px-8 py-16 text-center text-slate-400">
            <span className="material-symbols-outlined text-4xl mb-3 block text-slate-200">search_off</span>
            <p className="font-medium">No {filter} exports found</p>
          </div>
        )}
      </motion.div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-3 gap-4"
      >
        {[
          { label: 'Total Exports', value: HISTORY_ROWS.length, icon: 'analytics', color: 'text-primary bg-primary/8' },
          { label: 'PDF Files', value: HISTORY_ROWS.filter(r => r.type === 'PDF').length, icon: 'picture_as_pdf', color: 'text-red-500 bg-red-50' },
          { label: 'JPG Files', value: HISTORY_ROWS.filter(r => r.type === 'JPG').length, icon: 'image', color: 'text-blue-500 bg-blue-50' },
        ].map(stat => (
          <div key={stat.label} className="bg-white border border-slate-100 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined text-lg">{stat.icon}</span>
            </div>
            <div>
              <p className="font-headline text-2xl text-slate-900">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </DocLayout>
  );
}
