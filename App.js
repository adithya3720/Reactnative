import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import ProfileScreen from './Screens/ProfileScreen';
import WishlistScreen from './Screens/WishlistScreen';
import ProductDetailScreen from './Screens/ProductDetailScreen';
import CategoriesScreens from './Screens/CategoriesScreens';
import CartScreens from './Screens/CartScreens';
import CartContext from './Screens/CartContext';
import BottomTab from './components/BottomTab';
import Dummyproducts from './Screens/Dummyproducts';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="BottomTab" component={BottomTab}/>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="Categories" component={CategoriesScreens} />
          <Stack.Screen name="Cart" component={CartScreens} initialParams={{ amount: 150 }} />
          <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
          <Stack.Screen name="CartContext" component={CartContext}/>
          <Stack.Screen name="Dummyproducts" component={Dummyproducts}/>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;