import { useState } from 'react';
import DocLayout from '../components/DocLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const TABS = ['Saved Covers', 'Configurations', 'Exports'];

const SAVED_COVERS = [
  {
    id: 1,
    name: 'Assignment — Data Structures',
    template: 'Classic Oxford',
    date: 'Mar 28, 2024',
    pages: 1,
    size: '340 KB',
    color: 'from-indigo-800 to-indigo-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSlNvH0RBHb2W26b_4ZZ5UpM_AvLCJs18ZPZ-XM6fzDJSnvzym7WIf1zu6I5Fru0jwuxe852uh8wFseuGU6yX23gWlTS3FVdFgJIelN0XMs2SyO41X5p01RnSkMcwmhagcnufT9E7f2-IxQ-RNtTlp9GSQt8AtDq39tU5hQLy2g6TmkJu2341YLiZcCzCsKMhPHoQwmudG4HDqqSntsSdjP4IILD7xMthQ90ZtafH5dSdAv3hRIHe3VpgNuloRVbxI_HFQtfLbvVA',
  },
  {
    id: 2,
    name: 'Research Paper — Neural Networks',
    template: 'Stanford Quantitative',
    date: 'Mar 15, 2024',
    pages: 1,
    size: '510 KB',
    color: 'from-emerald-800 to-teal-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAOSQJVsafpee_IOKvb9acNhzznJccFFaKPGuk5hkObV3KChExQaRyjOqHveWySiTJQ5C5b9xEcczm3sWZmSL2YQwBTkFTlVYAatmwez_OktrxgucUzqK9BSj8NZ1INEiztCXd0Fl11RGrvtpfjqFd7LN9vumbgGx4wWta1yocfe8A1R50WboUzBGI7gVU8SQntvBgZMwGmZIFWYpcfwmZBXBSeiunaGbWe9OZH6l5cgFYdzvwc9CMgaBFZl-V5F0ubM5p8pskv4',
  },
  {
    id: 3,
    name: 'Lab Report — Organic Chemistry',
    template: 'Minimal',
    date: 'Feb 24, 2024',
    pages: 1,
    size: '280 KB',
    color: 'from-slate-700 to-slate-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8JO7khoKCSpi_-4SZmscZ1Vm6Qirz66-Wk4Cry-o2NQR44wMHsTiDkC4zkyGsR10GnbPW1jbkZyi6jJc0JlYZzck4mi8nZMogheBSrQgqgUxs7okNA2AbBDolL3ozT5V0_cDWJIF8euV1GwOy5UYP7JriD6e8CJoc4dcv6dNBeFgLGxURvQ7pMONnLLewSE-lvBM7D8UJkBntQgRfbTECBbeAsLbj5G0CqT6CdpQ1OU9P_Sz6OeuE5DL_AT1cA3bKS45i2zVl6F0',
  },
];

const CONFIGS = [
  { id: 1, name: 'BCA Assignment Default', fields: 6, lastUsed: '2 days ago', icon: 'tune' },
  { id: 2, name: 'Research Paper Preset', fields: 8, lastUsed: '1 week ago', icon: 'settings_sliders' },
];

const EXPORTS = [
  { id: 1, name: 'assignment-data-structures.pdf', type: 'PDF', size: '340 KB', date: 'Mar 28, 2024', icon: 'picture_as_pdf', iconColor: 'text-red-500 bg-red-50' },
  { id: 2, name: 'neural-networks-cover.pdf', type: 'PDF', size: '510 KB', date: 'Mar 15, 2024', icon: 'picture_as_pdf', iconColor: 'text-red-500 bg-red-50' },
  { id: 3, name: 'lab-report-cover.jpg', type: 'JPG', size: '120 KB', date: 'Feb 24, 2024', icon: 'image', iconColor: 'text-blue-500 bg-blue-50' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.3 } },
};

export default function Library() {
  const [tab, setTab] = useState(0);
  const [deleted, setDeleted] = useState<Set<number>>(new Set());

  const markDeleted = (id: number) => setDeleted(prev => new Set([...prev, id]));

  return (
    <DocLayout title="Personal Library">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl mb-10 text-slate-500 font-light mt-[-2rem]"
      >
        Your privately organized collection of generated templates, saved configurations, and exported PDFs.
      </motion.p>

      {/* Tabs */}
      <div className="flex gap-1 mb-10 bg-slate-100 p-1 rounded-2xl w-fit">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              tab === i ? 'bg-white text-indigo-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab: Saved Covers */}
      <AnimatePresence mode="wait">
        {tab === 0 && (
          <motion.div
            key="covers"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SAVED_COVERS.filter(c => !deleted.has(c.id)).map(cover => (
              <motion.div
                key={cover.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-900/8 transition-all overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-3xl">
                  <img src={cover.img} alt={cover.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cover.color} opacity-50`} />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">{cover.template}</span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-6">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1 truncate">{cover.name}</h4>
                  <p className="text-xs text-slate-400 mb-4">{cover.date} · {cover.size}</p>
                  <div className="flex gap-2">
                    <Link to="/cover-generator" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors">
                      <span className="material-symbols-outlined text-sm">edit</span> Edit
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">
                      <span className="material-symbols-outlined text-sm">download</span> PDF
                    </button>
                    <button onClick={() => markDeleted(cover.id)} className="w-10 flex items-center justify-center py-2.5 bg-red-50 text-red-400 border border-red-100 rounded-xl hover:bg-red-100 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Launch CTA card */}
            <motion.div
              variants={itemVariants}
              className="aspect-auto rounded-3xl border-2 border-dashed border-indigo-200/60 flex flex-col items-center justify-center text-center p-10 hover:border-indigo-400/60 hover:bg-indigo-50/30 transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-5xl text-indigo-200 mb-4 group-hover:text-indigo-400 transition-colors">add_circle</span>
              <p className="font-semibold text-slate-600 text-sm mb-1">Create New Cover</p>
              <p className="text-xs text-slate-400 mb-6">Generate and save a new design</p>
              <Link to="/cover-generator" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                Launch Generator
              </Link>
            </motion.div>
          </motion.div>
        )}

        {/* Tab: Configurations */}
        {tab === 1 && (
          <motion.div key="configs" variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }} className="space-y-4">
            {CONFIGS.map(cfg => (
              <motion.div key={cfg.id} variants={itemVariants} className="flex items-center gap-6 p-7 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">{cfg.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{cfg.name}</h4>
                  <p className="text-sm text-slate-400">{cfg.fields} fields · Last used {cfg.lastUsed}</p>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">Load</button>
                  <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-400 border border-red-100 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
                </div>
              </motion.div>
            ))}

            <motion.div variants={itemVariants} className="py-12 border-2 border-dashed border-slate-200 rounded-2xl text-center">
              <span className="material-symbols-outlined text-4xl text-slate-200 mb-3 block">settings_sliders</span>
              <p className="text-slate-500 text-sm">Save a configuration by clicking <strong>Save Config</strong> in the Cover Generator.</p>
            </motion.div>
          </motion.div>
        )}

        {/* Tab: Exports */}
        {tab === 2 && (
          <motion.div key="exports" variants={containerVariants} initial="hidden" animate="show" exit={{ opacity: 0 }}>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="px-8 py-5 bg-slate-50 border-b border-slate-200 flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>File</span>
                <span>Date</span>
              </div>
              {EXPORTS.map(exp => (
                <motion.div key={exp.id} variants={itemVariants} className="px-8 py-5 border-b border-slate-50 last:border-0 flex items-center gap-5 hover:bg-slate-50/50 transition-colors group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${exp.iconColor}`}>
                    <span className="material-symbols-outlined text-lg">{exp.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-700 text-sm">{exp.name}</p>
                    <p className="text-xs text-slate-400">{exp.type} · {exp.size}</p>
                  </div>
                  <span className="text-xs text-slate-400">{exp.date}</span>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                    <span className="material-symbols-outlined text-sm">download</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </DocLayout>
  );
}
