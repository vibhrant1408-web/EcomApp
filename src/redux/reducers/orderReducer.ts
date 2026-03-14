import { ORDER_TYPES, Order } from '../types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
}

interface OrderAction {
  type: string;
  payload?: any;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
};

export const orderReducer = (state = initialState, action: OrderAction): OrderState => {
  switch (action.type) {
    case ORDER_TYPES.SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: action.payload,
        orders: [...state.orders, action.payload],
      };
    case ORDER_TYPES.CLEAR_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: null,
      };
    default:
      return state;
  }
};
