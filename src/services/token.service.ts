class TokenService {
    private readonly ACCESS_TOKEN_KEY = 'accessToken';
    private readonly REFRESH_TOKEN_KEY = 'refreshToken';
    private readonly USER_KEY = 'user';
  
    setTokens(accessToken: string, refreshToken: string): void {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
    }
  
    getAccessToken(): string | null {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
  
    getRefreshToken(): string | null {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
  
    setUser(user: any): void {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  
    getUser(): any {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
  
    clearTokens(): void {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  
    isAuthenticated(): boolean {
      return !!this.getAccessToken();
    }
  }
  
  export const tokenService = new TokenService();