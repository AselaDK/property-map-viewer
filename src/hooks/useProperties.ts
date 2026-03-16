import { useState, useEffect, useCallback } from 'react';
import { propertyService } from '../services/api/propertyApi';
import { Property, PropertyFilter } from '../types/property';
import toast from 'react-hot-toast';

export const useProperties = (initialFilter?: PropertyFilter) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
      setFilteredProperties(data);
    } catch (err) {
      const message = 'Failed to load properties';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchProperties = useCallback(async (filter: PropertyFilter) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await propertyService.searchProperties(filter);
      setFilteredProperties(data);
    } catch (err) {
      const message = 'Search failed';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getNearbyProperties = useCallback(async (lat: number, lng: number, radius?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await propertyService.getNearbyProperties(lat, lng, radius);
      setFilteredProperties(data);
    } catch (err) {
      const message = 'Failed to get nearby properties';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const selectProperty = useCallback((property: Property) => {
    setSelectedProperty(property);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  return {
    properties,
    filteredProperties,
    selectedProperty,
    isLoading,
    error,
    searchProperties,
    getNearbyProperties,
    selectProperty,
    clearSelection,
    refresh: loadProperties,
  };
};