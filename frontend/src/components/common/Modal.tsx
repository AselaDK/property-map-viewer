import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
          onClick={onClose}
          aria-hidden
        />
        <div className="relative w-full max-w-4xl overflow-hidden rounded-[40px] bg-white shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-slate-100 animate-in fade-in zoom-in duration-300">
          {/* Header */}
          <div className="absolute top-6 right-6 z-10">
            <button
              type="button"
              onClick={onClose}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 backdrop-blur shadow-md text-slate-400 hover:text-slate-900 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="max-h-[90vh] overflow-y-auto custom-scrollbar p-6 sm:p-10">
            {children}
          </div>

          {footer !== undefined && (
            <div className="border-t border-slate-100 bg-slate-50/50 px-8 py-6 flex justify-end">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
