import { FlatList, Text } from 'react-native';
import AsyncView from '../../components/AsyncView';
import { useGetCartQuery } from '../../store/api';
import CartItem from './CartItem';
import styled from 'styled-components/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

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
        ListEmptyComponent={
          <EmptyContainer>
            <FontAwesome6 name="cart-shopping" iconStyle="solid" size={40} />
            <Text>Cart empty</Text>
          </EmptyContainer>
        }
      />
    </AsyncView>
  );
}

const EmptyContainer = styled.View`
  padding-vertical: 80px;
  align-items: center;
  justify-content: center;
`;
