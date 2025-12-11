import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { RootStackNavigationProp } from '../../navigation/types';

export default function CartFloatButton() {
    const navigation = useNavigation<RootStackNavigationProp>();
  return (
    <FloatButton onPress={() => navigation.navigate('Cart')}>
      <FontAwesome6 name="cart-shopping" iconStyle="solid" size={30} />
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
