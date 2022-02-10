import {Alert} from 'react-native';
import axios from 'axios';
import api from './api';

const createRecipe = async (recipeData, userData, navigation) => {
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
        userId: userData.id,
        createdAt: recipeData.createdAt,
        lastUpdateDate: recipeData.lastUpdateDate,
      },
      options,
    )
    .then((response) => {
      if (response.status === 201) {
        //navigation.navigate('Login');
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
        console.log(error.response.status);
      }
    });
};

export const recipeService = {
  createRecipe,
};
