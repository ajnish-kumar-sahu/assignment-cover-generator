import { useState } from 'react';
import DocLayout from '../components/DocLayout';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Methodology', 'Data Synthesis', 'Editorial Design', 'Typography', 'Publishing'];

const ARTICLES = [
  {
    id: 1,
    category: 'Methodology',
    tag: 'Featured',
    title: 'The Typography of Trust',
    subtitle: 'How structural pairings impact peer review perception',
    abstract: 'An investigation into how typographic identity in academic cover pages impacts first-impression credibility across 10,000 digital journals. We find that serif-dominantHeaders increase evaluated rigor by 23%.',
    author: 'Dr. Miriam Holst',
    institution: 'Oxford Dept. of Editorial Studies',
    readTime: '12 min',
    date: 'Mar 2024',
    color: 'bg-primary/5 border-primary/20',
    accent: 'text-primary',
    icon: 'match_case',
    featured: true,
  },
  {
    id: 2,
    category: 'Data Synthesis',
    tag: 'Research',
    title: 'Architecting The Index',
    subtitle: 'Why manual TOC generation leads to higher revision rates',
    abstract: 'Manual table-of-content generation leads to a significantly higher structural revision rate in thesis submissions. Our analysis of 4,200 dissertation files suggests automated indexing reduces revision cycles by 41%.',
    author: 'Prof. Alistair Chen',
    institution: 'Stanford Information Science',
    readTime: '8 min',
    date: 'Feb 2024',
    color: 'bg-secondary/5 border-secondary/20',
    accent: 'text-secondary',
    icon: 'list_alt',
    featured: false,
  },
  {
    id: 3,
    category: 'Editorial Design',
    tag: 'Case Study',
    title: 'Margin as Message',
    subtitle: 'The silent rhetoric of whitespace in institutional documents',
    abstract: 'This case study analyzes 3,000 thesis submissions across 18 universities to argue that whitespace margin ratios carry subconscious signals about the author\'s institutional confidence.',
    author: 'Ananya Krishnan',
    institution: 'RCA Design Research Lab',
    readTime: '6 min',
    date: 'Jan 2024',
    color: 'bg-tertiary/5 border-tertiary/20',
    accent: 'text-tertiary',
    icon: 'space_bar',
    featured: false,
  },
  {
    id: 4,
    category: 'Typography',
    tag: 'Analysis',
    title: 'The Serif Advantage',
    subtitle: 'Readability metrics in print-first academic document design',
    abstract: 'Controlled tests across 16 reading panels show that serif headlines in PDF academic covers consistently outperform sans-serif alternatives in evaluator retention by significant margins.',
    author: 'Dr. Jean-Paul Moreau',
    institution: 'École Normale Supérieure',
    readTime: '10 min',
    date: 'Dec 2023',
    color: 'bg-primary/5 border-primary/20',
    accent: 'text-primary',
    icon: 'format_size',
    featured: false,
  },
  {
    id: 5,
    category: 'Publishing',
    tag: 'Report',
    title: 'Digital-First Academic Identity',
    subtitle: 'The evolving role of the cover page in online repositories',
    abstract: 'As academic publishing moves to preprint servers and open-access repositories, the digital cover page serves as the primary identity marker studied here through DOI metadata analysis.',
    author: 'Sara Lindqvist',
    institution: 'KTH Digital Humanities',
    readTime: '9 min',
    date: 'Nov 2023',
    color: 'bg-secondary/5 border-secondary/20',
    accent: 'text-secondary',
    icon: 'cloud_upload',
    featured: false,
  },
  {
    id: 6,
    category: 'Methodology',
    tag: 'Survey',
    title: 'Cover Page Compliance Across Disciplines',
    subtitle: 'A cross-faculty survey of academic formatting requirements',
    abstract: 'A university-wide survey of formatting standards revealed that 67% of faculty members consider cover page formatting a proxy for overall document quality—one of the most striking findings of the decade.',
    author: 'Dr. Afolabi Nwachukwu',
    institution: 'University of Lagos Research Centre',
    readTime: '7 min',
    date: 'Oct 2023',
    color: 'bg-tertiary/5 border-tertiary/20',
    accent: 'text-tertiary',
    icon: 'poll',
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, bounce: 0.3 } },
};

export default function Research() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = ARTICLES.filter(a => {
    const matchCat = filter === 'All' || a.category === filter;
    const matchSearch = search === '' || a.title.toLowerCase().includes(search.toLowerCase()) || a.abstract.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = ARTICLES.find(a => a.featured);

  return (
    <DocLayout title="Research Hub">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl mb-12 text-slate-500 font-light mt-[-2rem]"
      >
        Discover cutting-edge publication workflows and experimental visual presentation methods for academia.
      </motion.p>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8"
      >
        <span className="absolute left-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl">search</span>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search research articles..."
          className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 text-slate-800 placeholder:text-slate-400 transition-all text-sm"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-5 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 hover:text-slate-600 text-lg">close</button>
        )}
      </motion.div>

      {/* Category Filter Chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex gap-3 flex-wrap mb-12"
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Featured Article Hero */}
      {filter === 'All' && search === '' && featured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 bg-gradient-to-br from-indigo-950 to-primary rounded-[2.5rem] p-12 text-white relative overflow-hidden group cursor-pointer"
        >
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block mb-4 text-[10px] font-bold uppercase tracking-[0.25em] bg-white/15 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
              ✦ Featured Research
            </span>
            <h2 className="font-headline text-4xl md:text-5xl mb-4 leading-tight">{featured.title}</h2>
            <p className="text-white/70 text-lg mb-6 leading-relaxed italic">{featured.subtitle}</p>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-2xl">{featured.abstract}</p>
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/50">
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">person</span>{featured.author}</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">domain</span>{featured.institution}</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">schedule</span>{featured.readTime} read</span>
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">calendar_today</span>{featured.date}</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Articles Grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-24 text-slate-400"
          >
            <span className="material-symbols-outlined text-6xl mb-4 block text-slate-200">search_off</span>
            <p className="font-headline text-2xl text-slate-700">No articles found</p>
            <p className="text-sm mt-2">Try adjusting your search or filter.</p>
          </motion.div>
        ) : (
          <motion.div
            key={filter + search}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {filtered.filter(a => !a.featured || filter !== 'All' || search !== '').map(article => (
              <motion.article
                key={article.id}
                variants={itemVariants}
                whileHover={{ x: 4 }}
                className={`group border ${article.color} bg-white rounded-3xl p-8 md:p-10 hover:shadow-xl hover:shadow-indigo-900/5 transition-all cursor-pointer relative overflow-hidden`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl ${article.color} border flex items-center justify-center shrink-0`}>
                    <span className={`material-symbols-outlined ${article.accent} text-2xl`}>{article.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${article.accent}`}>{article.category}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">· {article.tag}</span>
                    </div>
                    <h3 className="font-headline text-2xl text-slate-900 mb-1 group-hover:text-indigo-900 transition-colors">{article.title}</h3>
                    <p className="text-slate-500 italic text-sm mb-4">{article.subtitle}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 max-w-3xl">{article.abstract}</p>
                    <div className="flex flex-wrap gap-5 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">person</span>{article.author}</span>
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">domain</span>{article.institution}</span>
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">schedule</span>{article.readTime} read</span>
                      <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">calendar_today</span>{article.date}</span>
                    </div>
                  </div>
                  <motion.span
                    className="material-symbols-outlined text-slate-200 group-hover:text-primary transition-colors self-center shrink-0 text-3xl"
                    whileHover={{ x: 4 }}
                  >
                    arrow_forward
                  </motion.span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </DocLayout>
  );
}
