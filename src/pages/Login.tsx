import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

export const Login: React.FC = () => {
  const { login, isLoading, error } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfcfd] relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/50 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100/50 rounded-full blur-[120px]" />

      <div className="w-full max-w-[440px] px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 text-white shadow-xl mb-6">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Property Map</h1>
          <p className="mt-2 text-slate-500 font-medium">Explore and discover properties.</p>
        </div>

        <div className="bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-8 sm:p-12 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <LoginForm
            onSubmit={async (c) => await login(c)}
            isLoading={isLoading}
            error={error}
          />
        </div>
        
        <p className="text-center mt-10 text-sm text-slate-400 font-medium">
          © {new Date().getFullYear()} Property Map Viewer.
        </p>
      </div>
    </div>
  );
};
