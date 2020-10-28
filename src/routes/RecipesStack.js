import * as React from 'react';
import {TouchableHighlight, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import RecipesScreen from '../screens/RecipesScreen';
import NewRecipeScreen from '../screens/NewRecipeScreen';
import Add from '../../assets/add.png';

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
            <TouchableHighlight
              onPress={() => navigation.navigate('Nova Receita')}>
              <View marginRight={20}>
                <Image source={Add} />
              </View>
            </TouchableHighlight>
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
    </Stack.Navigator>
  );
}

export default RecipesStack;
