import { NavigationProp } from '@react-navigation/native';
import { Product } from '../store/api/types';

export type RootStackParamList = {
  Marketplace: undefined;
  Product: Product;
  Cart: undefined;
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
