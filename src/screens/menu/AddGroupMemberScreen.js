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

const emptyList: Object = [];

function AddGroupMemberScreen({navigation, route}) {
  const [loading, isLoading] = useState(false);
  const [group, setGroup] = useState(emptyList);
  const [userData, setUserData] = useState('');
  const [memberEmail, setMemberEmail] = useState('');

  React.useEffect(() => {
    if (route.params?.group) {
      setGroup(route.params.group);
    }
  }, [route.params?.group]);

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

  const sendInvitation = async () => {
    isLoading(true);
    await groupService.sendInvitation(memberEmail, userData, group);
    isLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View style={styles.detailsPage}>
          <View style={styles.detailsBody}>
            <Text style={styles.formTitle}>
              Informe abaixo o e-mail da pessoa que você deseja convidar para o
              grupo:{' '}
            </Text>
            <TextInput
              onChangeText={(p) => setMemberEmail(p)}
              value={memberEmail}
              placeholder="E-mail"
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
          </View>
          <TouchableHighlight
            style={styles.confirmButtonContainer}
            onPress={() => sendInvitation()}>
            <Text style={styles.confirmButtonText}>Enviar convite</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

export default AddGroupMemberScreen;
