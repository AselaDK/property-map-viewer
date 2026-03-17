import React, { useState } from 'react';
import { useProperties } from '../hooks/useProperties';
import { MapView } from '../components/map/MapView';
import { PropertyList } from '../components/properties/PropertyList';
import { PropertyFilters } from '../components/properties/PropertyFilters';
import { PropertyDetails } from '../components/properties/PropertyDetails';
import { Spinner } from '../components/common/Spinner';

export const Dashboard: React.FC = () => {
  const {
    filteredProperties,
    selectedProperty,
    isLoading,
    searchProperties,
    selectProperty,
    refresh,
    pagination,
  } = useProperties();
  const [showDetails, setShowDetails] = useState(false);
  const [focusedProperty, setFocusedProperty] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');

  const handleSelectProperty = (property: any) => {
    selectProperty(property);
    setShowDetails(true);
  };

  const handleClear = () => {
    refresh();
    setFocusedProperty(null);
    selectProperty(null as any);
  };

  const handleViewOnMap = () => {
    setFocusedProperty(selectedProperty);
    setShowDetails(false);
    setViewMode('map');
  };

  if (isLoading && filteredProperties.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <Spinner size="lg" />
          <div className="absolute inset-0 bg-primary-500/10 blur-2xl -z-10 rounded-full" />
        </div>
        <p className="text-slate-400 font-medium animate-pulse text-sm uppercase tracking-widest">Initialising map…</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 relative h-[calc(100vh-180px)] min-h-[600px]">
      {/* Search Header */}
      <div className="flex-shrink-0">
        <PropertyFilters onFilter={searchProperties} onClear={handleClear} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden relative">
        {/* Sidebar Listings */}
        <div className={`
          w-full lg:w-[400px] xl:w-[460px] flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-soft overflow-hidden
          ${viewMode === 'map' ? 'hidden lg:flex' : 'flex'}
        `}>
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Available Properties</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-tight">
              {pagination.totalCount} Results
            </span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
            <PropertyList
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              focusedProperty={focusedProperty}
              onSelectProperty={handleSelectProperty}
              isLoading={isLoading}
              pagination={pagination}
            />
          </div>
        </div>

        {/* Full Map View */}
        <div className={`
          flex-1 relative z-0 bg-white rounded-[32px] border border-slate-100 shadow-soft overflow-hidden group
          ${viewMode === 'list' ? 'hidden lg:block' : 'block'}
        `}>
          <MapView
            properties={filteredProperties}
            selectedProperty={selectedProperty}
            focusProperty={focusedProperty}
            onMarkerClick={handleSelectProperty}
            height="100%"
          />
          {/* Map Overlay HUD */}
          <div className="absolute bottom-6 left-6 right-6 pointer-events-none flex justify-between items-end transition-opacity group-hover:opacity-100">
            <div className="glass-panel px-4 py-3 pointer-events-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Current view</span>
              <p className="text-sm font-semibold text-slate-700">Interactive Map</p>
            </div>
          </div>
        </div>

        {/* Mobile View Toggle */}
        <div className="lg:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-[500]">
          <button
            onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full shadow-2xl font-bold text-sm tracking-tight active:scale-95 transition-transform"
          >
            {viewMode === 'map' ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Show List
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A2 2 0 013 15.488V5.512a2 2 0 011.553-1.954L9 1m0 19l6-3m-6 3V4m6 13l5.447 2.724A2 2 0 0021 17.788V7.812a2 2 0 00-1.553-1.954L15 4m0 13V4m0 0L9 1" />
                </svg>
                Show Map
              </>
            )}
          </button>
        </div>
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <PropertyDetails
          property={selectedProperty}
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          onViewOnMap={handleViewOnMap}
        />
      )}
    </div>
  );
};
