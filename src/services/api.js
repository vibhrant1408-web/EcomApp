import axios from 'axios';

const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productApi = {
  getAllProducts: async () => {
    try {
      const response = await apiClient.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await apiClient.get('/products', {
        params: { title: query },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  filterByPrice: async (price) => {
    try {
      const response = await apiClient.get('/products', {
        params: { price },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  filterByPriceRange: async (minPrice, maxPrice) => {
    try {
      const response = await apiClient.get('/products', {
        params: {
          price_min: minPrice,
          price_max: maxPrice,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  filterByCategory: async (categoryId) => {
    try {
      const response = await apiClient.get('/products', {
        params: { categoryId },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCategoryById: async (id) => {
    try {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient;
