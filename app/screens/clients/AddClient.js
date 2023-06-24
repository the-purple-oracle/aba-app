import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import FormContainer from '../../shared/form/FormContainer';
import Input from '../../shared/form/Input';
import Toast from 'react-native-toast-message';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthGlobal from '../../context/store/AuthGlobal';
import { useNavigation } from '@react-navigation/native';

const AddClient = (props) => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [behaviors, setBehaviors] = useState([['']]);
  const [notes, setNotes] = useState('');
  const [user, setUser] = useState('');
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    setUser(context.stateUser.user.userId);
  }, []);

  const onSubmit = () => {
    //send new client to backend

    if (name === '' || user === '') {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please fill in all fields',
        text2: 'Try again later',
      });
    } else {
      let newClient = {
        name: name,
        behaviors: behaviors,
        notes: notes,
        user: user,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post(`${baseURL}clients`, newClient, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: 'success',
              text1: 'New client successfully added',
              text2: '',
            });

            setTimeout(() => {
              navigation.navigate('Client List');
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Something went wrong',
            text2: 'Please try again',
          });
        });

      setName('');
      setBehaviors([[]]);
      setNotes('');
    }
  };

  const handleAdd = () => {
    const newList = [...behaviors, []];
    setBehaviors(newList);
  };

  const handleChange = (value, i) => {
    const inputData = [...behaviors];
    inputData[i] = value;
    setBehaviors(inputData);
  };

  const handleDelete = (i) => {
    const deleteVal = [...behaviors];
    deleteVal.splice(i, 1);
    if (deleteVal.length == 0) {
      setBehaviors([[]]);
    } else {
      setBehaviors(deleteVal);
    }
  };
  return (
    <FormContainer>
      <Text style={styles.labelText}>Client Name</Text>
      <Input
        placeholder='Client Name'
        name='name'
        id='name'
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.behaviorsTitle}>
        <Text style={styles.labelText}>Behaviors</Text>
        <Button title='add' onPress={() => handleAdd()} />
      </View>

      {behaviors.map((data, i) => {
        return (
          <View style={styles.behaviorInput} key={i}>
            <TextInput
              key={i}
              value={behaviors[i]}
              placeholder='add behavior'
              onChangeText={(e) => handleChange(e, i)}
              style={styles.input}
            />
            <Button title='x' onPress={() => handleDelete(i)} />
          </View>
        );
      })}

      <Text style={styles.labelText}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        multiline
        numberOfLines={6}
        returnKeyType='done'
        placeholder='Notes'
        name='notes'
        id='notes'
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />

      <Button title='Submit' onPress={onSubmit} />
    </FormContainer>
  );
};
const styles = StyleSheet.create({
  labelText: {
    fontSize: 20,
    paddingRight: 10,
  },
  input: {
    width: '80%',
    height: 60,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: 'orange',
  },
  behaviorInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
  },
  behaviorsTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notesInput: {
    width: '80%',
    height: 150,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    padding: 10,
    paddingTop: 10,
    borderWidth: 2,
    borderColor: 'orange',
  },
});
export default AddClient;
