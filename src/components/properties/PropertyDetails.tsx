import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Property } from '../../types/property';
import { formatters } from '../../utils/formatters';

interface PropertyDetailsProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onViewOnMap: () => void;
  embedded?: boolean;
}

const Feature = ({ label, value, icon }: { label: string; value: React.ReactNode; icon: React.ReactNode }) => (
  <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
    <div className="flex items-center gap-2 mb-1">
      <div className="text-primary-500">{icon}</div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-base font-bold text-slate-900">{value}</p>
  </div>
);

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  isOpen,
  onClose,
  onViewOnMap,
  embedded = false,
}) => {
  const content = (
    <div className="space-y-8">
      {/* Hero Image */}
      <div className="relative rounded-[32px] overflow-hidden bg-slate-100 aspect-[16/10] shadow-soft">
        <img
          src={property.imageUrl || 'https://via.placeholder.com/800x500?text=No+Image'}
          alt={property.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x500?text=No+Image';
          }}
        />
        <div className="absolute top-6 right-6">
          <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur shadow-lg text-xs font-bold text-slate-900 uppercase tracking-widest">
            {property.propertyType}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title & Price */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-primary-600 uppercase tracking-widest">Listing Details</h2>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{property.title}</h1>
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {property.fullAddress}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-4xl font-black text-slate-900 tracking-tighter">
              {formatters.formatPrice(property.price)}
            </p>
            <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Available Now</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Feature label="Bedrooms" value={property.bedrooms} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} />
          <Feature label="Bathrooms" value={property.bathrooms} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>} />
          <Feature label="Area" value={formatters.formatSquareFeet(property.squareFeet)} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>} />
          <Feature label="Year" value={property.yearBuilt} icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">About this property</h3>
          <p className="text-slate-600 leading-relaxed font-medium">
            {property.description}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button variant="primary" onClick={onViewOnMap} className="flex-1 h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary-500/20">
            View on Interactive Map
          </Button>
          <Button variant="secondary" onClick={onClose} className="sm:w-32 h-14 rounded-2xl text-base font-bold border-slate-200">
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return <div className="max-w-4xl mx-auto p-6 sm:p-10">{content}</div>;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Property Details">
      {content}
    </Modal>
  );
};
