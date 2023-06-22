import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TallyScreen from '../TallyScreen';
import StyledButton from '../../shared/StyledButton';

const Client = (props) => {
  const client = props.route.params;
  let behaviors = client.behaviors;
  const [tallies, setTallies] = useState();

  useEffect(() => {
    setUpTallies();
    return () => {
      setTallies();
    };
  }, []);

  const setUpTallies = () => {
    let t = {};
    for (let i = 0; i < behaviors.length; i++) {
      t[behaviors[i]] = 0;
    }
    setTallies(t);
  };

  const getTally = (name, count) => {
    let newTallies = tallies;
    newTallies[name] = count;
    setTallies(newTallies);
  };
  return (
    <View>
      <Text>{client.name}</Text>
      <View>
        <StyledButton secondary large>
          <Text>get tallies</Text>
        </StyledButton>
      </View>
      {behaviors.map((b, i) => (
        <TallyScreen key={i} title={b} getTally={getTally} />
      ))}
    </View>
  );
};
const styles = StyleSheet.create({});
export default Client;
