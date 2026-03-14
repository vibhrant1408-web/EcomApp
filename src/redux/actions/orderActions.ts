import { ORDER_TYPES, Order } from '../types';

interface SetCurrentOrderAction {
  type: typeof ORDER_TYPES.SET_CURRENT_ORDER;
  payload: Order;
}

interface ClearCurrentOrderAction {
  type: typeof ORDER_TYPES.CLEAR_CURRENT_ORDER;
}

export type OrderActionTypes = SetCurrentOrderAction | ClearCurrentOrderAction;

export const setCurrentOrder = (order: Order): SetCurrentOrderAction => ({
  type: ORDER_TYPES.SET_CURRENT_ORDER,
  payload: order,
});

export const clearCurrentOrder = (): ClearCurrentOrderAction => ({
  type: ORDER_TYPES.CLEAR_CURRENT_ORDER,
});
