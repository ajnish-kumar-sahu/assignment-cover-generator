import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function ResetPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password reset link has been sent to your email.');
    navigate('/login');
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col items-center justify-center overflow-hidden z-0">
      <header className="fixed top-0 w-full z-50 flex justify-center items-center px-6 py-10">
        <Logo />
      </header>

      <main className="relative z-10 w-full max-w-md px-6">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-[-1]"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary-container/10 rounded-full blur-3xl z-[-1]"></div>
        
        <section className="bg-white/70 backdrop-blur-md shadow-[0px_12px_32px_rgba(27,27,36,0.06)] rounded-xl p-10 md:p-12 relative overflow-hidden">
          <div className="mb-10 text-center">
            <h1 className="font-headline text-4xl font-semibold text-on-surface mb-4 tracking-tight">Forgot Your Key?</h1>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed max-w-[280px] mx-auto opacity-80">
              Enter your institutional email to recover access to your intellectual atelier.
            </p>
          </div>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="font-label text-xs uppercase tracking-widest text-outline font-semibold px-1" htmlFor="email">Email Address</label>
              <div className="relative">
                <input className="w-full bg-surface-container-low border-none rounded-lg py-4 px-5 text-on-surface placeholder:text-outline/50 focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 font-body text-sm" id="email" placeholder="curator@institution.edu" type="email"/>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline/40 pointer-events-none">
                  mail
                </span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-br from-[#3525cd] to-[#4f46e5] text-white py-5 rounded-xl font-label text-sm font-bold tracking-widest shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all duration-200" type="submit">
              SEND RESET LINK
            </button>
          </form>
          <div className="mt-10 pt-8 flex flex-col items-center border-t border-outline-variant/10">
            <Link to="/login" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-200">
              <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
              <span className="font-body text-sm font-medium">Back to Sign In</span>
            </Link>
          </div>
        </section>
        
        <div className="mt-12 text-center">
          <p className="font-headline italic text-on-surface-variant/40 text-lg">
            "Knowledge is the only wealth that grows when shared."
          </p>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full flex flex-col items-center justify-center gap-4 py-8 pointer-events-none z-10">
        <div className="font-inter text-xs tracking-wide uppercase opacity-30 text-indigo-900">
          © 2024 ScholarFlow Atelier. All rights reserved.
        </div>
      </footer>

      <div className="fixed inset-0 z-[-2] bg-surface">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: "radial-gradient(circle at 2px 2px, #4d44e3 1px, transparent 0)", backgroundSize: "48px 48px"}}></div>
      </div>
    </div>
  );
}
