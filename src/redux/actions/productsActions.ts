import { PRODUCTS_TYPES, Product } from '../types';

interface SetProductsAction {
  type: typeof PRODUCTS_TYPES.SET_PRODUCTS;
  payload: Product[];
}

interface SetCategoriesAction {
  type: typeof PRODUCTS_TYPES.SET_CATEGORIES;
  payload: string[];
}

interface SetProductsLoadingAction {
  type: typeof PRODUCTS_TYPES.SET_PRODUCTS_LOADING;
  payload: boolean;
}

interface SetProductsErrorAction {
  type: typeof PRODUCTS_TYPES.SET_PRODUCTS_ERROR;
  payload: string;
}

interface SetSearchQueryAction {
  type: typeof PRODUCTS_TYPES.SET_SEARCH_QUERY;
  payload: string;
}

interface SetSelectedCategoryAction {
  type: typeof PRODUCTS_TYPES.SET_SELECTED_CATEGORY;
  payload: string | null;
}

interface SetPriceRangeAction {
  type: typeof PRODUCTS_TYPES.SET_PRICE_RANGE;
  payload: { min: number; max: number };
}

interface ResetFiltersAction {
  type: typeof PRODUCTS_TYPES.RESET_FILTERS;
}

export type ProductsActionTypes =
  | SetProductsAction
  | SetCategoriesAction
  | SetProductsLoadingAction
  | SetProductsErrorAction
  | SetSearchQueryAction
  | SetSelectedCategoryAction
  | SetPriceRangeAction
  | ResetFiltersAction;

export const setProducts = (products: Product[]): SetProductsAction => ({
  type: PRODUCTS_TYPES.SET_PRODUCTS,
  payload: products,
});

export const setCategories = (categories: string[]): SetCategoriesAction => ({
  type: PRODUCTS_TYPES.SET_CATEGORIES,
  payload: categories,
});

export const setProductsLoading = (loading: boolean): SetProductsLoadingAction => ({
  type: PRODUCTS_TYPES.SET_PRODUCTS_LOADING,
  payload: loading,
});

export const setProductsError = (error: string): SetProductsErrorAction => ({
  type: PRODUCTS_TYPES.SET_PRODUCTS_ERROR,
  payload: error,
});

export const setSearchQuery = (query: string): SetSearchQueryAction => ({
  type: PRODUCTS_TYPES.SET_SEARCH_QUERY,
  payload: query,
});

export const setSelectedCategory = (category: string | null): SetSelectedCategoryAction => ({
  type: PRODUCTS_TYPES.SET_SELECTED_CATEGORY,
  payload: category,
});

export const setPriceRange = (min: number, max: number): SetPriceRangeAction => ({
  type: PRODUCTS_TYPES.SET_PRICE_RANGE,
  payload: { min, max },
});

export const resetFilters = (): ResetFiltersAction => ({
  type: PRODUCTS_TYPES.RESET_FILTERS,
});
