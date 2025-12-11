/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';
import { store } from './src/store';
import ProductsList from './src/components/ProductsList';

const Header = styled.Text`
  text-align: center;
  font-weight: 700;
  font-size: 28px;
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
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Header>MarketplaceApp</Header>
        <ProductsList />
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
