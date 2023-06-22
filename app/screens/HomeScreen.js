import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TallyScreen from './TallyScreen';
import ListItem from '../components/ListItem';
import StyledButton from '../shared/StyledButton';

const HomeScreen = (props) => {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Clients</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    height: '100%',
    backgroundColor: 'red',
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
