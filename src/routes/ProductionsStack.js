import * as React from 'react';
import {TouchableOpacity, Image, View, StyleSheet, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProductionsScreen from '../screens/ProductionsScreen';
import NewProductionScreen from '../screens/NewProductionScreen';
import ProductionDetailScreen from '../screens/ProductionDetailScreen';
import EditProductionScreen from '../screens/EditProductionScreen';
import Add from '../../assets/add.png';
import Import from '../../assets/import_white.png';
import Refresh from '../../assets/refreshButton.png';
import DocumentPicker from 'react-native-document-picker';
var RNFS = require('react-native-fs');

const Stack = createStackNavigator();

const selectProductionFile = async () => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    console.log('File Name : ' + res.name);
    console.log('File Size : ' + res.size);

    if (res.type !== DocumentPicker.types.plainText) {
      Alert.alert(
        'Atençāo',
        'O arquivo importado precisa estar em formato ".txt"',
      );
    } else {
      RNFS.readFile(res.uri, 'utf8')
        .then((content) => {
          var production = JSON.parse(content);

          if (
            production.hasOwnProperty('id') &&
            production.hasOwnProperty('name') &&
            production.hasOwnProperty('volume') &&
            production.hasOwnProperty('style') &&
            production.hasOwnProperty('brewDate') &&
            production.hasOwnProperty('fermentationDate') &&
            production.hasOwnProperty('carbonationDate') &&
            production.hasOwnProperty('ageingDate') &&
            production.hasOwnProperty('fillingDate')
          ) {
            window.productionsScreen.importProduction(production);
          } else {
            Alert.alert(
              'Atençāo',
              'O arquivo importado não possui os campos necessários para a criação da produção!',
            );
          }
        })
        .catch((err) => {
          console.log(err.message, err.code);
        });
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      //If user canceled the document selection
      Alert.alert('Cancelado pelo seletor de documento');
    } else {
      //For Unknown Error
      Alert.alert('Erro desconhecido: ' + JSON.stringify(err));
      throw err;
    }
  }
};

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
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => selectProductionFile()}>
                <View marginRight={20}>
                  <Image source={Import} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => window.productionsScreen.goToCreationView()}>
                <View marginRight={20}>
                  <Image source={Add} />
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                window.productionsScreen
                  .getRecipes()
                  .then(window.productionsScreen.getProductions())
              }>
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

const styles = StyleSheet.create({
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default ProductionsStack;
