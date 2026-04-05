import DocLayout from '../components/DocLayout';
import { motion } from 'framer-motion';

const MD3_COLORS = [
  { name: 'Primary', cls: 'bg-primary', hex: '#3525CD' },
  { name: 'Primary Container', cls: 'bg-primary-container', hex: '#4F46E5' },
  { name: 'On Primary', cls: 'bg-on-primary border border-slate-200', hex: '#FFFFFF' },
  { name: 'Secondary', cls: 'bg-secondary', hex: '#006B5F' },
  { name: 'Secondary Container', cls: 'bg-secondary-container', hex: '#6DF5E1' },
  { name: 'Tertiary', cls: 'bg-tertiary', hex: '#684000' },
  { name: 'Tertiary Container', cls: 'bg-tertiary-container', hex: '#885500' },
  { name: 'Surface', cls: 'bg-surface border border-slate-200', hex: '#FCF8FF' },
  { name: 'Surface Variant', cls: 'bg-surface-variant', hex: '#E4E1EE' },
  { name: 'Surface Container', cls: 'bg-surface-container', hex: '#F0ECF9' },
  { name: 'Background', cls: 'bg-background border border-slate-200', hex: '#FCF8FF' },
  { name: 'On Surface', cls: 'bg-on-surface', hex: '#1B1B24' },
  { name: 'On Surface Variant', cls: 'bg-on-surface-variant', hex: '#464555' },
  { name: 'Outline', cls: 'bg-outline', hex: '#777587' },
  { name: 'Outline Variant', cls: 'bg-outline-variant', hex: '#C7C4D8' },
  { name: 'Error', cls: 'bg-error', hex: '#BA1A1A' },
];

const SPACING = [1, 2, 3, 4, 6, 8, 10, 12, 16, 20];
const RADII = [
  { label: 'sm', cls: 'rounded-sm' },
  { label: 'md', cls: 'rounded-md' },
  { label: 'lg', cls: 'rounded-lg' },
  { label: 'xl', cls: 'rounded-xl' },
  { label: '2xl', cls: 'rounded-2xl' },
  { label: '3xl', cls: 'rounded-3xl' },
  { label: 'full', cls: 'rounded-full' },
];
const SHADOWS = [
  { label: 'sm', cls: 'shadow-sm' },
  { label: 'md', cls: 'shadow-md' },
  { label: 'lg', cls: 'shadow-lg' },
  { label: 'xl', cls: 'shadow-xl' },
  { label: '2xl', cls: 'shadow-2xl' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.4 } },
};

export default function StyleGuide() {
  return (
    <DocLayout title="Style Guide">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl text-slate-500 mb-12 mt-[-2rem] font-light"
      >
        Typography, Colors, Spacing, and Component Logic for Academic Papers.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-16"
      >
        {/* ─── Design Philosophy ─── */}
        <motion.section variants={itemVariants}>
          <h3 className="text-3xl font-headline text-indigo-950 border-b border-indigo-100 pb-3 mb-6">Design Philosophy</h3>
          <p className="text-slate-600 leading-relaxed font-body text-lg max-w-3xl">
            ScholarFlow was built upon the principles of editorial clarity. Modern academic evaluation requires cognitive ease—the evaluator must grasp the structural metadata of a submission instantly. No distractions, pure typography.
          </p>
        </motion.section>

        {/* ─── Typography ─── */}
        <motion.section variants={itemVariants}>
          <h3 className="font-headline text-2xl text-slate-900 border-b border-slate-100 pb-3 mb-8">Typography</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-10 border border-slate-100 rounded-3xl shadow-sm group hover:shadow-md transition-shadow">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/60 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">match_case</span> Headline Font
              </p>
              <p className="font-headline text-5xl mb-3 text-slate-900">Playfair Display</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-6">Primary Serif · Headings & Titles</p>
              <div className="space-y-2 text-slate-700">
                <p className="font-headline text-4xl">Aa Bb Cc Dd Ee</p>
                <p className="font-headline text-2xl">1 2 3 4 5 6 7 8 9 0</p>
                <p className="font-headline text-lg italic">The quick brown fox jumps.</p>
              </div>
            </div>
            <div className="bg-white p-10 border border-slate-100 rounded-3xl shadow-sm group hover:shadow-md transition-shadow">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">format_size</span> Body Font
              </p>
              <p className="font-body text-5xl mb-3 text-slate-700">Inter</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-6">Secondary Sans-Serif · Body & UI</p>
              <div className="space-y-2 text-slate-600">
                <p className="font-body text-4xl font-light">Aa Bb Cc Dd Ee</p>
                <p className="font-body text-2xl font-normal">1 2 3 4 5 6 7 8 9 0</p>
                <p className="font-body text-lg font-semibold">UPPERCASE · lowercase</p>
              </div>
            </div>
          </div>

          {/* Type Scale */}
          <div className="mt-6 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Type Scale</p>
            <div className="space-y-4 divide-y divide-slate-50">
              {[
                { label: 'Display', cls: 'font-headline text-5xl text-slate-900', text: 'Display Heading' },
                { label: 'H1', cls: 'font-headline text-4xl text-slate-900', text: 'Heading Level 1' },
                { label: 'H2', cls: 'font-headline text-3xl text-slate-800', text: 'Heading Level 2' },
                { label: 'H3', cls: 'font-headline text-2xl text-slate-800', text: 'Heading Level 3' },
                { label: 'Body LG', cls: 'font-body text-lg text-slate-600', text: 'Large Body Text — Leading information' },
                { label: 'Body', cls: 'font-body text-base text-slate-600', text: 'Standard body text for paragraphs and content areas.' },
                { label: 'Caption', cls: 'font-body text-sm text-slate-400', text: 'Caption and secondary label text' },
                { label: 'Label', cls: 'font-body text-xs font-bold uppercase tracking-widest text-slate-400', text: 'OVERLINE LABEL STYLE' },
              ].map(item => (
                <div key={item.label} className="flex items-baseline gap-6 py-3">
                  <span className="text-[10px] font-mono font-bold text-slate-400 w-16 shrink-0">{item.label}</span>
                  <span className={item.cls}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ─── Color Palette ─── */}
        <motion.section variants={itemVariants}>
          <h3 className="font-headline text-2xl text-slate-900 border-b border-slate-100 pb-3 mb-8">MD3 Color Palette</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MD3_COLORS.map(color => (
              <div key={color.name} className="group">
                <div className={`w-full h-20 rounded-2xl mb-2 ${color.cls} group-hover:scale-105 transition-transform shadow-sm`} />
                <p className="text-xs font-semibold text-slate-700 leading-tight">{color.name}</p>
                <p className="text-[10px] font-mono text-slate-400">{color.hex}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Spacing ─── */}
        <motion.section variants={itemVariants}>
          <h3 className="font-headline text-2xl text-slate-900 border-b border-slate-100 pb-3 mb-8">Spacing Scale</h3>
          <div className="flex flex-wrap items-end gap-3">
            {SPACING.map(n => (
              <div key={n} className="flex flex-col items-center gap-2">
                <div className="bg-primary/20 rounded" style={{ width: `${n * 4}px`, height: `${n * 4}px`, minWidth: 4 }} />
                <span className="text-[10px] font-mono text-slate-400">{n}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">Tailwind spacing unit × 4px</p>
        </motion.section>

        {/* ─── Border Radii ─── */}
        <motion.section variants={itemVariants}>
          <h3 className="font-headline text-2xl text-slate-900 border-b border-slate-100 pb-3 mb-8">Border Radii</h3>
          <div className="flex flex-wrap items-center gap-6">
            {RADII.map(r => (
              <div key={r.label} className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 bg-primary/10 border-2 border-primary/30 ${r.cls}`} />
                <span className="text-[10px] font-mono text-slate-400">{r.label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Shadows ─── */}
        <motion.section variants={itemVariants}>
          <h3 className="font-headline text-2xl text-slate-900 border-b border-slate-100 pb-3 mb-8">Shadow Levels</h3>
          <div className="flex flex-wrap items-center gap-8">
            {SHADOWS.map(s => (
              <div key={s.label} className="flex flex-col items-center gap-3">
                <div className={`w-20 h-20 bg-white rounded-2xl ${s.cls}`} />
                <span className="text-[10px] font-mono text-slate-400">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ─── Button Variants ─── */}
        <motion.section variants={itemVariants}>
          <h3 className="font-headline text-2xl text-slate-900 border-b border-slate-100 pb-3 mb-8">Button Variants</h3>
          <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-sm">
            <div className="flex flex-wrap gap-4 items-center">
              <button className="px-7 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95">Primary</button>
              <button className="px-7 py-3 bg-secondary text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 shadow-lg shadow-secondary/20 transition-all hover:scale-105">Secondary</button>
              <button className="px-7 py-3 bg-tertiary text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all hover:scale-105">Tertiary</button>
              <button className="px-7 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-50 transition-all">Outlined</button>
              <button className="px-7 py-3 text-indigo-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-50 transition-all">Ghost</button>
              <button className="px-7 py-3 bg-error text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-all">Destructive</button>
              <button disabled className="px-7 py-3 bg-slate-100 text-slate-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest cursor-not-allowed">Disabled</button>
            </div>
          </div>
        </motion.section>

        {/* ─── Icon Usage ─── */}
        <motion.section variants={itemVariants}>
          <h3 className="font-headline text-2xl text-slate-900 border-b border-slate-100 pb-3 mb-8">Material Symbols</h3>
          <div className="bg-white border border-slate-100 rounded-3xl p-10 shadow-sm">
            <div className="flex flex-wrap gap-8">
              {[
                { icon: 'auto_stories', label: 'auto_stories' },
                { icon: 'description', label: 'description' },
                { icon: 'picture_as_pdf', label: 'picture_as_pdf' },
                { icon: 'palette', label: 'palette' },
                { icon: 'download', label: 'download' },
                { icon: 'settings', label: 'settings' },
                { icon: 'person', label: 'person' },
                { icon: 'notifications', label: 'notifications' },
                { icon: 'search', label: 'search' },
                { icon: 'favorite', label: 'favorite' },
                { icon: 'bookmark', label: 'bookmark' },
                { icon: 'share', label: 'share' },
              ].map(ic => (
                <div key={ic.icon} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary/8 transition-colors">
                    <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors">{ic.icon}</span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 text-center">{ic.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </DocLayout>
  );
}
