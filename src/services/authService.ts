import {Alert} from 'react-native';
import axios from 'axios';
import api from "./api";

const signIn = async (credentials): Promise<AuthData> => {
  console.log(credentials);

  await api
    .request({
      method: 'post',
      url: 'http://192.168.15.59:8001/v1/account/auth',
      data: credentials,
    })
    .then((response) => {
      if (response.status === 200) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              token: response.data.token,
              id: response.data._id,
              name: response.data.email,
            });
          }, 1000);
        });
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert('E-mail ou senha inválidos!');
        console.log(error.response.status);
      }
    });
};

const signOut = () => AsyncStorage.removeItem('userId');

const signUp = async (userData, navigation) => {
  console.log('------ SignUp Method -----------')
  console.log(userData);
  await api
    .post("/account", {
      name: userData.name,
      email: userData.email,
      password: userData.password
    })
    .then((response) => {
      if (response.status === 201) {
        navigation.navigate('Login');
        Alert.alert(
          'Usuário criado com sucesso!',
        );
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

export const authService = {
  signIn,
  signOut,
  signUp
};
