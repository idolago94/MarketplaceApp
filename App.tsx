/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';
import { store } from './src/store';
import { useGetAllProductsQuery } from './src/store/api';

const Header = styled.Text`
  text-align: center;
  font-weight: 700;
  font-size: 28px;
`;

const ProductsCounter = styled.Text`
  text-align: center;
  font-size: 22px;
  margin-vertical: 30px;
`;

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

function AppContent() {
  const { data, isLoading } = useGetAllProductsQuery();

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header>MarketplaceApp</Header>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <ProductsCounter>{data?.length} Products</ProductsCounter>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
