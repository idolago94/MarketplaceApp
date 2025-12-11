import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { ApiError, QueryArgs } from '../types';
import { fetchProducts } from './api';

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

export const mockBaseQuery: BaseQueryFn<QueryArgs, unknown, ApiError> = async ({
  url,
  method,
}) => {
  const request = new URL(url, 'https://example.com');
  const pathname = request.pathname;
  const params = Object.fromEntries(request.searchParams.entries());

  // GET endpoints
  if (method === 'GET') {
    switch (pathname) {
      case '/products': {
        const limit = Number(params.limit);
        const page = Number(params.page);
        if (isNaN(limit) || isNaN(page)) {
          return { error: { status: 400, message: 'Params is not valid' } };
        }
        try {
          const data = await fetchProducts(page, limit);
          return { data };
        } catch (error: any) {
          return { error: { status: 400, message: error?.message ?? 'Unknown error' } };
        }
      }
    }
  }

  return { error: { status: 404, message: 'Not found' } };
};
