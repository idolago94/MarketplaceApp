import { View } from 'react-native';
import ProductsList from '../components/ProductsList';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigation/types';

export default function MarketplaceScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  return (
    <View>
      <ProductsList
        onProductPress={product => navigation.navigate('Product', product)}
      />
    </View>
  );
}
