import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Plus from '../../assets/plus.png';

function NewRecipeScreen({navigation}) {
  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <ScrollView>
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.titleInputMask}
            placeholder="Nome da receita"
            underlineColorAndroid="transparent"
          />
          <View style={styles.parametersRow} marginTop={-5}>
            <TextInput
              style={styles.styleInputMask}
              placeholder="Estilo"
              underlineColorAndroid="transparent"
            />
            <TextInput
              style={styles.styleInputMask}
              placeholder="Volume (L)"
              underlineColorAndroid="transparent"
              width={90}
              marginLeft={5}
            />
          </View>
        </View>
        <View marginTop={10}>
          <Text style={styles.sectionText}>Parâmetros:</Text>
          <View style={styles.parametersRow}>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="OG"
              underlineColorAndroid="transparent"
              width={80}
              marginLeft={10}
            />
            <TextInput
              style={styles.bodyInputMask}
              placeholder="FG"
              underlineColorAndroid="transparent"
              width={80}
              marginLeft={10}
            />
            <TextInput
              style={styles.bodyInputMask}
              placeholder="IBU"
              underlineColorAndroid="transparent"
              width={80}
              marginLeft={10}
            />
          </View>
          <View style={styles.parametersRow} marginTop={-5}>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="ABV (%)"
              underlineColorAndroid="transparent"
              width={80}
              marginLeft={10}
            />
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Color"
              underlineColorAndroid="transparent"
              width={80}
              marginLeft={10}
            />
          </View>
        </View>
        <View marginTop={10}>
          <Text style={styles.sectionText}>Ingredientes:</Text>
          <View style={styles.parametersRow}>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Qte"
              underlineColorAndroid="transparent"
              width={50}
            />
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Und"
              underlineColorAndroid="transparent"
              width={50}
              marginLeft={10}
            />
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Nome"
              underlineColorAndroid="transparent"
              width={220}
              marginLeft={10}
            />
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  alert('you clicked me');
                }}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View marginTop={10}>
          <View backgroundColor={'#000000'} height={1} marginBottom={15} />
          <Text style={styles.stageText}>Etapas</Text>
        </View>
        <Text style={styles.sectionText}>* Brassagem</Text>
        <Text style={styles.innerSectionText}>Rampas:</Text>
        <View style={styles.parametersRow}>
          <TextInput
            style={styles.bodyInputMask}
            placeholder="Temp. (ºC)"
            underlineColorAndroid="transparent"
            width={80}
          />
          <View style={styles.addButtonContainer}>
            <Text style={styles.smallBodyText}> por </Text>
          </View>
          <TextInput
            style={styles.bodyInputMask}
            placeholder="Tempo (min)"
            underlineColorAndroid="transparent"
            width={120}
            marginLeft={10}
          />
          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                alert('you clicked me');
              }}>
              <Image source={Plus} />
            </TouchableOpacity>
          </View>
        </View>
        <View marginTop={10}>
          <Text style={styles.innerSectionText}>Fervura:</Text>
          <View style={styles.parametersRow}>
            <View>
              <View style={styles.parametersRow}>
                <TextInput
                  style={styles.bodyInputMask}
                  placeholder="Qte"
                  underlineColorAndroid="transparent"
                  width={50}
                />
                <TextInput
                  style={styles.bodyInputMask}
                  placeholder="Und"
                  underlineColorAndroid="transparent"
                  width={50}
                  marginLeft={10}
                />
                <TextInput
                  style={styles.bodyInputMask}
                  placeholder="Nome"
                  underlineColorAndroid="transparent"
                  width={150}
                  marginLeft={10}
                />
              </View>
              <View style={styles.parametersSecondRow}>
                <View style={styles.addButtonContainer}>
                  <Text style={styles.smallBodyText}> por </Text>
                </View>
                <TextInput
                  style={styles.bodyInputMask}
                  placeholder="Tempo (min)"
                  underlineColorAndroid="transparent"
                  width={90}
                  marginLeft={10}
                />
              </View>
            </View>
            <View style={styles.addButtonContainer} height={80} marginLeft={20}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  alert('you clicked me');
                }}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View marginTop={5}>
          <Text style={styles.sectionText}>* Fermentação</Text>
          <View style={styles.parametersRow}>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Temp. (ºC)"
              underlineColorAndroid="transparent"
              width={80}
            />
            <View style={styles.addButtonContainer}>
              <Text style={styles.smallBodyText}> por </Text>
            </View>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Tempo (dias)"
              underlineColorAndroid="transparent"
              width={120}
              marginLeft={10}
            />
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  alert('you clicked me');
                }}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View marginTop={5}>
          <Text style={styles.sectionText}>* Maturação</Text>
          <View style={styles.parametersRow}>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Temp. (ºC)"
              underlineColorAndroid="transparent"
              width={80}
            />
            <View style={styles.addButtonContainer}>
              <Text style={styles.smallBodyText}> por </Text>
            </View>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Tempo (dias)"
              underlineColorAndroid="transparent"
              width={120}
              marginLeft={10}
            />
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  alert('you clicked me');
                }}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View marginTop={5}>
          <Text style={styles.sectionText}>* Carbonatação</Text>
          <View style={styles.parametersRow}>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Pressão (kpa)"
              underlineColorAndroid="transparent"
              width={120}
            />
          </View>
        </View>
        <View marginTop={10}>
          <View backgroundColor={'#000000'} height={1} marginBottom={5} />
        </View>
        <View marginTop={10} marginBottom={10}>
          <TouchableHighlight>
            <View style={styles.buttonContainer}>
              <Button
                title="Salvar"
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 300,
  },
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  innerSectionText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    paddingLeft: 10,
    marginLeft: 20,
    marginTop: 2,
    marginBottom: 2,
  },
  stageText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  buttonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 220,
    height: 40,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  addButtonContainer: {
    marginLeft: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInputMask: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  styleInputMask: {
    height: 35,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: -10,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  bodyInputMask: {
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  smallBodyText: {
    marginLeft: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  parametersRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  parametersSecondRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 0,
    marginTop: -5,
  },
});

export default NewRecipeScreen;
