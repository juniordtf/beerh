import * as React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductionsScreen from '../screens/ProductionsScreen';
import NewProductionScreen from '../screens/NewProductionScreen';
import ProductionDetailScreen from '../screens/ProductionDetailScreen';
import EditProductionScreen from '../screens/EditProductionScreen';
import Add from '../../assets/add.png';
import Refresh from '../../assets/refreshButton.png';

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
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => window.productionsScreen.goToCreationView()}>
              <View marginRight={20}>
                <Image source={Add} />
              </View>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => window.productionsScreen.getProductions()}>
              <View marginLeft={20}>
                <Image source={Refresh} />
              </View>
            </TouchableOpacity>
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
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Detalhe de Produção"
        component={ProductionDetailScreen}
        options={{
          title: 'Detalhe de Produção',
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
    </Stack.Navigator>
  );
}

export default ProductionsStack;
