import React, { useEffect, useRef } from 'react';
import { PropertyCard } from './PropertyCard';
import { Property } from '../../types/property';
import { Spinner } from '../common/Spinner';

interface PropertyListProps {
  properties: Property[];
  selectedProperty?: Property | null;
  focusedProperty?: Property | null;
  onSelectProperty: (property: Property) => void;
  isLoading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    changePage: (page: number) => void;
  };
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  selectedProperty,
  focusedProperty,
  onSelectProperty,
  isLoading = false,
  pagination,
}) => {
  const focusedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusedProperty && focusedRef.current) {
      focusedRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [focusedProperty]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Spinner size="md" />
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Updating listings…</span>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-200">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900">No properties found</h3>
        <p className="mt-2 text-sm font-medium text-slate-400">Try adjusting your filters or search area.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          ref={focusedProperty?.id === property.id ? focusedRef : null}
          property={property}
          onClick={onSelectProperty}
          isSelected={selectedProperty?.id === property.id}
          isFocused={focusedProperty?.id === property.id}
        />
      ))}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-6 border-t border-slate-100 mt-4">
          <button
            onClick={() => pagination.changePage(pagination.page - 1)}
            disabled={pagination.page <= 1 || isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 text-slate-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Prev
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Page {pagination.page} <span className="mx-1 text-slate-200">/</span> {pagination.totalPages}
            </span>
          </div>

          <button
            onClick={() => pagination.changePage(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages || isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 text-slate-600"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
};
