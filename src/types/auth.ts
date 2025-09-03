export interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'admin';
  phone?: string;
  isEmailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: User;
}

export interface SessionData {
  userId: string;
  email: string;
  role: 'investor' | 'admin';
  name: string;
}