export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  userId?: number;
  message?: string;
}

export interface AuthHook {
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<boolean>;
} 