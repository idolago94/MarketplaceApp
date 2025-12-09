import { createApi } from '@reduxjs/toolkit/query/react';
import { mockBaseQuery } from './mocks';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: mockBaseQuery,
  endpoints: builder => ({
    getAllProducts: builder.query<any[], void>({
      query: () => ({ url: '/products', method: 'GET' }),
    }),
  }),
});

export const { useGetAllProductsQuery } = api;
