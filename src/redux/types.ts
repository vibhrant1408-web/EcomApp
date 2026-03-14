export const AUTH_TYPES = {
  SET_USER: 'SET_USER',
  SET_AUTH_LOADING: 'SET_AUTH_LOADING',
  SET_AUTH_ERROR: 'SET_AUTH_ERROR',
  LOGOUT: 'LOGOUT',
  CLEAR_ERROR: 'CLEAR_ERROR',
} as const;

export const PRODUCTS_TYPES = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_PRODUCTS_LOADING: 'SET_PRODUCTS_LOADING',
  SET_PRODUCTS_ERROR: 'SET_PRODUCTS_ERROR',
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_PRICE_RANGE: 'SET_PRICE_RANGE',
  RESET_FILTERS: 'RESET_FILTERS',
} as const;

export const CART_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
} as const;

export const ORDER_TYPES = {
  SET_CURRENT_ORDER: 'SET_CURRENT_ORDER',
  CLEAR_CURRENT_ORDER: 'CLEAR_CURRENT_ORDER',
} as const;

// User type
export interface User {
  id: string;
  email: string;
  name: string;
}

// Product type
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

// Cart item type
export interface CartItem extends Product {
  quantity: number;
}

// Order type
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

// Filters type
export interface ProductFilters {
  searchQuery: string;
  selectedCategory: string | null;
  priceMin: number;
  priceMax: number;
}
