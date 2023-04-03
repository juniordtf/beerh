import {Alert} from 'react-native';
import api from './api';

const getRecipe = async (userData, recipeId): Promise<object> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  console.log('RecipeId: ' + recipeId);

  return new Promise((resolve) => {
    api
      .get(`/recipe/${recipeId}`, options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          var currentRecipe = response.data;
          resolve(currentRecipe);
        } else {
          Alert.alert('Atenção', 'Não foi possível buscar a receita!');
          console.log(response.status);
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'Não foi possível buscar a receita!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const getRecipes = async (userData): Promise<object> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  return new Promise((resolve) => {
    api
      .get('/recipe', options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          var recipes = response.data;
          resolve(recipes);
        } else {
          Alert.alert('Atenção', 'Não foi possível buscar suas receitas!');
          console.log(response.status);
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'Não foi possível buscar suas receitas!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const getOwnRecipes = async (userData): Promise<object> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  return new Promise((resolve) => {
    api
      .get(`/recipe/ownRecipes/${userData.id}`, options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          var recipes = response.data;
          resolve(recipes);
        } else {
          Alert.alert('Atenção', 'Não foi possível buscar suas receitas!');
          console.log(response.status);
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'Não foi possível buscar suas receitas!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const getSharedRecipes = async (userData): Promise<object> => {
  const options = {
    headers: {'x-access-token': userData.token},
  };

  return new Promise((resolve) => {
    api
      .get(`/recipe/sharedRecipes/${userData.id}`, options)
      .then((response) => {
        if (response.status === 200 || response.status === 304) {
          var recipes = response.data;
          resolve(recipes);
        } else {
          Alert.alert('Atenção', 'Não foi possível buscar suas receitas!');
          console.log(response.status);
          resolve(null);
        }
      })
      .catch(function (error) {
        if (error.response) {
          Alert.alert('Atenção', 'Não foi possível buscar suas receitas!');
          console.log(error.response.status);
          resolve(null);
        }
      });
  });
};

const createRecipe = async (recipeData, userData, ownerId) => {
  const options = {
    headers: {'x-access-token': userData.token},
  };
  console.log('Create recipe called');
  await api
    .post(
      '/recipe',
      {
        title: recipeData.title,
        volume: recipeData.volume,
        style: recipeData.style,
        og: recipeData.og,
        fg: recipeData.fg,
        ibu: recipeData.ibu,
        abv: recipeData.abv,
        color: recipeData.color,
        ingredients: recipeData.ingredients,
        ramps: recipeData.ramps,
        boil: recipeData.boil,
        fermentation: recipeData.fermentation,
        ageing: recipeData.ageing,
        carbonationMethod: recipeData.carbonationMethod,
        carbonationValue: recipeData.carbonationValue,
        carbonationUnit: recipeData.carbonationUnit,
        estimatedTime: recipeData.estimatedTime,
        annotation: recipeData.annotation,
        ownerId: recipeData.ownerId,
        ownerName: recipeData.ownerName,
      },
      options,
    )
    .then((response) => {
      if (response.status === 201) {
        Alert.alert('Ótimo', 'Receita criada com sucesso!');
        console.log('Receita criada');
      }
    })
    .catch(function (error) {
      if (error.response) {
        Alert.alert(
          'Atenção',
          'Não foi possível criar a receita. Tente novamente mais tarde!',
        );
        console.log(error.response);
        console.log(error.response.status);
      }
    });
};

export const recipeService = {
  createRecipe,
  getRecipe,
  getRecipes,
  getOwnRecipes,
  getSharedRecipes,
};
