import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    navigate('/cover-generator');
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.4, duration: 0.8 } }
  };

  return (
    <div className="bg-slate-50 font-body text-slate-900 selection:bg-indigo-100 min-h-screen flex flex-col relative overflow-hidden">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-full bg-white/70 backdrop-blur-lg border-b border-slate-100"
      >
        <Logo />
        <div className="hidden md:flex gap-8 items-center">
          <Link to="/research" className="text-slate-500 hover:text-indigo-600 font-medium transition-colors text-sm">Research</Link>
          <Link to="/archive" className="text-slate-500 hover:text-indigo-600 font-medium transition-colors text-sm">Archive</Link>
          <Link to="/library" className="text-slate-500 hover:text-indigo-600 font-medium transition-colors text-sm">Library</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-indigo-600 font-bold px-4 py-2 hover:bg-indigo-50 transition-colors rounded-xl text-sm uppercase tracking-widest">Login</Link>
          <Link to="/signup" className="bg-primary text-white px-6 py-2 rounded-xl font-bold tracking-wider text-sm uppercase shadow-md transition-all hover:scale-95 duration-200">Sign Up</Link>
        </div>
      </motion.nav>

      <main className="flex-grow pt-24 pb-12 flex items-center justify-center relative">
        {/* Animated Background Icons */}
        <motion.div 
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-10 md:left-32 opacity-[0.03] pointer-events-none"
        >
          <span className="material-symbols-outlined text-[15rem]">auto_stories</span>
        </motion.div>
        
        <motion.div 
          animate={{ y: [10, -10, 10], rotate: [2, -2, 2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 md:right-32 opacity-[0.03] pointer-events-none"
        >
          <span className="material-symbols-outlined text-[18rem]">history_edu</span>
        </motion.div>

        <div className="w-full max-w-[500px] px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="bg-white/90 backdrop-blur-2xl rounded-3xl p-10 md:p-14 shadow-[0_25px_70px_-20px_rgba(0,0,0,0.1)] border border-white flex flex-col items-center relative overflow-hidden"
          >
            {/* Glossy overlay effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none"></div>

            <motion.div variants={fadeUp} className="mb-10 text-center relative z-10 w-full">
              <motion.div 
                whileHover={{ y: -5, scale: 1.05 }}
                className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)] border border-slate-50 p-3"
              >
                <img src="/logo.png" alt="ScholarFlow" className="w-full h-full object-contain" />
              </motion.div>
              <h1 className="font-headline text-4xl text-slate-800 mb-2 font-bold italic">Join the Atelier</h1>
              <p className="text-slate-500 font-medium text-sm">Cultivate your research within a curated digital ecosystem.</p>
            </motion.div>

            <motion.form variants={fadeUp} className="w-full space-y-5 relative z-10" onSubmit={handleSubmit}>
              <div className="space-y-1.5 relative group">
                <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase ml-1" htmlFor="full-name">Full Name</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">badge</span>
                  <input className="w-full px-5 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300 text-sm font-medium outline-none text-slate-800" id="full-name" placeholder="Prof. Julian Sterling" type="text"/>
                </div>
              </div>

              <div className="space-y-1.5 relative group">
                <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase ml-1" htmlFor="email">Institutional Email</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">account_balance</span>
                  <input className="w-full px-5 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300 text-sm font-medium outline-none text-slate-800" id="email" placeholder="j.sterling@oxford.ac.uk" type="email"/>
                </div>
              </div>

              <div className="space-y-1.5 relative group">
                <label className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase ml-1" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">key</span>
                  <input className="w-full px-5 py-4 pl-12 pr-12 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all placeholder:text-slate-300 text-sm font-medium outline-none text-slate-800" id="password" placeholder="••••••••••••" type="password"/>
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors focus:outline-none" type="button" title="Show password">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 pb-2">
                <div className="flex items-center h-5 mt-0.5">
                  <input className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500/20 bg-slate-50 cursor-pointer" id="terms" name="terms" type="checkbox"/>
                </div>
                <label className="text-xs text-slate-500 font-medium leading-relaxed cursor-pointer" htmlFor="terms">
                  I agree to the <Link to="/terms-of-service" className="text-emerald-600 font-bold hover:underline">Academic Research Terms</Link> and the ethical guidelines of the atelier.
                </label>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 mt-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-xl font-bold tracking-[0.2em] text-xs uppercase shadow-xl shadow-slate-900/20 transition-all flex justify-center items-center gap-2" 
                type="submit"
              >
                Create Account <span className="material-symbols-outlined text-sm">app_registration</span>
              </motion.button>
            </motion.form>

            <motion.div variants={fadeUp} className="mt-8 text-center relative z-10 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 w-full">
              <p className="text-slate-500 text-xs font-medium tracking-wide">
                Already a member? 
                <Link to="/login" className="text-emerald-600 font-bold ml-1 hover:underline underline-offset-4">Sign In instead</Link>
              </p>
            </motion.div>
          </motion.div>
          
          {/* Feature Badges below the form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto"
          >
            <div className="bg-white/60 backdrop-blur-md px-4 py-3 rounded-2xl flex items-center justify-center gap-3 border border-slate-100 shadow-sm">
               <span className="material-symbols-outlined text-[16px] text-indigo-500">lock</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Encrypted</span>
            </div>
            <div className="bg-white/60 backdrop-blur-md px-4 py-3 rounded-2xl flex items-center justify-center gap-3 border border-slate-100 shadow-sm">
               <span className="material-symbols-outlined text-[16px] text-indigo-500">hub</span>
               <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">800+ Unis</span>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
