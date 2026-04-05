import { useState } from 'react';
import DocLayout from '../components/DocLayout';
import { motion } from 'framer-motion';

const SECTIONS = [
  {
    id: 'collection',
    title: '1. Information We Collect',
    icon: 'database',
    content: `When you use ScholarFlow, we collect only the minimal data necessary to maintain core functionality:
    
• Usage analytics (page visits, feature usage) — strictly anonymized
• Generated document metadata (template type, export format) — stored in your local browser session
• Account information (name, institutional email) — only if you create a synchronized account

We do not inspect, read, or process the contents of your assignments, thesis documents, or any personal academic work. All document content is processed entirely on your device.`,
  },
  {
    id: 'cookies',
    title: '2. Cookies & Local Storage',
    icon: 'cookie',
    content: `ScholarFlow relies on your browser's built-in local storage for the following purposes:

• Saving template configurations and formatting preferences
• Preserving your active session (login state)
• Storing recently generated cover metadata locally

We do not employ invasive third-party tracking pixels, advertising cookies, or behavioral profiling cookies. Our analytics are first-party only and privacy-preserving.`,
  },
  {
    id: 'storage',
    title: '3. Data Storage & Retention',
    icon: 'storage',
    content: `Your generated cover pages are processed entirely client-side (in your browser) and are never uploaded to external servers unless you explicitly use the cloud sync feature.

Locally stored session data is retained only for the duration of your browser session unless you opt to save configurations. Synchronized account data is retained for 24 months of account inactivity before automatic deletion.`,
  },
  {
    id: 'third-party',
    title: '4. Third-Party Services',
    icon: 'hub',
    content: `ScholarFlow integrates the following third-party services:

• Google Fonts — for typography rendering (font files are fetched from Google's CDN)
• Google Firebase (optional) — for account authentication if you create a synchronized account
• Vercel Analytics — for anonymous performance monitoring

Each of these providers maintains their own privacy policies. We do not sell or share your data with any advertising or data broker networks.`,
  },
  {
    id: 'rights',
    title: '5. Your Data Rights',
    icon: 'verified_user',
    content: `You retain full rights over any academic content you create using ScholarFlow. You have the right to:

• Access: Request a copy of any personal data we hold about your account
• Deletion: Request permanent deletion of your account and all associated data
• Correction: Update inaccurate personal information in your account profile
• Portability: Export your saved configurations and account data in JSON format

To exercise any of these rights, contact our privacy team at privacy@scholarflow.com.`,
  },
  {
    id: 'security',
    title: '6. Security Measures',
    icon: 'security',
    content: `We employ industry-standard security practices to protect your data:

• HTTPS encryption for all data in transit
• Hashed and salted password storage (for authenticated accounts)
• Regular security audits and dependency vulnerability scanning
• No plaintext storage of sensitive credentials

Despite our best efforts, no system is completely impenetrable. We recommend using a strong, unique password for your account and enabling two-factor authentication when available.`,
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('collection');

  return (
    <DocLayout title="Privacy Policy">
      <div className="flex items-center justify-between mt-[-2rem] mb-12 flex-wrap gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
          Last updated: October 2024
        </span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">print</span> Print Policy
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sticky ToC Sidebar */}
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
            className="text-slate-500 text-sm leading-relaxed p-6 bg-amber-50 border border-amber-100 rounded-2xl"
          >
            <span className="font-semibold text-amber-700">Summary: </span>
            ScholarFlow is a privacy-first tool. Your academic documents never leave your device. We collect minimal, anonymized analytics only. You can delete your data at any time.
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

          <div className="mt-10 p-7 bg-slate-50 rounded-2xl border border-slate-200 text-sm text-slate-500">
            <p>Questions about this policy? Contact <a href="mailto:privacy@scholarflow.com" className="text-indigo-600 font-medium hover:underline">privacy@scholarflow.com</a></p>
          </div>
        </div>
      </div>
    </DocLayout>
  );
}
