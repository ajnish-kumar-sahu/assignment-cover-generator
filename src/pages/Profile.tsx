import { useState, useEffect } from 'react';
import DocLayout from '../components/DocLayout';
import { useAppStore } from '../store/useAppStore';

export default function Profile() {
  const { profile, updateProfile, addNotification } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);

  useEffect(() => {
    setTempProfile(profile);
  }, [profile]);

  const handleSave = () => {
    updateProfile(tempProfile);
    setIsEditing(false);
    addNotification({ message: 'Profile updated successfully!', type: 'success' });
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setIsEditing(false);
  };

  return (
    <DocLayout 
      title="Scholar Profile"
      breadcrumbs={[{ label: 'Account', icon: 'account_circle' }, { label: 'Profile' }]}
    >
      <div className="flex flex-col lg:flex-row gap-16 items-start mt-12 bg-white/40 p-12 rounded-[3rem] border border-outline-variant/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-3xl relative overflow-hidden group">
        
        {/* Decorative Background Element */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/10 to-tertiary-container/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

        <div className="relative">
          <div className="w-56 h-56 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl shrink-0 transform group-hover:scale-[1.02] transition-transform duration-700 bg-slate-100">
            <img 
              className="w-full h-full object-cover grayscale mix-blend-multiply opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
              alt="User profile portrait" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeEb7-iC2xggfY6QHVJ5exOU1wWQy6LkxVYamH2VZGVr4g8N0LCmSd1vOOQkRrM_srOb9Pz2NlcN_Ma9SP2R8sd4hN5-DZk7VROvzCXrk_RhQF0hiVeUxay42_XDuZkZmzuxR9rC19UEJS7daiYIbzdTMt3SL8D0tgQAcgyKEC341Tliy-sUZD_R4T7lNSStfvv0_NKfNoUDk2sB3SjSGFhQnteXzwSkgAtmuFu95Nofg9_ONGgmTQVvie7M5hPYaa1ibl03A-P-U" 
            />
          </div>
          {isEditing && (
            <div className="absolute inset-0 bg-indigo-950/40 rounded-[2rem] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer backdrop-blur-sm border-8 border-transparent">
              <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
            </div>
          )}
        </div>

        <div className="flex-1 relative z-10 w-full lg:max-w-2xl">
          {isEditing ? (
            <div className="space-y-8 animate-[fadeIn_0.4s_ease-out]">
              <div className="space-y-4">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-primary">Academic Title & Name</label>
                <input 
                  type="text"
                  value={tempProfile.name}
                  onChange={(e) => setTempProfile({...tempProfile, name: e.target.value})}
                  className="w-full bg-white/60 border-b-2 border-primary/20 text-4xl lg:text-5xl font-headline text-indigo-950 focus:outline-none focus:border-primary focus:bg-white transition-all rounded-t-xl px-4 py-3 placeholder:text-slate-300"
                  placeholder="e.g. Dr. Jane Doe"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-tertiary-container">Faculty / Department</label>
                <input 
                  type="text"
                  value={tempProfile.department}
                  onChange={(e) => setTempProfile({...tempProfile, department: e.target.value})}
                  className="w-full bg-white/60 border-b-2 border-tertiary-container/20 text-lg lg:text-xl font-medium text-slate-800 focus:outline-none focus:border-tertiary-container focus:bg-white transition-all rounded-t-xl px-4 py-3"
                />
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">Professional Bio & System Sync</label>
                <textarea 
                  value={tempProfile.bio}
                  rows={4}
                  onChange={(e) => setTempProfile({...tempProfile, bio: e.target.value})}
                  className="w-full bg-white/60 border-2 border-outline-variant/20 text-lg leading-relaxed text-slate-600 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all rounded-2xl px-6 py-5 resize-none shadow-inner"
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button 
                  onClick={handleSave}
                  className="px-10 py-5 bg-indigo-950 text-white rounded-2xl font-bold tracking-widest text-xs uppercase shadow-xl shadow-indigo-950/20 hover:shadow-indigo-950/40 hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Save Profile
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-8 py-5 text-slate-500 hover:bg-slate-100 rounded-2xl font-bold tracking-widest text-xs uppercase transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-[fadeIn_0.5s_ease-out]">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Verified Scholar
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-headline text-indigo-950 mb-6 leading-tight tracking-tight">
                {profile.name}
              </h2>
              
              <p className="text-tertiary-container font-bold mb-10 text-lg tracking-widest border-l-4 border-tertiary-container pl-4">
                {profile.department}
              </p>
              
              <p className="text-slate-600 leading-relaxed max-w-xl mb-12 text-xl font-light">
                {profile.bio}
              </p>
              
              <div className="flex flex-wrap gap-6 pt-4 border-t border-slate-200/50">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-10 py-5 bg-white text-indigo-950 rounded-2xl font-bold tracking-widest text-xs uppercase shadow-xl shadow-slate-200 hover:-translate-y-1 transition-all border border-slate-100 flex items-center gap-3 group/btn"
                >
                  <span className="material-symbols-outlined text-[18px] group-hover/btn:rotate-12 transition-transform">edit</span>
                  Edit Profile
                </button>
                <button className="px-10 py-5 bg-transparent text-primary hover:bg-primary/5 rounded-2xl font-bold tracking-widest text-xs uppercase transition-colors flex items-center gap-3 border border-transparent hover:border-primary/10">
                  <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  Link Institution
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
            <span className="material-symbols-outlined text-4xl text-primary mb-6 group-hover:scale-110 transition-transform">description</span>
            <h4 className="font-headline text-2xl text-indigo-950 mb-2">Automated Meta-Data</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Your profile details are automatically injected into Cover Generators to ensure submission compliance.</p>
          </div>
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-secondary/5 transition-all group">
            <span className="material-symbols-outlined text-4xl text-secondary mb-6 group-hover:scale-110 transition-transform">lock</span>
            <h4 className="font-headline text-2xl text-indigo-950 mb-2">Local Encryption</h4>
            <p className="text-slate-500 text-sm leading-relaxed">All institutional secrets and API keys are stored solely on your local device for maximum security.</p>
          </div>
          <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-tertiary/5 transition-all group">
            <span className="material-symbols-outlined text-4xl text-tertiary mb-6 group-hover:scale-110 transition-transform">history_edu</span>
            <h4 className="font-headline text-2xl text-indigo-950 mb-2">Portfolio Sync</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Changes made directly to your Scholar Profile will trickle back to published portfolios via webhooks.</p>
          </div>
        </div>
      )}
    </DocLayout>
  );
}
