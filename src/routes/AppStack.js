import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainViewsTabs from './MainViewsTabs';
import NewProductionScreen from '../screens/NewProductionScreen';
import EditProductionScreen from '../screens/EditProductionScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';
import EditRecipeScreen from '../screens/EditRecipeScreen';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Telas Principais"
        component={MainViewsTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Nova Produção"
        component={NewProductionScreen}
        options={{
          title: 'Nova Produção',
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
      <Stack.Screen
        name="Editar Produção"
        component={EditProductionScreen}
        options={{
          title: 'Editar Produção',
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Editar Receita"
        component={EditRecipeScreen}
        options={{
          title: 'Editar Receita',
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

export default AppStack;
