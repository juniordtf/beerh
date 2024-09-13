import * as React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BrewScreen from '../screens/BrewScreen';
import CleaningChecklistScreen from '../screens/CleaningChecklistScreen';
import SetupChecklistScreen from '../screens/SetupChecklistScreen';
import BrewPartAScreen from '../screens/BrewPartAScreen';
import BrewPartBScreen from '../screens/BrewPartBScreen';
import BrewPartCScreen from '../screens/BrewPartCScreen';
import BrewPartDScreen from '../screens/BrewPartDScreen';
import BrewPartEScreen from '../screens/BrewPartEScreen';
import BrewPartFScreen from '../screens/BrewPartFScreen';
import BoilPartAScreen from '../screens/BoilPartAScreen';
import BoilPartBScreen from '../screens/BoilPartBScreen';
import BoilPartCScreen from '../screens/BoilPartCScreen';
import BoilPartDScreen from '../screens/BoilPartDScreen';
import BoilPartEScreen from '../screens/BoilPartEScreen';
import SpargeScreen from '../screens/SpargeScreen';
import WhirlpoolScreen from '../screens/WhirlpoolScreen';
import CoolingScreen from '../screens/CoolingScreen';
import FermentationStartScreen from '../screens/FermentationStartScreen';
import FinalCleaningChecklistScreen from '../screens/FinalCleaningChecklistScreen';
import DisassembleChecklistScreen from '../screens/DisassembleChecklistScreen';
import SuccessfulScreen from '../screens/SuccessfulScreen';

import Refresh from '../../assets/refreshButton.png';

const Stack = createStackNavigator();

function BrewStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Brassagem"
        component={BrewScreen}
        options={({route, navigation}) => ({
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        })}
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
          headerLeft: null,
          headerTitleAlign: 'center',
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
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Brassagem Parte A"
        component={BrewPartAScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Brassagem Parte B"
        component={BrewPartBScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Brassagem Parte C"
        component={BrewPartCScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Brassagem Parte D"
        component={BrewPartDScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Brassagem Parte E"
        component={BrewPartEScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Brassagem Parte F"
        component={BrewPartFScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Fervura Parte A"
        component={BoilPartAScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Fervura Parte B"
        component={BoilPartBScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Fervura Parte C"
        component={BoilPartCScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Fervura Parte D"
        component={BoilPartDScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Fervura Parte E"
        component={BoilPartEScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Lavagem"
        component={SpargeScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Whirlpool"
        component={WhirlpoolScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Resfriamento"
        component={CoolingScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Início da Fermentação"
        component={FermentationStartScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Checklist Final de Limpeza"
        component={FinalCleaningChecklistScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Checklist de Desmontagem"
        component={DisassembleChecklistScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Sucesso"
        component={SuccessfulScreen}
        options={{
          title: 'Brassagem',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft: null,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}

export default BrewStack;
