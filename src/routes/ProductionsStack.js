import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductionsScreen from '../screens/ProductionsScreen';
import NewProductionScreen from '../screens/NewProductionScreen';

const Stack = createStackNavigator();

function ProductionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Produções"
        component={ProductionsScreen}
        options={{
          title: 'Produções',
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
        }}
      />
    </Stack.Navigator>
  );
}

export default ProductionsStack;
