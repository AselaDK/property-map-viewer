export const formatters = {
    formatPrice: (price: number): string => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(price);
    },
  
    formatSquareFeet: (sqft: number): string => {
      return `${sqft.toLocaleString()} sq ft`;
    },
  
    formatDate: (date: string | Date): string => {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(date));
    },
  
    formatAddress: (property: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
    }): string => {
      return `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`;
    },
  };