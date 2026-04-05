import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';

const MD3_THEME = `
  :root {
    --color-surface-variant: #e4e1ee;
    --color-inverse-on-surface: #f3effc;
    --color-on-secondary-fixed: #00201c;
    --color-secondary-fixed: #71f8e4;
    --color-primary: #3525cd;
    --color-inverse-surface: #302f39;
    --color-secondary-fixed-dim: #4fdbc8;
    --color-secondary: #006b5f;
    --color-surface-bright: #fcf8ff;
    --color-outline: #777587;
    --color-on-background: #1b1b24;
    --color-surface-tint: #4d44e3;
    --color-on-error: #ffffff;
    --color-on-surface-variant: #464555;
    --color-on-surface: #1b1b24;
    --color-on-primary-fixed: #0f0069;
    --color-on-error-container: #93000a;
    --color-on-primary-container: #dad7ff;
    --color-surface-container-highest: #e4e1ee;
    --color-primary-container: #4f46e5;
    --color-on-primary-fixed-variant: #3323cc;
    --color-background: #fcf8ff;
    --color-surface-dim: #dcd8e5;
    --color-on-secondary-container: #006f64;
    --color-primary-fixed: #e2dfff;
    --color-tertiary-fixed: #ffddb8;
    --color-outline-variant: #c7c4d8;
    --color-on-tertiary-container: #ffd4a4;
    --color-surface-container-lowest: #ffffff;
    --color-surface-container-low: #f5f2ff;
    --color-on-tertiary-fixed: #2a1700;
    --color-surface-container: #f0ecf9;
    --color-tertiary-container: #885500;
    --color-tertiary: #684000;
    --color-on-tertiary-fixed-variant: #653e00;
    --color-on-tertiary: #ffffff;
    --color-tertiary-fixed-dim: #ffb95f;
    --color-secondary-container: #6df5e1;
    --color-error-container: #ffdad6;
    --color-on-secondary-fixed-variant: #005048;
    --color-error: #ba1a1a;
    --color-on-primary: #ffffff;
    --color-on-secondary: #ffffff;
    --color-inverse-primary: #c3c0ff;
    --color-surface-container-high: #eae6f4;
    --color-surface: #fcf8ff;
    --color-primary-fixed-dim: #c3c0ff;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }
  @keyframes float-reverse {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(20px) rotate(-2deg); }
  }
  .animate-float { animation: float 8s ease-in-out infinite; }
  .animate-float-reverse { animation: float-reverse 10s ease-in-out infinite; }
  
  .glass-card {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }
`;

export default function Landing() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MD3_THEME }} />
      <div className="bg-surface text-on-surface selection:bg-primary/20 selection:text-primary font-body min-h-screen overflow-x-hidden">
        
        {/* TopNavBar */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm py-3' : 'bg-transparent py-5'}`}>
          <div className="flex justify-between items-center px-8 w-full max-w-screen-2xl mx-auto">
            <div className="flex items-center gap-12">
              <Logo />
              <div className="hidden md:flex items-center gap-8 bg-surface-container-low/50 backdrop-blur-md px-6 py-2 rounded-full border border-outline-variant/20 shadow-inner">
                <Link className="text-slate-600 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors duration-300" to="/research">Research</Link>
                <Link className="text-slate-600 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors duration-300" to="/archive">Archive</Link>
                <Link className="text-slate-600 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors duration-300" to="/curations">Curations</Link>
                <Link className="text-slate-600 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors duration-300" to="/library">Library</Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-600 font-medium px-4 py-2 hover:bg-slate-100/50 transition-colors rounded-xl text-sm hidden sm:block">Login</Link>
              <Link to="/signup" className="bg-primary text-white px-5 py-2 rounded-full font-bold text-xs tracking-widest uppercase shadow-md hover:bg-primary/90 transition-all hover:scale-95 hidden sm:block">Sign Up</Link>
              <div className="w-[1px] h-6 bg-slate-200 mx-2 hidden sm:block"></div>
              <Link to="/notifications" className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-primary/10 rounded-full transition-all">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </Link>
              <Link to="/settings" className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-primary hover:bg-primary/10 rounded-full transition-all">
                <span className="material-symbols-outlined text-[20px]">settings</span>
              </Link>
              <Link to="/profile" className="ml-2 w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/20 hover:ring-primary transition-all shadow-md group">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="User profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeEb7-iC2xggfY6QHVJ5exOU1wWQy6LkxVYamH2VZGVr4g8N0LCmSd1vOOQkRrM_srOb9Pz2NlcN_Ma9SP2R8sd4hN5-DZk7VROvzCXrk_RhQF0hiVeUxay42_XDuZkZmzuxR9rC19UEJS7daiYIbzdTMt3SL8D0tgQAcgyKEC341Tliy-sUZD_R4T7lNSStfvv0_NKfNoUDk2sB3SjSGFhQnteXzwSkgAtmuFu95Nofg9_ONGgmTQVvie7M5hPYaa1ibl03A-P-U"/>
              </Link>
            </div>
          </div>
        </nav>

        <main className="pt-20">
          {/* Enhanced Hero Section */}
          <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 px-8 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
              <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-secondary-container/10 rounded-full blur-3xl animate-float"></div>
              <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-tertiary-fixed-dim/20 to-primary/10 rounded-full blur-3xl animate-float-reverse"></div>
              <div className="absolute top-[40%] left-[30%] w-[800px] h-[800px] bg-white/40 rounded-full blur-3xl mix-blend-overlay"></div>
            </div>

            <div className="max-w-screen-2xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10 items-center">
              
              <div className="col-span-1 lg:col-span-6 flex flex-col justify-center text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-primary/10 shadow-sm backdrop-blur-md w-max mb-8 animate-[fadeIn_1s_ease-out]">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px]">The Curator's Workspace</span>
                </div>
                
                <h1 className="font-headline text-6xl md:text-7xl xl:text-8xl text-indigo-950 leading-[1.05] tracking-tight mb-8">
                  Create, Design, <br/>
                  <span className="italic text-primary relative">
                    Impress.
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-transparent rounded-full"></span>
                  </span>
                </h1>
                
                <p className="text-on-surface-variant text-lg md:text-xl xl:text-2xl max-w-xl mb-12 font-light leading-relaxed">
                  Elevate your academic presence with an editorial-first suite designed for the modern researcher. Where rigorous thought meets sophisticated aesthetic.
                </p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <Link to="/signup" className="group relative px-8 py-5 bg-indigo-950 text-white rounded-2xl font-bold tracking-widest text-xs uppercase overflow-hidden shadow-2xl shadow-indigo-900/30 hover:shadow-indigo-900/50 hover:-translate-y-1 transition-all duration-300">
                    <span className="relative z-10 flex items-center gap-3">
                      Launch Suite <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Link>
                  <Link to="/curations" className="px-8 py-5 text-indigo-950 rounded-2xl font-bold tracking-widest text-xs uppercase hover:bg-indigo-900/5 transition-colors border border-transparent hover:border-indigo-900/10">
                    Explore Curations
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 flex items-center gap-6 opacity-60">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Trusted by Scholars At</p>
                  <div className="flex gap-8 items-center grayscale">
                     <span className="font-headline italic text-xl font-bold">Oxford</span>
                     <span className="font-headline italic text-xl font-bold">Stanford</span>
                     <span className="font-headline italic text-xl font-bold">MIT</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:block col-span-1 lg:col-span-6 relative perspective-[1000px]">
                {/* Floating Preview Card Component */}
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-900/20 animate-float border-[8px] border-white/50 backdrop-blur-sm group">
                  <img className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Minimalist desk setup with lamp and books" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYAOSQJVsafpee_IOKvb9acNhzznJccFFaKPGuk5hkObV3KChExQaRyjOqHveWySiTJQ5C5b9xEcczm3sWZmSL2YQwBTkFTlVYAatmwez_OktrxgucUzqK9BSj8NZ1INEiztCXd0Fl11RGrvtpfjqFd7LN9vumbgGx4wWta1yocfe8A1R50WboUzBGI7gVU8SQntvBgZMwGmZIFWYpcfwmZBXBSeiunaGbWe9OZH6l5cgFYdzvwc9CMgaBFZl-V5F0ubM5p8pskv4"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent"></div>
                  
                  {/* Glass Panel overlay */}
                  <div className="absolute bottom-10 left-10 right-10 glass-card p-8 rounded-2xl transform translate-y-4 group-hover:translate-y-0 opacity-90 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-headline italic text-indigo-950 text-xl md:text-2xl leading-relaxed">"ScholarFlow transformed how I present my PhD research—it finally looks as professional as it feels."</p>
                    <div className="flex items-center gap-4 mt-6">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-serif italic text-lg shadow-inner">H</div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-950">Dr. Helena Vance</p>
                        <p className="text-[10px] uppercase tracking-widest text-slate-600">Cambridge Archive</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Side UI components simulating the editor */}
                <div className="absolute top-20 -right-12 glass-card rounded-xl p-4 shadow-xl animate-float-reverse hidden xl:flex flex-col gap-3">
                   <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[16px]">draw</span></span><div className="w-24 h-2 bg-slate-200 rounded-full"></div></div>
                   <div className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary"><span className="material-symbols-outlined text-[16px]">title</span></span><div className="w-16 h-2 bg-slate-200 rounded-full"></div></div>
                </div>
              </div>

            </div>
          </section>

          {/* Curated Craftsmanship Grid */}
          <section id="features" className="py-32 px-8 bg-white relative">
            <div className="max-w-screen-2xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                <div className="max-w-3xl">
                  <h2 className="font-headline text-5xl md:text-6xl text-indigo-950 mb-6 tracking-tight">Curated Craftsmanship</h2>
                  <p className="text-on-surface-variant text-xl leading-relaxed font-light">Precision tools for the intellectual elite. Each component is meticulously engineered to ensure your research is presented with clinical clarity and aesthetic grace.</p>
                </div>
                <div className="flex gap-4">
                  <button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-slate-100 text-slate-400 hover:border-primary hover:text-primary transition-all hover:shadow-lg hover:-translate-y-1">
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                  <button className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-slate-100 text-slate-400 hover:border-primary hover:text-primary transition-all hover:shadow-lg hover:-translate-y-1">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
                {/* Tool 1 */}
                <div className="md:col-span-7 group relative bg-surface-container-low rounded-[2rem] overflow-hidden p-12 flex flex-col justify-between min-h-[600px] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 border border-outline-variant/10">
                  <div className="relative z-10 w-full mb-12">
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold text-[10px] uppercase tracking-[0.2em] rounded-full mb-6 relative hover:scale-105 transition-transform cursor-default">Aesthetics Engine</span>
                    <h3 className="font-headline text-4xl text-indigo-950 mb-6 leading-tight">Assignment Cover Generator</h3>
                    <p className="text-on-surface-variant text-lg max-w-md font-light">Create stunning, standardized cover sheets that command respect before the first page is even turned. Features auto-scaling responsive exporting.</p>
                  </div>
                  
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                    <img className="w-full h-full object-cover" alt="Document cover preview generation" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSlNvH0RBHb2W26b_4ZZ5UpM_AvLCJs18ZPZ-XM6fzDJSnvzym7WIf1zu6I5Fru0jwuxe852uh8wFseuGU6yX23gWlTS3FVdFgJIelN0XMs2SyO41X5p01RnSkMcwmhagcnufT9E7f2-IxQ-RNtTlp9GSQt8AtDq39tU5hQLy2g6TmkJu2341YLiZcCzCsKMhPHoQwmudG4HDqqSntsSdjP4IILD7xMthQ90ZtafH5dSdAv3hRIHe3VpgNuloRVbxI_HFQtfLbvVA"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <Link to="/cover-generator" className="absolute top-12 right-12 w-16 h-16 bg-white shadow-xl text-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 -rotate-45 group-hover:rotate-0 transition-all duration-500 z-20 hover:scale-110 hover:bg-primary hover:text-white">
                    <span className="material-symbols-outlined text-[28px]">arrow_forward</span>
                  </Link>
                </div>

                {/* Tool 2 */}
                <div className="md:col-span-5 group relative bg-surface-container-low rounded-[2rem] overflow-hidden p-12 flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-tertiary/10 hover:-translate-y-2 border border-outline-variant/10">
                  <div className="mb-12 relative z-10 w-full">
                    <span className="inline-block px-4 py-2 bg-tertiary-container/20 text-tertiary-container font-bold text-[10px] uppercase tracking-[0.2em] rounded-full mb-6">Structural Organization</span>
                    <h3 className="font-headline text-4xl text-indigo-950 mb-6 leading-tight">Manuscript Index Designer</h3>
                    <p className="text-on-surface-variant text-lg font-light">Transform chaotic bibliographies into structured, navigable masterpieces of academic lineage.</p>
                  </div>
                  
                  <div className="flex-grow flex items-center justify-center relative z-10 p-8 glass-card rounded-2xl border border-white mt-auto transform group-hover:scale-[1.03] transition-transform duration-500">
                    <div className="grid grid-cols-3 gap-3 w-full">
                      <div className="h-24 bg-white rounded-xl shadow-sm"></div>
                      <div className="h-24 bg-tertiary-container/30 rounded-xl shadow-inner border border-tertiary-container/20"></div>
                      <div className="h-24 bg-white rounded-xl shadow-sm"></div>
                      <div className="h-24 bg-white rounded-xl shadow-sm"></div>
                      <div className="h-24 bg-white rounded-xl shadow-sm"></div>
                      <div className="h-24 bg-white rounded-xl shadow-sm"></div>
                    </div>
                  </div>
                  
                  <Link to="/index-designer" className="mt-10 flex items-center gap-4 text-indigo-950 font-bold tracking-widest uppercase text-[11px] group-hover:text-tertiary-container transition-colors relative z-20 w-max pb-1 border-b-2 border-transparent group-hover:border-tertiary-container">
                    Launch Index Tool
                    <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-2">trending_flat</span>
                  </Link>
                  <Link to="/index-designer" className="absolute inset-0 z-10" aria-label="Index Page Designer"></Link>
                </div>
              </div>
            </div>
          </section>

          {/* New Section: The Template Gallery */}
          <section className="py-32 px-8 bg-slate-50 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
                <span className="material-symbols-outlined text-[30rem] absolute -top-20 -left-20">grid_view</span>
             </div>
             
             <div className="max-w-screen-2xl mx-auto relative z-10">
                <div className="text-center mb-20">
                   <h2 className="font-headline text-5xl md:text-7xl text-indigo-950 mb-6 tracking-tight">The Template Collection</h2>
                   <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                      A visual directory of our most celebrated academic layouts, engineered for prestigious institutional presentation.
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   <motion.div 
                     whileHover={{ y: -10 }}
                     className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-white"
                   >
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSlNvH0RBHb2W26b_4ZZ5UpM_AvLCJs18ZPZ-XM6fzDJSnvzym7WIf1zu6I5Fru0jwuxe852uh8wFseuGU6yX23gWlTS3FVdFgJIelN0XMs2SyO41X5p01RnSkMcwmhagcnufT9E7f2-IxQ-RNtTlp9GSQt8AtDq39tU5hQLy2g6TmkJu2341YLiZcCzCsKMhPHoQwmudG4HDqqSntsSdjP4IILD7xMthQ90ZtafH5dSdAv3hRIHe3VpgNuloRVbxI_HFQtfLbvVA" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Oxford Modernist" />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent p-8 flex flex-col justify-end">
                         <h4 className="text-white font-headline text-2xl mb-1">Oxford Modernist</h4>
                         <span className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">Humanities</span>
                      </div>
                   </motion.div>

                   <motion.div 
                     whileHover={{ y: -10 }}
                     className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-white lg:translate-y-12"
                   >
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYAOSQJVsafpee_IOKvb9acNhzznJccFFaKPGuk5hkObV3KChExQaRyjOqHveWySiTJQ5C5b9xEcczm3sWZmSL2YQwBTkFTlVYAatmwez_OktrxgucUzqK9BSj8NZ1INEiztCXd0Fl11RGrvtpfjqFd7LN9vumbgGx4wWta1yocfe8A1R50WboUzBGI7gVU8SQntvBgZMwGmZIFWYpcfwmZBXBSeiunaGbWe9OZH6l5cgFYdzvwc9CMgaBFZl-V5F0ubM5p8pskv4" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Stanford Data" />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent p-8 flex flex-col justify-end">
                         <h4 className="text-white font-headline text-2xl mb-1">Stanford Quantitative</h4>
                         <span className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">Data Science</span>
                      </div>
                   </motion.div>

                   <motion.div 
                     whileHover={{ y: -10 }}
                     className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-white"
                   >
                      <div className="absolute inset-0 bg-indigo-900/10 border-indigo-700/10 p-8 flex items-center justify-center">
                         <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8JO7khoKCSpi_-4SZmscZ1Vm6Qirz66-Wk4Cry-o2NQR44wMHsTiDkC4zkyGsR10GnbPW1jbkZyi6jJc0JlYZzck4mi8nZMogheBSrQgqgUxs7okNA2AbBDolL3ozT5V0_cDWJIF8euV1GwOy5UYP7JriD6e8CJoc4dcv6dNBeFgLGxURvQ7pMONnLLewSE-lvBM7D8UJkBntQgRfbTECBbeAsLbj5G0CqT6CdpQ1OU9P_Sz6OeuE5DL_AT1cA3bKS45i2zVl6F0" className="w-32 h-32 opacity-80 mix-blend-multiply group-hover:scale-110 transition-transform" alt="Manuscript Index" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent p-8 flex flex-col justify-end">
                         <h4 className="text-white font-headline text-2xl mb-1">Manuscript Index</h4>
                         <span className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">Bibliographies</span>
                      </div>
                   </motion.div>

                   <motion.div 
                     whileHover={{ y: -10 }}
                     className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl border border-white lg:translate-y-12"
                   >
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAya7z3veaff9rsnaiCHCKX25QsHh9n8T6mzZMfrBA88XJiTrllbScsp1bOaOXv09JkDnDK0axtYJvIg7671usIT3y8ZaRuSqUfpDUSQSM_MLE-VTXpDk0ms0iMoZ_wpZcbxSx8BpIpKW3q2Q0BL6-8ePg4pCk_JlS8k6kAn8uMjkLAO28vPzKORnKDhgfcsrnW3P1EixgUqqbtBowPqCXWqSpi75CZVTN4cXDIDQf3TZSuhDovVHdiUxaQScBOWy7qKzPNGRSL9M" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Atelier Library" />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-transparent to-transparent p-8 flex flex-col justify-end">
                         <h4 className="text-white font-headline text-2xl mb-1">Institutional Seal</h4>
                         <span className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">Branding</span>
                      </div>
                   </motion.div>
                </div>

                <div className="mt-24 text-center">
                   <Link to="/templates" className="inline-flex items-center gap-4 text-indigo-950 font-bold uppercase tracking-[0.3em] text-[11px] group">
                      View Full Design Gallery
                      <span className="w-12 h-px bg-indigo-950 group-hover:w-24 transition-all duration-500"></span>
                      <span className="material-symbols-outlined group-hover:translate-x-4 transition-transform">arrow_right_alt</span>
                   </Link>
                </div>
             </div>
          </section>

          {/* Enhanced Testimonials */}
          <section className="py-32 px-8 overflow-hidden relative bg-surface-container-lowest">
            <div className="max-w-screen-2xl mx-auto">
              <div className="text-center mb-24 relative">
                <h2 className="font-headline text-5xl md:text-6xl text-indigo-950 mb-6">Voice of the Academy</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                {[
                  {
                    quote: "The typography control is unparalleled. My research finally has the visual weight it deserves. A masterclass in tool design.",
                    name: "Prof. Sarah Chen",
                    role: "Digital Humanities, Stanford",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7RkGRixvhMoytMZj79yijs_41r1IZwQWwTsn_pFIE2tXga0wKXExu_pCTfdX0OyqFAIwdQxJCprszg07WqxdXq2ONGnlaTuHo_WZEzirZa3FBKWHfqueTuPSCt2Igi9RoK_AulF88djQfISQ-2LqREpEELL6v9dBK2jp_LiKPifnwtBjv-8Fe69DVo6NqzAvL971RmFD8ODSoX8_nIyAJnHRP0xfefAjL2onXoJh3YXIKTsc1rfzy_DQn3yEqqbMfSEOWwycahJY"
                  },
                  {
                    quote: "An essential tool for anyone serious about intellectual branding in the digital age. It scales perfectly to printed distributions.",
                    name: "Julian Aris",
                    role: "Senior Research Fellow, MIT",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPwRD6OLoX-Vb9nCp7eRt0UIx-dAtiktemA0WjKNU8FUd3xEQtifEGQGM3PLCs79-gNala4a2y8QiP1kkY-RwsTHMPpAs9mxWrwxeEWOAMCKQSAJGlnADoT5JLUd9pLaNr5kFHkIxMNM5vYClMv4hsHm6KxhND8-nbhvBJNFvje_g0o2tREl3M5yZ7jBaNkTdBVx8HQ-pT9wkQD0CtB7ZBGvLdr5y1hf-2hmOn0ns0RAA2aryrz0F1yZ9UgEB-DVGlc-klwX7dUJE"
                  },
                  {
                    quote: "The glassmorphic UI is a complete paradigm shift compared to typical clunky and uninspired academic management software.",
                    name: "Dr. Elena Rossi",
                    role: "Director of Archive, Oxford",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDk3SGSA0J_H2THUZUZEJ_uztvj6Cy51GaeVgTUSXH1tidNv6-Xzfnyt897NkOksuPWnd00txhyWNHOEnZcFTgwy0EKbPIh40H26n-pgIqohvR7ACDqRrv0UidZKRDpqVoQSzy03VaWFUQU-QsBuQO4UaTM-i4EesntOG7rIan6k27G3V10TOLcKOer0aFCtmZ4FmtlgFLpEcz_FfWopHB7l1OL2YJCVcJO3AU0kVoD9-gWCMJQBp00I6Fyx-cJN-S3YG3zH7rYjM"
                  }
                ].map((testimonial, idx) => (
                  <div key={idx} className="relative group p-10 rounded-[2rem] bg-white border border-slate-100 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                    <span className="text-8xl font-headline text-primary/5 absolute -top-4 -left-2 group-hover:text-primary/10 transition-colors">“</span>
                    <p className="font-headline text-xl lg:text-2xl italic text-slate-700 mb-10 leading-relaxed relative z-10 font-medium">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-5 border-t border-slate-100 pt-6">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 shrink-0 ring-4 ring-white shadow-md">
                        <img className="w-full h-full object-cover" alt="Portrait" src={testimonial.img}/>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-950">{testimonial.name}</p>
                        <p className="text-[11px] text-slate-500 mt-1">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Premium CTA Section */}
          <section className="py-32 px-8 relative mb-12">
            <div className="absolute inset-0 bg-surface z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-primary/20 via-tertiary-container/10 to-transparent rounded-full blur-[100px] z-0 animate-pulse"></div>
            
            <div className="max-w-5xl mx-auto glass-card rounded-[3rem] p-16 md:p-24 text-center border-2 border-white/60 shadow-2xl relative z-10 overflow-hidden transform hover:scale-[1.01] transition-transform duration-700">
              <div className="relative z-10">
                <span className="inline-block px-6 py-2 bg-white/50 text-indigo-950 font-bold text-[10px] uppercase tracking-[0.3em] rounded-full mb-8 shadow-sm backdrop-blur-md">Start Creating</span>
                <h2 className="font-headline text-5xl md:text-7xl text-indigo-950 mb-8 leading-tight tracking-tight">Ready to redefine your <br/><span className="italic text-primary">academic presence?</span></h2>
                <p className="text-slate-600 text-lg md:text-xl xl:text-2xl mb-12 max-w-2xl mx-auto font-light">
                  Join over 50,000 elite scholars who use ScholarFlow to curate their intellectual journey globally.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link to="/signup" className="group w-full sm:w-auto px-12 py-6 bg-indigo-950 text-white rounded-2xl font-bold tracking-widest text-xs uppercase shadow-xl shadow-indigo-950/20 hover:shadow-indigo-950/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                    Launch Editor Suite
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">rocket_launch</span>
                  </Link>
                  <a href="#features" className="w-full sm:w-auto px-12 py-6 glass-card text-indigo-950 rounded-2xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-3 hover:bg-white/60 transition-colors">
                    Explore Features 
                    <span className="material-symbols-outlined text-[18px]">south</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-slate-200/50 bg-white relative z-20">
          <div className="flex flex-col md:flex-row justify-between items-center px-12 py-16 w-full max-w-screen-2xl mx-auto">
            <div className="mb-10 md:mb-0 text-center md:text-left">
              <span className="text-2xl font-headline italic text-indigo-950 font-semibold tracking-tight">ScholarFlow</span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-2 font-bold">The Intellectual Atelier</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10 mb-10 md:mb-0">
              <Link className="text-slate-500 text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors hover:-translate-y-0.5 transform inline-block" to="/privacy-policy">Privacy</Link>
              <Link className="text-slate-500 text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors hover:-translate-y-0.5 transform inline-block" to="/terms-of-service">Terms</Link>
              <Link className="text-slate-500 text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors hover:-translate-y-0.5 transform inline-block" to="/contact-support">Contact</Link>
              <Link className="text-slate-500 text-[11px] font-bold uppercase tracking-widest hover:text-primary transition-colors hover:-translate-y-0.5 transform inline-block" to="/journal-guidelines">Guidelines</Link>
            </div>
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.1em] text-center md:text-right">
              © 2024 ScholarFlow. <br/> Engineered by <Link to="/developer" className="underline underline-offset-4 text-slate-500 hover:text-primary transition-colors font-bold">Ajnish</Link>.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
