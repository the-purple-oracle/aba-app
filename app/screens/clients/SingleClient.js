import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import TallyScreen from '../TallyScreen';
import StyledButton from '../../shared/StyledButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import baseURL from '../../assets/common/baseURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome';

const Client = (props) => {
  const navigation = useNavigation();
  const client = props.route.params;
  let behaviors = client.behaviors;
  const [tallies, setTallies] = useState();
  const [token, setToken] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    setUpTallies();
    return () => {
      setTallies();
      setToken();
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

  const deleteClient = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${baseURL}clients/${id}`, config)
      .then((res) => {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Client was successfully deleted',
          text2: '',
        });
        setTimeout(() => {
          navigation.navigate('Client List');
        }, 500);
      })
      .catch((error) => console.log(error));
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor='#E8E8E8'
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}
            >
              <Icon name='close' size={20} />
            </TouchableOpacity>

            <StyledButton
              medium
              secondary
              onPress={() => [
                navigation.navigate('Edit Client', client),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.btnText}>Edit</Text>
            </StyledButton>
            <StyledButton
              medium
              danger
              onPress={() => [deleteClient(client._id), setModalVisible(false)]}
            >
              <Text style={styles.btnText}>Delete</Text>
            </StyledButton>
          </View>
        </View>
      </Modal>
      <View style={styles.clientHeader}>
        <Text style={{ fontSize: 20 }}>{client.name}</Text>
      </View>
      <View style={styles.gear}>
        <TouchableOpacity onPress={() => toggleModal()}>
          <Icon name='gear' size={40} color='grey' />
        </TouchableOpacity>
      </View>

      <View style={styles.behaviorContainer}>
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
  clientHeader: {
    alignItems: 'center',
    paddingTop: 20,
  },
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  gear: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
});
export default Client;

// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Modal,
// } from 'react-native';
// import TallyScreen from '../TallyScreen';
// import StyledButton from '../../shared/StyledButton';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import AuthGlobal from '../../context/store/AuthGlobal';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import baseURL from '../../assets/common/baseURL';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';

// const Client = (props) => {
//   const context = useContext(AuthGlobal);
//   const navigation = useNavigation();
//   const client = props.route.params;
//   let behaviors = client.behaviors;
//   const [tallies, setTallies] = useState();
//   const [token, setToken] = useState();
//   const [user, setUser] = useState();
//   const [modalVisible, setModalVisible] = useState(false);

// useEffect(() => {
// AsyncStorage.getItem('jwt')
//   .then((res) => {
//     setToken(res);
//   })
//   .catch((error) => console.log(error));

// setUser(context.stateUser.user.userId);
// setUpTallies();

// return () => {
//   setTallies();
// setToken();
// setUser();
//   };
// }, []);

// const setUpTallies = () => {
//   let t = {};
//   for (let i = 0; i < behaviors.length; i++) {
//     t[behaviors[i]] = 0;
//   }
//   setTallies(t);
// };

// const getTally = (name, count) => {
//   let newTallies = tallies;
//   newTallies[name] = count;
//   setTallies(newTallies);
// };

// const deleteClient = (id) => {
// const config = {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// };
// axios
//   .delete(`${baseURL}/clients/${id}`, config)
//   .then((res) => {
//     Toast.show({
//       topOffset: 60,
//       type: 'success',
//       text1: 'Client was successfully deleted',
//       text2: '',
//     });
//     setTimeout(() => {
//       navigation.navigate('Client List');
//     }, 500);
//   })
//   .catch((error) => console.log(error));
// };
{
  /*
  return (
    <View>
    
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
       <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor='#E8E8E8'
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}
            >
              <Icon name='close' size={20} />
            </TouchableOpacity>

            <StyledButton
              medium
              secondary
              onPress={() => [
                navigation.navigate('Edit Client', client),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.btnText}>Edit</Text>
            </StyledButton>
            <StyledButton
              medium
              danger
              onPress={() => [deleteClient(client._id), setModalVisible(false)]}
            >
              <Text style={styles.btnText}>Delete</Text>
            </StyledButton>
          </View>
        </View> 
      </Modal>

      <View style={styles.clientHeader}>
        <Text style={{ fontSize: 20 }}>{client.name}</Text>
      </View>

      <View>
        <StyledButton secondary large>
          <Text>get tallies</Text>
        </StyledButton>
      </View>
      <View>
        <StyledButton secondary large onPress={setModalVisible(true)}>
          <Text>Open Modal</Text>
        </StyledButton>
      </View>
      <View style={styles.behaviorContainer}>
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
    */
}
//   );
// };
// const styles = StyleSheet.create({
//   clientHeader: {
//     alignItems: 'center',
//     paddingTop: 20,
//   },
//   behaviorContainer: {
//     height: '80%',
//     alignItems: 'center',
//     margin: 10,
//   },
//   flatListStyles: {
//     height: '80%',
//     alignItems: 'center',
//     margin: 10,
//     alignItems: 'flex-start',
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//   },
// });
// export default Client;
