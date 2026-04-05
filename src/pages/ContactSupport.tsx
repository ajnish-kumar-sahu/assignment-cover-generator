import { useState } from 'react';
import DocLayout from '../components/DocLayout';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Why is my PDF export blank or missing content?',
    a: 'This usually occurs when the print engine cannot access the required font assets. Ensure you have a stable internet connection so Google Fonts can load, then try exporting again. If the issue persists, switch to the JPG export as a fallback.'
  },
  {
    q: 'Can I use ScholarFlow for commercial or professional publications?',
    a: 'ScholarFlow is licensed for personal academic use. For commercial usage, institutional licensing, or journal publications, please contact our institutional team.'
  },
  {
    q: 'How do I save my template configuration for future use?',
    a: 'After filling in your document details in the Cover Generator, click the "Save Config" button at the bottom of the Document Details panel. Your configuration will be stored locally and accessible via your Personal Library.'
  },
  {
    q: 'Is my data stored on ScholarFlow servers?',
    a: 'No. All document generation occurs entirely client-side in your browser. No assignment data, personal information, or template configurations are transmitted to our servers unless you explicitly use a synchronized account.'
  },
  {
    q: 'The template preview isn\'t updating after I change fields. What do I do?',
    a: 'The live preview updates in near real-time but may occasionally lag on lower-powered devices. Click anywhere outside the input field to force a re-render. If the issue persists, a page refresh will reset the generator.'
  },
  {
    q: 'How do I request a custom institutional template?',
    a: 'Custom university-branded templates are available through our institutional access program. Contact our institutional team at institutions@scholarflow.com with your university name and branding guidelines.'
  },
];

export default function ContactSupport() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <DocLayout title="Contact Support">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl mb-12 text-slate-500 font-light mt-[-2rem]"
      >
        We provide dedicated assistance to ensure your academic publishing workflow remains uninterrupted.
      </motion.p>

      {/* Support Category Cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6 mb-14"
      >
        {[
          { icon: 'bug_report', color: 'text-primary bg-primary/8 border-primary/15', title: 'Technical Support', desc: 'Generation errors, template misalignments, and export issues.', email: 'support@scholarflow.com' },
          { icon: 'domain', color: 'text-secondary bg-secondary/8 border-secondary/15', title: 'Institutional Access', desc: 'University licensing, custom branding, and API integrations.', email: 'institutions@scholarflow.com' },
          { icon: 'receipt_long', color: 'text-tertiary bg-tertiary/8 border-tertiary/15', title: 'Billing & Accounts', desc: 'Subscription changes, refunds, and account management.', email: 'billing@scholarflow.com' },
        ].map(card => (
          <motion.div
            key={card.title}
            whileHover={{ y: -4 }}
            className={`p-8 bg-white rounded-3xl border ${card.color} shadow-sm hover:shadow-lg transition-all group`}
          >
            <span className={`material-symbols-outlined text-3xl mb-5 block ${card.color.split(' ')[0]}`}>{card.icon}</span>
            <h3 className="font-headline text-xl text-slate-900 mb-2">{card.title}</h3>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">{card.desc}</p>
            <a href={`mailto:${card.email}`} className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">mail</span>{card.email}
            </a>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-10 md:p-14 mb-14"
      >
        <h3 className="font-headline text-3xl text-slate-900 mb-2">Send a Message</h3>
        <p className="text-slate-500 mb-8 text-sm">We typically respond within 24 hours on business days.</p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl text-emerald-500">check_circle</span>
              </div>
              <h4 className="font-headline text-3xl text-slate-800 mb-2">Message Sent</h4>
              <p className="text-slate-500 text-sm mb-8">You'll receive a response at <strong>{form.email}</strong> within 24 hours.</p>
              <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }} className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
                Send Another
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {(['name', 'email'] as const).map(field => (
                  <div key={field}>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{field === 'name' ? 'Full Name' : 'Email Address'}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      placeholder={field === 'email' ? 'scholar@university.edu' : 'Dr. Jane Smith'}
                      className={`w-full px-5 py-3.5 rounded-xl border ${errors[field] ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'} text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-slate-400`}
                    />
                    {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Subject</label>
                <select
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className={`w-full px-5 py-3.5 rounded-xl border ${errors.subject ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'} text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all`}
                >
                  <option value="">Select a topic...</option>
                  <option>Technical Issue — Export / Generation</option>
                  <option>Template Request</option>
                  <option>Institutional Access Inquiry</option>
                  <option>Billing / Subscription</option>
                  <option>General Feedback</option>
                  <option>Other</option>
                </select>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Describe your issue or question in detail..."
                  className={`w-full px-5 py-3.5 rounded-xl border ${errors.message ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'} text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none placeholder:text-slate-400`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-10 py-4 bg-indigo-950 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/20 hover:bg-primary transition-all"
              >
                Send Message →
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>

      {/* FAQ Accordion */}
      <div>
        <h3 className="font-headline text-3xl text-slate-900 mb-8">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-8 py-6 text-left"
              >
                <span className="font-semibold text-slate-800 pr-6">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="material-symbols-outlined text-slate-400 shrink-0"
                >
                  expand_more
                </motion.span>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-8 pb-7 text-slate-500 text-sm leading-relaxed border-t border-slate-50 pt-4">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </DocLayout>
  );
}
