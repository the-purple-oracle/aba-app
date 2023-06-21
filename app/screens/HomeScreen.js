import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TallyScreen from './TallyScreen';
import ListItem from '../Components/ListItem';
import StyledButton from '../Shared/StyledButton';
import clientList from '../assets/clients.json';

const HomeScreen = (props) => {
  const [clients, setClients] = useState(clientList.clients);

  const addClient = () => {
    const newClient = {
      clientId: '4',
      name: 'Tim',
      age: 6,
      behaviors: ['biting', 'crossing the road'],
    };
    const newList = clients;
    newList.push(newClient);
    setClients(newList);
  };
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Clients</Text>
      {clients.map((c) => (
        <ListItem key={c.clientId} client={c} navigation={props.navigation} />
      ))}
      <View>
        <StyledButton secondary large onPress={() => addClient()}>
          <Text>Add Client</Text>
        </StyledButton>
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
    fontSize: 25,
  },
  tallyContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
