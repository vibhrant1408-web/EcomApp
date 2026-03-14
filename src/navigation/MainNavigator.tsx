import React, { FC, ReactNode } from 'react';
import { Image, ColorValue, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import { colors } from '../utils/theme';
import { RootState } from '../redux/store';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeList" component={HomeScreen} />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen as any}
    />
  </Stack.Navigator>
);

const CartStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CartList" component={CartScreen} />
    <Stack.Screen name="Checkout" component={CheckoutScreen as any} />
  </Stack.Navigator>
);

const ProfileStack: FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileList" component={ProfileScreen} />
  </Stack.Navigator>
);

interface TabIconProps {
  image: any;
  color: ColorValue;
}

const TabIcon: FC<TabIconProps> = ({ image, color }) => (
  <Image
    source={image}
    style={{
      width: 24,
      height: 24,
      tintColor: color,
      resizeMode: 'contain',
    }}
  />
);

interface CartTabIconProps {
  image: any;
  color: ColorValue;
}

const CartTabIcon: FC<CartTabIconProps> = ({ image, color }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;

  return (
    <View>
      <Image
        source={image}
        style={{
          width: 24,
          height: 24,
          tintColor: color,
          resizeMode: 'contain',
        }}
      />
      {cartCount > 0 && (
        <View style={[styles.badgeContainer, { backgroundColor: colors.danger }]}>
          <Text style={styles.badgeText}>{cartCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
});

const MainNavigator: FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: colors.gray_400,
        tabBarStyle: {
          backgroundColor: '#141416',
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <TabIcon image={require('../assets/home.png')} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <CartTabIcon image={require('../assets/cart.png')} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color }) => (
            <TabIcon image={require('../assets/profile.png')} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
