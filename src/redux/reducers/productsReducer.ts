import { PRODUCTS_TYPES, Product, ProductFilters } from '../types';

interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
}

interface ProductsAction {
  type: string;
  payload?: any;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    searchQuery: '',
    selectedCategory: null,
    priceMin: 0,
    priceMax: 999999,
  },
};

const applyFilters = (products: Product[], filters: ProductFilters): Product[] => {
  return products.filter((product) => {
    const matchesSearch =
      !filters.searchQuery ||
      product.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

    const matchesCategory =
      !filters.selectedCategory || product.category === filters.selectedCategory;

    const matchesPrice = product.price >= filters.priceMin && product.price <= filters.priceMax;

    return matchesSearch && matchesCategory && matchesPrice;
  });
};

export const productsReducer = (
  state = initialState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case PRODUCTS_TYPES.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        filteredProducts: applyFilters(action.payload, state.filters),
        error: null,
      };
    case PRODUCTS_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case PRODUCTS_TYPES.SET_PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case PRODUCTS_TYPES.SET_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case PRODUCTS_TYPES.SET_SEARCH_QUERY:
      const newFilterWithSearch = { ...state.filters, searchQuery: action.payload };
      return {
        ...state,
        filters: newFilterWithSearch,
        filteredProducts: applyFilters(state.products, newFilterWithSearch),
      };
    case PRODUCTS_TYPES.SET_SELECTED_CATEGORY:
      const newFilterWithCategory = {
        ...state.filters,
        selectedCategory: action.payload,
      };
      return {
        ...state,
        filters: newFilterWithCategory,
        filteredProducts: applyFilters(state.products, newFilterWithCategory),
      };
    case PRODUCTS_TYPES.SET_PRICE_RANGE:
      const newFilterWithPrice = {
        ...state.filters,
        priceMin: action.payload.min,
        priceMax: action.payload.max,
      };
      return {
        ...state,
        filters: newFilterWithPrice,
        filteredProducts: applyFilters(state.products, newFilterWithPrice),
      };
    case PRODUCTS_TYPES.RESET_FILTERS:
      return {
        ...state,
        filters: {
          searchQuery: '',
          selectedCategory: null,
          priceMin: 0,
          priceMax: 999999,
        },
        filteredProducts: state.products,
      };
    default:
      return state;
  }
};
