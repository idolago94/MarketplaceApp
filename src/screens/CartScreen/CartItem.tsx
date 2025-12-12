import { Alert, Text } from 'react-native';
import {
  useGetProductQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from '../../store/api';
import AsyncView from '../../components/AsyncView';
import styled from 'styled-components/native';
import { Flex1, Row } from '../../components/shared';
import QuantityModifier from '../../components/QuantityModifier';
import { useCallback, useMemo } from 'react';
import { debounce } from '../../utils/debounce';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';

interface CartItemProps {
  id: string;
  quantity: number;
}

export default function CartItem({ id, quantity }: CartItemProps) {
  const { data, isLoading, error } = useGetProductQuery({ id });
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const onQuantiyChangeDebounce = useMemo(
    () =>
      debounce((newQuantity: number) => {
        updateCartItem({ id, quantity: newQuantity });
      }, 1000),
    [id, updateCartItem],
  );

  const onRemovePress = useCallback(() => {
    Alert.alert('Remove item?', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'confirm', onPress: () => removeCartItem(id) },
    ]);
  }, [id, removeCartItem]);

  return (
    <AsyncView isLoading={isLoading} error={error?.message}>
      <ItemCard>
        <Row gap={8}>
          <ItemImage source={{ uri: data?.image }} />
          <Flex1>
            <Row align="center">
              <Flex1>
                <Text>{data?.name}</Text>
              </Flex1>
              <FontAwesome6
                name="trash"
                iconStyle="solid"
                onPress={onRemovePress}
              />
            </Row>
            <ItemDescription>{data?.description}</ItemDescription>
            <Row>
              <Flex1>
                <Text>{data?.price}</Text>
              </Flex1>
              <QuantityModifier
                initialValue={quantity}
                onChange={onQuantiyChangeDebounce}
              />
            </Row>
          </Flex1>
        </Row>
      </ItemCard>
    </AsyncView>
  );
}

const ItemCard = styled.View`
  margin: 0px 8px;
  padding: 8px;
  border-bottom-width: 1px;
`;

const ItemDescription = styled.Text`
  color: gray;
  margin-vertical: 4px;
`;

const ItemImage = styled.Image`
  width: 25%;
  aspect-ratio: 1;
  border-radius: 8px;
`;
