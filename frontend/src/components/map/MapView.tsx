import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '../../types/property';
import { MAP_TILE_URL, MAP_ATTRIBUTION } from '../../utils/constants';
import { formatters } from '../../utils/formatters';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  properties: Property[];
  selectedProperty?: Property | null;
  focusProperty?: Property | null;
  onMarkerClick?: (property: Property) => void;
  center?: [number, number];
  zoom?: number;
  height?: string;
}

export const MapView: React.FC<MapViewProps> = ({
  properties,
  selectedProperty,
  focusProperty,
  onMarkerClick,
  center = [39.8283, -98.5795],
  zoom = 4,
  height = '500px',
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current).setView(center, zoom);

    L.tileLayer(MAP_TILE_URL, {
      attribution: MAP_ATTRIBUTION,
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    properties.forEach(property => {
      const marker = L.marker([property.latitude, property.longitude])
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="font-weight: bold; margin: 0 0 8px 0;">${property.title}</h3>
            <p style="margin: 4px 0;"><strong>${property.formattedPrice ?? formatters.formatPrice(property.price)}</strong></p>
            <p style="margin: 4px 0;">${property.bedrooms} beds, ${property.bathrooms} baths</p>
            <p style="margin: 4px 0;">${property.city}, ${property.state}</p>
            <button 
              onclick="window.selectProperty(${property.id})"
              style="
                background: #7c3aed;
                color: white;
                border: none;
                padding: 10px 16px;
                border-radius: 12px;
                width: 100%;
                margin-top: 12px;
                cursor: pointer;
                font-weight: 700;
                font-family: 'Inter', sans-serif;
                font-size: 13px;
                transition: background 0.2s;
              "
            >
              View Details
            </button>
          </div>
        `);

      marker.on('click', () => {
        onMarkerClick?.(property);
      });

      marker.addTo(mapRef.current!);
      markersRef.current.push(marker);
    });

    // Handle popup button clicks
    (window as any).selectProperty = (id: number) => {
      const property = properties.find(p => p.id === id);
      if (property && onMarkerClick) {
        onMarkerClick(property);
      }
    };

    // Fit bounds to show all markers
    if (markersRef.current.length > 0) {
      const group = L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    }

    // Center on focused property
    if (focusProperty) {
      mapRef.current.setView(
        [focusProperty.latitude, focusProperty.longitude],
        14
      );
    }

    return () => {
      delete (window as any).selectProperty;
    };
  }, [properties, focusProperty, onMarkerClick]);

  return <div ref={mapContainerRef} style={{ height, width: '100%' }} />;
};