import { Text, View } from 'react-native';
import { useGetProductQuery } from '../../store/api';
import AsyncView from '../../components/AsyncView';

interface CartItemProps {
  id: string;
  quantity: number;
}

export default function CartItem({ id, quantity }: CartItemProps) {
  const { data, isLoading, error } = useGetProductQuery({ id });
  return (
    <AsyncView isLoading={isLoading} error={error?.message}>
      <View>
        <Text>{data?.name}</Text>
        <Text>
          {data?.price} x{quantity}
        </Text>
      </View>
    </AsyncView>
  );
}
