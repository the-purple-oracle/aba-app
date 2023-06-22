import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import baseURL from '../../assets/common/baseURL';

import AuthGlobal from '../../context/store/AuthGlobal';
import { logoutUser } from '../../context/actions/Auth.actions';
import StyledButton from '../../shared/StyledButton';

const UserProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login');
      }

      if (context.stateUser.isAuthenticated) {
        AsyncStorage.getItem('jwt')
          .then((res) => {
            axios
              .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                headers: { Authorization: `Bearer ${res}` },
              })
              .then((user) => setUserProfile(user.data));
          })
          .catch((error) => console.log(error));
      }

      return () => {
        setUserProfile();
      };
    }, [context.stateUser.isAuthenticated])
  );

  const handleSignOut = () => {
    AsyncStorage.removeItem('jwt');
    logoutUser(context.dispatch);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>
          {userProfile ? userProfile.name : ''}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ''}
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <StyledButton secondary large onPress={handleSignOut}>
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Sign Out
            </Text>
          </StyledButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  subContainer: {
    alignItems: 'center',
  },
});
export default UserProfile;
