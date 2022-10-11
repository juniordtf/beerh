import * as React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '../screens/menu/MenuScreen';
import GroupsScreen from '../screens/menu/GroupsScreen';
import CreateGroupScreen from '../screens/menu/CreateGroupScreen';
import GroupDetailsScreen from '../screens/menu/GroupDetailsScreen';
import Add from '../../assets/add.png';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainMenu"
        component={MenuScreen}
        options={{
          title: 'Menu',
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
        name="Grupos"
        component={GroupsScreen}
        options={{
          title: 'Grupos',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => window.productionsScreen.goToCreateGroupScreen()}>
              <View marginRight={20}>
                <Image source={Add} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Criar grupo"
        component={CreateGroupScreen}
        options={{
          title: 'Criar grupo',
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
        name="Detalhes do grupo"
        component={GroupDetailsScreen}
        options={{
          title: 'Detalhes do grupo',
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

export default AuthStack;
