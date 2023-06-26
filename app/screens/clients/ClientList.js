import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import StyledButton from '../../shared/StyledButton';
import ListItem from '../../components/ListItem';
import { useFocusEffect } from '@react-navigation/core';
import AuthGlobal from '../../context/store/AuthGlobal';
import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientList = (props) => {
  const context = useContext(AuthGlobal);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [clients, setClients] = useState();

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    setUser(context.stateUser.user.userId);

    return () => {
      setUser();
      setToken();
    };
  }, []);

  //fetch clients
  useFocusEffect(
    useCallback(() => {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        axios
          .get(`${baseURL}clients/users/${user}`, config)
          .then((res) => {
            setClients(res.data);
          })
          .catch((error) => console.log(error));

        return () => {
          setClients();
        };
      }
    }, [props.navigation.isFocused(), token])
  );

  const handleAddClient = () => {
    props.navigation.navigate('Add Client');
  };
  return (
    <ScrollView>
      {/* <View style={styles.listContainer}> */}
      <Text style={styles.title}>Clients</Text>
      {clients ? (
        clients?.map((c) => (
          <ListItem key={c.id} client={c} navigation={props.navigation} />
        ))
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      <View style={styles.btnContainer}>
        <StyledButton secondary large onPress={() => handleAddClient()}>
          <Text style={styles.btnText}>Add Client</Text>
        </StyledButton>
      </View>
      {/* </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
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
  btnText: {
    color: 'white',
    alignSelf: 'center',
  },
  btnContainer: {
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ClientList;
