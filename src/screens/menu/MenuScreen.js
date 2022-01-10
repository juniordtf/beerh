import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import {styles} from './styles';
import {useAuth} from '../../contexts/Auth';
import AsyncStorage from '@react-native-community/async-storage';

function MenuScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const auth = useAuth();

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem('@AuthData');
      if (value !== null) {
        const userData = JSON.parse(value);
        setUserName(userData.name);
        console.log(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    getUserData();
  }, []);

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View>
          <Text> Olá, {userName}!</Text>
          <Button title="Sair" onPress={signOut} />
        </View>
      )}
    </View>
  );
}

export default MenuScreen;
