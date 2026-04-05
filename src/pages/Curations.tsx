import { useState } from 'react';
import DocLayout from '../components/DocLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const FILTERS = ['All', 'Thesis', 'Research', 'Science', 'Arts', 'Law'];

const COVERS = [
  {
    id: 1, category: 'Research', title: 'The Oxford Modernist', sub: 'Humanities Collection',
    span: 'row-span-2',
    bg: 'from-indigo-900 to-indigo-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSlNvH0RBHb2W26b_4ZZ5UpM_AvLCJs18ZPZ-XM6fzDJSnvzym7WIf1zu6I5Fru0jwuxe852uh8wFseuGU6yX23gWlTS3FVdFgJIelN0XMs2SyO41X5p01RnSkMcwmhagcnufT9E7f2-IxQ-RNtTlp9GSQt8AtDq39tU5hQLy2g6TmkJu2341YLiZcCzCsKMhPHoQwmudG4HDqqSntsSdjP4IILD7xMthQ90ZtafH5dSdAv3hRIHe3VpgNuloRVbxI_HFQtfLbvVA',
    template: 'Classic Oxford',
  },
  {
    id: 2, category: 'Science', title: 'Stanford Data Sciences', sub: 'Quantitative Series',
    span: '',
    bg: 'from-emerald-800 to-teal-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAOSQJVsafpee_IOKvb9acNhzznJccFFaKPGuk5hkObV3KChExQaRyjOqHveWySiTJQ5C5b9xEcczm3sWZmSL2YQwBTkFTlVYAatmwez_OktrxgucUzqK9BSj8NZ1INEiztCXd0Fl11RGrvtpfjqFd7LN9vumbgGx4wWta1yocfe8A1R50WboUzBGI7gVU8SQntvBgZMwGmZIFWYpcfwmZBXBSeiunaGbWe9OZH6l5cgFYdzvwc9CMgaBFZl-V5F0ubM5p8pskv4',
    template: 'Stanford Quantitative',
  },
  {
    id: 3, category: 'Thesis', title: 'Manuscript Index Alpha', sub: 'Engineering Thesis',
    span: '',
    bg: 'from-slate-700 to-slate-900',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8JO7khoKCSpi_-4SZmscZ1Vm6Qirz66-Wk4Cry-o2NQR44wMHsTiDkC4zkyGsR10GnbPW1jbkZyi6jJc0JlYZzck4mi8nZMogheBSrQgqgUxs7okNA2AbBDolL3ozT5V0_cDWJIF8euV1GwOy5UYP7JriD6e8CJoc4dcv6dNBeFgLGxURvQ7pMONnLLewSE-lvBM7D8UJkBntQgRfbTECBbeAsLbj5G0CqT6CdpQ1OU9P_Sz6OeuE5DL_AT1cA3bKS45i2zVl6F0',
    template: 'Manuscript Index',
  },
  {
    id: 4, category: 'Arts', title: 'Institutional Atelier', sub: 'Visual Arts Department',
    span: '',
    bg: 'from-rose-900 to-slate-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAya7z3veaff9rsnaiCHCKX25QsHh9n8T6mzZMfrBA88XJiTrllbScsp1bOaOXv09JkDnDK0axtYJvIg7671usIT3y8ZaRuSqUfpDUSQSM_MLE-VTXpDk0ms0iMoZ_wpZcbxSx8BpIpKW3q2Q0BL6-8ePg4pCk_JlS8k6kAn8uMjkLAO28vPzKORnKDhgfcsrnW3P1EixgUqqbtBowPqCXWqSpi75CZVTN4cXDIDQf3TZSuhDovVHdiUxaQScBOWy7qKzPNGRSL9M',
    template: 'Institutional Atelier',
  },
  {
    id: 5, category: 'Law', title: 'Lex Formalis', sub: 'Law Review Submission',
    span: 'row-span-2',
    bg: 'from-amber-900 to-stone-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSlNvH0RBHb2W26b_4ZZ5UpM_AvLCJs18ZPZ-XM6fzDJSnvzym7WIf1zu6I5Fru0jwuxe852uh8wFseuGU6yX23gWlTS3FVdFgJIelN0XMs2SyO41X5p01RnSkMcwmhagcnufT9E7f2-IxQ-RNtTlp9GSQt8AtDq39tU5hQLy2g6TmkJu2341YLiZcCzCsKMhPHoQwmudG4HDqqSntsSdjP4IILD7xMthQ90ZtafH5dSdAv3hRIHe3VpgNuloRVbxI_HFQtfLbvVA',
    template: 'Classic Oxford',
  },
  {
    id: 6, category: 'Research', title: 'Neuro-Editorial Suite', sub: 'Cognitive Science',
    span: '',
    bg: 'from-violet-900 to-indigo-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAOSQJVsafpee_IOKvb9acNhzznJccFFaKPGuk5hkObV3KChExQaRyjOqHveWySiTJQ5C5b9xEcczm3sWZmSL2YQwBTkFTlVYAatmwez_OktrxgucUzqK9BSj8NZ1INEiztCXd0Fl11RGrvtpfjqFd7LN9vumbgGx4wWta1yocfe8A1R50WboUzBGI7gVU8SQntvBgZMwGmZIFWYpcfwmZBXBSeiunaGbWe9OZH6l5cgFYdzvwc9CMgaBFZl-V5F0ubM5p8pskv4',
    template: 'Stanford Quantitative',
  },
  {
    id: 7, category: 'Thesis', title: 'Doctoral Prestige', sub: 'PhD Thesis — Social Sciences',
    span: '',
    bg: 'from-sky-900 to-slate-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8JO7khoKCSpi_-4SZmscZ1Vm6Qirz66-Wk4Cry-o2NQR44wMHsTiDkC4zkyGsR10GnbPW1jbkZyi6jJc0JlYZzck4mi8nZMogheBSrQgqgUxs7okNA2AbBDolL3ozT5V0_cDWJIF8euV1GwOy5UYP7JriD6e8CJoc4dcv6dNBeFgLGxURvQ7pMONnLLewSE-lvBM7D8UJkBntQgRfbTECBbeAsLbj5G0CqT6CdpQ1OU9P_Sz6OeuE5DL_AT1cA3bKS45i2zVl6F0',
    template: 'Manuscript Index',
  },
  {
    id: 8, category: 'Science', title: 'Clinical Protocol', sub: 'Medical Research Paper',
    span: '',
    bg: 'from-teal-900 to-slate-950',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAya7z3veaff9rsnaiCHCKX25QsHh9n8T6mzZMfrBA88XJiTrllbScsp1bOaOXv09JkDnDK0axtYJvIg7671usIT3y8ZaRuSqUfpDUSQSM_MLE-VTXpDk0ms0iMoZ_wpZcbxSx8BpIpKW3q2Q0BL6-8ePg4pCk_JlS8k6kAn8uMjkLAO28vPzKORnKDhgfcsrnW3P1EixgUqqbtBowPqCXWqSpi75CZVTN4cXDIDQf3TZSuhDovVHdiUxaQScBOWy7qKzPNGRSL9M',
    template: 'Classic Oxford',
  },
];

export default function Curations() {
  const [filter, setFilter] = useState('All');
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const filtered = filter === 'All' ? COVERS : COVERS.filter(c => c.category === filter);

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <DocLayout title="Curations">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl mb-10 text-slate-500 font-light mt-[-2rem]"
      >
        Hand-picked excellence. Browse the finest academic presentations generated via the ScholarFlow suite.
      </motion.p>

      {/* Filter Chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 flex-wrap mb-10"
      >
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${
              filter === f
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-400 self-center">{filtered.length} works</span>
      </motion.div>

      {/* Masonry-style Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-0"
        >
          {filtered.map((cover, i) => (
            <motion.div
              key={cover.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', bounce: 0.3 }}
              className={`break-inside-avoid mb-6 group relative rounded-3xl overflow-hidden shadow-lg cursor-pointer ${cover.span}`}
              style={{ minHeight: cover.span === 'row-span-2' ? 520 : 340 }}
            >
              {/* Background Image */}
              <img
                src={cover.img}
                alt={cover.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cover.bg} opacity-70 group-hover:opacity-80 transition-opacity`} />

              {/* Like Button */}
              <button
                onClick={() => toggleLike(cover.id)}
                className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center hover:bg-white/25 transition-all"
              >
                <span className={`material-symbols-outlined text-lg ${liked.has(cover.id) ? 'text-red-400' : 'text-white/80'}`}>
                  {liked.has(cover.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>

              {/* Category Badge */}
              <div className="absolute top-5 left-5 z-20">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                  {cover.category}
                </span>
              </div>

              {/* Info + CTA — visible on hover */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                <div>
                  <h4 className="text-white font-headline text-2xl mb-1">{cover.title}</h4>
                  <span className="text-white/60 text-sm tracking-wide">{cover.sub}</span>
                </div>
                <div className="mt-4 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <Link
                    to="/cover-generator"
                    className="bg-white text-indigo-900 px-5 py-2.5 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-transform active:scale-95"
                  >
                    Use Design
                  </Link>
                  <button className="text-white text-[10px] font-bold uppercase tracking-[0.15em] bg-white/15 backdrop-blur-sm px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/25 transition-colors">
                    Preview
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Submit Your Work Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', bounce: 0.3 }}
        className="mt-20 bg-gradient-to-br from-indigo-50 to-slate-50 rounded-[2.5rem] p-12 border border-indigo-100 text-center relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <span className="material-symbols-outlined text-5xl text-primary/30 mb-6 block">upload_file</span>
        <h3 className="font-headline text-3xl text-indigo-950 mb-3">Submit Your Work</h3>
        <p className="text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
          Created something outstanding with ScholarFlow? Submit it to our curated gallery and inspire the next generation of academic researchers.
        </p>
        <button className="px-8 py-4 bg-indigo-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/20 hover:bg-primary transition-all active:scale-98">
          Submit for Curation
        </button>
      </motion.div>
    </DocLayout>
  );
}
