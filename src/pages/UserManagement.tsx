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

export default function UserManagement() {
  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      {/* TopAppBar */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 h-18 bg-white/80 backdrop-blur-xl border-b border-slate-100"
      >
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex gap-8 ml-8">
            <a className="text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-indigo-600 transition-colors" href="#overview">Overview</a>
            <a className="text-indigo-600 font-bold uppercase tracking-widest text-[10px] border-b-2 border-indigo-600 pb-1" href="#activity">User Activity</a>
            <a className="text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-indigo-600 transition-colors" href="#stats">Document Stats</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <motion.span whileHover={{ scale: 1.1 }} className="material-symbols-outlined text-slate-400 p-2 rounded-full hover:bg-slate-50 cursor-pointer transition-colors">notifications</motion.span>
          <motion.span whileHover={{ scale: 1.1 }} className="material-symbols-outlined text-slate-400 p-2 rounded-full hover:bg-slate-50 cursor-pointer transition-colors">settings</motion.span>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 p-0.5">
            <img alt="Admin" className="w-full h-full rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXs2jJxLgJu9o_OTIa8K-zuMu9FQ1J3C8tWLi1mcxrAIlqjlfQCZRb67nfIhQDiAeGPiYtgl2FSE5_MM62oON69MHRsqLPcFDRPO6RGm6yNPT_oDV3K1dHiekBTW18XU_1gA-swWSGMbVxS76csu4hN1-xk8mUr-aJDiH6hoqbUMk_ChFFoHyJmGffaw2JxwVdLO5t8lSRBQ1LI29zFweyDI0ERIip67aoQ3mWiQcxy2YRXmLhB5lD6KcMtgW51GGVU-uiFiJQ4_I" />
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
            { to: '/user-management', icon: 'analytics', label: 'User Activity', active: true },
            { to: '/document-statistics', icon: 'description', label: 'Document Stats' },
            { to: '/permissions', icon: 'admin_panel_settings', label: 'Access Control' }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <Link 
                to={item.to} 
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${item.active ? 'bg-indigo-950 text-white shadow-xl shadow-indigo-900/20' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}
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
            className="w-full bg-primary text-white py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Invite Scholar
          </motion.button>
          <div className="space-y-1">
            <Link className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-indigo-600 transition-colors text-[10px] font-bold uppercase tracking-widest" to="/audit-logs">
              <span className="material-symbols-outlined text-sm">receipt_long</span> Audit Logs
            </Link>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="ml-64 pt-24 p-10 min-h-screen">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto space-y-12"
        >
          
          {/* Hero Header */}
          <motion.section variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-6xl font-headline text-indigo-950 italic mb-4 tracking-tight">Scholar Management</h1>
              <p className="text-slate-500 text-xl font-light leading-relaxed">Curate and monitor the intellectual workforce within the ScholarFlow ecosystem.</p>
            </div>
            <div className="flex gap-3">
              <div className="flex -space-x-4">
                {[
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0kSKhzjtSgzaFvsLYG-LGOe_P6XaKgFZReFKw71A9fGYnWpaau-6s5M2uqwX3BumJRbJ1-2Pj8q40eZa8nea0cxodu7Pfssdo4nZXunJiO3r0nWl7NRt_FGbaXwX1AnngGOp6e72X14BsN-cRrltI-IPRMRMOpGFxL1qBznrlP2zW49lAixjWzb-M6nv7ndXYdfoUicsTQNwIY8ennoW1MM2AZnSqJfAODgFWz6ii7Nt1Ms4WPNzK2MGtvJfXFFQcLGorsJMfXZA",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuA4D-FRVLjgn760dUGLcgHGLJnR8irAJ534ZMaQ9PSqL6FOuuHWX3ovjUcl3ZBOuCON49IcMtic0RzBcVv4tJ_LCY3CENZnyMQrv-RcVVc8Odv2YsSiv89gN4ISEq2a66xa55v0ALzPXXxpR8L6Fir0zgjGspCV_l-RNdRvHNOcfpqen2pMKcoQX4DS2b5Ajh8GL6l_KgU--9iNtsEjkTtfwSAgMQCbnQCAmjKSW1MWGRezwgwTNHMUI4p9_RmyDpbhH7F4ih0yYbc",
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuD_kn96pKAixn5ejasmdsSSAenS8ZJR-vW8tlNzLYjl8dv-jRZQNcZCchWnAcc4XI1hA0dYPXa5VPvvVkT9jndQcTlTTJf8_xGqzzMFn2TeX1YN_ueIAhgqK9uwfLwgbXFpTq72yHO6_PzFf_rtVcGAp1EVUMCwREYm9gts-iTcN5fMm0idn3O0_qN0iUQtT-swfTjXEE8ZikkewkeQtnKtDwPCvlzyeXTpjR44XP6bIxQetJtEAR9u0_R9vIH-BJKAWp86C0AbgOc"
                ].map((src, i) => (
                  <motion.img 
                    key={i}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    alt="Scholar" 
                    className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm bg-slate-100" 
                    src={src} 
                  />
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600 z-10 shadow-sm">
                  +12
                </div>
              </div>
            </div>
          </motion.section>

          {/* Directory Interface */}
          <motion.div variants={itemVariants} className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-slate-50 overflow-hidden">
            {/* Advanced Filtering & Search */}
            <div className="p-10 border-b border-slate-50 space-y-8">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="relative w-full lg:w-[450px] group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors">search</span>
                  <input className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 focus:ring-primary/10 transition-all outline-none" placeholder="Search by name, email or DOI..." type="text" />
                </div>
                <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
                  {['All Scholars', 'Senior Fellows', 'Researchers', 'Staff'].map((tab, i) => (
                    <button key={tab} className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>{tab}</button>
                  ))}
                  <div className="h-6 w-px bg-slate-100 mx-4"></div>
                  <button className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">filter_list</span> Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Scholar Directory Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                    <th className="px-10 py-6">Scholar</th>
                    <th className="px-10 py-6">Institutional Role</th>
                    <th className="px-10 py-6">Department</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6">Activity</th>
                    <th className="px-10 py-6 text-right">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'Dr. Aris Thorne', email: 'a.thorne@oxford.edu', role: 'Senior Fellow', dept: 'Epistemology', status: 'Active', time: '2m', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_q0YqNpFWWuiM5gadjQpGV8Vi2a5fK37sXUDH8zHGiVdJqG2zerH7_zl5wQP-flh1TqoYpcNTyfXX3VA3rcVq9NetjvXnBOkSlwpxCr11W06sRfyVeMmPkmm-_DYWoTjnU5l6RgutxuOFZVFEa1nWIcUW4xSNe7DenBRfx1dF5WRRdEnd5vjJFylhwNERO8qZ3w0UN2tW0A1rctTbDcSWVX4flUDRZgEz84n5AvScyQp9SaejWGhtIu2ZWWA-MhxTk7ScuG9H-5s' },
                    { name: 'Sarah Jenkins', email: 's.jenkins@mit.edu', role: 'Researcher', dept: 'Quantum Logic', status: 'Active', time: '1d', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7MK4DkOpzfBA4j5GMd9I-28vNBeDCdCA041eYzeHhndWIK1lSV21eT-lwgxsS8Bc1do0XbRMp3ddaR0-Bb4_jOfoOo68edUdo9zReFg4bPbakjr73Y0I0I4_6B2d_4iGweNnT3dSgst8965ep4jyiBb-qIPxUCzL0mOMvvISeCBS-l_jJUJySe1VYVguUWIx2L9QU051DCU2wp_YsdQjNjyJO9ktJBIxfwNgnPsPoMTZI071IWpaZzunLCYZ2yL56wYp42IQyOCc' },
                    { name: 'Marcus Vane', email: 'm.vane@stanford.edu', role: 'Guest Contributor', dept: 'Ethical AI', status: 'Inactive', time: '14d', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI0sayvBQflhLbiQA55T_4NdTToMhFrj77PZyefP6xREkKkcEFyMyJHCQaDMdDMMzofgO5BxZADGdbJQdVVtWMZKihIXTCLE6yprZvMwJ8iZsL2hTsen5AZy74ywGWL2I8LA_jmT1NfQDvJ8J5nmhacE6KjpL46ofvGqnokvBZ1W6FNd0lbC8K3mbowgzN7fKLIYqQcXqyRO_Si1yI7X8zbxS8lajgWJ2bt6DZ0yQw5K_hh8QX7FdU0Nbsr4NmWv7R9LGkoVTY67Q' },
                    { name: 'Elena Rodriguez', email: 'e.rod@ucl.ac.uk', role: 'Dept Head', dept: 'Social Dynamics', status: 'Active', time: '5h', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEdcb5ZXUAS1cHStkNrbjTwQqHRn7Mn6tmpwbjxivPCngNNguY6q5pxroP40JQwmDjtA84bNmyaXRVPl63zIBVBlDMiGa20TCoBcLhRkiqSGYFOiT6gUVdpUFkAuLRNvLyNYXBrdtFm8I5MbJmPW18vZbRW-VmJ_jfWyCxh0IRrq94zT2pwlghh1U6-jKkUI51clk3DZLM8BHL3C0gH7aTHb74w7uQnHGABrVsT1cjBGj37iDE1Fj00evS9gwKwB1t2W7y0IipOiM' }
                  ].map((scholar) => (
                    <motion.tr 
                      key={scholar.email} 
                      whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                      className="group transition-colors"
                    >
                      <td className="px-10 py-6">
                        <div className="flex items-center gap-4">
                          <img alt={scholar.name} className="w-12 h-12 rounded-full object-cover bg-slate-100" src={scholar.img} />
                          <div>
                            <div className="text-sm font-bold text-indigo-950">{scholar.name}</div>
                            <div className="text-[10px] text-slate-400 font-medium">{scholar.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-[11px] font-bold text-slate-600 uppercase tracking-wider">{scholar.role}</td>
                      <td className="px-10 py-6 text-[11px] font-medium text-slate-400">{scholar.dept}</td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.1em] ${scholar.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                          {scholar.status}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-[10px] text-slate-400 font-bold">{scholar.time}</td>
                      <td className="px-10 py-6 text-right">
                         <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                            <button className="p-2 text-slate-400 hover:text-rose-600 transition-colors"><span className="material-symbols-outlined text-[20px]">block</span></button>
                         </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-10 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Showing 4 of 1,280 scholars</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, '...', 42].map((p, i) => (
                  <button key={i} className={`w-10 h-10 rounded-xl text-[10px] font-bold transition-all ${p === 1 ? 'bg-indigo-950 text-white shadow-lg' : 'hover:bg-slate-100 text-slate-500'}`}>{p}</button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contextual Insight */}
          <motion.section variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
            <div className="bg-indigo-950 rounded-[2.5rem] p-12 text-white shadow-2xl shadow-indigo-900/30 relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-indigo-300">lightbulb</span>
                </div>
                <h3 className="text-3xl font-headline italic">Administrative Insight</h3>
                <p className="text-indigo-100/60 text-lg font-light leading-relaxed">
                  User engagement has spiked by 12% in the <span className="text-indigo-200 font-bold">Quantum Logic</span> department this quarter. Consider allocating resources for high-compute documents.
                </p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            </div>
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-12 flex items-center justify-between shadow-sm">
              <div className="space-y-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">System Health</h4>
                <div className="text-6xl font-headline text-indigo-950 tracking-tighter">99.98%</div>
                <p className="text-xs text-slate-400 font-medium">Uptime for Authentication API Cluster</p>
              </div>
              <div className="w-40 h-24 flex items-end gap-1.5 px-4">
                {[12, 16, 14, 20, 18, 22].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h*4}px` }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                    className="flex-1 bg-indigo-50 group-hover:bg-primary transition-colors rounded-t-full"
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
