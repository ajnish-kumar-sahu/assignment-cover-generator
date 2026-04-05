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

export default function AdminDashboard() {
  return (
    <div className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-fixed min-h-screen">
      {/* TopAppBar */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm flex justify-between items-center px-8 py-3"
      >
        <div className="flex items-center gap-8">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <span className="text-indigo-700 font-semibold font-label text-sm">Dashboard</span>
            <span className="text-slate-600 font-label text-sm hover:text-indigo-600 transition-colors cursor-pointer">Global Reports</span>
            <span className="text-slate-600 font-label text-sm hover:text-indigo-600 transition-colors cursor-pointer">Archive</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <motion.span whileHover={{ scale: 1.1 }} className="material-symbols-outlined text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer">notifications</motion.span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </div>
          <motion.span whileHover={{ scale: 1.1 }} className="material-symbols-outlined text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors cursor-pointer">settings</motion.span>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="ml-2 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200"
          >
            <img alt="Admin" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdr0mEXaXMbUsDLqhpXyR3tCYKIbobPBiUlRRwh5JFHfbV7rudzoao-ie59DbKC0VKdrMoWocX_DSH_nLfOsA-KESq92VKJmRSvKaAeoBAFiX-HrgJiT-gwatII1i64YF0iIeBkublnLbiwOWmR-ztqxQOYD4sTvhOxc8vLzVXQT086Pl9ncqSpd7jbgiqd3UVwy0vWzas8BN54WXksre1tZ4cRXYRSnBZ_mYDGcO7m_JWC4D1o2w-fiPmCnt9Kv3gMAqya9747qI" />
          </motion.div>
        </div>
      </motion.header>

      {/* SideNavBar */}
      <motion.aside 
        initial={{ x: -264 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="h-screen w-64 fixed left-0 top-0 pt-20 bg-slate-50 flex flex-col border-r border-slate-200/10 z-40"
      >
        <div className="px-8 py-6">
          <h2 className="font-headline text-indigo-900 text-xl">The Atelier</h2>
          <p className="text-xs text-slate-500 font-label uppercase tracking-widest mt-1">Administrative Suite</p>
        </div>
        <nav className="flex-1 mt-4">
          <ul className="space-y-1">
            {[
              { to: '/admin', icon: 'dashboard', label: 'Overview', active: true },
              { to: '/user-management', icon: 'group', label: 'User Activity' },
              { to: '/document-statistics', icon: 'description', label: 'Document Stats' },
              { to: '/audit-logs', icon: 'receipt_long', label: 'Audit Logs' },
              { to: '/permissions', icon: 'security', label: 'Access Control' }
            ].map((item, idx) => (
              <motion.li 
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
              >
                <Link 
                  className={`flex items-center group ${item.active ? 'text-indigo-700 bg-white shadow-sm' : 'text-slate-500 hover:text-indigo-600'} rounded-l-full ml-4 pl-4 py-3 transition-all`} 
                  to={item.to}
                >
                   <span className="material-symbols-outlined mr-3 text-[20px]">{item.icon}</span>
                   <span className="font-label font-bold text-xs uppercase tracking-wider">{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="p-6">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-950 text-white py-3 rounded-xl font-label text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg shadow-indigo-950/20"
          >
            Generate Report
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-64 pt-24 px-10 pb-12">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
        >
          {/* Hero Header Section */}
          <motion.section variants={itemVariants} className="mb-12">
            <h2 className="text-6xl font-headline text-indigo-950 mb-4 tracking-tight">Curating Excellence</h2>
            <p className="text-slate-500 font-body text-xl leading-relaxed opacity-80 max-w-2xl font-light">
              Welcome back, Administrator. The repository has seen a <span className="text-primary font-bold">12% increase</span> in intellectual output this month.
            </p>
          </motion.section>

          {/* Bento Grid Metrics */}
          <motion.section variants={containerVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Users', value: '14,282', icon: 'person', color: 'text-primary' },
              { label: 'Covers Generated', value: '31.5k', icon: 'auto_awesome', color: 'text-amber-500' },
              { label: 'Indices Created', value: '8,920', icon: 'list_alt', color: 'text-emerald-500' },
              { label: 'Active Sessions', value: '412', icon: 'sensors', color: 'text-white', primary: true }
            ].map((stat) => (stat.primary ? (
              <motion.div 
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-indigo-950 text-white p-8 rounded-3xl flex flex-col justify-between h-52 shadow-2xl shadow-indigo-900/40"
              >
                <div>
                  <span className="material-symbols-outlined text-indigo-300 mb-4" style={{fontVariationSettings: "'FILL' 1"}}>{stat.icon}</span>
                  <h3 className="text-indigo-200 font-label text-[10px] uppercase tracking-widest font-bold">{stat.label}</h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-headline">{stat.value}</p>
                  <span className="text-xs text-emerald-400 font-bold">+5%</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col justify-between h-52 shadow-sm relative overflow-hidden group"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-slate-50 rounded-full blur-2xl group-hover:bg-indigo-50/50 transition-colors"></div>
                <div>
                  <span className={`material-symbols-outlined ${stat.color} mb-4`}>{stat.icon}</span>
                  <h3 className="text-slate-400 font-label text-[10px] uppercase tracking-widest font-bold">{stat.label}</h3>
                </div>
                <p className="text-4xl font-headline text-indigo-950">{stat.value}</p>
              </motion.div>
            )))}
          </motion.section>

          {/* Dashboard Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Activity Stream Table */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center px-2">
                <h3 className="font-headline text-2xl text-indigo-950">Recent Artifacts</h3>
                <button className="text-primary font-bold text-[10px] uppercase tracking-widest hover:underline">View All Documents</button>
              </div>

              <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-slate-400 font-bold">Artifact Title</th>
                      <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-slate-400 font-bold">Scholar</th>
                      <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-slate-400 font-bold">Status</th>
                      <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-slate-400 font-bold text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {[
                      { title: 'The Quantum narrative in Literature', scholar: 'Dr. Elena Rostova', status: 'Completed', time: '2m' },
                      { title: 'Neural Networks in Ancient Epigraphy', scholar: 'Julian Vance', status: 'Processing', time: '14m' },
                      { title: 'Sustainable Urbanism: A Case Study', scholar: 'Sarah Chen', status: 'Completed', time: '45m' },
                      { title: 'Ethical Frameworks for AGI', scholar: 'Prof. Marcus Thorne', status: 'Failed', time: '1h' }
                    ].map((row, idx) => (
                      <motion.tr 
                        key={idx}
                        whileHover={{ backgroundColor: "rgba(248, 250, 252, 0.5)" }}
                        className="transition-colors group"
                      >
                        <td className="px-8 py-6 font-headline text-lg text-indigo-950 italic">{row.title}</td>
                        <td className="px-8 py-6 font-body text-sm text-slate-600">{row.scholar}</td>
                        <td className="px-8 py-6">
                          <span className={`${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : row.status === 'Failed' ? 'bg-rose-50 text-rose-600' : 'bg-indigo-50 text-indigo-600'} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right font-body text-xs text-slate-400 font-medium">{row.time}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Side Cards */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 space-y-8">
                <h3 className="font-headline text-xl text-indigo-950">System Health</h3>
                
                <div className="space-y-6">
                  {[
                    { label: 'Compute Load', val: 68, color: 'bg-primary' },
                    { label: 'API Latency', val: 30, color: 'bg-emerald-500' },
                    { label: 'Storage Depth', val: 85, color: 'bg-amber-500' }
                  ].map(stat => (
                    <div key={stat.label} className="space-y-3">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        <span>{stat.label}</span>
                        <span>{stat.val}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.val}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`${stat.color} h-full rounded-full`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-3 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  All nodes operational
                </div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] group shadow-xl bg-slate-200"
              >
                <img alt="Library" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAya7z3veaff9rsnaiCHCKX25QsHh9n8T6mzZMfrBA88XJiTrllbScsp1bOaOXv09JkDnDK0axtYJvIg7671usIT3y8ZaRuSqUfpDUSQSM_MLE-VTXpDk0ms0iMoZ_wpZcbxSx8BpIpKW3q2Q0BL6-8ePg4pCk_JlS8k6kAn8uMjkLAO28vPzKORnKDhgfcsrnW3P1EixgUqqbtBowPqCXWqSpi75CZVTN4cXDIDQf3TZSuhDovVHdiUxaQScBOWy7qKzPNGRSL9M" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/20 to-transparent flex flex-col justify-end p-10">
                  <h4 className="text-white font-headline text-2xl italic leading-tight mb-2">The Scholar's Path</h4>
                  <p className="text-white/60 text-xs font-light tracking-wide mb-6">Review the latest platform guidelines for digital archiving.</p>
                  <button className="text-white border border-white/20 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors self-start">Read Guidelines</button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
