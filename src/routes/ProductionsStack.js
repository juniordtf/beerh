import * as React from 'react';
import {TouchableHighlight, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductionsScreen from '../screens/ProductionsScreen';
import NewProductionScreen from '../screens/NewProductionScreen';
import Add from '../../assets/add.png';

const Stack = createStackNavigator();

function ProductionsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Produções"
        component={ProductionsScreen}
        options={({route, navigation}) => ({
          title: 'Produções',
          headerStyle: {
            backgroundColor: '#2F2F30',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableHighlight
              onPress={() => navigation.navigate('Nova Produção')}>
              <View marginRight={20}>
                <Image source={Add} />
              </View>
            </TouchableHighlight>
          ),
        })}
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
