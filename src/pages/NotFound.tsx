import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-8">
      <h1 className="text-9xl font-headline font-black text-indigo-900 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Page Not Found</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-indigo-700 transition-colors">
        Return Home
      </Link>
    </div>
  );
}
