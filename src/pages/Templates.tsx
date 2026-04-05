import DocLayout from '../components/DocLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Thesis', 'Research', 'Lab Reports', 'Creative Arts'];

const TEMPLATES = [
  {
    id: 'oxford',
    name: 'Classic Oxford',
    category: 'Research',
    desc: 'Traditional serif typography with heavy borders and institutional seal positioning. Perfect for standard Humanities and Law submissions.',
    color: 'from-blue-600 to-indigo-900',
    accent: 'bg-indigo-500',
    icon: 'account_balance',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSlNvH0RBHb2W26b_4ZZ5UpM_AvLCJs18ZPZ-XM6fzDJSnvzym7WIf1zu6I5Fru0jwuxe852uh8wFseuGU6yX23gWlTS3FVdFgJIelN0XMs2SyO41X5p01RnSkMcwmhagcnufT9E7f2-IxQ-RNtTlp9GSQt8AtDq39tU5hQLy2g6TmkJu2341YLiZcCzCsKMhPHoQwmudG4HDqqSntsSdjP4IILD7xMthQ90ZtafH5dSdAv3hRIHe3VpgNuloRVbxI_HFQtfLbvVA'
  },
  {
    id: 'stanford',
    name: 'Stanford Quantitative',
    category: 'Thesis',
    desc: 'A bold, minimalist grid featuring vertical layout headers and excessive whitespace. Designed for Science and Technology disciplines.',
    color: 'from-emerald-500 to-teal-800',
    accent: 'bg-emerald-500',
    icon: 'architecture',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAOSQJVsafpee_IOKvb9acNhzznJccFFaKPGuk5hkObV3KChExQaRyjOqHveWySiTJQ5C5b9xEcczm3sWZmSL2YQwBTkFTlVYAatmwez_OktrxgucUzqK9BSj8NZ1INEiztCXd0Fl11RGrvtpfjqFd7LN9vumbgGx4wWta1yocfe8A1R50WboUzBGI7gVU8SQntvBgZMwGmZIFWYpcfwmZBXBSeiunaGbWe9OZH6l5cgFYdzvwc9CMgaBFZl-V5F0ubM5p8pskv4'
  },
  {
    id: 'index',
    name: 'Manuscript Index',
    category: 'Research',
    desc: 'Inspired by the ScholarFlow Index Designer. Features a clean, dual-column subject list with leader dots and elegant heading markers.',
    color: 'from-indigo-600 to-indigo-900',
    accent: 'bg-indigo-600',
    icon: 'list_alt',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8JO7khoKCSpi_-4SZmscZ1Vm6Qirz66-Wk4Cry-o2NQR44wMHsTiDkC4zkyGsR10GnbPW1jbkZyi6jJc0JlYZzck4mi8nZMogheBSrQgqgUxs7okNA2AbBDolL3ozT5V0_cDWJIF8euV1GwOy5UYP7JriD6e8CJoc4dcv6dNBeFgLGxURvQ7pMONnLLewSE-lvBM7D8UJkBntQgRfbTECBbeAsLbj5G0CqT6CdpQ1OU9P_Sz6OeuE5DL_AT1cA3bKS45i2zVl6F0'
  },
  {
    id: 'library',
    name: 'Institutional Atelier',
    category: 'Creative Arts',
    desc: 'A curated design that emphasizes the visual lineage of the institution. Features subtle crest backgrounds and wide editorial margins.',
    color: 'from-slate-700 to-slate-950',
    accent: 'bg-slate-700',
    icon: 'account_balance',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAya7z3veaff9rsnaiCHCKX25QsHh9n8T6mzZMfrBA88XJiTrllbScsp1bOaOXv09JkDnDK0axtYJvIg7671usIT3y8ZaRuSqUfpDUSQSM_MLE-VTXpDk0ms0iMoZ_wpZcbxSx8BpIpKW3q2Q0BL6-8ePg4pCk_JlS8k6kAn8uMjkLAO28vPzKORnKDhgfcsrnW3P1EixgUqqbtBowPqCXWqSpi75CZVTN4cXDIDQf3TZSuhDovVHdiUxaQScBOWy7qKzPNGRSL9M'
  }
];

export default function Templates() {
  const [filter, setFilter] = useState('All');
  
  const filteredTemplates = filter === 'All' 
    ? TEMPLATES 
    : TEMPLATES.filter(t => t.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, bounce: 0.3, duration: 0.8 } }
  };

  return (
    <DocLayout title="Document Templates">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <p className="text-2xl text-slate-500 mb-12 mt-[-2rem] font-light italic">
          Curated structural layout logic for the distinguished scholar.
        </p>
        
        {/* Category Filter Bar */}
        <div className="flex overflow-x-auto gap-3 pb-8 scrollbar-hide mb-12 border-b border-slate-100">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap active:scale-95 ${
                filter === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-white text-slate-400 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.map((tpl) => (
              <motion.div
                key={tpl.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -10 }}
                className="group relative flex flex-col bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.15)] transition-all overflow-hidden"
              >
                {/* Visual Mockup Section */}
                <div className={`aspect-[1/1.2] w-full bg-slate-100 flex items-center justify-center relative overflow-hidden`}>
                  
                  {/* Real Image Background */}
                  <img src={tpl.image} alt={tpl.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  {/* Abstract UI Elements Overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full backdrop-blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                  
                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-indigo-900/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 z-20">
                     <Link to="/cover-generator" className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-xl hover:scale-105 transition-transform active:scale-95">Use This Design</Link>
                     <button className="text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:text-indigo-200 transition-colors">Quick Preview</button>
                  </div>
                </div>

                {/* Info Content Section */}
                <div className="p-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-md ${tpl.accent} text-white`}>
                      {tpl.category}
                    </span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-indigo-600 transition-colors">favorite</span>
                  </div>
                  <h4 className="font-headline text-2xl text-slate-900 mb-3 group-hover:text-indigo-900 transition-colors">{tpl.name}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light">
                    {tpl.desc}
                  </p>
                  
                  {/* Meta Details */}
                  <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                     <div className="flex items-center gap-2 text-slate-400">
                        <span className="material-symbols-outlined text-sm">architecture</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Hi-Res Vector</span>
                     </div>
                     <span className="text-[14px] font-headline text-indigo-600 italic">V1.4 Patch</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </DocLayout>
  );
}
