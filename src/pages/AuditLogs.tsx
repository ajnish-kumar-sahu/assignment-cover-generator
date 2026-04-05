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

export default function AuditLogs() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      {/* TopNavBar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-100 bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-100 flex justify-between items-center px-8 h-18"
      >
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:flex gap-8">
            {['Overview', 'Logs', 'Security'].map((tab, idx) => (
              <a 
                key={tab}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all ${idx === 1 ? 'text-indigo-700 border-b-2 border-indigo-600 pb-1' : 'text-slate-400 hover:text-indigo-600'}`} 
                href={`#${tab.toLowerCase()}`}
              >
                {tab}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </motion.button>
          <div className="h-10 w-10 rounded-full border-2 border-primary/20 p-0.5">
            <img alt="Admin" className="h-full w-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABAIYGVyQoUA2Fq58l36bzbD9GF-SRBACOLw3dkQfh8ljpFKcCfrKhRPZEzfB-ac_Nbsw_1jlc9CAFSP5xnQaHlBm0Dn4Nar0uFyk-ZhMjWba3ASm_Ge-_-3TVSZnwexgEeKy7YSDo7Sk0qlIDJWikrZutkoQn0vq1si7iHguZLc0uMeQA1P0jrMKhPGPJyUKzES7DQQ8qthcu6qL2eW99UaZS-qfn30so9-CIi82wKgArHRpq3mwc5uLpo5Wojnq4mf4kMYF3O9g" />
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
            { to: '/document-statistics', icon: 'analytics', label: 'Analytics' },
            { to: '/user-management', icon: 'group', label: 'User Activity' },
            { to: '/audit-logs', icon: 'receipt_long', label: 'Audit Logs', active: true },
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
        <div className="p-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg"
          >
            Generate Report
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-64 pt-24 px-12 pb-12 min-h-screen">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-12"
        >
          {/* Header Section */}
          <motion.header variants={itemVariants} className="flex flex-col xl:flex-row justify-between xl:items-end gap-10">
            <div className="max-w-2xl">
              <h1 className="font-headline text-6xl text-indigo-950 italic mb-4 tracking-tight">Audit Archive</h1>
              <p className="text-slate-500 text-xl font-light leading-relaxed">
                A curated history of administrative and automated activities within the <span className="italic">ScholarFlow</span> ecosystem.
              </p>
            </div>
            <div className="flex gap-4">
              <motion.button whileHover={{ y: -2 }} className="flex items-center gap-3 px-8 py-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:bg-white hover:shadow-sm transition-all">
                <span className="material-symbols-outlined text-lg">download</span>
                Export CSV
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} className="flex items-center gap-3 px-8 py-4 bg-indigo-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/20 hover:bg-primary transition-all">
                <span className="material-symbols-outlined text-lg">print</span>
                PDF Report
              </motion.button>
            </div>
          </motion.header>

          {/* Filters Section */}
          <motion.section variants={itemVariants} className="bg-white rounded-[3rem] p-12 border border-slate-50 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Temporal Range</label>
                <div className="relative group">
                  <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all" placeholder="Last 30 Days" type="text" />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">calendar_today</span>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">User Delegation</label>
                <select className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none appearance-none cursor-pointer">
                  <option>All Roles</option>
                  <option>Super Admin</option>
                  <option>Editor</option>
                  <option>System Bot</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Event Gravity</label>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-2">
                  {['CRITICAL', 'WARNING', 'INFO'].map((sev, i) => (
                    <button key={sev} className={`flex-1 py-3 rounded-xl text-[9px] font-black transition-all ${i === 0 ? 'bg-indigo-950 text-white shadow-lg' : 'text-slate-400 hover:bg-white hover:text-indigo-950'}`}>{sev}</button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Entity Search</label>
                <div className="relative group">
                  <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/10 outline-none transition-all" placeholder="DOI or Actor..." type="text" />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">search</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Audit Log Table */}
          <motion.section variants={itemVariants} className="bg-white rounded-[3rem] overflow-hidden border border-slate-50 shadow-sm relative z-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="px-12 py-8">Temporal Node</th>
                    <th className="px-12 py-8">Actor Interface</th>
                    <th className="px-12 py-8">Action Cluster</th>
                    <th className="px-12 py-8">Target Entity</th>
                    <th className="px-12 py-8">Outcome</th>
                    <th className="px-12 py-8 text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { date: 'Oct 24, 2023', time: '14:22:05 UTC', name: 'Julian Draxler', role: 'Super Admin', initial: 'JD', action: 'Update Template', target: 'tpl_9921_oxford', outcome: 'Success', severity: 'info' },
                    { date: 'Oct 24, 2023', time: '13:45:12 UTC', name: 'RenderEngine V4', role: 'System Bot', action: 'Generated Cover', target: 'asset_442_journal', outcome: 'Success', severity: 'info', isBot: true },
                    { date: 'Oct 24, 2023', time: '12:10:01 UTC', name: 'Anna Lumi', role: 'Editor', initial: 'AL', action: 'Login Attempt', target: 'auth_gate_main', outcome: 'Fail', severity: 'critical' },
                    { date: 'Oct 24, 2023', time: '09:30:55 UTC', name: 'Sarah Miller', role: 'Billing Admin', initial: 'SM', action: 'Refund Processed', target: 'inv_8822_2023', outcome: 'Success', severity: 'warning' }
                  ].map((row, idx) => (
                    <motion.tr 
                      key={idx}
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                      className={`group transition-colors ${row.severity === 'critical' ? 'bg-rose-50/20' : ''}`}
                    >
                      <td className="px-12 py-8">
                        <div className="text-sm font-bold text-indigo-950">{row.date}</div>
                        <div className="text-[10px] text-slate-400 font-medium tracking-wider mt-1">{row.time}</div>
                      </td>
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black transition-transform group-hover:scale-110 shadow-sm ${row.severity === 'critical' ? 'bg-rose-100 text-rose-600' : 'bg-indigo-50 text-indigo-700'}`}>
                            {row.isBot ? <span className="material-symbols-outlined text-lg">smart_toy</span> : row.initial}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-indigo-950">{row.name}</div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{row.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-8">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-inner ${row.severity === 'critical' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-indigo-50 text-indigo-700'}`}>
                          {row.action}
                        </span>
                      </td>
                      <td className="px-12 py-8">
                        <div className="text-xs font-mono text-slate-500 font-medium tracking-tight bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit">{row.target}</div>
                      </td>
                      <td className="px-12 py-8">
                        <div className={`flex items-center gap-2 ${row.outcome === 'Success' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>{row.outcome === 'Success' ? 'check_circle' : 'error'}</span>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{row.outcome}</span>
                        </div>
                      </td>
                      <td className="px-12 py-8 text-right">
                        <motion.button 
                          whileHover={{ x: 5 }}
                          className={`p-3 rounded-xl transition-all ${row.severity === 'critical' ? 'bg-white text-rose-600 shadow-lg shadow-rose-950/5' : 'text-slate-300 hover:text-indigo-600 hover:bg-white hover:shadow-sm'}`}
                        >
                          <span className="material-symbols-outlined">{row.severity === 'critical' ? 'warning' : 'chevron_right'}</span>
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-12 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-10">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Displaying <span className="text-indigo-900 font-black">25</span> of 1,420 events</span>
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-indigo-600 hover:shadow-sm transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-950 text-white font-black text-xs shadow-xl shadow-indigo-950/20">1</button>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-600 font-black text-xs hover:bg-slate-100 transition-colors">2</button>
                <span className="px-4 text-slate-300 font-black">...</span>
                <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 text-slate-300 hover:text-indigo-600 hover:shadow-sm transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
            </div>
          </motion.section>

          {/* Insights Grid */}
          <motion.section variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-12">
            {[
              { title: 'System Resilience', desc: 'Real-time status of authentication protocols.', val: '99.9%', unit: '%', icon: 'verified_user', color: 'bg-indigo-950 text-white', accent: 'text-indigo-300' },
              { title: 'Prime Actor', desc: 'Researcher with highest event frequency.', actor: 'Elena Rodriguez', stats: '42 Events', icon: 'person_search', color: 'bg-white text-indigo-950', border: 'border-slate-50' },
              { title: 'Compliance Note', desc: 'Automated review protocol scheduled.', content: 'Review all "Template Update" logs within 48h.', icon: 'priority_high', color: 'bg-amber-50 text-amber-950', border: 'border-amber-100' }
            ].map((insight) => (
              <motion.div 
                key={insight.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`p-10 rounded-[3rem] shadow-sm flex flex-col justify-between h-[300px] border relative overflow-hidden ${insight.color} ${insight.border || 'border-transparent'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-headline text-3xl italic">{insight.title}</h3>
                    <span className={`material-symbols-outlined p-3 rounded-2xl ${insight.accent ? 'bg-white/10' : 'bg-slate-50 text-indigo-600'}`}>{insight.icon}</span>
                  </div>
                  <p className={`text-sm leading-relaxed font-light ${insight.accent ? 'text-indigo-100/60' : 'text-slate-500'}`}>{insight.desc}</p>
                </div>
                {insight.val ? (
                  <div className="text-6xl font-headline tracking-tighter">{insight.val}<span className="text-2xl opacity-50 ml-1">{insight.unit}</span></div>
                ) : insight.actor ? (
                  <div className="flex items-center gap-4">
                    <img alt="Actor" className="w-12 h-12 rounded-full object-cover shadow-sm bg-slate-100" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCO0H6EOz-TFscNQl11JHK0b5TZGYd3oNTApWEA83biCP0oQMbeT2G9knt_Xe0ykGG0i3orusP2hBmfu51gwYC1nTkx8s6O3DgJwvTe19TIb5VHuGAil9Dymqkis7R84xwlQ165kLDfIjWROrwOp7Yk5ghX0wFQ20_9RdFL0TYwc6ksoMZcXwAndbJWZYq2J5McZ-frntxhhsONLP3fjPIkcrKe06Z49LMHOd0EkAlgGfEcywJDvnsYhC7B-tsMRgM_4nW2uCvrc0" />
                    <div>
                      <div className="text-sm font-bold text-indigo-950">{insight.actor}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-primary mt-0.5">{insight.stats}</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-amber-900/80 italic leading-relaxed">{insight.content}</p>
                )}
              </motion.div>
            ))}
          </motion.section>
        </motion.div>
      </main>

      {/* Floating Insight Trigger */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        className="fixed right-10 bottom-10 z-50 px-8 py-5 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-2xl shadow-indigo-900/10 flex items-center gap-6 cursor-pointer group"
      >
        <div className="w-12 h-12 bg-indigo-950 text-white rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
          <span className="material-symbols-outlined">track_changes</span>
        </div>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Suite</div>
          <div className="text-sm font-bold text-indigo-950">Track Realtime Delta</div>
        </div>
      </motion.div>
    </div>
  );
}
