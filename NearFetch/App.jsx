import React from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailsScreen'
import CartScreen from './screens/CartScreen';

const stack = createStackNavigator();

const YourApp = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="Details" component={DetailsScreen} />
        <stack.Screen name="Cart" component={CartScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default YourApp;