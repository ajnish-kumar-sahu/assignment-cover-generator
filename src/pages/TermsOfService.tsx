import { useState } from 'react';
import DocLayout from '../components/DocLayout';
import { motion } from 'framer-motion';

const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    icon: 'handshake',
    content: `By accessing or using ScholarFlow ("the Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not access the Service.

These terms apply to all visitors, users, and others who access or use the Service. ScholarFlow reserves the right to update these terms at any time. Continued use of the Service after changes constitutes acceptance of the updated terms.`,
  },
  {
    id: 'license',
    title: '2. License to Use',
    icon: 'verified',
    content: `ScholarFlow grants you a limited, non-exclusive, non-transferable, revocable license to use the Service for personal, non-commercial academic purposes.

You may:
• Generate, customize, and export assignment cover pages for academic submissions
• Save template configurations to your local device or synchronized account
• Use exported documents in any academic setting (examinations, coursework, research)

You may NOT:
• Redistribute or resell the Service or any generated assets
• Use the Service for commercial document production without explicit written consent`,
  },
  {
    id: 'prohibited',
    title: '3. Prohibited Use',
    icon: 'block',
    content: `You agree not to engage in any of the following:

• Using ScholarFlow to submit academic work that violates your institution's academic integrity policies
• Automated scraping, crawling, or bulk-generation of documents using scripts or bots
• Attempting to reverse-engineer, decompile, or extract source code from the Service
• Uploading or transmitting any harmful, defamatory, or unlawful content through the Service
• Circumventing any technical measures, access controls, or security features of the Service`,
  },
  {
    id: 'ip',
    title: '4. Intellectual Property',
    icon: 'copyright',
    content: `The Service, including its design system, template layouts, code, and brand assets, is owned exclusively by ScholarFlow and is protected by applicable intellectual property laws.

Your Content: Any academic content you input into the Service remains your intellectual property. ScholarFlow does not claim ownership over the documents you generate using the Service.

Template Designs: The visual template designs (Classic Oxford, Stanford Quantitative, etc.) are proprietary assets of ScholarFlow and may not be replicated or redistributed independently.`,
  },
  {
    id: 'limitation',
    title: '5. Limitation of Liability',
    icon: 'gavel',
    content: `ScholarFlow is provided "as is" without warranties of any kind, either express or implied. We do not warrant that:

• The Service will be uninterrupted, error-free, or completely secure
• Generated documents will meet all specific institutional formatting requirements
• The Service will be compatible with all academic submission systems

In no event shall ScholarFlow be liable for any indirect, incidental, or consequential damages arising from your use of the Service, including loss of academic standing, document rejection, or submission deadlines.`,
  },
  {
    id: 'governing',
    title: '6. Governing Law',
    icon: 'account_balance',
    content: `These Terms shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law provisions.

Any dispute arising from or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in New Delhi, India. Both parties consent to personal jurisdiction in such courts.

If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.`,
  },
];

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('acceptance');
  const [accepted, setAccepted] = useState(false);

  return (
    <DocLayout title="Terms of Service">
      <div className="flex items-center justify-between mt-[-2rem] mb-12 flex-wrap gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
          Effective: October 2024
        </span>
        {accepted && (
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
            <span className="material-symbols-outlined text-sm">check_circle</span> Terms Accepted
          </span>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sticky ToC */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-72 shrink-0"
        >
          <div className="lg:sticky lg:top-8 bg-slate-50 rounded-2xl border border-slate-100 p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Table of Contents</p>
            <nav className="space-y-1">
              {SECTIONS.map(sec => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveSection(sec.id);
                    document.getElementById(sec.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 ${
                    activeSection === sec.id
                      ? 'bg-primary/8 text-primary font-semibold'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm opacity-60">{sec.icon}</span>
                  <span className="text-xs leading-tight">{sec.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 space-y-10">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-500 text-sm leading-relaxed p-6 bg-blue-50 border border-blue-100 rounded-2xl"
          >
            <span className="font-semibold text-blue-700">Summary: </span>
            ScholarFlow is for personal academic use. You own your content. Our templates are proprietary. We are not liable for rejected submissions. These terms are governed by Indian law.
          </motion.p>

          {SECTIONS.map((sec, i) => (
            <motion.section
              key={sec.id}
              id={sec.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              onViewportEnter={() => setActiveSection(sec.id)}
              viewport={{ amount: 0.5 }}
              className="scroll-mt-8"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg">{sec.icon}</span>
                </div>
                <h2 className="font-headline text-2xl text-indigo-950">{sec.title}</h2>
              </div>
              <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line pl-[3.25rem]">
                {sec.content}
              </div>
              {i < SECTIONS.length - 1 && <hr className="mt-10 border-slate-100" />}
            </motion.section>
          ))}

          {/* Accept Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <div className="flex-1">
              <p className="font-semibold text-slate-800 mb-1">Do you accept these terms?</p>
              <p className="text-sm text-slate-500">Required to use certain features of ScholarFlow.</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setAccepted(true)}
                disabled={accepted}
                className={`px-7 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${accepted ? 'bg-emerald-500 text-white cursor-default' : 'bg-indigo-950 text-white hover:bg-primary shadow-xl shadow-indigo-900/20'}`}
              >
                {accepted ? '✓ Accepted' : 'Accept Terms'}
              </motion.button>
              <button className="px-7 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
                Decline
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </DocLayout>
  );
}
