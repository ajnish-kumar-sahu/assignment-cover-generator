import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors">
        <span className="material-symbols-outlined text-base">home</span>
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-slate-300 flex items-center">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </span>
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors"
            >
              {item.icon && <span className="material-symbols-outlined text-sm">{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-indigo-600 font-medium">
              {item.icon && <span className="material-symbols-outlined text-sm">{item.icon}</span>}
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
