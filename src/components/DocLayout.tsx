import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import Breadcrumb from './Breadcrumb';

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

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

export default function DocLayout({ 
  title, 
  children, 
  breadcrumbs = [] 
}: { 
  title: string
  children: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MD3_THEME }} />
      <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-primary font-body min-h-screen">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-lg border-b border-outline-variant/30"
      >
        <div className="flex items-center justify-between px-8 h-16 w-full max-w-screen-2xl mx-auto">
          <Logo />
          <Link to="/" className="text-sm font-bold uppercase tracking-widest text-indigo-700 hover:text-primary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span> Return to Suite
          </Link>
        </div>
      </motion.nav>
      <main className="pt-32 pb-24 px-8 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, bounce: 0.3, duration: 0.8 }}
          >
            {breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} className="mb-8" />}
            <h1 className="font-headline text-5xl md:text-7xl text-indigo-950 mb-12 tracking-tight">{title}</h1>
            <div className="text-lg space-y-6 font-light leading-relaxed text-slate-600">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
    </>
  );
}
