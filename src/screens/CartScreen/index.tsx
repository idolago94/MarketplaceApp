import { FlatList } from 'react-native';
import AsyncView from '../../components/AsyncView';
import { useGetCartQuery } from '../../store/api';
import CartItem from './CartItem';

export default function CartScreen() {
  const { data, isLoading, error } = useGetCartQuery();
  return (
    <AsyncView isLoading={isLoading} error={error?.message}>
      <FlatList
        data={data?.items}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <CartItem id={item.productId} quantity={item.quantity} />
        )}
      />
    </AsyncView>
  );
}
