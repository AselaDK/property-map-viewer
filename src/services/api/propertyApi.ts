import api from './axiosConfig';
import { Property, PropertyFilter, CreatePropertyDto } from '../../types/property';
import { ApiResponse, PaginatedResponse } from '../../types/api';

class PropertyService {
  async getAllProperties(page: number = 1, size: number = 5): Promise<PaginatedResponse<Property>> {
    const response = await api.get<ApiResponse<PaginatedResponse<Property>>>(`/properties?pageNumber=${page}&pageSize=${size}`);
    return response.data.data;
  }

  async getPropertyById(id: number): Promise<Property> {
    const response = await api.get<ApiResponse<Property>>(`/properties/${id}`);
    return response.data.data;
  }

  async searchProperties(filter: PropertyFilter): Promise<PaginatedResponse<Property>> {
    const params = new URLSearchParams();
    
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    const response = await api.get<ApiResponse<PaginatedResponse<Property>>>(`/properties/search?${params}`);
    return response.data.data;
  }

  async getNearbyProperties(lat: number, lng: number, radius: number = 10): Promise<Property[]> {
    const response = await api.get<ApiResponse<Property[]>>(
      `/properties/search?latitude=${lat}&longitude=${lng}&radiusInKm=${radius}`
    );
    return response.data.data || [];
  }

  async createProperty(property: CreatePropertyDto): Promise<Property> {
    const response = await api.post<ApiResponse<Property>>('/properties', property);
    return response.data.data;
  }

  async updateProperty(id: number, property: CreatePropertyDto): Promise<Property> {
    const response = await api.put<ApiResponse<Property>>(`/properties/${id}`, property);
    return response.data.data;
  }

  async deleteProperty(id: number): Promise<void> {
    await api.delete(`/properties/${id}`);
  }
}

export const propertyService = new PropertyService();