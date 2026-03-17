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
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentFilter, setCurrentFilter] = useState<PropertyFilter | undefined>(initialFilter);

  useEffect(() => {
    loadProperties(page, pageSize);
  }, [page, pageSize]);

  const loadProperties = useCallback(async (pageNumber: number = 1, size: number = 5) => {
    setIsLoading(true);
    setError(null);
    try {
      const pagedData = await propertyService.getAllProperties(pageNumber, size);
      setProperties(pagedData.items);
      setFilteredProperties(pagedData.items);
      setTotalCount(pagedData.totalCount);
      setTotalPages(pagedData.totalPages);
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
    setPage(1); // Reset to first page on new search
    setCurrentFilter(filter);
    try {
      const pagedData = await propertyService.searchProperties({ ...filter, pageNumber: 1, pageSize });
      setFilteredProperties(pagedData.items);
      setTotalCount(pagedData.totalCount);
      setTotalPages(pagedData.totalPages);
    } catch (err) {
      const message = 'Search failed';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  const changePage = useCallback(async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    
    setPage(newPage);
    setIsLoading(true);
    setError(null);
    try {
      let pagedData;
      if (currentFilter) {
        pagedData = await propertyService.searchProperties({ ...currentFilter, pageNumber: newPage, pageSize });
      } else {
        pagedData = await propertyService.getAllProperties(newPage, pageSize);
      }
      setFilteredProperties(pagedData.items);
      setTotalCount(pagedData.totalCount);
      setTotalPages(pagedData.totalPages);
    } catch (err) {
      toast.error('Failed to load page');
    } finally {
      setIsLoading(false);
    }
  }, [currentFilter, pageSize, totalPages]);

  const getNearbyProperties = useCallback(async (lat: number, lng: number, radius?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      // Nearby properties currently returns a list, not paged data
      const data = await propertyService.getNearbyProperties(lat, lng, radius);
      setFilteredProperties(data);
      setTotalCount(data.length);
      setTotalPages(1);
      setPage(1);
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

  const refresh = useCallback(() => {
    setPage(1);
    setCurrentFilter(undefined);
    loadProperties(1, pageSize);
  }, [loadProperties, pageSize]);

  return {
    properties,
    filteredProperties,
    selectedProperty,
    isLoading,
    error,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages,
      changePage,
    },
    searchProperties,
    getNearbyProperties,
    selectProperty,
    clearSelection,
    refresh,
  };
};