import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useGetPaginatedProducts } from '../store/api/hooks';
import ProductCard from './ProductCard';

export default function ProductsList() {
  const { data, error, isLoading, loadMore, isFetching } =
    useGetPaginatedProducts();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !data) {
    return <Text>Failed to get products</Text>;
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ProductCard {...item} />}
      onEndReached={loadMore}
      ListFooterComponent={isFetching ? <ActivityIndicator /> : undefined}
    />
  );
}
