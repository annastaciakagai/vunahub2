import api from './api';

export interface User {
  _id: string;
  name: string;
  phone: string;
  role: string;
  locationName?: string;
  produceTypes?: string[];
  farmerId?: string;
  systemId?: string;
  createdAt: string;
  updatedAt: string;
}

export const userService = {
  async getFarmers(): Promise<User[]> {
    const response = await api.get('/users/farmers');
    return response.data;
  },

  async getTraders(): Promise<User[]> {
    const response = await api.get('/users/traders');
    return response.data;
  },

  async createFarmer(data: {
    name: string;
    phone: string;
    password: string;
    locationName: string;
    produceTypes: string[];
  }): Promise<{ farmer: User; token: string }> {
    const response = await api.post('/users/farmers', data);
    return response.data;
  },

  async createTrader(data: {
    name: string;
    phone: string;
    password: string;
  }): Promise<{ trader: User; token: string }> {
    const response = await api.post('/users/traders', data);
    return response.data;
  }
};