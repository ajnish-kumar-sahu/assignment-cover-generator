import DocLayout from '../components/DocLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.3 } },
};

export default function MyCovers() {
  const { savedCovers: covers, deleteCover, addNotification } = useAppStore();

  const deleteById = (id: number) => {
    deleteCover(id);
    addNotification({ message: 'Cover deleted', type: 'info' });
  };

  return (
    <DocLayout 
      title="My Covers"
      breadcrumbs={[{ label: 'Workspace', href: '/cover-generator', icon: 'edit' }, { label: 'My Covers' }]}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-xl text-slate-500 mb-10 mt-[-2rem] font-light"
      >
        Your personal archive of generated documentation.
      </motion.p>

      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8 border-b border-slate-100 pb-5"
      >
        <div>
          <h3 className="font-headline text-2xl text-slate-900">Saved Configurations</h3>
          <p className="text-sm text-slate-400 mt-1">{covers.length} document{covers.length !== 1 ? 's' : ''} stored locally</p>
        </div>
        <Link
          to="/cover-generator"
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-sm">add</span> New Cover
        </Link>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {covers.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {covers.map(cover => (
              <motion.div
                key={cover.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl hover:shadow-indigo-900/12 transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img src={cover.img} alt={cover.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cover.color} opacity-50 group-hover:opacity-60 transition-opacity`} />
                  <div className="absolute top-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      {cover.template}
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6">
                  <h4 className="font-semibold text-slate-800 text-sm mb-1 line-clamp-2 leading-snug">{cover.name}</h4>
                  <p className="text-xs text-slate-400 mb-5 flex items-center gap-3">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">calendar_today</span>{cover.date}</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">folder</span>{cover.size}</span>
                  </p>
                  <div className="flex gap-2">
                    <Link
                      to="/cover-generator"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 hover:-translate-y-0.5 focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-200 active:scale-95"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span> Re-edit
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 hover:-translate-y-0.5 focus:ring-4 focus:ring-slate-300 focus:ring-offset-2 transition-all duration-200 active:scale-95">
                      <span className="material-symbols-outlined text-sm">download</span> PDF
                    </button>
                    <button
                      onClick={() => deleteById(cover.id)}
                      className="w-10 flex items-center justify-center py-2.5 bg-red-50 text-red-500 border border-red-200 rounded-xl hover:bg-red-100 hover:-translate-y-0.5 focus:ring-4 focus:ring-red-300 focus:ring-offset-2 transition-all duration-200 active:scale-95"
                      title="Delete"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add New Card */}
            <motion.div
              layout
              variants={itemVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-3xl border-2 border-dashed border-indigo-300 flex flex-col items-center justify-center text-center p-10 hover:border-indigo-500 hover:bg-indigo-50/50 focus-within:ring-4 focus-within:ring-indigo-300 focus-within:ring-offset-2 transition-all duration-300 cursor-pointer group min-h-[280px] bg-white"
            >
              <span className="material-symbols-outlined text-5xl text-indigo-200 mb-4 group-hover:text-indigo-400 transition-colors">add_circle</span>
              <p className="font-semibold text-slate-600 text-sm mb-1">Generate New</p>
              <p className="text-xs text-slate-400 mb-6">Create and save another cover page</p>
              <Link to="/cover-generator" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                Launch Generator
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.4 }}
            className="flex flex-col items-center justify-center p-16 border-2 border-dashed border-indigo-200/60 mt-8 rounded-3xl bg-indigo-50/30 text-center relative overflow-hidden group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
            <span className="material-symbols-outlined text-6xl text-indigo-300 mb-6 drop-shadow-sm relative z-10">folder_off</span>
            <p className="text-2xl font-headline font-semibold text-slate-800 relative z-10">No saved covers yet.</p>
            <p className="text-sm text-slate-500 mt-2 max-w-sm relative z-10 mb-8">
              Start by generating your first cover page in the Editor Workspace.
            </p>
            <Link to="/cover-generator" className="relative z-10 px-8 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl focus:ring-4 focus:ring-indigo-300 focus:ring-offset-2 transition-all duration-200 shadow-lg active:scale-95">
              Launch Generator
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </DocLayout>
  );
}
