import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.error = null;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProductsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
      applyFilters(state);
    },
    setSelectedCategory: (state, action) => {
      state.filters.selectedCategory = action.payload;
      applyFilters(state);
    },
    setPriceRange: (state, action) => {
      const { min, max } = action.payload;
      state.filters.priceMin = min;
      state.filters.priceMax = max;
      applyFilters(state);
    },
    resetFilters: (state) => {
      state.filters = {
        searchQuery: '',
        selectedCategory: null,
        priceMin: 0,
        priceMax: 999999,
      };
      state.filteredProducts = state.products;
    },
  },
});

const applyFilters = (state) => {
  const { searchQuery, selectedCategory, priceMin, priceMax } = state.filters;

  let filtered = state.products;

  if (searchQuery) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (selectedCategory) {
    filtered = filtered.filter((product) => product.category.id === selectedCategory);
  }

  filtered = filtered.filter(
    (product) => product.price >= priceMin && product.price <= priceMax
  );

  state.filteredProducts = filtered;
};

export const {
  setProducts,
  setCategories,
  setProductsLoading,
  setProductsError,
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  resetFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
