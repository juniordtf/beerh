import * as React from 'react';
import {TouchableOpacity, Image, View, StyleSheet, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import RecipesScreen from '../screens/RecipesScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import Add from '../../assets/add.png';
import Import from '../../assets/import_white.png';
import Refresh from '../../assets/refreshButton.png';
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');

const Stack = createStackNavigator();

const selectRecipeFile = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    console.log('File Name : ' + res.name);
    console.log('File Size : ' + res.size);

    if (res.type !== DocumentPicker.types.plainText) {
      Alert.alert(
        'Atençāo',
        'O arquivo importado precisa estar em formato ".txt"',
      );
    } else {
      RNFS.readFile(res.uri, 'utf8')
        .then((content) => {
          var recipe = JSON.parse(content);

          if (
            recipe.hasOwnProperty('id') &&
            recipe.hasOwnProperty('title') &&
            recipe.hasOwnProperty('og') &&
            recipe.hasOwnProperty('fg') &&
            recipe.hasOwnProperty('ibu') &&
            recipe.hasOwnProperty('abv') &&
            recipe.hasOwnProperty('color') &&
            recipe.hasOwnProperty('volume') &&
            recipe.hasOwnProperty('style')
          ) {
            window.recipesScreen.importRecipe(recipe);
          } else {
            Alert.alert(
              'Atençāo',
              'O arquivo importado não possui os campos necessários para a criação da receita!',
            );
          }
        })
        .catch((err) => {
          console.log(err.message, err.code);
        });
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      //If user canceled the document selection
      Alert.alert('Cancelado pelo seletor de documento');
    } else {
      //For Unknown Error
      Alert.alert('Erro desconhecido: ' + JSON.stringify(err));
      throw err;
    }
  }
};

function RecipesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Receitas"
        component={RecipesScreen}
        options={({route, navigation}) => ({
          title: 'Receitas',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => selectRecipeFile()}>
                <View marginRight={20}>
                  <Image source={Import} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Nova Receita')}>
                <View marginRight={20}>
                  <Image source={Add} />
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => window.recipesScreen.getUserData()}>
              <View marginLeft={20}>
                <Image source={Refresh} />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Detalhe de Receita"
        component={RecipeDetailScreen}
        options={{
          title: 'Detalhe de Receita',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default RecipesStack;
