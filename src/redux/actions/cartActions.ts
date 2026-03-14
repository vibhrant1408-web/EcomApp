import { CART_TYPES, CartItem } from '../types';

interface AddToCartAction {
  type: typeof CART_TYPES.ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof CART_TYPES.REMOVE_FROM_CART;
  payload: number;
}

interface UpdateQuantityAction {
  type: typeof CART_TYPES.UPDATE_QUANTITY;
  payload: { id: number; quantity: number };
}

interface ClearCartAction {
  type: typeof CART_TYPES.CLEAR_CART;
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | UpdateQuantityAction
  | ClearCartAction;

export const addToCart = (product: CartItem): AddToCartAction => ({
  type: CART_TYPES.ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId: number): RemoveFromCartAction => ({
  type: CART_TYPES.REMOVE_FROM_CART,
  payload: productId,
});

export const updateQuantity = (productId: number, quantity: number): UpdateQuantityAction => ({
  type: CART_TYPES.UPDATE_QUANTITY,
  payload: { id: productId, quantity },
});

export const clearCart = (): ClearCartAction => ({
  type: CART_TYPES.CLEAR_CART,
});
