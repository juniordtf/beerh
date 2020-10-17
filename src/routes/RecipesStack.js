import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RecipesScreen from '../screens/RecipesScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';

const Stack = createStackNavigator();

function RecipesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Receitas" component={RecipesScreen} options={{
          title: 'Receitas',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
        <Stack.Screen name="Nova Receita" component={NewRecipeScreen} options={{
          title: 'Nova Receita',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}/>
    </Stack.Navigator>
  );
}

export default RecipesStack;
