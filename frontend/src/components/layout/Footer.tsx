import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 py-6 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
        <span>© {new Date().getFullYear()} Property Map</span>
        <Link to="/" className="text-amber-400 hover:text-amber-300 transition-colors">
          Back to map
        </Link>
      </div>
    </footer>
  );
};
