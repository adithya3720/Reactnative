import React from 'react';
import {
  createNavigationContainerRef,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import WishlistScreen from './Screens/WishlistScreen';
import ProductDetailScreen from './Screens/ProductDetailScreen';
import CategoriesScreens from './Screens/CategoriesScreens';
import CartScreens from './Screens/CartScreens';
import CartContext from './Screens/CartContext';
import { CartStateProvider } from './Screens/CartStateContext';
import { WishlistProvider } from './Context/WishlistContext';
import BottomTab from './components/BottomTab';
import Dummyproducts from './Screens/Dummyproducts';
import OfferScreen from './Screens/OfferScreen';
import ReviewScreen from './Screens/ReviewScreen';
import { ThemeProvider, useTheme } from './Screens/ThemeContext';
import FlashSaleScreen from './Screens/FlasSaleScreen';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();
const tabRouteNames = ['Home', 'Wishlist', 'Categories', 'Notifications', 'Cart', 'Profile'];

function AppNavigation() {
  const { theme, isDark } = useTheme();
  const [currentRouteName, setCurrentRouteName] = React.useState('');
  const updateCurrentRoute = () => {
    setCurrentRouteName(navigationRef.getCurrentRoute()?.name || '');
  };
  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: theme.primary,
    },
  };

  return (
    <View style={styles.app}>
      <NavigationContainer
        ref={navigationRef}
        theme={navigationTheme}
        onReady={updateCurrentRoute}
        onStateChange={updateCurrentRoute}
      >
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="BottomTab" component={BottomTab} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreens} />
          <Stack.Screen name="Cart" component={CartScreens} initialParams={{ amount: 150 }} />
          <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
          <Stack.Screen name="CartContext" component={CartContext} />
          <Stack.Screen name="Dummyproducts" component={Dummyproducts} />
          <Stack.Screen name="Offers" component={OfferScreen} />
          <Stack.Screen name="Reviews" component={ReviewScreen} />
          <Stack.Screen name="FlashSale" component={FlashSaleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {currentRouteName !== 'FlashSale' && (
        <TouchableOpacity
          style={[
            styles.flashSaleShortcut,
            {
              backgroundColor: theme.primary,
              bottom: tabRouteNames.includes(currentRouteName) ? 100 : 24,
            },
          ]}
          onPress={() => navigationRef.navigate('FlashSale')}
          accessibilityRole="button"
          accessibilityLabel="Open Flash Sale"
        >
          <Ionicons name="flash" size={18} color="#FFFFFF" />
          <Text style={styles.flashSaleShortcutText}>Flash Sale</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <CartStateProvider>
        <WishlistProvider>
          <ThemeProvider>
            <AppNavigation />
          </ThemeProvider>
        </WishlistProvider>
      </CartStateProvider>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  flashSaleShortcut: {
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  flashSaleShortcutText: {
    marginLeft: 7,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});