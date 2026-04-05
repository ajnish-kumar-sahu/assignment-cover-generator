import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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

export default function DocumentStatistics() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      {/* TopNavBar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-8 h-18 shadow-sm shadow-indigo-900/5"
      >
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:flex gap-8 ml-8">
            <a className="text-indigo-700 font-bold uppercase tracking-widest text-[10px] border-b-2 border-indigo-600 pb-1" href="#analytics">Analytics</a>
            <a className="text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-indigo-600 transition-colors" href="#documents">Documents</a>
            <a className="text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-indigo-600 transition-colors" href="#institutional">Institutional</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">search</span>
            <input className="pl-12 pr-6 py-2.5 bg-slate-50 border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-primary/10 w-64 outline-none" placeholder="Search records..." type="text" />
          </div>
          <motion.div whileHover={{ scale: 1.1 }} className="material-symbols-outlined text-slate-400 p-2 rounded-full hover:bg-slate-50 cursor-pointer">notifications</motion.div>
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5">
             <img alt="Admin" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYofB06D4lSGMUjTOJKKZmUpHqfVmUAGekCpFT700c9W8Ku4L5WbJrer-GHf4qEIj9cPtvoP1sI7pvx314XF1S1wzLymd_Nd27YImr5liD5ysZuzUCYALW5vyOySpZ9izxUOcwOs3EiwVfdHiG04U0HjeSAAVnoU52N1dhArmz-9yb7OfIof-gz5VwZ4Er_IUuMuCHAAEWkvDMj4mZk4NlzDvvD8wWX-OMvs15kGUv7N_iUDALqMdy9cU-FTe1HFwuRQnDjFpMGXs" />
          </div>
        </div>
      </motion.nav>

      {/* SideNavBar */}
      <motion.aside 
        initial={{ x: -264 }}
        animate={{ x: 0 }}
        className="fixed left-0 top-0 h-full w-64 pt-24 bg-slate-50 border-r border-slate-100 flex flex-col z-40"
      >
        <nav className="flex-1 px-4 space-y-2">
          {[
            { to: '/admin', icon: 'dashboard', label: 'Overview' },
            { to: '/document-statistics', icon: 'analytics', label: 'Analytics', active: true },
            { to: '/user-management', icon: 'group', label: 'User Activity' },
            { to: '/audit-logs', icon: 'receipt_long', label: 'Audit Logs' },
            { to: '/permissions', icon: 'admin_panel_settings', label: 'Permissions' }
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
        <div className="p-6 space-y-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg"
          >
            Export Global Stats
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
            <h1 className="font-headline text-6xl text-indigo-950 italic mb-4 tracking-tight">Statistica</h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              A comprehensive overview of publication performance, archival efficiency, and template distribution across the Scholarship ecosystem.
            </p>
          </motion.header>

          {/* KPI Bento Grid */}
          <motion.section variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Total Covers', val: '14,282', delta: '+12.4%', icon: 'book', color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Total Indices', val: '8,914', delta: 'Steady', icon: 'list_alt', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Creation Time', val: '14.8s', delta: '-2.1s', icon: 'timer', color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'Main Template', val: 'Atelier Serif', icon: 'auto_awesome', color: 'text-slate-600', bg: 'bg-slate-50' }
            ].map((stat) => (
              <motion.div 
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col justify-between h-52 group overflow-hidden relative"
              >
                <div className="flex items-start justify-between relative z-10 transition-transform group-hover:scale-110">
                  <span className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
                    <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
                  </span>
                  {stat.delta && <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">{stat.delta}</span>}
                </div>
                <div className="mt-6 relative z-10">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                  <h3 className="font-headline text-3xl font-bold text-indigo-950">{stat.val}</h3>
                </div>
                <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${stat.bg} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700 blur-2xl`}></div>
              </motion.div>
            ))}
          </motion.section>

          {/* Main Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Generation Volume */}
            <motion.section variants={itemVariants} className="lg:col-span-2 bg-indigo-950 rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-900/40 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-12">
                  <div>
                    <h2 className="font-headline text-3xl italic mb-2">Generation Volume</h2>
                    <p className="text-indigo-200/50 text-sm font-light uppercase tracking-widest">Global Intellectual Output</p>
                  </div>
                  <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
                    <button className="px-6 py-2 text-[10px] font-bold bg-white text-indigo-950 rounded-xl shadow-lg">Weekly</button>
                    <button className="px-6 py-2 text-[10px] font-bold text-indigo-300 hover:text-white transition-colors">Monthly</button>
                  </div>
                </div>

                <div className="h-64 flex items-end gap-3 px-2">
                  {[40, 60, 45, 100, 55, 75, 65, 50, 60, 85].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.8 + i * 0.05, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex-1 rounded-t-3xl transition-all relative group shadow-lg ${i === 3 ? 'bg-indigo-400' : (i === 9 ? 'bg-indigo-300' : 'bg-white/10 hover:bg-white/20')}`}
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-indigo-950 px-3 py-1 rounded-lg text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all pointer-events-none">{h*8}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between mt-8 text-[10px] text-indigo-300/50 font-black uppercase tracking-[0.3em] px-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'].map(d => <span key={d}>{d}</span>)}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
            </motion.section>

            {/* Distribution Metrics */}
            <motion.section variants={itemVariants} className="bg-white border border-slate-50 rounded-[3rem] p-12 shadow-sm flex flex-col">
              <h2 className="font-headline text-2xl text-indigo-950 mb-10 italic">Distribution</h2>
              <div className="space-y-10 flex-1">
                <div>
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-400">
                    <span>Usage patterns</span>
                    <span className="text-primary hover:underline cursor-pointer">Archive</span>
                  </div>
                  <div className="space-y-6">
                    {[
                      { name: 'Atelier Serif', val: 42, color: 'bg-indigo-600' },
                      { name: 'Modern Grid', val: 28, color: 'bg-indigo-400' },
                      { name: 'Legacy Classic', val: 15, color: 'bg-indigo-200' }
                    ].map(t => (
                      <div key={t.name} className="space-y-3">
                        <div className="flex justify-between text-[11px] font-bold text-slate-700">
                          <span>{t.name}</span>
                          <span>{t.val}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${t.val}%` }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className={`${t.color} h-full rounded-full`}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-50">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-slate-400">
                    <span>Active Palette</span>
                  </div>
                  <div className="flex gap-4">
                    {['#3525cd', '#10b981', '#f59e0b', '#ef4444', '#64748b'].map((c) => (
                      <motion.div 
                        key={c}
                        whileHover={{ scale: 1.2, y: -4 }}
                        className="w-10 h-10 rounded-2xl shadow-sm border-2 border-white ring-4 ring-slate-50 ring-opacity-50 cursor-pointer"
                        style={{ backgroundColor: c }}
                      ></motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Institutional Activity Comparative */}
          <motion.section variants={itemVariants} className="bg-white rounded-[4rem] overflow-hidden border border-slate-50 shadow-sm mb-20">
            <div className="p-16 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
              <div className="max-w-xl">
                <h2 className="font-headline text-5xl text-indigo-950 italic mb-4">Partner Velocity</h2>
                <p className="text-slate-500 text-lg font-light leading-relaxed font-body">Comparative engagement of global research institutions within the ScholarFlow network.</p>
              </div>
              <button className="bg-slate-950 text-white px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-xl shadow-slate-200">
                Download Manuscript Data
              </button>
            </div>
            
            <div className="overflow-x-auto px-10">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.25em]">
                    <th className="px-10 py-10">Partner Institution</th>
                    <th className="px-10 py-10">Docs Generated</th>
                    <th className="px-10 py-10">Active Scholars</th>
                    <th className="px-10 py-10">Quality Score</th>
                    <th className="px-10 py-10 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { id: 'LU', name: 'Lyceum University', loc: 'Oxfordshire, UK', docs: '2,481', scholars: '412', stars: 4.5, trend: 'up', color: 'text-emerald-500' },
                    { id: 'VA', name: 'Vanguard Academy', loc: 'California, US', docs: '1,902', scholars: '285', stars: 5, trend: 'flat', color: 'text-slate-400' },
                    { id: 'HT', name: 'Heidelberg Tech', loc: 'Baden-Würt., DE', docs: '1,544', scholars: '198', stars: 3.5, trend: 'down', color: 'text-rose-500' }
                  ].map((inst) => (
                    <motion.tr 
                      key={inst.id}
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.4)" }}
                      className="transition-colors group"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center font-headline font-bold text-indigo-600 italic text-2xl shadow-sm">{inst.id}</div>
                          <div>
                            <div className="font-bold text-lg text-indigo-950">{inst.name}</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{inst.loc}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 font-headline text-2xl text-slate-800">{inst.docs}</td>
                      <td className="px-10 py-8 text-sm font-bold text-slate-600">{inst.scholars}</td>
                      <td className="px-10 py-8">
                        <div className="flex gap-0.5 text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-lg" style={{fontVariationSettings: i < inst.stars ? "'FILL' 1" : "none"}}>star</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <span className={`material-symbols-outlined ${inst.color} bg-white shadow-sm border border-slate-50 p-3 rounded-2xl`}>{inst.trend === 'up' ? 'trending_up' : inst.trend === 'down' ? 'trending_down' : 'trending_flat'}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-12 bg-slate-50 text-center">
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-primary transition-all cursor-pointer">Browse 42 Institutional Nodes</button>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
