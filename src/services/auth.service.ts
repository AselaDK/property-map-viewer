import api from './api/axiosConfig';
import { LoginCredentials, LoginResponse, User } from '../types/user';
import { tokenService } from './token.service';
import { ApiResponse } from '../types/api';

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', credentials);
    
    if (response.data.success) {
      const { token, refreshToken, user } = response.data.data;
      tokenService.setTokens(token, refreshToken);
      tokenService.setUser(user);
      return response.data.data;
    }
    
    throw {
      response: {
        data: {
          message: response.data.message || 'Invalid username or password',
          errors: response.data.errors
        }
      }
    };
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      tokenService.clearTokens();
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<ApiResponse<User>>('/auth/me');
      return response.data.data;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return tokenService.isAuthenticated();
  }

  getCurrentUserFromStorage(): User | null {
    return tokenService.getUser();
  }
}

export const authService = new AuthService();