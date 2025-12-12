import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Modal,
  Text,
} from 'react-native';
import AsyncView from '../../components/AsyncView';
import { useGetCartQuery, usePlaceOrderMutation } from '../../store/api';
import CartItem from './CartItem';
import styled from 'styled-components/native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useCallback } from 'react';

export default function CartScreen() {
  const { data, isLoading, error } = useGetCartQuery();
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();

  const onPlaceOrder = useCallback(() => {
    placeOrder()
      .unwrap()
      .then(() => {
        Alert.alert('Order Created!');
      })
      .catch(err => Alert.alert(err.message ?? 'Failed to place order'));
  }, [placeOrder]);

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
      <Button title="PLACE ORDER" onPress={onPlaceOrder} />
      <Modal transparent visible={isPlacingOrder}>
        <LayoverContainer>
          <ActivityIndicator />
        </LayoverContainer>
      </Modal>
    </AsyncView>
  );
}

const EmptyContainer = styled.View`
  padding-vertical: 80px;
  align-items: center;
  justify-content: center;
`;

const LayoverContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;
