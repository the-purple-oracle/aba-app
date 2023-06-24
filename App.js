import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './app/context/store/Auth';
import Main from './navigators/Main';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Auth>
      <NavigationContainer>
        <Main />
        <Toast />
      </NavigationContainer>
    </Auth>
  );
}

const styles = StyleSheet.create({});
