import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {groupService} from '../../services/groupService';
import AsyncStorage from '@react-native-community/async-storage';
import {PREFERENCES_KEY} from '../../statics/Statics';
import {styles} from './styles';

function EnterGroupScreen({navigation, route}) {
  const [loading, isLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('');

  const getPreferences = async () => {
    try {
      const value = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (value !== null) {
        const data = JSON.parse(value);

        setIp(data.ip);
        setPort(data.port);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    getPreferences();
  }, []);

  const saveChanges = async () => {
    isLoading(true);
    const preferencesData = {ip, port};

    await AsyncStorage.setItem(
      PREFERENCES_KEY,
      JSON.stringify(preferencesData),
      (err) => {
        if (err) {
          console.log('an error occured');
          throw err;
        }
        console.log('Success. Preferences updated');
        isLoading(false);
      },
    )
      .then(navigation.goBack())
      .catch((err) => {
        console.log('error is: ' + err);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View style={styles.detailsPage}>
          <View style={styles.detailsBody}>
            <Text style={styles.formTitle}>Servidor</Text>
            <Text style={styles.formTitle}>IP</Text>
            <TextInput
              onChangeText={(p) => setIp(p)}
              value={ip}
              placeholder="IP"
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
            <Text style={styles.formTitle}>Porta</Text>
            <TextInput
              onChangeText={(p) => setPort(p)}
              value={port}
              placeholder="Porta"
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
          </View>
          <TouchableHighlight
            style={styles.confirmButtonContainer}
            onPress={() => saveChanges()}>
            <Text style={styles.confirmButtonText}>Enviar</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

export default EnterGroupScreen;
