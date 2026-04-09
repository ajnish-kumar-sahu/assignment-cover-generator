import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { type CoverData, generateCoverHTML } from '../utils/templates';
import { downloadPDF, downloadJPG, printDocument } from '../utils/exportUtils';
import { useAppStore } from '../store/useAppStore';
import { useFormValidation } from '../hooks/useFormValidation';
import { useDebouncedCallback } from 'use-debounce';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import Logo from '../components/Logo';

const DEFAULT_DATA: CoverData = {
  subject: 'The Impact of Renaissance Art on Modern UI',
  studentName: 'Alex Sterling',
  courseCode: 'CS-401',
  rollNumber: '2024-8891',
  classRoll: '14',
  semester: 'Fall 2024',
  submissionDate: new Date().toISOString().split('T')[0],
  assignmentType: 'Term Project',
  themeColor: '#3525cd',
  template: 'classic',
  universityName: 'Vinoba Bhave University',
  department: 'Department of Computer Application',
  logoUrl: 'https://i1.wp.com/www.winmeen.com/wp-content/uploads/2017/04/VBU-New-Logo.png?ssl=1',
};

// Material 3 injected CSS variables for Tailwind v4 compatibility
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
  .sidebar-transition {
    transition: width 0.2s ease-in-out;
  }
`;

export default function CoverGenerator() {
  const { addNotification, saveCover } = useAppStore();
  const [data, setData] = useState<CoverData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(false);
  const [exportProgress, setExportProgress] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [expandedSections, setExpandedSections] = useState({ institutional: true, student: true, document: false, design: true });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { errors, isValid } = useFormValidation(data);

  useEffect(() => {
    const handleResize = () => setSidebarOpen(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updatePreview = useDebouncedCallback(() => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const safeData = { ...data };
      // Always convert relative URLs to absolute so the iframe can fetch local public files
      if (safeData.logoUrl && safeData.logoUrl.startsWith('/')) {
        safeData.logoUrl = window.location.origin + safeData.logoUrl;
      }
      
      const html = generateCoverHTML(safeData);
      iframeRef.current.contentDocument.open();
      iframeRef.current.contentDocument.write(html);
      iframeRef.current.contentDocument.close();
    }
  }, 500);

  useEffect(() => {
    updatePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const contentW = 794;
        const contentH = 1123;
        const scaleX = width / contentW;
        const scaleY = height / contentH;
        setScale(Math.min(scaleX, scaleY));
      }
    });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard shortcuts
  const handleExportPDF = async () => {
    if (!isValid || loading) return;
    setLoading(true);
    setExportProgress(0);
    try {
      await downloadPDF(iframeRef, 'assignment-cover.pdf', setExportProgress);
      addNotification({ message: 'PDF exported successfully', type: 'success' });
    } catch(err) {
      addNotification({ message: 'Export failed', type: 'error' });
    }
    setLoading(false);
    setExportProgress(null);
  };

  useKeyboardShortcuts([
    { key: 'e', ctrlKey: true, callback: handleExportPDF },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleShare = async () => {
    const shareData = {
      title: 'ScholarFlow Cover Document',
      text: `Check out this academic cover I generated for my research: ${data.subject}!`,
      url: window.location.href,
    };

    const fallbackShare = () => {
      navigator.clipboard.writeText(window.location.href)
        .then(() => addNotification({ message: 'Link copied!', type: 'success' }))
        .catch(() => addNotification({ message: 'Unable to copy link', type: 'error' }));
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => fallbackShare());
    } else {
      fallbackShare();
    }
  };

  const handleReset = () => {
    setData(DEFAULT_DATA);
    addNotification({ message: 'Design reset to defaults', type: 'info' });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Count filled required fields for progress indicator
  const requiredFields = { subject: data.subject, studentName: data.studentName, rollNumber: data.rollNumber, courseCode: data.courseCode };
  const filledRequired = Object.values(requiredFields).filter(v => v && v.trim()).length;
  const totalRequired = Object.keys(requiredFields).length;
  const progressPercent = (filledRequired / totalRequired) * 100;

  return (
    <>
      <style>{MD3_THEME}</style>
      <div className="bg-surface font-body text-on-surface overflow-x-hidden min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="bg-surface/70 backdrop-blur-lg flex justify-between items-center w-full px-8 py-4 sticky top-0 z-50 transition-all border-b border-outline-variant/20 shadow-sm">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden md:flex gap-8 ml-8">
              <Link className="text-slate-600 hover:text-indigo-500 font-medium text-sm transition-colors" to="/templates">Templates</Link>
              <Link className="text-slate-600 hover:text-indigo-500 font-medium text-sm transition-colors" to="/my-covers">My Covers</Link>
              <Link className="text-slate-600 hover:text-indigo-500 font-medium text-sm transition-colors" to="/style-guide">Style Guide</Link>
              <Link className="text-slate-600 hover:text-indigo-500 font-medium text-sm transition-colors" to="/history">History</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link title="Notifications" to="/notifications" className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-indigo-50/50 rounded-full transition-colors">notifications</Link>
            <Link title="Settings" to="/settings" className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-indigo-50/50 rounded-full transition-colors">settings</Link>
            <Link title="Profile" to="/profile" className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-indigo-50/50 rounded-full transition-colors">account_circle</Link>
            <Link to="/cover-generator" className="bg-primary-container text-on-primary-container px-6 py-2 rounded-xl font-medium shadow-sm hover:scale-95 transition-transform duration-200">Create New</Link>
          </div>
        </header>

        <div className="flex flex-1">
          {/* SideNavBar */}
          <aside className={`sidebar-transition hidden lg:flex flex-col h-[calc(100vh-73px)] sticky top-[73px] py-6 bg-slate-50 border-r border-slate-200/50 shrink-0 overflow-y-auto ${sidebarOpen ? 'w-64 px-4' : 'w-20 px-2'}`}>
            <div className={`mb-8 flex items-center ${sidebarOpen ? 'justify-between px-4' : 'justify-center'}`}>
              {sidebarOpen && (
                <div>
                  <h2 className="text-lg font-headline text-indigo-900">Editor Workspace</h2>
                  <p className="text-[10px] text-on-surface-variant/70 tracking-tight font-bold uppercase mt-1">Modern Gallery</p>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="material-symbols-outlined text-slate-400 hover:text-indigo-600 transition-colors bg-white hover:bg-indigo-50 p-1.5 rounded-lg border border-slate-200/50 shadow-sm"
                title={sidebarOpen ? "Minimize Workspace" : "Expand Workspace"}
              >
                {sidebarOpen ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right'}
              </button>
            </div>

            <nav className="flex-1 space-y-1">
              <Link to="/cover-generator" className={`flex items-center text-indigo-700 bg-white rounded-xl shadow-sm border border-slate-200/50 transition-all ${sidebarOpen ? 'px-4 py-3 gap-3' : 'justify-center p-3 mx-1'}`}>
                <span className="material-symbols-outlined">edit_note</span>
                {sidebarOpen && <span className="text-sm font-medium tracking-wide">Generator</span>}
              </Link>
              <Link to="/templates" className={`flex items-center text-slate-500 hover:bg-slate-200/50 rounded-xl transition-colors ${sidebarOpen ? 'px-4 py-3 gap-3' : 'justify-center p-3 mx-1 mt-2'}`}>
                <span className="material-symbols-outlined">dashboard_customize</span>
                {sidebarOpen && <span className="text-sm font-medium tracking-wide">Layouts</span>}
              </Link>
              <Link to="/style-guide" className={`flex items-center text-slate-500 hover:bg-slate-200/50 rounded-xl transition-colors ${sidebarOpen ? 'px-4 py-3 gap-3' : 'justify-center p-3 mx-1 mt-2'}`}>
                <span className="material-symbols-outlined">font_download</span>
                {sidebarOpen && <span className="text-sm font-medium tracking-wide">Typography</span>}
              </Link>
              <Link to="/curations" className={`flex items-center text-slate-500 hover:bg-slate-200/50 rounded-xl transition-colors ${sidebarOpen ? 'px-4 py-3 gap-3' : 'justify-center p-3 mx-1 mt-2'}`}>
                <span className="material-symbols-outlined">grid_view</span>
                {sidebarOpen && <span className="text-sm font-medium tracking-wide">Assets</span>}
              </Link>
            </nav>

            <div className="mt-8 space-y-4 px-2">
              <button disabled={!isValid} onClick={async () => { try { await downloadPDF(iframeRef, 'assignment-cover.pdf'); } catch(e) { addNotification({ message: 'Export error', type: 'error' }); } }} title="Export PDF" className={`w-full bg-primary-container text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all rounded-xl disabled:opacity-50 ${sidebarOpen ? 'py-3 font-semibold text-sm' : 'py-3 flex justify-center items-center'}`}>
                {sidebarOpen ? 'Export PDF' : <span className="material-symbols-outlined text-sm">picture_as_pdf</span>}
              </button>
              <div className={`pt-4 border-t border-slate-200/50 ${sidebarOpen ? 'space-y-1 px-2' : 'flex flex-col items-center gap-4'}`}>
                <Link className={`flex items-center text-slate-500 hover:text-indigo-500 transition-colors ${sidebarOpen ? 'gap-3 py-2' : ''}`} to="/contact-support" title="Help">
                  <span className="material-symbols-outlined text-sm">help_outline</span>
                  {sidebarOpen && <span className="text-xs font-medium">Help</span>}
                </Link>
                <Link className={`flex items-center text-slate-500 hover:text-indigo-500 transition-colors ${sidebarOpen ? 'gap-3 py-2' : ''}`} to="/contact-support" title="Feedback">
                  <span className="material-symbols-outlined text-sm">chat_bubble_outline</span>
                  {sidebarOpen && <span className="text-xs font-medium">Feedback</span>}
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Workspace */}
          <main className="flex-1 p-8 lg:p-12 bg-surface">
            {/* Header Section */}
            <header className="mb-12">
              <h1 className="font-headline text-5xl text-on-surface mb-2 tracking-tight">Template Design </h1>
              <p className="text-on-surface-variant max-w-2xl text-lg">Curate your academic identity with our editorial-grade cover generator. Select a style and fine-tune your details below.</p>
            </header>

            {/* Template Gallery */}
            <section className="mb-12 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div className="flex gap-6 pb-4">

                {/* Classic */}
                <div onClick={() => setData({...data, template: 'classic'})} className="flex-shrink-0 w-40 group cursor-pointer">
                  <div className={`aspect-[1/1.414] w-full bg-surface-container-lowest rounded-xl shadow-lg p-2 transition-all duration-300 group-hover:-translate-y-1 ${data.template === 'classic' ? 'ring-2 ring-primary ring-offset-2' : 'border border-slate-200'}`}>
                    <div className="w-full h-full border-2 border-primary/20 flex flex-col items-center justify-center bg-white"><span className="font-headline italic text-xs text-primary">Classic</span></div>
                  </div>
                  <p className={`text-center text-sm mt-3 ${data.template === 'classic' ? 'font-bold text-primary' : 'font-medium text-slate-500'}`}>Classic</p>
                </div>

                {/* Modern */}
                <div onClick={() => setData({...data, template: 'modern'})} className="flex-shrink-0 w-40 group cursor-pointer">
                  <div className={`aspect-[1/1.414] w-full bg-surface-container-low rounded-xl p-2 transition-all duration-300 group-hover:bg-surface-container-highest group-hover:-translate-y-1 ${data.template === 'modern' ? 'ring-2 ring-primary ring-offset-2 shadow-lg' : 'border border-slate-200'}`}>
                    <div className="w-full h-full bg-slate-100 flex flex-col items-end p-2"><div className="w-4 h-full bg-primary/20"></div></div>
                  </div>
                  <p className={`text-center text-sm mt-3 ${data.template === 'modern' ? 'font-bold text-primary' : 'font-medium text-slate-500'}`}>Modern</p>
                </div>

                {/* Minimal */}
                <div onClick={() => setData({...data, template: 'minimal'})} className="flex-shrink-0 w-40 group cursor-pointer">
                  <div className={`aspect-[1/1.414] w-full bg-surface-container-low rounded-xl p-2 transition-all duration-300 group-hover:bg-surface-container-highest group-hover:-translate-y-1 ${data.template === 'minimal' ? 'ring-2 ring-primary ring-offset-2 shadow-lg' : 'border border-slate-200'}`}>
                    <div className="w-full h-full bg-white flex flex-col items-center justify-center border border-slate-100"><div className="w-8 h-[1px] bg-slate-300 mb-1"></div><span className="text-[8px] uppercase tracking-widest text-slate-300 font-bold">Minimal</span></div>
                  </div>
                  <p className={`text-center text-sm mt-3 ${data.template === 'minimal' ? 'font-bold text-primary' : 'font-medium text-slate-500'}`}>Minimal</p>
                </div>

                {/* Professional */}
                <div onClick={() => setData({...data, template: 'professional'})} className="flex-shrink-0 w-40 group cursor-pointer">
                  <div className={`aspect-[1/1.414] w-full bg-surface-container-low rounded-xl p-2 transition-all duration-300 group-hover:bg-surface-container-highest group-hover:-translate-y-1 ${data.template === 'professional' ? 'ring-2 ring-primary ring-offset-2 shadow-lg' : 'border border-slate-200'}`}>
                    <div className="w-full h-full bg-slate-50 flex flex-col p-2 border border-slate-100"><div className="w-full h-2 bg-slate-200 mb-auto"></div><div className="w-1/2 h-4 bg-slate-200"></div></div>
                  </div>
                  <p className={`text-center text-sm mt-3 ${data.template === 'professional' ? 'font-bold text-primary' : 'font-medium text-slate-500'}`}>Professional</p>
                </div>

                {/* Elegant */}
                <div onClick={() => setData({...data, template: 'elegant'})} className="flex-shrink-0 w-40 group cursor-pointer">
                  <div className={`aspect-[1/1.414] w-full bg-surface-container-low rounded-xl p-2 transition-all duration-300 group-hover:bg-surface-container-highest group-hover:-translate-y-1 ${data.template === 'elegant' ? 'ring-2 ring-primary ring-offset-2 shadow-lg' : 'border border-slate-200'}`}>
                    <div className="w-full h-full bg-amber-50/30 flex flex-col items-center justify-center border border-amber-100"><div className="rounded-full border border-amber-200 p-1"><div className="w-4 h-4 rounded-full bg-amber-100"></div></div></div>
                  </div>
                  <p className={`text-center text-sm mt-3 ${data.template === 'elegant' ? 'font-bold text-primary' : 'font-medium text-slate-500'}`}>Elegant</p>
                </div>

                {/* Creative */}
                <div onClick={() => setData({...data, template: 'creative'})} className="flex-shrink-0 w-40 group cursor-pointer">
                  <div className={`aspect-[1/1.414] w-full bg-surface-container-low rounded-xl p-2 transition-all duration-300 group-hover:bg-surface-container-highest group-hover:-translate-y-1 ${data.template === 'creative' ? 'ring-2 ring-primary ring-offset-2 shadow-lg' : 'border border-slate-200'}`}>
                    <div className="w-full h-full bg-pink-50 flex items-end p-2 overflow-hidden"><div className="w-10 h-10 rounded-full bg-pink-200 -mb-4 -ml-4"></div></div>
                  </div>
                  <p className={`text-center text-sm mt-3 ${data.template === 'creative' ? 'font-bold text-primary' : 'font-medium text-slate-500'}`}>Creative</p>
                </div>

                {/* Academic */}
                <div onClick={() => setData({...data, template: 'academic'})} className="flex-shrink-0 w-40 group cursor-pointer">
                  <div className={`aspect-[1/1.414] w-full bg-surface-container-low rounded-xl p-2 transition-all duration-300 group-hover:bg-surface-container-highest group-hover:-translate-y-1 ${data.template === 'academic' ? 'ring-2 ring-primary ring-offset-2 shadow-lg' : 'border border-slate-200'}`}>
                    <div className="w-full h-full bg-slate-50 flex flex-col items-center p-4 border border-slate-200"><div className="w-6 h-6 border-2 border-slate-300 rounded-sm"></div></div>
                  </div>
                  <p className={`text-center text-sm mt-3 ${data.template === 'academic' ? 'font-bold text-primary' : 'font-medium text-slate-500'}`}>Academic</p>
                </div>

              </div>
            </section>

            {/* Mobile Tab Navigation */}
            <div className="md:hidden mb-8 flex gap-2 bg-slate-100 rounded-xl p-1">
              <button onClick={() => setActiveTab('form')} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${activeTab === 'form' ? 'bg-white text-primary shadow-sm' : 'text-slate-600'}`}>
                <span className="material-symbols-outlined text-lg align-middle mr-1">edit</span>Form
              </button>
              <button onClick={() => setActiveTab('preview')} className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${activeTab === 'preview' ? 'bg-white text-primary shadow-sm' : 'text-slate-600'}`}>
                <span className="material-symbols-outlined text-lg align-middle mr-1">preview</span>Preview
              </button>
            </div>

            {/* Workspace Layout */}
            <div className={`grid grid-cols-1 xl:grid-cols-12 gap-12 items-start ${isMobile && activeTab === 'preview' ? 'hidden' : ''}`}>

              {/* LEFT PANEL: Form */}
              <div className={`xl:col-span-5 space-y-6 ${isMobile && activeTab === 'preview' ? 'hidden' : ''}`}>
                <div className="bg-surface-container border border-outline-variant/30 rounded-2xl p-6 lg:p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-headline text-2xl lg:text-3xl text-indigo-950">Document Details</h3>
                      <p className="text-xs text-on-surface-variant mt-1">Complete the form to generate your cover</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-xs font-bold text-slate-500 mb-1">Progress</div>
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <form className="space-y-4">
                    {/* SECTION 1: Institutional Identity */}
                    <div className="border border-outline-variant/20 rounded-xl overflow-hidden">
                      <button type="button" onClick={() => toggleSection('institutional')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">account_balance</span>
                          <div className="text-left">
                            <h4 className="font-headline text-lg text-indigo-900">Institutional Identity</h4>
                            <p className="text-xs text-on-surface-variant">University, department, and logo</p>
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-slate-400 transition-transform ${expandedSections.institutional ? 'rotate-180' : ''}`}>expand_more</span>
                      </button>
                      {expandedSections.institutional && (
                        <div className="px-4 pb-4 space-y-4 border-t border-outline-variant/20 bg-slate-50/30 pt-4">
                          <h4 className="font-headline text-sm text-indigo-900 mb-2">Institutional Identity</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">University <span className="text-red-500">*</span></label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">account_balance</span>
                                <input name="universityName" value={data.universityName || ''} onChange={handleChange} placeholder="e.g. Oxford University" className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none" type="text" />
                              </div>
                            </div>
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Department</label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">domain</span>
                                <input name="department" value={data.department || ''} onChange={handleChange} placeholder="e.g. Computer Science" className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none" type="text" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2 relative group">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Logo URL</label>
                            <div className="relative">
                              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">image</span>
                              <input name="logoUrl" value={data.logoUrl || ''} onChange={handleChange} placeholder="https://example.com/logo.png" className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none" type="url" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 2: Student & Document Info */}
                    <div className="border border-outline-variant/20 rounded-xl overflow-hidden">
                      <button type="button" onClick={() => toggleSection('student')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">person</span>
                          <div className="text-left">
                            <h4 className="font-headline text-lg text-indigo-900">Student Information</h4>
                            <p className="text-xs text-on-surface-variant">Name, ID, and course details</p>
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-slate-400 transition-transform ${expandedSections.student ? 'rotate-180' : ''}`}>expand_more</span>
                      </button>
                      {expandedSections.student && (
                        <div className="px-4 pb-4 space-y-4 border-t border-outline-variant/20 bg-slate-50/30 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Student Name <span className="text-red-500">*</span></label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">person</span>
                                <input name="studentName" value={data.studentName} onChange={handleChange} className={`w-full bg-white border rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all outline-none ${errors.studentName ? 'border-red-400 focus:border-red-500' : 'border-outline-variant/30 focus:border-primary'}`} type="text" />
                              </div>
                              {errors.studentName && <p className="text-xs text-red-500 ml-1">{errors.studentName}</p>}
                            </div>
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Faculty / Instructor</label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">badge</span>
                                <input className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none" placeholder="Instructor Name" type="text" />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Roll <span className="text-red-500">*</span></label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">pin</span>
                                <input name="rollNumber" value={data.rollNumber} onChange={handleChange} className={`w-full bg-white border rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-semibold font-mono focus:ring-4 focus:ring-primary/10 transition-all outline-none ${errors.rollNumber ? 'border-red-400 focus:border-red-500' : 'border-outline-variant/30 focus:border-primary'}`} type="text" />
                              </div>
                              {errors.rollNumber && <p className="text-xs text-red-500 ml-1">{errors.rollNumber}</p>}
                            </div>
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Class Roll</label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">numbers</span>
                                <input name="classRoll" value={data.classRoll} onChange={handleChange} className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-semibold font-mono focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none" type="text" />
                              </div>
                            </div>
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Semester</label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">school</span>
                                <select name="semester" value={data.semester} onChange={handleChange} className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-10 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none">
                                  <option value="Fall 2024">Fall 2024</option>
                                  <option value="Spring 2025">Spring 2025</option>
                                  <option value="1st">1st Trimester</option>
                                  <option value="2nd">2nd Trimester</option>
                                  <option value="3rd">3rd Trimester</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 3: Document Details */}
                    <div className="border border-outline-variant/20 rounded-xl overflow-hidden">
                      <button type="button" onClick={() => toggleSection('document')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">description</span>
                          <div className="text-left">
                            <h4 className="font-headline text-lg text-indigo-900">Document Details</h4>
                            <p className="text-xs text-on-surface-variant">Title, dates, and assignment info</p>
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-slate-400 transition-transform ${expandedSections.document ? 'rotate-180' : ''}`}>expand_more</span>
                      </button>
                      {expandedSections.document && (
                        <div className="px-4 pb-4 space-y-4 border-t border-outline-variant/20 bg-slate-50/30 pt-4">
                          <div className="space-y-2 relative group">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Research Title <span className="text-red-500">*</span></label>
                            <div className="relative">
                              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">menu_book</span>
                              <input name="subject" value={data.subject} onChange={handleChange} className={`w-full bg-white border rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 transition-all outline-none ${errors.subject ? 'border-red-400 focus:border-red-500' : 'border-outline-variant/30 focus:border-primary'}`} type="text" />
                            </div>
                            {errors.subject && <p className="text-xs text-red-500 ml-1">{errors.subject}</p>}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Submission Date</label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-lg">calendar_today</span>
                                <input name="submissionDate" type="date" value={data.submissionDate} onChange={handleChange} className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none" />
                              </div>
                            </div>
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Assignment Type</label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">assignment</span>
                                <input name="assignmentType" value={data.assignmentType} onChange={handleChange} placeholder="e.g. Term Project" className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-medium focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none" type="text" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SECTION 4: Design & Theme */}
                    <div className="border border-outline-variant/20 rounded-xl overflow-hidden">
                      <button type="button" onClick={() => toggleSection('design')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">palette</span>
                          <div className="text-left">
                            <h4 className="font-headline text-lg text-indigo-900">Design & Theme</h4>
                            <p className="text-xs text-on-surface-variant">Colors, course code, and styling</p>
                          </div>
                        </div>
                        <span className={`material-symbols-outlined text-slate-400 transition-transform ${expandedSections.design ? 'rotate-180' : ''}`}>expand_more</span>
                      </button>
                      {expandedSections.design && (
                        <div className="px-4 pb-4 space-y-4 border-t border-outline-variant/20 bg-slate-50/30 pt-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Course Code <span className="text-red-500">*</span></label>
                              <div className="relative">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-lg">tag</span>
                                <input name="courseCode" value={data.courseCode} onChange={handleChange} className={`w-full bg-white border rounded-lg py-3 pr-4 pl-12 text-on-surface text-sm font-bold font-mono focus:ring-4 focus:ring-primary/10 transition-all outline-none ${errors.courseCode ? 'border-red-400 focus:border-red-500' : 'border-outline-variant/30 focus:border-primary'}`} type="text" />
                              </div>
                              {errors.courseCode && <p className="text-xs text-red-500 ml-1">{errors.courseCode}</p>}
                            </div>
                            <div className="space-y-2 relative group">
                              <label className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant ml-1">Theme Color</label>
                              <div className="relative flex items-center gap-3">
                                <input name="themeColor" value={data.themeColor} onChange={handleChange} className="w-16 h-12 bg-white border border-outline-variant/30 rounded-lg cursor-pointer focus:ring-4 focus:ring-primary/10 outline-none" type="color" />
                                <div className="flex-1">
                                  <input type="text" value={data.themeColor} onChange={(e) => setData(prev => ({ ...prev, themeColor: e.target.value }))} className="w-full bg-white border border-outline-variant/30 rounded-lg py-3 px-3 text-on-surface text-sm font-mono focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none" placeholder="#3525cd" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>

                {/* Moment of Insight - Only show on desktop */}
                <div className="hidden lg:block">
                <div className="bg-surface-container-high rounded-2xl p-8 relative overflow-hidden group border border-outline-variant/20 shadow-sm">
                  <div className="absolute -top-12 -right-12 w-40 h-40 bg-tertiary-fixed-dim/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                  <span className="material-symbols-outlined text-tertiary text-4xl mb-4">format_quote</span>
                  <blockquote className="font-headline text-2xl text-indigo-950 italic mb-4 leading-relaxed tracking-tight">
                    "The function of design is letting the design function."
                  </blockquote>
                  <cite className="text-sm font-bold tracking-wide text-on-surface-variant not-italic uppercase opacity-80">— Massimo Vignelli</cite>
                </div>
                </div>
              </div>

              {/* RIGHT PANEL: Interactive Preview */}
              <div className={`xl:col-span-7 flex flex-col gap-6 ${isMobile && activeTab === 'form' ? 'hidden' : ''}`}>

                <div className="bg-surface-container-high rounded-3xl p-8 lg:p-12 flex justify-center items-center shadow-inner relative group border border-outline-variant/20 min-h-[600px]">
                  {/* MacOS style dots */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-error-container shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-tertiary-container shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-secondary-container shadow-sm"></span>
                  </div>

                  {/* Perfect Resizing A4 Iframe Canvas */}
                  <div ref={containerRef} className="w-full max-w-[550px] aspect-[1/1.414] relative flex items-center justify-center bg-transparent z-10 transition-all">

                    {loading && (
                      <div className="absolute inset-0 bg-white/50 backdrop-blur-md z-50 flex flex-col items-center justify-center rounded-md border border-outline-variant/20">
                         <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                         <p className="mt-4 font-bold tracking-widest text-xs uppercase text-primary">Processing High-Res Asset</p>
                      </div>
                    )}

                    <div
                      className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] origin-center flex absolute z-10 transition-transform duration-100 ring-1 ring-slate-900/5 group-hover:shadow-[0_25px_65px_-10px_rgba(0,0,0,0.3)]"
                      style={{
                        width: '794px',
                        height: '1123px',
                        transform: `scale(${scale})`
                      }}
                    >
                      <iframe
                        ref={iframeRef}
                        className="w-full h-full border-none m-0 p-0 pointer-events-none group-hover:pointer-events-auto transition-opacity"
                        title="Premium Cover Preview"
                      />
                    </div>
                  </div>

                  {/* Interaction Overlay */}
                  <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-20">
                    <button onClick={handleReset} title="Reset to Defaults" className="bg-white/90 backdrop-blur text-error border border-outline-variant/30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 ring-error/20">
                      <span className="material-symbols-outlined">restart_alt</span>
                    </button>
                    <button onClick={updatePreview} title="Refresh Preview" className="bg-white/90 backdrop-blur text-primary border border-outline-variant/30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 ring-primary/20">
                      <span className="material-symbols-outlined">zoom_in</span>
                    </button>
                    <button onClick={handleShare} title="Share" className="bg-white/90 backdrop-blur text-primary border border-outline-variant/30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-4 ring-primary/20">
                      <span className="material-symbols-outlined">share</span>
                    </button>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex flex-wrap gap-4 justify-between items-center mt-2">
                  <div className="flex gap-4">
                    <button disabled={loading || !isValid} onClick={async () => {
                      setLoading(true);
                      setExportProgress(0);
                      try {
                        await downloadPDF(iframeRef, 'assignment-cover.pdf', setExportProgress);
                        const newCover = { ...data, id: Date.now(), name: data.subject || 'Document Cover', date: new Date().toLocaleDateString(), size: '2 MB', img: data.logoUrl || 'https://via.placeholder.com/300', color: 'from-slate-700 to-slate-950' };
                        saveCover(newCover);
                        addNotification({ message: 'PDF generated and saved successfully', type: 'success' });
                      } catch(err) {
                        addNotification({ message: err instanceof Error ? err.message : 'Error generating PDF', type: 'error' });
                      }
                      setLoading(false);
                      setExportProgress(null);
                    }} className="relative overflow-hidden flex items-center gap-2 px-6 py-4 bg-surface-container border border-outline-variant/20 text-indigo-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-surface-container-highest transition-all shadow-sm active:scale-95 disabled:opacity-50">
                      {exportProgress !== null && <div className="absolute left-0 top-0 bottom-0 bg-primary/20 transition-all duration-300" style={{width: `${exportProgress}%`}}></div>}
                      <span className="relative z-10 flex items-center gap-2"><span className="material-symbols-outlined text-[20px]">picture_as_pdf</span> Export PDF</span>
                    </button>
                    <button disabled={loading || !isValid} onClick={async () => {
                      setLoading(true);
                      setExportProgress(0);
                      try {
                        await downloadJPG(iframeRef, 'assignment-cover.jpg');
                        const newCover = { ...data, id: Date.now(), name: data.subject || 'Document Cover', date: new Date().toLocaleDateString(), size: '1.5 MB', img: data.logoUrl || 'https://via.placeholder.com/300', color: 'from-slate-700 to-slate-950' };
                        saveCover(newCover);
                        addNotification({ message: 'JPG generated and saved successfully', type: 'success' });
                      } catch(err) {
                        addNotification({ message: err instanceof Error ? err.message : 'Error generating JPG', type: 'error' });
                      }
                      setLoading(false);
                      setExportProgress(null);
                    }} className="relative overflow-hidden flex items-center gap-2 px-6 py-4 bg-surface-container border border-outline-variant/20 text-indigo-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-surface-container-highest transition-all shadow-sm active:scale-95 disabled:opacity-50">
                      <span className="relative z-10 flex items-center gap-2"><span className="material-symbols-outlined text-[20px] text-emerald-600">image</span> Download JPG</span>
                    </button>
                  </div>
                  <button disabled={loading} onClick={() => printDocument(iframeRef)} className="flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95 disabled:opacity-50 group">
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-y-0.5">print</span>
                    Print Cover
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-surface-bright/90 backdrop-blur-xl py-4 px-8 flex justify-around items-center border-t border-outline-variant/20 z-50 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
          <Link to="/cover-generator" className="flex flex-col items-center gap-1 text-primary"><span className="material-symbols-outlined">edit_note</span><span className="text-[10px] font-bold">Generator</span></Link>
          <Link to="/templates" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">dashboard_customize</span><span className="text-[10px] font-medium">Templates</span></Link>
          <Link to="/curations" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">grid_view</span><span className="text-[10px] font-medium">Assets</span></Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">account_circle</span><span className="text-[10px] font-medium">Profile</span></Link>
        </nav>
      </div>
    </>
  );
}
