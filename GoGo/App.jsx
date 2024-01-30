import React from 'react';
import {Text, View} from 'react-native';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LiveSchedule from './screens/LiveSchedule';
import Stations from './screens/Stations';
import Tickets from './screens/Tickets';

const Tab = createBottomTabNavigator();

const GoGo = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#A63A50" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor:'#A63A50',
          tabBarInactiveTintColor:'#AB9B96',
        }}>
        <Tab.Screen name="LiveSchedule" component={LiveSchedule} options={{
          headerShown: false,
          tabBarLabel: 'Live Schedule',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alarm" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Stations" component={Stations} options={{
          headerShown: false,
          tabBarLabel: 'Stations',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bus-stop" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Tickets" component={Tickets} options={{
          headerShown: false,
          tabBarLabel: 'Tickets',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="ticket-confirmation" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default GoGo;