import { createApi } from '@reduxjs/toolkit/query/react';
import { mockBaseQuery, Product } from './mocks';
import { PaginatedQuery, PaginatedResponse } from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  endpoints: builder => ({
    getProducts: builder.query<PaginatedResponse<Product>, PaginatedQuery>({
      query: ({ limit, page }) => ({ method: 'GET', url: `/products?limit=${limit}&page=${page}` }),
    }),
  }),
});

export const { useGetProductsQuery } = api;
