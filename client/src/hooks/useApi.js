import { useState, useCallback } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data
  const fetchData = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunc]);

  // Create item
  const createItem = async (createFunc, payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createFunc(payload);
      setData(prev => [...prev, result.data]);
      return result.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update item
  const updateItem = async (updateFunc, id, payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await updateFunc(id, payload);
      setData(prev => prev.map(item => (item._id === id ? result.data : item)));
      return result.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete item
  const deleteItem = async (deleteFunc, id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteFunc(id);
      setData(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
  };
};

export default useApi;
