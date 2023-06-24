import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserProfile from '../app/screens/user/UserProfile';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='User Profile'
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
