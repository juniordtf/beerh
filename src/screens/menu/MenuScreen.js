import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {useAuth} from '../../contexts/Auth';
import AsyncStorage from '@react-native-community/async-storage';
import GroupsIcon from '../../../assets/groups.png';
import LogoutIcon from '../../../assets/logout.png';
import UserIcon from '../../../assets/user.png';
import DocumentPicker from 'react-native-document-picker';
import {userService} from '../../services/userService';
import {AUTH_DATA_KEY} from '../../statics/Statics';
import api from '../../services/api';

function MenuScreen({navigation}) {
  window.menuScreen = this;
  const [loading, isLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const [imageUri, setImageUri] = useState('');
  const auth = useAuth();

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);
      if (value !== null) {
        const userData = JSON.parse(value);

        setUserName(userData.name);
        setUserId(userData.id);
        setUserToken(userData.token);

        if (userData.avatar != null && userData.avatar !== undefined) {
          setImageUri(api + '/public/uploads' + userData.avatar);

          console.log('//////////////////////////////////');
          console.log(api);
          console.log('//////////////////////////////////');
        }
        console.log('-------- Menu View ---------');
        console.log(JSON.parse(value));
        console.log('----------------------------');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    getUserData();
  }, []);

  const selectUserAvatar = async () => {
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

      setImageUri(res.uri);

      const userData = {userId, userToken, avatar: imageData};
      uploadAvatar(userData);
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

  const uploadAvatar = async (userData) => {
    await userService.uploadAvatar(userData);
  };

  const goToGroupsScreen = () => {
    navigation.navigate('Grupos');
  };

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View>
          <View style={styles.menuHeader}>
            <View style={styles.rowContainer}>
              <TouchableHighlight
                style={styles.menuItemImage}
                onPress={selectUserAvatar}>
                {imageUri !== '' ? (
                  <Image style={styles.avatarImage} source={{uri: imageUri}} />
                ) : (
                  <Image style={styles.avatarImage} source={UserIcon} />
                )}
              </TouchableHighlight>
              <Text style={styles.menuHeaderText}> Olá, {userName}!</Text>
            </View>
          </View>
          <TouchableHighlight
            style={styles.menuItem}
            onPress={goToGroupsScreen}>
            <View style={styles.rowContainer}>
              <Image source={GroupsIcon} style={styles.menuItemImage} />
              <Text style={styles.menuItemText}>Grupos</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.menuItem} onPress={signOut}>
            <View style={styles.rowContainer}>
              <Image source={LogoutIcon} style={styles.menuItemImage} />
              <Text style={styles.menuItemText}>Sair</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

export default MenuScreen;
