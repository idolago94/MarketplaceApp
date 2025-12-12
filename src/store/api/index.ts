import { createApi } from '@reduxjs/toolkit/query/react';
import { mockBaseQuery, Product } from './mocks';
import {
  Cart,
  Category,
  PaginatedQuery,
  PaginatedResponse,
  ProductFilters,
  SortOption,
} from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  tagTypes: ['Cart'],
  endpoints: builder => ({
    getProducts: builder.query<
      PaginatedResponse<Product>,
      {
        pagination: PaginatedQuery;
        filters?: ProductFilters;
        sort?: SortOption;
      }
    >({
      query: ({ pagination, filters, sort = 'newest' }) => ({
        method: 'GET',
        url: '/products',
        params: { ...pagination, ...filters, sort },
      }),
    }),
    getProduct: builder.query<Product, { id: string }>({
      query: ({ id }) => ({
        method: 'GET',
        url: '/product',
        params: { id },
      }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        method: 'GET',
        url: '/categories',
      }),
    }),
    getCart: builder.query<Cart, void>({
      query: () => ({
        method: 'GET',
        url: '/cart',
      }),
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<Cart, { id: string; quantity: number }>({
      query: body => ({
        method: 'POST',
        url: '/cart/add',
        body,
      }),
    }),
    updateCartItem: builder.mutation<Cart, { id: string; quantity: number }>({
      query: body => ({
        method: 'PUT',
        url: '/cart/item',
        body,
      }),
    }),
    removeCartItem: builder.mutation<Cart, string>({
      query: id => ({
        method: 'DELETE',
        url: '/cart/item',
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
} = api;
