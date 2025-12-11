import { useCallback, useEffect, useState } from "react";
import { Product } from "./types";
import { useGetProductsQuery } from ".";

export const useGetPaginatedProducts = () => {
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const queryResult = useGetProductsQuery({ page, limit: 10 });
  const { data, isFetching } = queryResult;

  // Merge new page into allProducts
  useEffect(() => {
    if (data?.data) {
      setAllProducts(prev => [...prev, ...data.data]);
    }
  }, [data]);

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