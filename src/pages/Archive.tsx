import DocLayout from '../components/DocLayout';
import { motion } from 'framer-motion';

const VERSIONS = [
  {
    version: 'v1.3 — Current',
    date: 'March 2024',
    note: 'Active release. All templates available via Cover Generator.',
    changes: ['Introduced Elegant & Creative templates', 'Export DPI selector (150 / 300)', 'Material Symbols icon integration'],
    status: 'current',
  },
  {
    version: 'v1.2',
    date: 'January 2024',
    note: 'Deprecated index layout engine. Still accessible as legacy import.',
    changes: ['Added Stanford Quantitative template', 'Introduced watermark removal toggle', 'PDF vector scale improvements'],
    status: 'legacy',
  },
  {
    version: 'v1.1',
    date: 'October 2023',
    note: 'Initial public beta. Core generator only.',
    changes: ['Classic Oxford template released', 'Basic form layout', 'JPG/PDF export support'],
    status: 'archived',
  },
  {
    version: 'v1.0',
    date: 'August 2023',
    note: 'Internal prototype. Not for production use.',
    changes: ['Proof-of-concept layout engine', 'Single hardcoded template', 'Canvas-based rendering only'],
    status: 'locked',
  },
];

const DEPRECATED_TEMPLATES = [
  {
    id: 1,
    name: 'Legacy Oxford Mono',
    version: 'v1.1 Template',
    reason: 'Replaced by Classic Oxford with improved vector scaling',
    icon: 'lock',
    iconColor: 'text-slate-400',
    bg: 'bg-slate-50',
  },
  {
    id: 2,
    name: 'Beta Blueprint',
    version: 'v1.0 Template',
    reason: 'Canvas-based renderer deprecated; migrated to SVG engine',
    icon: 'lock',
    iconColor: 'text-slate-400',
    bg: 'bg-slate-50',
  },
  {
    id: 3,
    name: 'Classic Mono Sans',
    version: 'v1.1 Template',
    reason: 'Readability metrics failed peer testing threshold',
    icon: 'lock',
    iconColor: 'text-slate-400',
    bg: 'bg-slate-50',
  },
];

const statusStyles: Record<string, string> = {
  current: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  legacy: 'bg-amber-50 text-amber-600 border-amber-200',
  archived: 'bg-slate-100 text-slate-500 border-slate-200',
  locked: 'bg-red-50 text-red-400 border-red-100',
};

const dotStyles: Record<string, string> = {
  current: 'bg-emerald-500',
  legacy: 'bg-amber-400',
  archived: 'bg-slate-400',
  locked: 'bg-red-300',
};

export default function Archive() {
  return (
    <DocLayout title="The Archive">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl mb-12 text-slate-500 font-light mt-[-2rem]"
      >
        Access historical iterations of standard cover templates and deprecated index structures.
      </motion.p>

      {/* Storage Usage Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-slate-200 p-7 mb-12 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">storage</span>
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">Archive Storage Usage</p>
            <p className="text-xs text-slate-400 mt-0.5">4 version snapshots · 3 deprecated templates</p>
          </div>
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>2.4 MB used</span>
            <span>50 MB limit</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '4.8%' }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
        <button className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-red-400 border border-red-100 rounded-xl hover:bg-red-50 transition-colors shrink-0">
          Clear Cache
        </button>
      </motion.div>

      {/* Version Timeline */}
      <div className="mb-14">
        <h3 className="font-headline text-2xl text-slate-900 mb-8">Version Timeline</h3>
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[22px] top-6 bottom-6 w-px bg-slate-200" />

          {VERSIONS.map((v, i) => (
            <motion.div
              key={v.version}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.1, type: 'spring', bounce: 0.3 }}
              className="flex gap-6 pb-8 relative"
            >
              {/* Dot */}
              <div className={`w-11 h-11 rounded-full border-4 border-white shadow-md flex items-center justify-center shrink-0 z-10 ${dotStyles[v.status]} relative`}>
                <span className="material-symbols-outlined text-white text-sm">
                  {v.status === 'current' ? 'check' : v.status === 'locked' ? 'lock' : 'history'}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 bg-white rounded-2xl border border-slate-100 p-7 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex flex-wrap gap-3 items-start justify-between mb-4">
                  <div>
                    <h4 className="font-headline text-xl text-slate-900">{v.version}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 font-mono">{v.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${statusStyles[v.status]}`}>
                    {v.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mb-5 italic">{v.note}</p>
                <ul className="space-y-2">
                  {v.changes.map(change => (
                    <li key={change} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="material-symbols-outlined text-slate-300 text-sm mt-0.5">arrow_right</span>{change}
                    </li>
                  ))}
                </ul>
                {v.status !== 'current' && (
                  <button className="mt-6 px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors opacity-0 group-hover:opacity-100">
                    Restore Snapshot
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deprecated Templates */}
      <div>
        <h3 className="font-headline text-2xl text-slate-900 mb-6">Deprecated Templates</h3>
        <div className="space-y-4">
          {DEPRECATED_TEMPLATES.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className={`flex items-center gap-5 p-6 rounded-2xl border border-slate-200 ${tpl.bg} group hover:border-slate-300 transition-all`}
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                <span className={`material-symbols-outlined ${tpl.iconColor}`}>{tpl.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-600 flex items-center gap-2">
                  {tpl.name}
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full">{tpl.version}</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">{tpl.reason}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-50">
                Restore
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </DocLayout>
  );
}
