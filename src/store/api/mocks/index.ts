import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { ApiError, Category, QueryArgs, SortOption } from '../types';
import { fetchCategories, fetchProducts } from './api';

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
  params = {},
}) => {
  // GET endpoints
  if (method === 'GET') {
    switch (url) {
      case '/products': {
        const limit = Number(params.limit);
        const page = Number(params.page);
        if (isNaN(limit) || isNaN(page)) {
          return { error: { status: 400, message: 'Params is not valid' } };
        }
        try {
          const data = await fetchProducts(
            page,
            limit,
            {
              search: params.search?.toString() ?? '',
              category: params.category as Category,
            },
            params.sort as SortOption,
          );
          return { data };
        } catch (error: any) {
          return {
            error: { status: 400, message: error?.message ?? 'Unknown error' },
          };
        }
      }
      case '/categories': {
        try {
          const data = await fetchCategories();
          return { data };
        } catch (error: any) {
          return {
            error: { status: 400, message: error?.message ?? 'Unknown error' },
          };
        }
      }
    }
  }

  return { error: { status: 404, message: 'Not found' } };
};
