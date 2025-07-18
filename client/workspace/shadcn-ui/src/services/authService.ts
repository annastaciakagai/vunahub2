import api from './api';
import { UserInfo, UserRole } from '@/utils/auth';

export interface LoginRequest {
  phone?: string;
  systemId?: string;
  password: string;
  role: UserRole;
}

export interface SignupRequest {
  name: string;
  phone: string;
  password: string;
  role: 'farmer' | 'trader';
  locationName?: string;
  produceTypes?: string[];
}

export interface AuthResponse {
  user: UserInfo;
  token: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  async signup(data: SignupRequest): Promise<AuthResponse> {
    const response = await api.post('/users/signup', data);
    return response.data;
  },

  async driverLogin(systemId: string, password: string): Promise<AuthResponse> {
    const response = await api.post('/users/driver-login', { systemId, password });
    return response.data;
  }
};