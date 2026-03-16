import React from 'react';
import { PropertyCard } from './PropertyCard';
import { Property } from '../../types/property';
import { Spinner } from '../common/Spinner';

interface PropertyListProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty: (property: Property) => void;
  isLoading?: boolean;
}

export const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  selectedProperty,
  onSelectProperty,
  isLoading = false,
}) => {
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
          property={property}
          onClick={onSelectProperty}
          isSelected={selectedProperty?.id === property.id}
        />
      ))}
    </div>
  );
};
