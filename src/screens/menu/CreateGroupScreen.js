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
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../../statics/Statics';
import DocumentPicker from 'react-native-document-picker';
import GroupIcon from '../../../assets/people.png';
import {groupService} from '../../services/groupService';
import {format} from 'date-fns';

import {styles} from './styles';

function CreateGroupScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [userData, setUserData] = useState('');
  const timeStamp = format(new Date(), 'dd/MM/yyyy HH:mm:ss');

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);
      if (value !== null) {
        const data = JSON.parse(value);
        setUserData(data);
        console.log(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    getUserData();
  }, []);

  const selectGroupAvatar = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      console.log('Res : ' + res.uri);
      setImageUri(res.uri);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        Alert.alert('Cancelado pelo seletor de documento');
      } else {
        //For Unknown Error
        Alert.alert('Erro desconhecido: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const createGroup = () => {
    const groupData = {
      name,
      avatar: setImageUri,
      ownerId: userData.id,
    };
    groupService.createGroup(groupData, userData, navigation);
  };

  return (
    <View style={styles.centeredContainer}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View style={styles.contaier}>
          <View style={styles.imageContainer}>
            <TouchableHighlight
              style={styles.menuItemImage}
              onPress={selectGroupAvatar}>
              {imageUri !== '' ? (
                <Image style={styles.avatarImage} source={{uri: imageUri}} />
              ) : (
                <Image style={styles.avatarImage} source={GroupIcon} />
              )}
            </TouchableHighlight>
          </View>
          <Text>Nome</Text>
          <TextInput
            onChangeText={(p) => setName(p)}
            value={name}
            placeholder="Nome"
            underlineColorAndroid="transparent"
            style={styles.inputField}
            width={250}
          />
          <TouchableHighlight
            style={styles.confirmButtonContainer}
            onPress={() => createGroup()}>
            <Text style={styles.confirmButtonText}>Criar grupo</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

export default CreateGroupScreen;
