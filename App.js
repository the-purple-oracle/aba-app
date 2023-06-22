import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './app/context/store/Auth';
import Main from './navigators/Main';

//link to heroku server
// https://aba-server1-81e909527026.herokuapp.com/api/v1/
export default function App() {
  return (
    <Auth>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </Auth>
  );
}

const styles = StyleSheet.create({});
