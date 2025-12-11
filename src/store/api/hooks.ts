import { useCallback, useEffect, useState } from 'react';
import { Product, ProductFilters, SortOption } from './types';
import { useGetProductsQuery } from '.';

export const useGetPaginatedProducts = (
  filters?: ProductFilters,
  sort?: SortOption,
) => {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const queryResult = useGetProductsQuery({
    pagination: { page, limit: 10 },
    filters,
    sort,
  });
  const { data, isFetching } = queryResult;

  // Merge new page into allProducts
  useEffect(() => {
    if (data?.data) {
      setAllProducts(prev =>
        data.pagination.page === 1 ? data.data : [...prev, ...data.data],
      );
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  const loadMore = useCallback(() => {
    if (!isFetching && data?.pagination.hasMore) {
      setPage(prev => prev + 1);
    }
  }, [data?.pagination.hasMore, isFetching]);

  return {
    ...queryResult,
    data: allProducts,
    loadMore,
  };
};
