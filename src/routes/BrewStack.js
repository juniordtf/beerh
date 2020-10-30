import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BrewScreen from '../screens/BrewScreen';
import CleaningChecklistScreen from '../screens/CleaningChecklistScreen';
import SetupChecklistScreen from '../screens/SetupChecklistScreen';

const Stack = createStackNavigator();

function BrewStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Brassagem"
        component={BrewScreen}
        options={{
          title: 'Brassagem',
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
        name="Checklist de Limpeza"
        component={CleaningChecklistScreen}
        options={{
          title: 'Brassagem',
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
        name="Checklist de Montagem"
        component={SetupChecklistScreen}
        options={{
          title: 'Brassagem',
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

export default BrewStack;
