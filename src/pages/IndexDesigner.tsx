import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useAppStore } from '../store/useAppStore';
import { printElement } from '../utils/exportUtils';
import Logo from '../components/Logo';

const MD3_THEME = `
  :root {
    --color-secondary: #006b5f;
    --color-on-tertiary-fixed-variant: #653e00;
    --color-surface: #fcf8ff;
    --color-primary-fixed-dim: #c3c0ff;
    --color-on-error: #ffffff;
    --color-error: #ba1a1a;
    --color-surface-dim: #dcd8e5;
    --color-on-secondary: #ffffff;
    --color-tertiary: #684000;
    --color-on-secondary-fixed: #00201c;
    --color-tertiary-fixed: #ffddb8;
    --color-on-primary-container: #dad7ff;
    --color-on-background: #1b1b24;
    --color-on-tertiary-container: #ffd4a4;
    --color-primary-fixed: #e2dfff;
    --color-secondary-container: #6df5e1;
    --color-on-error-container: #93000a;
    --color-on-primary: #ffffff;
    --color-tertiary-fixed-dim: #ffb95f;
    --color-surface-container-low: #f5f2ff;
    --color-surface-bright: #fcf8ff;
    --color-surface-container-high: #eae6f4;
    --color-outline-variant: #c7c4d8;
    --color-background: #fcf8ff;
    --color-surface-variant: #e4e1ee;
    --color-primary-container: #4f46e5;
    --color-inverse-surface: #302f39;
    --color-on-tertiary: #ffffff;
    --color-outline: #777587;
    --color-secondary-fixed: #71f8e4;
    --color-on-secondary-container: #006f64;
    --color-tertiary-container: #885500;
    --color-surface-container-highest: #e4e1ee;
    --color-on-tertiary-fixed: #2a1700;
    --color-inverse-primary: #c3c0ff;
    --color-on-surface: #1b1b24;
    --color-inverse-on-surface: #f3effc;
    --color-on-secondary-fixed-variant: #005048;
    --color-surface-tint: #4d44e3;
    --color-on-primary-fixed: #001069;
    --color-surface-container: #f0ecf9;
    --color-primary: #3525cd;
    --color-error-container: #ffdad6;
    --color-surface-container-lowest: #ffffff;
    --color-secondary-fixed-dim: #4fdbc8;
    --color-on-surface-variant: #464555;
    --color-on-primary-fixed-variant: #3323cc;
  }
`;

export default function IndexDesigner() {
  const [entries, setEntries] = useState([
    { id: 1, subject: 'Abstract Reasoning', page: '12, 145' },
    { id: 2, subject: 'Affective Neuroscience', page: '42, 89' },
    { id: 3, subject: 'Algorithm Bias', page: '201' },
    { id: 4, subject: 'Behavioral Economics', page: '67-72' },
    { id: 5, subject: 'Bias, Heuristic', page: '112' },
    { id: 6, subject: 'Cognitive Load Theory', page: '156' },
    { id: 7, subject: 'Conceptual Frameworks', page: '18-22' },
    { id: 8, subject: 'Critical Discourse', page: '310' },
    { id: 9, subject: 'Empirical Evidence', page: '92' },
    { id: 10, subject: 'Ethics in AI', page: '215-230' }
  ]);
  const [template, setTemplate] = useState('classic');
  const [newSubject, setNewSubject] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newPage, setNewPage] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const { addNotification } = useAppStore();

  const exportAsPDF = async () => {
    if (!documentRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(documentRef.current, { scale: 3, useCORS: true, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save('manuscript-index.pdf');
      addNotification({ message: 'Index PDF generated successfully!', type: 'success' });
    } catch (err) {
      addNotification({ message: 'Error generating PDF', type: 'error' });
    } finally {
      setIsExporting(false);
    }
  };

  const handleAddEntry = () => {
    if (!newSubject.trim() || !newPage.trim()) return;
    const newEntry = {
      id: Date.now(),
      subject: newSubject,
      page: newPage
    };
    setEntries(prev => [newEntry, ...prev]);
    setNewSubject('');
    setNewTopic('');
    setNewPage('');
  };

  const handleDeleteEntry = (id: number) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const groupedEntries = entries.reduce((acc, entry) => {
    const firstLetter = entry.subject.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  const sortedLetters = Object.keys(groupedEntries).sort();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MD3_THEME }} />
      <style dangerouslySetInnerHTML={{ __html: `
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          display: inline-block;
          line-height: 1;
        }
        .dotted-leader {
          flex-grow: 1;
          border-bottom: 2px dotted var(--color-outline-variant, #c7c4d8);
          margin: 0 8px;
          position: relative;
          top: -4px;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(16px);
        }
      `}} />
      <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="bg-white/70 backdrop-blur-xl docked full-width top-0 sticky z-50 shadow-sm flex justify-between items-center px-8 py-3 w-full max-w-[1920px] mx-auto">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden md:flex gap-6 items-center">
              <Link className="text-indigo-800 font-semibold border-b-2 border-indigo-600 font-headline tracking-tight px-1 py-1" to="/research">Research</Link>
              <Link className="text-slate-600 hover:text-indigo-600 transition-colors font-headline tracking-tight px-1 py-1" to="/archive">Archive</Link>
              <Link className="text-slate-600 hover:text-indigo-600 transition-colors font-headline tracking-tight px-1 py-1" to="/library">Library</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative group">
              <input className="bg-slate-100/50 border-none rounded-lg py-1.5 pl-4 pr-10 text-sm focus:ring-2 focus:ring-primary/20 transition-all w-64" placeholder="Search indexes..." type="text"/>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            </div>
            <Link to="/settings" className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-slate-600 flex items-center justify-center">
              <span className="material-symbols-outlined">settings</span>
            </Link>
            <Link to="/profile" className="p-2 hover:bg-indigo-50 rounded-lg transition-colors text-indigo-700 flex items-center justify-center">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 flex overflow-hidden">
          {/* SideNavBar */}
          <aside className="h-[calc(100vh-64px)] w-64 border-r border-slate-200/50 bg-slate-50 flex flex-col gap-2 p-4 shrink-0 overflow-y-auto">
            <div className="mb-6 px-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-md">
                  <span className="material-symbols-outlined">auto_stories</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 font-sans leading-tight">Project Alpha</h3>
                  <p className="text-xs text-slate-500">Academic Indexing</p>
                </div>
              </div>
              <button onClick={() => window.location.reload()} className="w-full py-2.5 px-4 bg-primary text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm">add</span>
                New Project
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              <Link className="flex items-center gap-3 px-4 py-3 bg-white text-indigo-700 shadow-sm rounded-xl text-sm font-medium" to="/index-designer">
                <span className="material-symbols-outlined">description</span>
                Manuscript
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors text-sm font-medium" to="/style-guide">
                <span className="material-symbols-outlined">auto_stories</span>
                Styles
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors text-sm font-medium" to="/curations">
                <span className="material-symbols-outlined">format_list_bulleted</span>
                Entries
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors text-sm font-medium" to="/history">
                <span className="material-symbols-outlined">ios_share</span>
                Export
              </Link>
            </nav>
          </aside>

          {/* Main Content Area: Split Screen */}
          <section className="flex-1 flex bg-surface-container-low overflow-hidden h-[calc(100vh-64px)]">
            {/* Left Column: Configure Index */}
            <div className="w-[400px] border-r border-outline-variant/20 p-8 overflow-y-auto bg-white/40">
              <header className="mb-10">
                <h1 className="font-headline text-3xl text-on-surface mb-2">Configure Index</h1>
                <p className="text-on-surface-variant text-sm">Organize your academic references and subject headings.</p>
              </header>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Subject Title</label>
                    <input value={newSubject} onChange={(e) => setNewSubject(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-outline" placeholder="e.g. Cognitive Behavioral Theory" type="text"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Question / Topic</label>
                    <textarea value={newTopic} onChange={(e) => setNewTopic(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-outline resize-none" placeholder="Detailed description of the topic or entry point..." rows={4}></textarea>
                  </div>
                  <div className="flex gap-4">
                    <div className="space-y-2 flex-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Page</label>
                      <input value={newPage} onChange={(e) => setNewPage(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary/10 transition-all" placeholder="124" type="text"/>
                    </div>
                    <div className="flex items-end">
                      <button onClick={handleAddEntry} className="h-[52px] w-[52px] bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all shadow-xl shadow-primary/30">
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-outline-variant/10">
                    <h4 className="font-headline text-xl text-on-surface mb-4">Recent Entries</h4>
                    <div className="space-y-3">
                      {entries.length === 0 && <p className="text-sm text-slate-500">No entries yet.</p>}
                      {entries.map(entry => (
                        <div key={entry.id} className="group bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-on-surface">{entry.subject}</p>
                            <p className="text-xs text-on-surface-variant">Page: {entry.page}</p>
                          </div>
                          <button onClick={() => handleDeleteEntry(entry.id)} className="opacity-0 group-hover:opacity-100 p-2 text-error hover:bg-error/10 rounded-xl transition-all">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
            </div>

            {/* Right Column: Manuscript Index Preview */}
            <div className="flex-1 p-12 overflow-y-auto flex flex-col items-center">
              {/* Preview Toolbar */}
              <div className="w-full max-w-[800px] mb-8 flex justify-between items-center glass-card px-6 py-3 rounded-2xl shadow-sm">
                <div className="flex gap-4 items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Template:</span>
                  <select value={template} onChange={(e) => setTemplate(e.target.value)} className="bg-transparent border-none text-sm font-semibold text-primary cursor-pointer focus:ring-0">
                    <option value="classic">Classic Academic</option>
                    <option value="modern">Modern Structural</option>
                    <option value="minimal">Minimal Elegance</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button disabled={isExporting} onClick={exportAsPDF} className="flex items-center gap-2 px-4 py-2 hover:bg-primary-container/10 text-primary font-medium text-sm rounded-xl transition-colors disabled:opacity-50">
                    <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                    {isExporting ? 'Exporting...' : 'PDF'}
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-primary-container/10 text-primary font-medium text-sm rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-lg">csv</span>
                    CSV
                  </button>
                  <button onClick={() => printElement(documentRef)} className="flex items-center gap-2 px-4 py-2 hover:bg-primary-container/10 text-primary font-medium text-sm rounded-xl transition-colors">
                    <span className="material-symbols-outlined text-lg">print</span>
                    Print
                  </button>
                </div>
              </div>

              {/* Document Preview */}
              {template === 'classic' && (
                <div ref={documentRef} className="w-full max-w-[800px] bg-white shadow-2xl p-10 md:p-20 flex flex-col relative aspect-[1/1.414]">
                  {/* University Logo / Header */}
                  <div className="flex justify-between items-start mb-16">
                    <div>
                      <h2 className="font-headline text-4xl italic text-on-surface mb-4">Manuscript Index</h2>
                      <img className="w-16 h-16 opacity-80 grayscale mix-blend-multiply" alt="University crest logo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8JO7khoKCSpi_-4SZmscZ1Vm6Qirz66-Wk4Cry-o2NQR44wMHsTiDkC4zkyGsR10GnbPW1jbkZyi6jJc0JlYZzck4mi8nZMogheBSrQgqgUxs7okNA2AbBDolL3ozT5V0_cDWJIF8euV1GwOy5UYP7JriD6e8CJoc4dcv6dNBeFgLGxURvQ7pMONnLLewSE-lvBM7D8UJkBntQgRfbTECBbeAsLbj5G0CqT6CdpQ1OU9P_Sz6OeuE5DL_AT1cA3bKS45i2zVl6F0"/>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-outline-variant uppercase tracking-tighter">Publication Draft</p>
                      <p className="text-sm text-on-surface-variant">Volume IV, Issue 2</p>
                      <p className="text-sm text-on-surface-variant">October 2024</p>
                    </div>
                  </div>

                  {/* Index Content */}
                  <div className="columns-1 md:columns-2 gap-12 text-sm leading-relaxed">
                    {sortedLetters.map(letter => (
                      <div key={letter} className="mb-8 break-inside-avoid">
                        <h3 className="font-headline text-2xl text-primary mb-4 border-b border-primary/10 pb-1">{letter}</h3>
                        <div className="space-y-2">
                          {groupedEntries[letter].sort((a, b) => a.subject.localeCompare(b.subject)).map(entry => (
                            <div key={entry.id} className="flex items-end">
                              <span className="text-on-surface">{entry.subject}</span>
                              <div className="dotted-leader"></div>
                              <span className="font-medium">{entry.page}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Page Footer Decor */}
                  <div className="mt-auto pt-12 text-center">
                    <div className="w-12 h-px bg-outline-variant/30 mx-auto mb-4"></div>
                    <p className="text-[10px] uppercase tracking-widest text-outline">Page 1</p>
                  </div>
                </div>
              )}

              {template === 'modern' && (
                <div ref={documentRef} className="w-full max-w-[800px] bg-white shadow-2xl p-10 md:p-20 flex flex-col relative aspect-[1/1.414]">
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-primary"></div>
                  <div className="flex items-center gap-6 mb-16 pl-6">
                    <h2 className="font-headline text-5xl font-bold tracking-tighter text-on-surface mb-2 uppercase">INDEX</h2>
                    <div className="h-px flex-1 bg-outline-variant/50"></div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-primary tracking-widest text-xs">2024 EDITION</p>
                    </div>
                  </div>
                  <div className="columns-1 md:columns-2 gap-16 text-sm leading-relaxed pl-6">
                    {sortedLetters.map(letter => (
                      <div key={letter} className="mb-10 break-inside-avoid">
                        <h3 className="text-5xl font-bold text-outline-variant/20 mb-4 -ml-4">{letter}</h3>
                        <div className="space-y-3">
                          {groupedEntries[letter].sort((a, b) => a.subject.localeCompare(b.subject)).map(entry => (
                            <div key={entry.id} className="flex justify-between items-baseline border-b border-outline-variant/20 pb-1">
                              <span className="text-on-surface font-semibold">{entry.subject}</span>
                              <span className="font-bold text-primary ml-4">{entry.page}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {template === 'minimal' && (
                <div ref={documentRef} className="w-full max-w-[800px] bg-white shadow-2xl p-10 md:p-20 flex flex-col relative aspect-[1/1.414]">
                  <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl tracking-[0.3em] font-light text-on-surface uppercase border-y border-outline-variant/30 py-4 mb-4">Index of Terms</h2>
                    <p className="font-serif italic text-outline-variant text-sm">Compiled Alphabetically</p>
                  </div>
                  <div className="columns-1 md:columns-3 gap-8 text-xs leading-loose font-serif">
                    {sortedLetters.map(letter => (
                      <div key={letter} className="mb-8 break-inside-avoid text-center">
                        <h3 className="font-bold text-lg mb-4">{letter}</h3>
                        <div className="space-y-1">
                          {groupedEntries[letter].sort((a, b) => a.subject.localeCompare(b.subject)).map(entry => (
                            <div key={entry.id} className="flex justify-between items-center px-2">
                              <span>{entry.subject}</span>
                              <span className="text-outline-variant italic">{entry.page}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="bg-slate-50 border-t border-slate-200/30 flex justify-between items-center px-8 py-6 w-full shrink-0">
          <p className="font-body text-xs text-slate-500">© 2024 ScholarFlow Index Designer. Licensed for Academic Research.</p>
          <div className="flex gap-6">
            <Link className="text-slate-400 hover:text-slate-600 focus:outline-none font-body text-xs transition-opacity opacity-80 hover:opacity-100" to="/contact-support">Contact Support</Link>
            <Link className="text-slate-400 hover:text-slate-600 focus:outline-none font-body text-xs transition-opacity opacity-80 hover:opacity-100" to="/terms-of-service">Licensing Agreement</Link>
            <Link className="text-slate-400 hover:text-slate-600 focus:outline-none font-body text-xs transition-opacity opacity-80 hover:opacity-100" to="/privacy-policy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </>
  );
}
