export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
  }
  
  export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    refreshToken: string;
    expiration: string;
    user: User;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }