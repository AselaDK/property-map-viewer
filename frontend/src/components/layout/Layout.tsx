import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  subtitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col font-sans">
      <Header subtitle={subtitle} />
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
};
