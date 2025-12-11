import { ActivityIndicator, FlatList, View } from 'react-native';
import { useGetPaginatedProducts } from '../../store/api/hooks';
import ProductCard from './ProductCard';
import { useEffect, useRef, useState } from 'react';
import { Product, ProductFilters, SortOption } from '../../store/api/types';
import SortButtons from './SortButtons';
import Filters from './Filters';
import styled from 'styled-components/native';
import AsyncView from '../AsyncView';

interface ProductsListProps {
  onProductPress(product: Product): void;
}

export default function ProductsList({ onProductPress }: ProductsListProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    category: undefined,
  });
  const [sort, setSort] = useState<SortOption>('newest');
  const { data, error, isLoading, loadMore, isFetching } =
    useGetPaginatedProducts(filters, sort);

  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    listRef.current?.scrollToIndex({ index: 0, animated: false });
  }, [filters, sort]);

  return (
    <AsyncView
      isLoading={isLoading}
      error={error || !data ? 'Failed to get products' : undefined}
    >
      <View>
        <FiltersWrap>
          <Filters
            selectedCategory={filters.category}
            onSearchChange={search => setFilters(prev => ({ ...prev, search }))}
            onCategoryPress={category =>
              setFilters(prev => ({
                ...prev,
                category: prev.category !== category ? category : undefined,
              }))
            }
          />
        </FiltersWrap>
        <SortButtons onChange={setSort} />
        <FlatList
          ref={listRef}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ProductCard {...item} onProductPress={onProductPress} />
          )}
          onEndReached={loadMore}
          ListFooterComponent={isFetching ? <ActivityIndicator /> : undefined}
        />
      </View>
    </AsyncView>
  );
}

const FiltersWrap = styled.View`
  padding: 8px;
`;
