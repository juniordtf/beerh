import * as React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import RecipesScreen from '../screens/RecipesScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import Add from '../../assets/add.png';
import Refresh from '../../assets/refreshButton.png';

const Stack = createStackNavigator();

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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Nova Receita')}>
              <View marginRight={20}>
                <Image source={Add} />
              </View>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => window.recipesScreen.getRecipes()}>
              <View marginLeft={20}>
                <Image source={Refresh} />
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Nova Receita"
        component={NewRecipeScreen}
        options={{
          title: 'Nova Receita',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
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
        }}
      />
    </Stack.Navigator>
  );
}

export default RecipesStack;
