import React, { useState } from 'react';
import { Button } from '../common/Button';

interface PropertyFiltersProps {
  onFilter: (filters: any) => void;
  onClear: () => void;
}

export const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilter, onClear }) => {
  const [filters, setFilters] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    city: '',
    state: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchFilters: any = {};
    if (filters.propertyType) searchFilters.propertyType = filters.propertyType;
    if (filters.minPrice) searchFilters.minPrice = parseFloat(filters.minPrice);
    if (filters.maxPrice) searchFilters.maxPrice = parseFloat(filters.maxPrice);
    if (filters.minBedrooms) searchFilters.minBedrooms = parseInt(filters.minBedrooms);
    if (filters.city) searchFilters.city = filters.city;
    if (filters.state) searchFilters.state = filters.state;
    onFilter(searchFilters);
  };

  const handleClear = () => {
    setFilters({ propertyType: '', minPrice: '', maxPrice: '', minBedrooms: '', city: '', state: '' });
    onClear();
  };

  const selectBase = "appearance-none bg-transparent py-2.5 px-4 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-0 cursor-pointer w-full transition-colors hover:text-primary-600";
  const inputBase = "bg-transparent py-2.5 px-4 text-sm font-medium text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-0 w-full transition-colors hover:placeholder-slate-400";

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[32px] shadow-glass border border-slate-100 p-2 pl-6 pr-2 flex flex-col md:flex-row items-center gap-2">
      <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-6 gap-0 divide-x divide-slate-50 items-center">
        {/* Type */}
        <div className="relative group">
          <select name="propertyType" value={filters.propertyType} onChange={handleChange} className={selectBase}>
            <option value="">Any Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover:text-primary-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Min Price */}
        <div>
          <input name="minPrice" type="number" placeholder="Min Price" value={filters.minPrice} onChange={handleChange} className={inputBase} />
        </div>

        {/* Max Price */}
        <div>
          <input name="maxPrice" type="number" placeholder="Max Price" value={filters.maxPrice} onChange={handleChange} className={inputBase} />
        </div>

        {/* Beds */}
        <div className="relative group">
          <select name="minBedrooms" value={filters.minBedrooms} onChange={handleChange} className={selectBase}>
            <option value="">Any Beds</option>
            <option value="1">1+ Bed</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 group-hover:text-primary-400 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>

        {/* Location */}
        <div className="col-span-2">
          <input name="city" type="text" placeholder="City or State…" value={filters.city} onChange={handleChange} className={inputBase} />
        </div>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        <button
          type="button"
          onClick={handleClear}
          className="px-5 py-2.5 text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors"
        >
          Clear
        </button>
        <Button
          type="submit"
          variant="primary"
          className="rounded-[24px] px-8 h-12 shadow-lg shadow-primary-500/20 text-sm font-bold flex-1 md:flex-none"
        >
          Search
        </Button>
      </div>
    </form>
  );
};
