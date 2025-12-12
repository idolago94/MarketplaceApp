import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackNavigationProp } from '../../navigation/types';
import { useGetCartQuery } from '../../store/api';

export default function CartFloatButton() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { data } = useGetCartQuery();
  return (
    <FloatButton onPress={() => navigation.navigate('Cart')}>
      <FontAwesome6 name="cart-shopping" iconStyle="solid" size={30} />
      {data?.items.length ? (
        <Counter>
          ({data.items.reduce((count, acc) => count + acc.quantity, 0)})
        </Counter>
      ) : undefined}
    </FloatButton>
  );
}

const FloatButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: white;
  border-radius: 50%;
  padding: 14px;
  border-width: 1px;
`;

const Counter = styled.Text`
  text-align: center;
  font-size: 10px;
`;
