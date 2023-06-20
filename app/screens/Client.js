import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TallyScreen from './TallyScreen';

const Client = (props) => {
  console.log(props.client);
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};
const styles = StyleSheet.create({});
export default Client;
