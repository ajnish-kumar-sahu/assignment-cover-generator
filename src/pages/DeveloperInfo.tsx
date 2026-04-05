import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
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
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
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

export default function DeveloperInfo() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MD3_THEME }} />
      <div className="bg-surface font-body text-on-surface selection:bg-primary-fixed-dim selection:text-on-primary-fixed min-h-screen relative overflow-hidden">
        {/* Dynamic ambient cursor glow */}
        <motion.div
          animate={{ x: mousePosition.x - 400, y: mousePosition.y - 400 }}
          transition={{ type: "tween", ease: "backOut", duration: 1.5 }}
          className="pointer-events-none fixed left-0 top-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] z-0"
        />

        <style dangerouslySetInnerHTML={{ __html: `
          .glass-panel {
              backdrop-filter: blur(16px);
              background-color: rgba(252, 248, 255, 0.7);
          }
          .premium-gradient {
              background: linear-gradient(135deg, #3525cd 0%, #4f46e5 100%);
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s infinite ease-in-out;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
        ` }} />

        {/* TopNavBar */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.1)]"
        >
          <div className="flex justify-between items-center w-full px-8 py-3 max-w-7xl mx-auto">
            <Logo />
            <div className="hidden md:flex gap-10 items-center">
              <a className="text-indigo-700 font-bold border-b-2 border-indigo-500 pb-1 text-[10px] tracking-widest uppercase hover:text-indigo-500 transition-colors" href="#dossier">Dossier</a>
              <Link className="text-slate-500 font-bold hover:text-indigo-600 transition-colors duration-300 text-[10px] tracking-widest uppercase" to="/cover-generator">Tools</Link>
              <a className="text-slate-500 font-bold hover:text-indigo-600 transition-colors duration-300 text-[10px] tracking-widest uppercase" href="#projects">Projects</a>
              <a className="text-slate-500 font-bold hover:text-indigo-600 transition-colors duration-300 text-[10px] tracking-widest uppercase" href="#contact">Contact</a>
              <motion.a 
                href="mailto:ajnishkumar7070@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="premium-gradient text-white px-6 py-2.5 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-shadow"
              >
                Assemble Team
              </motion.a>
            </div>
          </div>
          {/* Scroll Progress Bar */}
          <motion.div className="h-[2px] bg-primary origin-left" style={{ scaleX: scrollYProgress }} />
        </motion.nav>

        <main className="pt-32 shrink-0 overflow-x-hidden relative z-10">
          {/* Hero Section */}
          <motion.section 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-7xl mx-auto px-8 pb-20 lg:pb-32 grid lg:grid-cols-12 gap-16 items-center"
          >
            <div className="lg:col-span-7 space-y-10 relative">
              {/* Status Badge */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white text-indigo-700 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-100/50 border border-slate-100/80 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                Available For Opportunities
              </motion.div>

              {/* Headings */}
              <div className="space-y-4">
                <motion.h1 variants={itemVariants} className="font-headline text-6xl lg:text-8xl leading-[1.1] text-indigo-950 font-bold tracking-tighter mix-blend-multiply">
                  Ajnish <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500">Kumar</span>
                </motion.h1>
                <motion.h2 variants={itemVariants} className="text-slate-400 text-3xl lg:text-4xl font-light tracking-tight">
                  Crafting the Future of <br className="hidden lg:block"/> <span className="font-medium text-slate-500">Scholarly Tech.</span>
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p variants={itemVariants} className="text-lg text-slate-500 leading-relaxed max-w-xl font-light">
                A driven BCA student and Full-Stack Architect with a genuine passion for programming. I specialize in building state-of-the-art web applications that blend powerful engineering with breathtaking aesthetics.
              </motion.p>
              
              {/* Call to Actions */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-5 pt-4 items-center">
                <a href="mailto:ajnishkumar7070@gmail.com" className="premium-gradient text-white px-8 py-4 rounded-2xl text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-3 shadow-2xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1 transition-all">
                  Contact Me
                  <span className="material-symbols-outlined text-sm bg-white/20 p-1.5 rounded-full backdrop-blur-sm">mail</span>
                </a>
                
                <div className="flex gap-4 items-center px-6 py-2 bg-white/80 backdrop-blur rounded-2xl border border-white shadow-lg shadow-slate-200/50">
                   <a href="https://linkedin.com/in/ajnish-kumar-20ag" target="_blank" rel="noopener noreferrer" className="p-2 text-indigo-900/50 hover:text-indigo-600 hover:-translate-y-1 transition-all" aria-label="LinkedIn">
                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                   </a>
                   <a href="https://github.com/ajnish-kumar-sahu" target="_blank" rel="noopener noreferrer" className="p-2 text-indigo-900/50 hover:text-indigo-600 hover:-translate-y-1 transition-all" aria-label="GitHub">
                     <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                   </a>
                   <a href="https://ajnish.in/" target="_blank" rel="noopener noreferrer" className="p-2 text-indigo-900/50 hover:text-indigo-600 hover:-translate-y-1 transition-all" aria-label="Portfolio">
                     <span className="material-symbols-outlined text-xl">language</span>
                   </a>
                   <div className="w-[2px] h-6 bg-slate-100 mx-1"></div>
                   <div className="flex flex-col ml-2 py-2">
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-0.5">Location</span>
                     <span className="text-[11px] font-bold text-indigo-900">Chatra, Jharkhand</span>
                   </div>
                </div>
              </motion.div>
            </div>

            <motion.div style={{ opacity, y }} className="lg:col-span-5 relative h-[600px] flex items-center justify-center">
              {/* Premium Image Container */}
              <div className="relative w-[320px] lg:w-[400px] aspect-[4/5] rounded-[3rem] overflow-hidden bg-white shadow-[0_20px_50px_-15px_rgba(53,37,205,0.4)] z-20 border-[8px] border-white group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-700"></div>
                <img alt="Ajnish Kumar" className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" src="/profile.jpg" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Established</p>
                    <p className="text-sm font-bold text-slate-900">2026 Expectant</p>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Elements */}
              <motion.div 
                animate={{ y: [-15, 15, -15], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -right-4 lg:-right-12 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white z-30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                    <span className="material-symbols-outlined">codeblocks</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-800 tracking-tight">10+</p>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Tech Skills</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [15, -15, 15], rotate: [0, -5, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-6 lg:-left-16 bg-white/80 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white z-30"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-800 tracking-tight">500+</p>
                    <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400">Hours Coded</p>
                  </div>
                </div>
              </motion.div>

              {/* Ambient Blurs */}
              <div className="absolute top-1/4 -right-20 w-64 h-64 bg-indigo-400 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
              <div className="absolute bottom-1/4 -left-20 w-64 h-64 bg-emerald-400 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
            </motion.div>
          </motion.section>

          {/* Education & Skills */}
          <section className="py-32 bg-slate-50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-20">
                {/* Education */}
                <div id="dossier" className="space-y-12">
                  <div className="space-y-4">
                    <h2 className="font-headline text-4xl font-bold text-slate-800 italic">Academic Journey</h2>
                    <div className="w-20 h-1 bg-indigo-600 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-10">
                    <div className="relative pl-8 border-l-2 border-slate-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-sm"></div>
                      <h4 className="text-xl font-bold text-slate-800">Vinoba Bhave University</h4>
                      <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mt-1">BCA | 2023 – 2026</p>
                      <ul className="mt-4 space-y-2 text-slate-500 font-light text-sm italic">
                        <li>• Focusing on Computer Programming and Application Development</li>
                        <li>• Data Structures, Algorithms, Database Management</li>
                      </ul>
                    </div>

                    <div className="relative pl-8 border-l-2 border-slate-200">
                      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-300 shadow-sm"></div>
                      <h4 className="text-xl font-bold text-slate-800">Hindu +2 High School</h4>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Intermediate Science | 2020 – 2022</p>
                      <p className="mt-2 text-slate-500 font-light text-sm italic">Hazaribagh, Jharkhand</p>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-12">
                   <div className="space-y-4">
                    <h2 className="font-headline text-4xl font-bold text-slate-800 italic">Technical Arsenal</h2>
                    <div className="w-20 h-1 bg-emerald-500 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: 'Languages', items: ['C', 'C++', 'Java', 'JavaScript'], icon: 'code' },
                      { title: 'Frameworks', items: ['React.js', 'Tailwind CSS', 'Framer Motion'], icon: 'layers' },
                      { title: 'Web Tech', items: ['Responsive Design', 'Front-end Dev', 'Modern UI'], icon: 'web' },
                      { title: 'Tools', items: ['Git/GitHub', 'VS Code', 'Chrome DevTools'], icon: 'construction' }
                    ].map((skill) => (
                      <motion.div 
                        whileHover={{ y: -5 }}
                        key={skill.title} 
                        className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="material-symbols-outlined text-indigo-500 bg-indigo-50 p-2 rounded-lg">{skill.icon}</span>
                          <h5 className="font-bold text-slate-800 text-sm uppercase tracking-widest">{skill.title}</h5>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {skill.items.map(item => (
                            <span key={item} className="px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold border border-slate-100 capitalize">{item}</span>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Collection */}
          <section id="projects" className="py-32 max-w-7xl mx-auto px-8 relative z-10">
            <div className="text-center space-y-6 mb-24">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-headline text-5xl font-bold text-indigo-950 italic"
              >
                Innovation Laboratory
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 font-light max-w-2xl mx-auto text-lg leading-relaxed"
              >
                A showcase of architected solutions spanning full-stack web environments and high-performance desktop systems.
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { 
                  name: 'ScholarFlow Portfolio', 
                  type: 'Full-Stack Web', 
                  desc: 'A high-performance portfolio with smooth GSAP/Framer animations and dark mode synchronization.',
                  tech: ['React.js', 'Tailwind', 'Framer Motion'],
                  year: '2025'
                },
                { 
                  name: 'Assignment Generator', 
                  type: 'Productivity Tool', 
                  desc: 'Automated document engineering for academic standards with live template synchronization.',
                  tech: ['JavaScript', 'DOM API', 'HTML/CSS'],
                  year: '2024'
                },
                { 
                  name: 'Inventory Matrix', 
                  type: 'Desktop App', 
                  desc: 'Advanced C++ system utilizing OOP patterns for local item management and data persistence.',
                  tech: ['C++', 'File Handling', 'Data Structures'],
                  year: '2023'
                }
              ].map((project, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  key={project.name}
                  className="group relative bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-950/5 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-8">
                        <span className="px-4 py-1.5 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">{project.year}</span>
                        <div className="text-slate-200 group-hover:text-indigo-100 transition-colors font-serif italic text-4xl">0{idx + 1}</div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-4">{project.name}</h3>
                      <p className="text-slate-500 font-light text-sm leading-relaxed mb-8 italic">"{project.desc}"</p>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map(t => (
                          <span key={t} className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t}</span>
                        ))}
                      </div>
                      <button className="w-full py-4 border border-indigo-100 text-indigo-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                        View Blueprint
                      </button>
                    </div>
                  </div>
                  {/* Decorative background element */}
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-50/30 rounded-full blur-3xl scale-0 group-hover:scale-150 transition-transform duration-1000"></div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Final Section */}
          <section id="contact" className="py-32 px-8 relative z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 pointer-events-none"></div>
            <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
               <motion.div 
                 animate={{ rotate: [0, 10, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)] border-4 border-indigo-200"
               >
                 <span className="material-symbols-outlined text-white text-3xl">handshake</span>
               </motion.div>
               <h2 className="font-headline text-5xl lg:text-7xl font-bold text-indigo-950 italic tracking-tight">Let's build something <br className="hidden lg:block"/> <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500">exceptional.</span></h2>
               <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
                 Currently open for internships, collaborative projects, or innovative institutional inquiries. Reach out to discuss how we can engineer the future together.
               </p>
               <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                 <motion.a 
                   whileHover={{ scale: 1.05 }}
                   href="mailto:ajnishkumar7070@gmail.com" 
                   className="px-10 py-5 bg-indigo-950 text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-2xl shadow-indigo-950/20 hover:bg-primary transition-colors flex items-center justify-center gap-3 group"
                 >
                   Direct Mail <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</span>
                 </motion.a>
                 <div className="px-10 py-5 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] text-slate-800 flex items-center justify-center gap-3 shadow-lg shadow-slate-200/50">
                   Jharkhand, India <span className="material-symbols-outlined text-sm text-emerald-500 animate-pulse">my_location</span>
                 </div>
               </div>
            </div>
          </section>
        </main>

        <footer className="py-20 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                 <img src="/logo.png" alt="ScholarFlow" className="w-8 h-8 opacity-40 grayscale" />
                 <span className="font-headline italic text-2xl text-slate-300">ScholarFlow</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">© 2025 <a href="https://ajnish.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-indigo-400">Ajnish Kumar</a> | Engineered for Intellect</p>
            </div>

            <div className="flex gap-8">
              <a href="https://github.com" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://linkedin.com/in/ajnishkumar-20ag" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
