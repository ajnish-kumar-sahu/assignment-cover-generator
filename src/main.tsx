import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import Landing from './pages/Landing.tsx';
import CoverGenerator from './pages/CoverGenerator.tsx';
import IndexDesigner from './pages/IndexDesigner.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import TermsOfService from './pages/TermsOfService.tsx';
import ContactSupport from './pages/ContactSupport.tsx';
import JournalGuidelines from './pages/JournalGuidelines.tsx';
import Research from './pages/Research.tsx';
import Archive from './pages/Archive.tsx';
import Curations from './pages/Curations.tsx';
import Library from './pages/Library.tsx';
import Notifications from './pages/Notifications.tsx';
import Settings from './pages/Settings.tsx';
import Profile from './pages/Profile.tsx';
import Templates from './pages/Templates.tsx';
import MyCovers from './pages/MyCovers.tsx';
import StyleGuide from './pages/StyleGuide.tsx';
import History from './pages/History.tsx';
import DeveloperInfo from './pages/DeveloperInfo.tsx';
import SignIn from './pages/SignIn.tsx';
import SignUp from './pages/SignUp.tsx';
import ResetPassword from './pages/ResetPassword.tsx';
import NotFound from './pages/NotFound.tsx';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard.tsx'));
const UserManagement = lazy(() => import('./pages/UserManagement.tsx'));
const DocumentStatistics = lazy(() => import('./pages/DocumentStatistics.tsx'));
const AuditLogs = lazy(() => import('./pages/AuditLogs.tsx'));
const Permissions = lazy(() => import('./pages/Permissions.tsx'));


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Landing />} />
          <Route path="cover-generator" element={<CoverGenerator />} />
          <Route path="index-designer" element={<IndexDesigner />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="contact-support" element={<ContactSupport />} />
          <Route path="journal-guidelines" element={<JournalGuidelines />} />
          <Route path="research" element={<Research />} />
          <Route path="archive" element={<Archive />} />
          <Route path="curations" element={<Curations />} />
          <Route path="library" element={<Library />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
          <Route path="templates" element={<Templates />} />
          <Route path="my-covers" element={<MyCovers />} />
          <Route path="style-guide" element={<StyleGuide />} />
          <Route path="history" element={<History />} />
          <Route path="developer" element={<DeveloperInfo />} />
          <Route path="login" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="admin" element={<Suspense fallback={<div className="flex h-screen items-center justify-center p-8 bg-surface"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><AdminDashboard /></Suspense>} />
          <Route path="user-management" element={<Suspense fallback={<div className="flex h-screen items-center justify-center p-8 bg-surface"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><UserManagement /></Suspense>} />
          <Route path="document-statistics" element={<Suspense fallback={<div className="flex h-screen items-center justify-center p-8 bg-surface"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><DocumentStatistics /></Suspense>} />
          <Route path="audit-logs" element={<Suspense fallback={<div className="flex h-screen items-center justify-center p-8 bg-surface"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><AuditLogs /></Suspense>} />
          <Route path="permissions" element={<Suspense fallback={<div className="flex h-screen items-center justify-center p-8 bg-surface"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}><Permissions /></Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
