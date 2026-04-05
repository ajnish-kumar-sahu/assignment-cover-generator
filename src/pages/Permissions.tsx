import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

export default function Permissions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-background text-on-background font-body min-h-screen">
      {/* TopNavBar */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex justify-between items-center px-12 h-18"
      >
        <div className="flex items-center gap-4">
          <Logo />
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <motion.span whileHover={{ scale: 1.1 }} className="material-symbols-outlined text-slate-400 p-2 rounded-full hover:bg-slate-50 cursor-pointer">notifications</motion.span>
            <motion.span whileHover={{ scale: 1.1 }} className="material-symbols-outlined text-slate-400 p-2 rounded-full hover:bg-slate-50 cursor-pointer">settings</motion.span>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 p-0.5">
            <img alt="Admin" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9rmwv9AbP09Zfemf3UmJ30k9VbeGgV2iud5i5k3Gd_0HECNsvNPS2ApREfgv4O5CJ_chgGZVk58T6_dYeqdlB__DqsPg4amr_7i--1aAPqYAP7_BT4uEi2bYXi7tvmkoFxrzaAtkWaaZSYs4m_dS06AAYsfwEYi3tcC6n7pcJCMo5nnqxyIWO4MaMnKTTn8HFQbhbpB1nC_SIBoPbfxGnAed4pStL8heXVyZX3bAySnO8bXIW3JfdbVYdpu5nQXKqP7ws4Mr1Udk" className="w-full h-full rounded-full object-cover" />
          </div>
        </div>
      </motion.header>

      {/* SideNavBar */}
      <motion.aside 
        initial={{ x: -264 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 h-full w-64 pt-24 bg-slate-50 border-r border-slate-100 flex flex-col z-40"
      >
        <nav className="flex-1 px-4 space-y-2">
          {[
            { to: '/admin', icon: 'dashboard', label: 'Overview' },
            { to: '/document-statistics', icon: 'analytics', label: 'Analytics' },
            { to: '/user-management', icon: 'group', label: 'User Activity' },
            { to: '/audit-logs', icon: 'receipt_long', label: 'Audit Logs' },
            { to: '/permissions', icon: 'admin_panel_settings', label: 'Permissions', active: true }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <Link 
                to={item.to} 
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${item.active ? 'bg-indigo-950 text-white shadow-xl shadow-indigo-900/20' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>
        <div className="p-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg"
          >
            Access Audit
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-64 pt-24 px-12 pb-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-12"
        >
          <motion.header variants={itemVariants}>
            <h1 className="font-headline text-6xl text-indigo-950 italic mb-4 tracking-tight">Access Control</h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Define the editorial boundaries of your collaborators. Roles dictate which intellectual tools are accessible within the Atelier.
            </p>
          </motion.header>

          {/* Roles Grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 'Admin', icon: 'verified_user', label: 'Full Access', desc: 'Universal control over the system, roles, and financial records.', count: '2 Active Users', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { id: 'Scholar', icon: 'auto_stories', label: 'Content Focused', desc: 'Access to creative and organizational tools for research.', count: '48 Active Users', color: 'text-emerald-600', bg: 'bg-emerald-50', active: true },
              { id: 'Guest', icon: 'visibility', label: 'Read Only', desc: 'Limited viewing rights for external auditors or temporary help.', count: '12 Active Users', color: 'text-amber-600', bg: 'bg-amber-50' }
            ].map((role) => (
              <motion.div 
                key={role.id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-10 rounded-[3rem] border border-slate-50 shadow-sm flex flex-col justify-between h-[360px] group relative overflow-hidden ${role.active ? 'bg-indigo-950 text-white' : 'bg-white'}`}
              >
                <div className="relative z-10 transition-transform group-hover:scale-105">
                  <div className="flex justify-between items-start mb-10">
                    <span className={`p-5 ${role.active ? 'bg-white/10 text-white' : `${role.bg} ${role.color}`} rounded-2xl material-symbols-outlined text-[28px]`}>{role.icon}</span>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${role.active ? 'bg-white/10 text-white' : `${role.bg} ${role.color}`}`}>{role.label}</span>
                  </div>
                  <h3 className="font-headline text-3xl mb-4 italic">{role.id}</h3>
                  <p className={`text-sm leading-relaxed font-light ${role.active ? 'text-indigo-100/60' : 'text-slate-500'}`}>{role.desc}</p>
                </div>
                <div className="flex items-center justify-between mt-8 relative z-10">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl ${role.active ? 'bg-white/5' : 'bg-slate-50'}`}>{role.count}</span>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] hover:opacity-80 transition-opacity ${role.active ? 'text-indigo-300' : 'text-primary'}`}
                   >
                    Modify Access
                   </button>
                </div>
                {role.active && <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>}
              </motion.div>
            ))}
          </motion.div>

          {/* Activity Log */}
          <motion.div variants={itemVariants} className="bg-white p-16 rounded-[4rem] border border-slate-50 shadow-sm">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h4 className="font-headline text-4xl text-indigo-950 italic">Recent Adjustments</h4>
                <p className="text-slate-500 text-lg font-light mt-2">Latest changes to permission architectures.</p>
              </div>
              <Link to="/audit-logs" className="text-[10px] font-bold uppercase tracking-[0.2em] py-4 px-10 rounded-2xl bg-indigo-950 text-white hover:bg-primary transition-all shadow-xl shadow-indigo-900/20">Expand History</Link>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Scholar permission updated', actor: 'Admin Sarah', time: '2 hours ago', diff: '+ Library Access', icon: 'history_edu', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { title: "New role 'Archivist' created", actor: 'System Auto', time: '1 day ago', diff: 'Custom Map', icon: 'shield', color: 'text-amber-600', bg: 'bg-amber-50' }
              ].map((log, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10, backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                  className="flex items-center justify-between p-8 rounded-3xl border border-transparent hover:border-slate-50 transition-all cursor-default"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl ${log.bg} flex items-center justify-center ${log.color}`}>
                      <span className="material-symbols-outlined text-[24px]">{log.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-indigo-950">{log.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Initiated by {log.actor} &bull; {log.time}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${log.bg} ${log.color} px-4 py-2 rounded-xl`}>{log.diff}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* EDIT ROLE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-indigo-950/40 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-3xl rounded-[4rem] shadow-2xl overflow-hidden relative z-10"
            >
              <div className="p-16 border-b border-slate-50 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary font-black uppercase text-[10px] tracking-[0.3em] bg-emerald-50 px-3 py-1 rounded-full text-emerald-600">Active Config</span>
                  </div>
                  <h2 className="font-headline text-5xl text-indigo-950 italic">Modular Privileges</h2>
                  <p className="text-slate-500 mt-4 text-lg font-light">Orchestrating the capabilities of the <span className="font-bold text-indigo-600 italic">Scholar</span> node.</p>
                </div>
                <motion.button 
                  whileHover={{ rotate: 90 }}
                  onClick={() => setIsModalOpen(false)} 
                  className="p-4 rounded-2xl bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </motion.button>
              </div>
              
              <div className="p-16 max-h-[50vh] overflow-y-auto custom-scrollbar space-y-12">
                <section>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="material-symbols-outlined text-indigo-600 bg-indigo-50 p-3 rounded-2xl">palette</span>
                    <h3 className="font-headline text-2xl text-indigo-950 italic">Creative Cluster</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { title: 'Cover Gen', desc: 'Allow autonomous generation of academic cover art.', active: true },
                      { title: 'Index Designer', desc: 'Grant access to bibliography orchestration tools.', active: true }
                    ].map(tool => (
                      <div key={tool.title} className="flex items-center justify-between p-8 bg-slate-50/50 rounded-[2rem] border border-slate-50 hover:bg-white hover:shadow-sm transition-all group">
                        <div className="flex-1 pr-8">
                          <p className="text-lg font-bold text-indigo-950 mb-1">{tool.title}</p>
                          <p className="text-sm text-slate-500 font-light leading-relaxed">{tool.desc}</p>
                        </div>
                        <div className={`w-16 h-8 rounded-full relative cursor-pointer transition-colors duration-500 ${tool.active ? 'bg-indigo-950' : 'bg-slate-200'}`}>
                          <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-500 ${tool.active ? 'left-9' : 'left-1'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              
              <div className="p-12 bg-slate-50 flex items-center justify-end gap-6">
                <button onClick={() => setIsModalOpen(false)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-950 transition-colors">Discard Alterations</button>
                <button onClick={() => setIsModalOpen(false)} className="px-10 py-5 bg-indigo-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/20 hover:bg-primary transition-all active:scale-95">Commit Architecture</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
