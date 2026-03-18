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
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let pagedData;
        if (currentFilter) {
          pagedData = await propertyService.searchProperties({ ...currentFilter, pageNumber: page, pageSize });
        } else {
          pagedData = await propertyService.getAllProperties(page, pageSize);
        }
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
    };

    fetchData();
  }, [page, pageSize, currentFilter]);

  const loadProperties = useCallback(async (pageNumber: number = 1, size: number = 5) => {
    // This now just syncs the state, and the useEffect handles the fetch
    setPage(pageNumber);
    setPageSize(size);
    setCurrentFilter(undefined);
  }, []);

  const searchProperties = useCallback(async (filter: PropertyFilter) => {
    setPage(1); // Reset to first page on new search
    setCurrentFilter(filter);
  }, []);

  const changePage = useCallback((newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }, [totalPages]);

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
  }, []);

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