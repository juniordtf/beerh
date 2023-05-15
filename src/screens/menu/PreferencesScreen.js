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
import {AUTH_DATA_KEY} from '../../statics/Statics';
import {styles} from './styles';

function EnterGroupScreen({navigation, route}) {
  const [loading, isLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const [groupToken, setGroupToken] = useState('');

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);
      if (value !== null) {
        const data = JSON.parse(value);

        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    getUserData();
  }, []);

  const enterGroup = async () => {
    isLoading(true);
    await groupService.enterGroup(userData, groupToken);
    isLoading(false);
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
              onChangeText={(p) => setGroupToken(p)}
              value={groupToken}
              placeholder="IP"
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
            <Text style={styles.formTitle}>Porta</Text>
            <TextInput
              onChangeText={(p) => setGroupToken(p)}
              value={groupToken}
              placeholder="Porta"
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
          </View>
          <TouchableHighlight
            style={styles.confirmButtonContainer}
            onPress={() => enterGroup()}>
            <Text style={styles.confirmButtonText}>Enviar</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

export default EnterGroupScreen;
