import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-3 w-fit">
      <motion.div
        whileHover={{ rotate: 15, scale: 1.1 }}
        className="w-10 h-10 flex items-center justify-center p-1.5 bg-indigo-50 rounded-xl shadow-inner border border-indigo-100/60 transition-all duration-300"
      >
        <img 
          src="/logo.png" 
          alt="ScholarFlow Logo" 
          className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(79,70,229,0.2)]" 
        />
      </motion.div>
      <span className="text-xl lg:text-2xl font-headline italic text-indigo-900 group-hover:text-primary transition-colors tracking-tight">
        ScholarFlow
      </span>
    </Link>
  );
}
