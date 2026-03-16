import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-stone-200">404</p>
        <h1 className="mt-6 text-2xl font-semibold text-stone-900">Page not found</h1>
        <p className="mt-3 text-stone-500">
          The page you’re looking for doesn’t exist or was moved.
        </p>
        <Link to="/" className="inline-block mt-8">
          <Button variant="primary" size="lg">
            Back to map
          </Button>
        </Link>
      </div>
    </div>
  );
};
