import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TallyScreen from './TallyScreen';
import ListItem from '../Components/ListItem';

import clientList from '../assets/clients.json';

const HomeScreen = (props) => {
  const [clients, setClients] = useState(clientList.clients);

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>HomeScreen </Text>
      {clients.map((c) => (
        <ListItem key={c.clientId} client={c} navigation={props.navigation} />
      ))}
      <View style={styles.tallyContainer}>
        <TallyScreen title={'Put shirt on correctly'} />
      </View>
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
  },
  tallyContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
