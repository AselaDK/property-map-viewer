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
  } = useProperties();
  const [showDetails, setShowDetails] = useState(false);
  const [focusedProperty, setFocusedProperty] = useState<any>(null);

  const handleSelectProperty = (property: any) => {
    selectProperty(property);
    setShowDetails(true);
  };

  const handleViewOnMap = () => {
    setFocusedProperty(selectedProperty);
    setShowDetails(false);
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
        <PropertyFilters onFilter={searchProperties} onClear={refresh} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Sidebar Listings */}
        <div className="w-full lg:w-[400px] xl:w-[460px] flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-soft overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Available Properties</span>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-tight">
              {filteredProperties.length} Results
            </span>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/30">
            <PropertyList
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              focusedProperty={focusedProperty}
              onSelectProperty={handleSelectProperty}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Full Map View */}
        <div className="flex-1 relative z-0 bg-white rounded-[32px] border border-slate-100 shadow-soft overflow-hidden group">
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
