import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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
      <View style={styles.behaviorContainer}>
        {/* {behaviors.map((b, i) => (
          <TallyScreen key={i} title={b} getTally={getTally} />
        ))} */}
        <FlatList
          data={client.behaviors}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          renderItem={({ item }) => (
            <TallyScreen title={item} getTally={getTally} />
          )}
          contentContainerStyle={[styles.flatListStyles]}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  behaviorContainer: {
    height: '80%',
    alignItems: 'center',
    margin: 10,
  },
  flatListStyles: {
    height: '80%',
    alignItems: 'center',
    margin: 10,
    alignItems: 'flex-start',
  },
});
export default Client;
