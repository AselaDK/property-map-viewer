import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../types/property';
import { formatters } from '../../utils/formatters';

interface PropertyCardProps {
  property: Property;
  onClick?: (property: Property) => void;
  isSelected?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
  isSelected = false,
}) => {
  return (
    <div
      onClick={() => onClick?.(property)}
      className={`
        group relative bg-white transition-all duration-300 cursor-pointer p-3 rounded-[24px]
        ${isSelected ? 'bg-primary-50/50' : 'hover:bg-slate-50'}
      `}
    >
      <div className="flex gap-4">
        {/* Image Thumbnail */}
        <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
          <img
            src={property.imageUrl || 'https://via.placeholder.com/200x200?text=No+Image'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=No+Image';
            }}
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
              {property.propertyType}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between py-1 pr-2 min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-bold text-slate-900 truncate group-hover:text-primary-600 transition-colors">
                {property.title}
              </h3>
            </div>
            <p className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
              {formatters.formatPrice(property.price)}
            </p>
            <p className="text-sm font-medium text-slate-400 truncate mt-1 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {property.city}, {property.state}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              <span>{property.bedrooms} Bed</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              <span>{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              <span>{formatters.formatSquareFeet(property.squareFeet)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Link Overlay */}
      <Link
        to={`/property/${property.id}`}
        className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-primary-600 hover:border-primary-100 transition-all opacity-0 group-hover:opacity-100"
        onClick={(e) => e.stopPropagation()}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
      </Link>
    </div>
  );
};
