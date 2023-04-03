import {Alert} from 'react-native';
import api from './api';

const getAllowedGroups = async (userData): Promise<object> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  return new Promise((resolve) => {
    api
      .get(`/group/allowedGroups/${userData.id}`, options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          resolve(response.data);
        } else {
          Alert.alert('Atenção', 'Não foi possível buscar seus grupos!');
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
        members: {
          id: userData.id,
          name: userData.name,
          avatar: userData.avatar,
        },
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

const sendInvitation = async (memberEmail, userData, group) => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  await api
    .post(
      '/group/send_invitation',
      {
        groupId: group.id,
        email: memberEmail,
      },
      options,
    )
    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Ótimo', 'E-mail enviado com sucesso!');
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

const enterGroup = async (userData, groupToken) => {
  const options = {
    headers: {'x-access-token': userData.token},
  };
  await api
    .post(
      '/group/add_member',
      {
        memberId: userData.id,
        groupToken,
      },
      options,
    )
    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Ótimo', 'Token validado com sucesso!');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Atenção',
          'Não foi possível validar o token. Certifique-se de que os digitos inseridos estão corretos e tente novamente!',
        );
        console.log(error.response.status);
      }
    });
};

const deleteGroup = async (userData, groupId) => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  await api
    .delete(`/group/${groupId}`, options)
    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Ótimo', 'Grupo excluído com sucesso!');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Atenção',
          'Não foi possível excluir o grupo. Tente novamente mais tarde!',
        );
        console.log(error.response.status);
      }
    });
};

const uploadAvatar = async (groupData, userData) => {
  const options = {
    headers: {
      'x-access-token': userData.token,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'PUT',
      'Access-Control-Allow-Credentials': 'true',
    },
  };
  const avatarImage = groupData.avatar;
  const group = groupData.group;

  await api
    .put(`group/avatar/${group.id}`, avatarImage, options)
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

export const groupService = {
  createGroup,
  getAllowedGroups,
  sendInvitation,
  enterGroup,
  uploadAvatar,
  deleteGroup,
};
