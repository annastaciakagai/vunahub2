import { useState, useEffect } from 'react';
import { produceService, ProduceItem, ProduceFilters } from '@/services/produceService';

export const useProduce = (filters?: ProduceFilters) => {
  const [produce, setProduce] = useState<ProduceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduce = async () => {
    try {
      setLoading(true);
      const data = await produceService.getAllProduce(filters);
      setProduce(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch produce');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduce();
  }, [JSON.stringify(filters)]);

  const createProduce = async (data: Omit<ProduceItem, '_id' | 'user' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProduce = await produceService.createProduce(data);
      setProduce(prev => [newProduce, ...prev]);
      return newProduce;
    } catch (err) {
      throw err;
    }
  };

  const updateProduce = async (id: string, data: Partial<ProduceItem>) => {
    try {
      const updated = await produceService.updateProduce(id, data);
      setProduce(prev => prev.map(item => item._id === id ? updated : item));
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const deleteProduce = async (id: string) => {
    try {
      await produceService.deleteProduce(id);
      setProduce(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    produce,
    loading,
    error,
    refetch: fetchProduce,
    createProduce,
    updateProduce,
    deleteProduce
  };
};