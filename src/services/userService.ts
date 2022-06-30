import {Alert} from 'react-native';
import api from './api';

const uploadAvatar = async (userData) => {
  const options = {
    headers: {
      'x-access-token': userData.userToken,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  };

  const avatarImage = userData.avatar;

  await api
    .put(
      `account/avatar/${userData.userId}`,
      {
        name: avatarImage.name,
        type: avatarImage.type,
        uri: avatarImage.uri,
      },
      options,
    )
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
