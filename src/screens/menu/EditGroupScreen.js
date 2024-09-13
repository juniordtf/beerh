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
  Platform,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../../statics/Statics';
import GroupIcon from '../../../assets/people.png';
import {groupService} from '../../services/groupService';

import {styles} from './styles';

const emptyList: Object = [];

function EditGroupScreen({navigation, route}) {
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [group, setGroup] = useState(emptyList);
  const [userData, setUserData] = useState('');

  const saveChanges = () => {
    navigation.navigate('Grupos');
  };

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

  React.useEffect(() => {
    getUserData();
    if (route.params?.group) {
      var currentGroup = route.params.group;
      setGroup(currentGroup);
      setName(currentGroup.name);
      setDescription(currentGroup.description);
      setImageUri(
        'http://192.168.2.124:8001/v1/uploads/' + currentGroup.avatar,
      );
    }
  }, [route.params?.group]);

  const selectGroupAvatar = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      const imageData = {
        name: res.name,
        type: res.type,
        uri:
          Platform.OS === 'android' ? res.uri : res.uri.replace('file://', ''),
      };

      const form = new FormData();
      form.append('file', imageData);

      setImageUri(res.uri);

      const groupData = {group, avatar: form};
      uploadAvatar(groupData);
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

  const uploadAvatar = async (groupData) => {
    await groupService.uploadAvatar(groupData, userData);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View style={styles.detailsPage}>
          <View style={styles.detailsBody}>
            <Text style={styles.formTitle}>Nome: </Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(groupName) => setName({groupName})}
              value={name}
              placeholder="Nome"
              underlineColorAndroid="transparent"
            />
            <Text style={styles.formTitle}>Descrição: </Text>
            <TextInput
              style={styles.inputField}
              onChangeText={(groupDescription) =>
                setDescription({groupDescription})
              }
              value={description}
              placeholder="Descrição"
              height={90}
              multiline={true}
              fontSize={12}
              underlineColorAndroid="transparent"
            />
            <Text style={styles.formTitle}>Avatar: </Text>

            <View style={styles.centeredTitleContainer}>
              <TouchableHighlight
                style={styles.menuItemImage}
                onPress={selectGroupAvatar}>
                {imageUri !== '' ? (
                  <Image
                    style={styles.groupAvatarImage}
                    source={{uri: imageUri}}
                  />
                ) : (
                  <Image style={styles.groupAvatarImage} source={GroupIcon} />
                )}
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.centeredBottomButton}>
            <TouchableHighlight
              style={styles.confirmButtonContainer}
              onPress={() => saveChanges()}>
              <Text style={styles.confirmButtonText}>Salvar</Text>
            </TouchableHighlight>
          </View>
        </View>
      )}
    </View>
  );
}

export default EditGroupScreen;
