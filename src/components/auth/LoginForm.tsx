import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface LoginFormProps {
  onSubmit: (credentials: { username: string; password: string }) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
}) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-5">
        <Input
          label="Username"
          name="username"
          type="text"
          required
          value={credentials.username}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="Enter your username"
          className="rounded-2xl border-slate-200 focus:border-primary-500 py-3"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          required
          value={credentials.password}
          onChange={handleChange}
          disabled={isLoading}
          placeholder="••••••••"
          className="rounded-2xl border-slate-200 focus:border-primary-500 py-3"
        />
      </div>

      {error && (
        <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-100 flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full h-[54px] text-base font-bold shadow-lg shadow-primary-500/20 rounded-2xl"
      >
        Sign in
      </Button>

      <div className="pt-4 text-center">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest block mb-3">Demo account</span>
        <div className="inline-flex gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-medium text-slate-500">
          <span>demo</span>
          <span className="text-slate-200">|</span>
          <span>demo123</span>
        </div>
      </div>
    </form>
  );
};
