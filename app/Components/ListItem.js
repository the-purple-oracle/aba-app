import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = (props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate('Client', { client: props.client })
      }
    >
      <Text style={styles.txt}>{props.client.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: 'gainsboro',
  },
  txt: {
    fontSize: 20,
    marginLeft: 100,
    padding: 10,
  },
});

export default ListItem;
