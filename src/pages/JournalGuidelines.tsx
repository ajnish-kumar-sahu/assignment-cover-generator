import { useState } from 'react';
import DocLayout from '../components/DocLayout';
import { motion, AnimatePresence } from 'framer-motion';

const ACCORDIONS = [
  {
    id: 'page-setup',
    icon: 'article',
    title: 'Page Setup & Margins',
    content: [
      { label: 'Paper Size', value: 'A4 (210mm × 297mm) — ISO 216 standard' },
      { label: 'Top Margin', value: '25mm (2.5cm) minimum' },
      { label: 'Bottom Margin', value: '25mm (2.5cm) minimum' },
      { label: 'Left Margin (Binding)', value: '35mm (3.5cm) for left-bound documents' },
      { label: 'Right Margin', value: '20mm (2.0cm) minimum' },
      { label: 'Gutter', value: '0mm (single-sided) / 10mm (double-sided)' },
    ]
  },
  {
    id: 'typography',
    icon: 'format_size',
    title: 'Typography Standards',
    content: [
      { label: 'Title Font', value: 'Serif — Times New Roman / Georgia / Playfair Display (18–24pt)' },
      { label: 'Author Name', value: 'Same as title font, regular weight (14–16pt)' },
      { label: 'Institution', value: 'Sans-serif — Inter / Arial, medium weight (12pt)' },
      { label: 'Body / Metadata', value: 'Sans-serif, regular weight (10–12pt)' },
      { label: 'Max Title Length', value: '2 lines recommended; 3 lines maximum' },
      { label: 'Line Spacing', value: 'Single-spaced on cover page; 1.5× on body pages' },
    ]
  },
  {
    id: 'required-fields',
    icon: 'assignment',
    title: 'Required Cover Fields',
    content: [
      { label: 'University Name', value: 'Full official name — no abbreviations' },
      { label: 'Department', value: 'Full department name as registered' },
      { label: 'Course Name & Code', value: 'As listed in academic calendar (e.g., BCA-301)' },
      { label: 'Assignment Title', value: 'As given by the faculty — exact wording' },
      { label: 'Student Name', value: 'As per official enrollment records' },
      { label: 'Roll Number / Enrollment', value: 'Institution-specific ID — mandatory' },
      { label: 'Faculty Name', value: 'Including title (Prof. / Dr.) — full name' },
      { label: 'Submission Date', value: 'DD Month YYYY format (e.g., 01 April 2024)' },
    ]
  },
  {
    id: 'submission',
    icon: 'upload_file',
    title: 'Submission Formats',
    content: [
      { label: 'Primary Format', value: 'PDF — universally accepted; preferred by all institutions' },
      { label: 'Alternate Format', value: 'JPEG (300 DPI) — for online portals with file type restrictions' },
      { label: 'Resolution', value: '300 DPI minimum for print; 150 DPI acceptable for digital-only' },
      { label: 'Color Mode', value: 'CMYK for print; RGB for digital submissions' },
      { label: 'File Naming', value: 'RollNumber_SubjectCode_AssignmentTitle.pdf' },
      { label: 'Max File Size', value: '5MB for digital portals (most institutional systems)' },
    ]
  },
];

const CHECKLIST_ITEMS = [
  { id: 1, label: 'University name matches official records exactly' },
  { id: 2, label: 'Department is written in full — no abbreviations' },
  { id: 3, label: 'Course code matches the academic calendar' },
  { id: 4, label: 'Assignment title matches the faculty-issued prompt' },
  { id: 5, label: 'Student name matches enrollment certificate' },
  { id: 6, label: 'Roll number / enrollment number is correct' },
  { id: 7, label: 'Faculty name includes correct honorific (Dr./Prof.)' },
  { id: 8, label: 'Submission date is in DD Month YYYY format' },
  { id: 9, label: 'Document is exported at 300 DPI or higher' },
  { id: 10, label: 'File is saved as PDF (or JPG if portal requires)' },
  { id: 11, label: 'Filename follows the RollNo_Code_Title convention' },
  { id: 12, label: 'Cover page is single-sided (page 1 only)' },
];

export default function JournalGuidelines() {
  const [openAccordion, setOpenAccordion] = useState<string | null>('page-setup');
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleCheck = (id: number) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const allChecked = checked.size === CHECKLIST_ITEMS.length;

  return (
    <DocLayout title="Academic Formatting Guidelines">
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl mb-12 text-slate-500 font-light mt-[-2rem]"
      >
        Institutional standards, formatting requirements, and structural compliance guides for academic submissions.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Formatting Standards Accordion */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl text-slate-900">Formatting Standards</h3>
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 px-5 py-2.5 rounded-xl hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-sm">download</span> Download PDF
            </button>
          </div>

          <div className="space-y-3">
            {ACCORDIONS.map(acc => (
              <motion.div
                key={acc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                  className="w-full flex items-center gap-4 px-7 py-5 text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">{acc.icon}</span>
                  </div>
                  <span className="font-semibold text-slate-800 flex-1">{acc.title}</span>
                  <motion.span
                    animate={{ rotate: openAccordion === acc.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="material-symbols-outlined text-slate-400 shrink-0"
                  >
                    expand_more
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openAccordion === acc.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-50 px-7 py-5">
                        <table className="w-full text-sm">
                          <tbody className="divide-y divide-slate-50">
                            {acc.content.map(row => (
                              <tr key={row.label}>
                                <td className="py-2.5 pr-4 font-medium text-slate-600 w-2/5 text-xs">{row.label}</td>
                                <td className="py-2.5 text-slate-500 text-xs leading-relaxed">{row.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Compliance Checklist */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-headline text-2xl text-slate-900">Submission Checklist</h3>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {checked.size}/{CHECKLIST_ITEMS.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-100 rounded-full mb-6 overflow-hidden">
            <motion.div
              animate={{ width: `${(checked.size / CHECKLIST_ITEMS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              className={`h-full rounded-full transition-colors ${allChecked ? 'bg-emerald-500' : 'bg-primary'}`}
            />
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            {CHECKLIST_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`w-full flex items-center gap-4 px-6 py-4 border-b border-slate-50 last:border-0 text-left hover:bg-slate-50/80 transition-colors ${checked.has(item.id) ? 'opacity-70' : ''}`}
              >
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${checked.has(item.id) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                  {checked.has(item.id) && <span className="material-symbols-outlined text-white text-sm">check</span>}
                </div>
                <span className={`text-sm ${checked.has(item.id) ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* All-checked celebration */}
          <AnimatePresence>
            {allChecked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center"
              >
                <span className="material-symbols-outlined text-4xl text-emerald-500 mb-2 block">task_alt</span>
                <p className="font-headline text-xl text-emerald-800">Ready to Submit!</p>
                <p className="text-sm text-emerald-600 mt-1">All compliance checks passed. Your document is formatted correctly.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DocLayout>
  );
}
