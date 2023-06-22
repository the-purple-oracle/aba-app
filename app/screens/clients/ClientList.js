import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from '../../shared/StyledButton';
import ListItem from '../../components/ListItem';
import clientsList from '../../assets/clients.json';

const ClientList = (props) => {
  const [clients, setClients] = useState(clientsList.clients);
  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Clients</Text>
      {clients.map((c) => (
        <ListItem key={c.clientId} client={c} navigation={props.navigation} />
      ))}
      <View>
        <StyledButton secondary large>
          <Text>Add Client</Text>
        </StyledButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
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
});

export default ClientList;
