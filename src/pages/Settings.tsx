import { useState, useEffect } from 'react';
import DocLayout from '../components/DocLayout';
import { useAppStore } from '../store/useAppStore';

export default function Settings() {
  const { settings, updateSettings } = useAppStore();
  
  const [theme, setTheme] = useState(settings.theme);
  const [dpi, setDpi] = useState(settings.dpi);
  const [autoSync, setAutoSync] = useState(settings.autoSync);

  useEffect(() => {
    updateSettings({ theme, dpi, autoSync });
  }, [theme, dpi, autoSync, updateSettings]);

  return (
    <DocLayout title="System Configurations">
      <div className="max-w-4xl mx-auto mt-10">
        <p className="text-slate-500 font-light text-lg mb-12">Fine-tune ScholarFlow to match your institutional requirements and aesthetic formatting defaults.</p>
        
        <div className="space-y-8">
          {/* Aesthetic Engine Block */}
          <div className="bg-white/60 p-10 rounded-[2rem] border border-outline-variant/30 shadow-[0_8px_32px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-primary/20 transition-all">
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <span className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary material-symbols-outlined text-2xl">palette</span>
              <div>
                <h3 className="text-2xl font-headline text-indigo-950 font-semibold mb-1">Aesthetic Engine</h3>
                <p className="text-slate-500 text-sm font-light">Determine the visual baseline for your interface.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
              <button onClick={() => setTheme('light')} className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-slate-300 text-slate-500'}`}>
                <span className="material-symbols-outlined mb-2 text-3xl">light_mode</span>
                <span className="text-xs font-bold uppercase tracking-widest">Light</span>
              </button>
              <button onClick={() => setTheme('dark')} className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-slate-300 text-slate-500'}`}>
                <span className="material-symbols-outlined mb-2 text-3xl">dark_mode</span>
                <span className="text-xs font-bold uppercase tracking-widest">Dark</span>
              </button>
              <button onClick={() => setTheme('system')} className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 hover:border-slate-300 text-slate-500'}`}>
                <span className="material-symbols-outlined mb-2 text-3xl">devices</span>
                <span className="text-xs font-bold uppercase tracking-widest">System</span>
              </button>
            </div>
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          </div>

          {/* Academic Export Block */}
          <div className="bg-white/60 p-10 rounded-[2rem] border border-outline-variant/30 shadow-[0_8px_32px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-tertiary/20 transition-all">
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                 <span className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary material-symbols-outlined text-2xl">picture_as_pdf</span>
                 <div>
                   <h3 className="text-2xl font-headline text-indigo-950 font-semibold mb-1">Export Resolution</h3>
                   <p className="text-slate-500 text-sm font-light">Global PDF rendering rules for final submissions.</p>
                 </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <button onClick={() => setDpi('150')} className={`px-6 py-4 rounded-xl border flex items-center justify-between transition-all ${dpi === '150' ? 'border-tertiary bg-tertiary/5 text-tertiary ring-2 ring-tertiary/20' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                <span className="font-semibold text-sm">Digital View (150 DPI)</span>
                {dpi === '150' && <span className="material-symbols-outlined text-lg">check_circle</span>}
              </button>
              <button onClick={() => setDpi('300')} className={`px-6 py-4 rounded-xl border flex items-center justify-between transition-all ${dpi === '300' ? 'border-tertiary bg-tertiary/5 text-tertiary ring-2 ring-tertiary/20' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                <span className="font-semibold text-sm">Print Ready (300 DPI)</span>
                {dpi === '300' && <span className="material-symbols-outlined text-lg">check_circle</span>}
              </button>
            </div>
            <div className="absolute border-t border-slate-200/50 mt-8 pt-6 right-10 left-10 flex justify-between items-center bottom-8">
               <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">A4 Scale Vectorization Active</span>
               <span className="material-symbols-outlined text-tertiary/50">verified</span>
            </div>
          </div>

          {/* Sync & Backup Block */}
          <div className="bg-white/60 p-10 rounded-[2rem] border border-outline-variant/30 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-secondary/20 transition-all">
            <div className="flex items-center gap-4 relative z-10">
              <span className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary material-symbols-outlined text-2xl">cloud_sync</span>
              <div>
                <h3 className="text-2xl font-headline text-indigo-950 font-semibold mb-1">Automatic Portfolio Sync</h3>
                <p className="text-slate-500 text-sm font-light">Continuously backup newly generated covers to your local index pool.</p>
              </div>
            </div>
            <button 
              onClick={() => setAutoSync(!autoSync)} 
              className={`w-16 h-8 rounded-full relative transition-colors duration-300 ${autoSync ? 'bg-secondary' : 'bg-slate-300'}`}
            >
              <span className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-300 ${autoSync ? 'left-9' : 'left-1'}`}></span>
            </button>
          </div>
        </div>
      </div>
    </DocLayout>
  );
}
