import { createStore, combineReducers } from 'redux';
import { authReducer } from './reducers/authReducer';
import { productsReducer } from './reducers/productsReducer';
import { cartReducer } from './reducers/cartReducer';
import { orderReducer } from './reducers/orderReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
