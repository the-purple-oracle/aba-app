import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeNavigator from './HomeNavigator';
import ClientsNavigator from './ClientsNavigator';
import UserNavigator from './UserNavigator';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#e91e63',
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name='home'
              style={{ position: 'relative' }}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Clients'
        component={ClientsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <Icon name='users' color={color} size={30} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name='User'
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='user' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
