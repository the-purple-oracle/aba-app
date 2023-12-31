import React, { useEffect, useContext, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import FormContainer from '../../shared/form/FormContainer';
import Input from '../../shared/form/Input';
import Error from '../../shared/Error';
import StyledButton from '../../shared/StyledButton';
//Context
import AuthGlobal from '../../context/store/AuthGlobal';
import { loginUser } from '../../context/actions/Auth.actions';

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();

  //hide bottom nav bar
  useLayoutEffect(() => {
    const hideUnsubscribe = props.navigation.addListener('focus', (e) => {
      let parentNav = props.navigation.getParent();
      parentNav.setOptions({
        tabBarStyle: { display: 'none' },
      });
    });
  }, []);

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      props.navigation.navigate('Home');
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    if (email === '' || password === '') {
      setError('Please fill in credentials');
    } else {
      setError();
      loginUser(user, context.dispatch);
    }
  };
  return (
    <FormContainer title={'Login'}>
      <Input
        placeholder={'Enter Email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        placeholder={'Enter Password'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text.toLowerCase())}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <StyledButton large primary onPress={() => handleSubmit()}>
          <Text style={styles.btnText}>Login</Text>
        </StyledButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <StyledButton
          large
          secondary
          onPress={() => props.navigation.navigate('Register')}
        >
          <Text style={styles.btnText}>Register</Text>
        </StyledButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
