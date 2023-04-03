import {Alert} from 'react-native';
import axios from 'axios';
import api from './api';

const uploadAvatar = async (userData) => {
  const options = {
    headers: {
      'x-access-token': userData.userToken,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Credentials': 'true',
    },
  };
  const avatarImage = userData.avatar;

  await api
    .put(`account/avatar/${userData.userId}`, avatarImage, options)
    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Ótimo', 'Avatar atualizado com sucesso!');
        console.log('Avatar atualizado');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Atenção',
          'Não foi possível atualizar o avatar. Tente novamente mais tarde!',
        );
        console.log(error.response);
        console.log(error.response.status);
      }
    });
};

export const userService = {
  uploadAvatar,
};
