import React, {
  useState,
  useContext,
  useCallback,
  useLayoutEffect,
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TallyScreen from './TallyScreen';
import ListItem from '../components/ListItem';
import StyledButton from '../shared/StyledButton';
import { useFocusEffect } from '@react-navigation/core';
import AuthGlobal from '../context/store/AuthGlobal';

const HomeScreen = (props) => {
  //check if user needs to login when arriving at the home page
  const context = useContext(AuthGlobal);
  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      }
    })
  );

  //add tab bar back in after login
  useLayoutEffect(() => {
    const hideUnsubscribe = props.navigation.addListener('focus', (e) => {
      let parentNav = props.navigation.getParent();
      parentNav.setOptions({
        tabBarStyle: { display: 'flex' },
      });
    });
  });

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Home Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    height: '100%',
    backgroundColor: 'gainsboro',
    position: 'relative',
  },
  title: {
    marginTop: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 25,
  },
  tallyContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
