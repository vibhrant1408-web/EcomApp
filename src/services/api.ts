import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export const productApi = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get('/products');
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get('/products/categories');
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  },
};

export default apiClient;
