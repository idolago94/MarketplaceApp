/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import ProductScreen from './src/screens/ProductScreen';
import CartFloatButton from './src/components/CartFloatButton';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
          </Stack.Navigator>
          <CartFloatButton />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
