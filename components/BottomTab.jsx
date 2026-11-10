
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../Screens/HomeScreen';
import CategoriesScreen from '../Screens/CategoriesScreens';
import WishlistScreen from '../Screens/WishlistScreen';
import CartScreen from '../Screens/CartScreens';
import ProfileScreen from '../Screens/ProfileScreen';
import Dummyproducts from '../Screens/Dummyproducts';

const Tab = createBottomTabNavigator();

const BLUE = '#078DD3';

export default function BottomTab({ route }) {
  const userContact =
  route?.params?.params?.userContact ?? route?.params?.userContact;
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: BLUE,
          tabBarInactiveTintColor: '#8793a5',
          tabBarStyle: {
            height: 85,
            paddingTop: 6,
            paddingBottom: 6,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E9EDF2',
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Wishlist') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Notifications') {
               iconName = focused ? 'notifications' : 'notifications-outline';
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ userContact }}
        />
        <Tab.Screen name="Wishlist" component={WishlistScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Cart" component={CartScreen} initialParams={{ amount: 150 }} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{ userContact }}/>
          <Tab.Screen
         name="Notifications"
           component={Dummyproducts}
/>
        
      </Tab.Navigator>
  );
}
