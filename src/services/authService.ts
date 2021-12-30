import {Alert} from 'react-native';
import axios from 'axios';

export const signIn = async (credentials): Promise<AuthData> => {
  await axios
    .request({
      method: 'post',
      url: 'http://localhost:8001/v1/account/auth',
      data: credentials,
    })
    .then((response) => {
      let userId = response.data.id;
      if (response.status === 200) {
        resolve({
          token: response.data.token,
          email: response.data.email,
          name: response.data.email,
        });
        AsyncStorage.setItem('userId', userId);
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert('E-mail ou senha inválidos!');
        console.log(error.response.status);
      }
    });
};

export const signOut = () => AsyncStorage.removeItem('userId');
