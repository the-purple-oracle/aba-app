import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../shared/form/FormContainer';
import Input from '../../shared/form/Input';
import Error from '../../shared/Error';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import StyledButton from '../../shared/StyledButton';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const register = () => {
    if (email === '' || name === '' || password === '') {
      setError('Please include all fields');
    } else {
      setError();
      console.log('registered');
    }
    let user = {
      name: name,
      email: email,
      password: password,
      isAdmin: false,
    };
    axios
      .post(`${baseURL}users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Registration Complete',
            text2: 'Please login to your account',
          });
          setTimeout(() => {
            props.navigation.navigate('Login');
          }, 500);
        }
      })
      .catch((err) => {
        Toast.show({
          topOffset: 60,
          type: 'error',
          text1: 'Something went wrong',
          text2: 'Please try again',
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Register'}>
        <Input
          placeholder={'Email'}
          name={'email'}
          id={'email'}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={'Password'}
          name={'password'}
          id={'password'}
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder={'Name'}
          name={'name'}
          id={'name'}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
          <StyledButton xlarge primary onPress={() => register()}>
            <Text style={styles.btnText}>Register</Text>
          </StyledButton>
        </View>
        <View>
          <StyledButton
            xlarge
            secondary
            onPress={() => props.navigation.navigate('Login')}
          >
            <Text style={styles.btnText}>Back To Login</Text>
          </StyledButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Register;
