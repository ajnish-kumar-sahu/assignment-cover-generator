import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

export default function SignIn() {
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
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col selection:bg-primary/20">
      {/* TopNavBar */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 max-w-full bg-white/70 backdrop-blur-lg border-b border-outline-variant/10"
      >
        <Logo />
        <nav className="hidden md:flex gap-8 items-center">
          <Link to="/research" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">Research</Link>
          <Link to="/archive" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">Archive</Link>
          <Link to="/library" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors text-sm">Library</Link>
        </nav>
        <div className="flex gap-4">
          <Link to="/login" className="text-indigo-600 font-bold px-4 py-2 hover:bg-indigo-50 transition-colors rounded-xl text-sm uppercase tracking-widest">Login</Link>
          <Link to="/signup" className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all hover:scale-95 duration-200">Sign Up</Link>
        </div>
      </motion.header>

      {/* Main Content Canvas */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 bg-slate-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary rounded-full blur-[100px]"
        />

        <div className="container mx-auto px-6 flex justify-center z-10">
          {/* Central Glassmorphic Card */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="bg-white/90 backdrop-blur-2xl w-full max-w-[420px] p-10 md:p-12 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white flex flex-col items-center relative overflow-hidden"
          >
            {/* Glossy overlay effect */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

            {/* Brand Identity */}
            <motion.div variants={fadeUp} className="mb-10 text-center relative z-10 w-full">
              <motion.div 
                whileHover={{ y: -5, scale: 1.05 }}
                className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_10px_30px_-10px_rgba(53,37,205,0.3)] border border-slate-50 p-3"
              >
                <img src="/logo.png" alt="ScholarFlow" className="w-full h-full object-contain" />
              </motion.div>
              <h1 className="font-headline text-4xl text-slate-800 mb-2 font-bold italic">Welcome Back</h1>
              <p className="text-slate-500 text-sm font-medium">Access your intellectual atelier</p>
            </motion.div>

            {/* Form */}
            <motion.form variants={fadeUp} className="w-full space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="space-y-2 relative group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1" htmlFor="email">Email Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pr-4 pl-12 text-slate-800 text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm outline-none placeholder:text-slate-300" id="email" name="email" placeholder="scholar@university.edu" type="email"/>
                </div>
              </div>
              
              <div className="space-y-2 relative group">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1" htmlFor="password">Password</label>
                  <Link to="/reset-password" className="text-[10px] font-bold tracking-widest text-indigo-400 hover:text-indigo-600 transition-colors uppercase">Forgot?</Link>
                </div>
                <div className="relative border border-transparent">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pr-12 pl-12 text-slate-800 text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm outline-none placeholder:text-slate-300" id="password" name="password" placeholder="••••••••" type="password"/>
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors focus:outline-none">
                    <span className="material-symbols-outlined text-lg">visibility</span>
                  </button>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold tracking-[0.2em] text-xs uppercase shadow-xl shadow-indigo-600/20 transition-all flex justify-center items-center gap-2" 
                  type="submit"
                >
                  Sign In <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </motion.button>
              </div>
            </motion.form>

            <motion.div variants={fadeUp} className="w-full relative z-10">
              {/* Subtle Decorative Divider */}
              <div className="flex items-center gap-4 my-8 opacity-60">
                <div className="flex-1 h-[1px] bg-slate-200"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">or</span>
                <div className="flex-1 h-[1px] bg-slate-200"></div>
              </div>

              {/* Social/Institutional Auth */}
              <button className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 transition-colors text-slate-600 font-bold uppercase tracking-widest text-xs shadow-sm hover:shadow active:scale-[0.98]">
                <span className="material-symbols-outlined text-lg text-slate-400">account_balance</span>
                Institutional Sign In
              </button>
            </motion.div>

            {/* Alternative Actions */}
            <motion.div variants={fadeUp} className="mt-8 text-center relative z-10">
              <p className="text-slate-500 text-xs font-medium tracking-wide">
                New to the library? 
                <Link to="/signup" className="text-indigo-600 font-bold ml-1 hover:underline underline-offset-4">Create an account</Link>
              </p>
            </motion.div>

          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-white border-t border-slate-100 z-10 relative text-center">
        <div className="font-serif italic text-lg text-slate-800">ScholarFlow</div>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/institutional-access" className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors">Sso Access</Link>
          <Link to="/privacy-policy" className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors">Privacy</Link>
          <Link to="/terms-of-service" className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors">Terms</Link>
        </div>
        <p className="font-sans text-[10px] uppercase font-bold tracking-widest text-slate-300">© 2024 ScholarFlow Atelier</p>
      </footer>
    </div>
  );
}
