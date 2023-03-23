import {Alert} from 'react-native';
import api from './api';

const getProductions = async (userData): Promise<object> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  return new Promise((resolve) => {
    api
      .get('/production', options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          var recipes = response.data;
          resolve(recipes);
        } else {
          Alert.alert('Atenção', 'Não foi possível buscar suas produções!');
          console.log(response.status);
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'Não foi possível buscar suas produções!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const getOwnProductions = async (userData): Promise<object> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  return new Promise((resolve) => {
    api
      .get(`/production/ownProductions/${userData.id}`, options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          var productions = response.data;
          resolve(productions);
        } else {
          Alert.alert('Atenção', 'Não foi possível buscar suas produções!');
          console.log(response.status);
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'Não foi possível buscar suas produções!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const getSharedProductions = async (userData): Promise<object> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  return new Promise((resolve) => {
    api
      .get(`/production/sharedProductions/${userData.id}`, options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          var productions = response.data;
          resolve(productions);
        } else {
          Alert.alert('Atenção', 'Não foi possível buscar suas produções compartilhadas!');
          console.log(response.status);
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'Não foi possível buscar suas produções compartilhadas!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const createProduction = async (productionData, userData) => {
  const options = {
    headers: {'x-access-token': userData.token},
  };
  console.log('Create production called');
  await api
    .post(
      '/production',
      {
        name: productionData.name,
        recipeId: productionData.recipeId,
        volume: productionData.volume,
        realVolume: productionData.realVolume,
        og: productionData.og,
        realOg: productionData.realOg,
        fg: productionData.fg,
        realFg: productionData.realFg,
        abv: productionData.abv,
        realAbv: productionData.realAbv,
        style: productionData.style,
        estimatedTime: productionData.estimatedTime,
        status: productionData.status,
        initialBrewDate: productionData.initialBrewDate,
        brewDate: productionData.brewDate,
        fermentationDate: productionData.fermentationDate,
        carbonationDate: productionData.carbonationDate,
        ageingDate: productionData.ageingDate,
        fillingDate: productionData.fillingDate,
        initialCalendarDate: productionData.initialCalendarDate,
        duration: productionData.duration,
        viewToRestore: productionData.viewToRestore,
        ownerId: productionData.ownerId,
        ownerName: productionData.ownerName
      },
      options,
    )
    .then((response) => {
      if (response.status === 201) {
        Alert.alert('Ótimo', 'Produção criada com sucesso!');
        console.log('Produção criada');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Atenção',
          'Não foi possível criar a produção. Tente novamente mais tarde!',
        );
        console.log(error.response);
        console.log(error.response.status);
      }
    });
};

const editProduction = async (productionData, userData) => {
  const options = {
    headers: {'x-access-token': userData.token},
  };
  console.log('Edit production called');
  await api
    .put(
      `/production/${productionData.id}`,
      {
        id: productionData.id,
        name: productionData.name,
        recipeId: productionData.recipeId,
        recipeName: productionData.recipeName,
        volume: productionData.volume,
        realVolume: productionData.realVolume,
        og: productionData.og,
        realOg: productionData.realOg,
        fg: productionData.fg,
        realFg: productionData.realFg,
        abv: productionData.abv,
        realAbv: productionData.realAbv,
        style: productionData.style,
        estimatedTime: productionData.estimatedTime,
        status: productionData.status,
        initialBrewDate: productionData.initialBrewDate,
        brewDate: productionData.brewDate,
        fermentationDate: productionData.fermentationDate,
        carbonationDate: productionData.carbonationDate,
        ageingDate: productionData.ageingDate,
        fillingDate: productionData.fillingDate,
        initialCalendarDate: productionData.initialCalendarDate,
        duration: productionData.duration,
        viewToRestore: productionData.viewToRestore,
        ownerId: productionData.ownerId,
        ownerName: productionData.ownerName,
      },
      options,
    )
    .then((response) => {
      if (response.status === 200) {
        Alert.alert('Ótimo', 'Produção editada com sucesso!');
        console.log('Produção editada');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Atenção',
          'Não foi possível editar a produção. Tente novamente mais tarde!',
        );
        console.log(error.response);
        console.log(error.response.status);
      }
    });
};

export const productionService = {
  createProduction,
  getProductions,
  editProduction,
  getOwnProductions,
  getSharedProductions
};
