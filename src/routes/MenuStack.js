import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from '../screens/menu/MenuScreen';

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
    </Stack.Navigator>
  );
}

export default AuthStack;
