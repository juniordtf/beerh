import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Chefhat from '../../assets/chef-hat.png';

function RecipesScreen({navigation}) {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Image
        source={Chefhat}
        style={{
          marginRight: 'auto',
          marginLeft: 'auto',
          width: 100,
          height: 100,
          marginTop: 80,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.bodyText}>Você ainda não possui receitas</Text>
      </View>
      <TouchableHighlight>
        <View style={styles.buttonContainer}>
          <Button
            title="Criar uma receita"
            color="#000000"
            onPress={() => navigation.navigate('Nova Receita')}
          />
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 300,
  },
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 35,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 250,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});

export default RecipesScreen;
