import React from 'react';
import { ThemeMode } from '../types';

interface LayoutWrapperProps {
  theme: ThemeMode;
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ theme, children }) => {
  let themeClasses = '';

  switch (theme) {
    case ThemeMode.FUN:
      themeClasses = 'bg-yellow-50 font-comic text-purple-900 selection:bg-pink-200';
      break;
    case ThemeMode.LEARNING:
      themeClasses = 'bg-sky-50 font-sans text-sky-900 selection:bg-sky-200';
      break;
    case ThemeMode.STUDY:
      themeClasses = 'bg-white font-sans text-slate-800 selection:bg-indigo-100';
      break;
    case ThemeMode.EXAM:
      themeClasses = 'bg-slate-100 font-mono text-slate-900 selection:bg-orange-200';
      break;
    case ThemeMode.PROFESSIONAL:
      themeClasses = 'bg-zinc-50 font-sans text-zinc-900 selection:bg-zinc-300';
      break;
    case ThemeMode.MADRASA_THEME:
      themeClasses = 'bg-emerald-50 font-serif text-emerald-900 selection:bg-emerald-200';
      break;
    default:
      themeClasses = 'bg-gray-50 text-gray-900';
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeClasses}`}>
      {children}
    </div>
  );
};

export default LayoutWrapper;
