import * as React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BrewScreen from '../screens/BrewScreen';
import CleaningChecklistScreen from '../screens/CleaningChecklistScreen';
import SetupChecklistScreen from '../screens/SetupChecklistScreen';
import BrewPartAScreen from '../screens/BrewPartAScreen';
import BrewPartBScreen from '../screens/BrewPartBScreen';
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
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => window.brewScreen.getProductions()}>
              <View marginLeft={20}>
                <Image source={Refresh} />
              </View>
            </TouchableOpacity>
          ),
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
        }}
      />
    </Stack.Navigator>
  );
}

export default BrewStack;
