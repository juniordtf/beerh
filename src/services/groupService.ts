import {Alert} from 'react-native';
import axios from 'axios';
import api from './api';

const getGroups = async (userData): Promise<> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  return new Promise((resolve) => {
    api
      .get('/group', options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          resolve(response.data);
        } else {
          lert.alert('Atenção', 'Não foi possível buscar seus grupos!');
          console.log(error.response.status);
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'Não foi possível buscar seus grupos!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const createGroup = async (groupData, userData, navigation) => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  await api
    .post(
      '/group',
      {
        name: groupData.name,
        avatar: groupData.avatar,
        ownerId: groupData.ownerId,
        memberIds: [groupData.memberIds],
        creationDate: groupData.creationDate,
      },
      options,
    )
    .then((response) => {
      if (response.status === 201) {
        navigation.navigate('Grupos');
        Alert.alert('Ótimo', 'Grupo criado com sucesso!');
        console.log('Grupo criado');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Atenção',
          'Não foi possível criar o grupo. Tente novamente mais tarde!',
        );
        console.log(error.response.status);
      }
    });
};

export const groupService = {
  createGroup,
  getGroups
};
