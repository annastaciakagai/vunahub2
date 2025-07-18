import api from './api';

export interface ProduceItem {
  _id?: string;
  type: string;
  quantity: {
    amount: number;
    unit: string;
  };
  intent: 'supply' | 'demand';
  quality?: string;
  pricePerUnit?: number;
  notes?: string;
  locationName?: string;
  location?: {
    type: string;
    coordinates: number[];
  };
  status?: string;
  user?: {
    _id: string;
    name: string;
    phone: string;
    role: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface ProduceFilters {
  type?: string;
  intent?: string;
  status?: string;
  user?: string;
}

export const produceService = {
  async getAllProduce(filters?: ProduceFilters): Promise<ProduceItem[]> {
    const response = await api.get('/produce', { params: filters });
    return response.data;
  },

  async getProduceById(id: string): Promise<ProduceItem> {
    const response = await api.get(`/produce/${id}`);
    return response.data;
  },

  async createProduce(data: Omit<ProduceItem, '_id' | 'user' | 'createdAt' | 'updatedAt'>): Promise<ProduceItem> {
    const response = await api.post('/produce', data);
    return response.data;
  },

  async updateProduce(id: string, data: Partial<ProduceItem>): Promise<ProduceItem> {
    const response = await api.put(`/produce/${id}`, data);
    return response.data;
  },

  async deleteProduce(id: string): Promise<void> {
    await api.delete(`/produce/${id}`);
  }
};