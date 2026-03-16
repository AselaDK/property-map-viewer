import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ subtitle }) => {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-[1001] px-4 sm:px-6 py-4">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-glass rounded-2xl sm:rounded-3xl px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 hover:scale-[1.02] transition-transform">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <span className="text-base sm:text-xl font-bold text-slate-900 tracking-tight block leading-tight">Property Map</span>
              {subtitle && (
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{subtitle}</span>
              )}
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-700">{user?.username}</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={logout}
              className="rounded-xl sm:rounded-2xl h-10 sm:h-12 px-4 sm:px-6 border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
