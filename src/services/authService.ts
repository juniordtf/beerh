import {Alert} from 'react-native';
import axios from 'axios';
import api from './api';

export type AuthData = {
  token: string;
  id: string;
  name: string;
};

const signIn = async (credentials): Promise<AuthData> => {
  return new Promise((resolve) => {
    api
      .request({
        method: 'post',
        url: 'http://192.168.15.59:8001/v1/account/auth',
        data: credentials,
      })
      .then((response) => {
        if (response.status === 200) {
          const userData = {
            token: response.data.token,
            id: response.data._id,
            name: response.data.name,
          };

          resolve(userData);
        } else {
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'E-mail ou senha inválidos!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const signOut = () => AsyncStorage.removeItem('userId');

const signUp = async (userData, navigation) => {
  await api
    .post('/account', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    })
    .then((response) => {
      if (response.status === 201) {
        navigation.navigate('Login');
        Alert.alert('Usuário criado com sucesso!');
        console.log('Usuário criado');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Não foi possível criar uma conta para o seu usuário. Tente novamente mais tarde!',
        );
        console.log(error.response.status);
      }
    });
};

const forgotPassword = async (email, navigation) => {
  await api
    .post('/account/auth/forgot_password', {
      email,
    })
    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Token enviado com sucesso!');

        const email = response.data.email;
        const token = response.data.token;
        navigation.navigate('Confirmar token', {email, token});
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Atenção',
          'Não foi possível enviar o token para o email fornecido. Tente novamente mais tarde!',
        );
        console.log(error.response.status);
      }
    });
};

const resetPassword = async (
  email,
  token,
  password,
  confirmPassword,
  navigation,
) => {
  await api
    .put('/account/auth/reset_password', {
      email,
      token,
      newPassword: password,
      verifyPassword: confirmPassword,
    })
    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Senha alterada com sucesso!');
        navigation.navigate('Login');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Não foi possível alterar sua senha. Tente novamente mais tarde!',
        );
        console.log(error.response.status);
      }
    });
};

export const authService = {
  signIn,
  signOut,
  signUp,
  forgotPassword,
  resetPassword,
};
