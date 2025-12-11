import { createApi } from '@reduxjs/toolkit/query/react';
import { mockBaseQuery, Product } from './mocks';
import {
  Category,
  PaginatedQuery,
  PaginatedResponse,
  ProductFilters,
  SortOption,
} from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
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
    getCategories: builder.query<Category[], void>({
      query: () => ({
        method: 'GET',
        url: '/categories',
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetCategoriesQuery } = api;
