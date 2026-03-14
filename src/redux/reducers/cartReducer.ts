import { CART_TYPES, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
}

interface CartAction {
  type: string;
  payload?: any;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CART_TYPES.ADD_TO_CART: {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      let items: CartItem[];
      if (existingItem) {
        items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        items = [
          ...state.items,
          {
            ...action.payload,
            quantity: action.payload.quantity || 1,
          },
        ];
      }

      return {
        items,
        total: calculateTotal(items),
      };
    }
    case CART_TYPES.REMOVE_FROM_CART: {
      const items = state.items.filter((item) => item.id !== action.payload);
      return {
        items,
        total: calculateTotal(items),
      };
    }
    case CART_TYPES.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      let items: CartItem[];

      if (quantity <= 0) {
        items = state.items.filter((item) => item.id !== id);
      } else {
        items = state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
      }

      return {
        items,
        total: calculateTotal(items),
      };
    }
    case CART_TYPES.CLEAR_CART:
      return {
        items: [],
        total: 0,
      };
    default:
      return state;
  }
};
