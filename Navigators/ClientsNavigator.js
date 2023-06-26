import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ClientList from '../app/screens/clients/ClientList';
import SingleClient from '../app/screens/clients/SingleClient';
import AddClient from '../app/screens/clients/AddClient';
import EditClient from '../app/screens/clients/EditClient';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Client List'
        component={ClientList}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='Clients' component={SingleClient} />
      <Stack.Screen name='Add Client' component={AddClient} />
      <Stack.Screen name='Edit Client' component={EditClient} />
    </Stack.Navigator>
  );
}

export default function ClientsNavigator() {
  return <MyStack />;
}
