import { NavigationProp } from '@react-navigation/native';
import { Product } from '../store/api/types';

export type RootStackParamList = {
  Marketplace: undefined;
  Product: Product;
};

export type RootStackNavigationProp = NavigationProp<RootStackParamList>;
