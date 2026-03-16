export interface Property {
    id: number;
    title: string;
    description: string;
    price: number;
    formattedPrice: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    fullAddress: string;
    latitude: number;
    longitude: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    imageUrl: string;
    isAvailable: boolean;
  }
  
  export interface PropertyFilter {
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
    radiusInKm?: number;
  }
  
  export interface CreatePropertyDto {
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    yearBuilt: number;
    imageUrl: string;
  }