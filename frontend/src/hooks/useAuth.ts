import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { LoginCredentials, User } from '../types/user';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = useCallback(async () => {
    try {
      if (authService.isAuthenticated()) {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(credentials);
      if (!response) {
        throw new Error('Invalid response from server');
      }
      setUser(response.user);
      toast.success('Login successful!');
      navigate('/');
      return { success: true };
    } catch (err: any) {
      console.error('Login error:', err);
      let message = 'Login failed';
      
      if (err.response?.data) {
        const data = err.response.data;
        message = data.message || data.error || (Array.isArray(data.errors) ? data.errors[0] : null) || message;
      } else if (err.message) {
        message = err.message;
      }
      
      setError(message);
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [navigate]);

  return {
    user,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };
};