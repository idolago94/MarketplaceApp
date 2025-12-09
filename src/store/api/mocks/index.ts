import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { ApiError, QueryArgs } from '../types';
import { MOCK_PRODUCTS } from './products';

// Types
export type {
  Product,
  Category,
  CartItem,
  Cart,
  Order,
  OrderItem,
  OrderStatus,
  PaginatedResponse,
  ProductFilters,
  SortOption,
} from '../types';

// Mock data
export {
  MOCK_PRODUCTS,
  getProductById,
  getProductsByCategory,
} from './products';

// API functions
export {
  fetchProducts,
  fetchProductById,
  searchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  placeOrder,
  fetchOrderById,
  fetchOrders,
  getCartItemCount,
  getCartTotal,
} from './api';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));
const getRandomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const mockBaseQuery: BaseQueryFn<QueryArgs, unknown, ApiError> = async ({
  url,
  method,
}) => {
  await delay(getRandomInRange(2000, 5000));
  // GET endpoints
  if (method === 'GET') {
    switch (url) {
      case '/products': {
        return { data: MOCK_PRODUCTS };
      }
    }
  }

  return { error: { status: 404, message: 'Not found' } };
};
