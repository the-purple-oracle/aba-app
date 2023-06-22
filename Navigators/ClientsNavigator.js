import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientList from '../app/screens/clients/ClientList';
import SingleClient from '../app/screens/clients/SingleClient';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Clients'
        component={ClientList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Client'
        component={SingleClient}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function ClientsNavigator() {
  return <MyStack />;
}
