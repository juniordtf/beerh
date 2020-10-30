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
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import SafeAreaView from 'react-native-safe-area-view';
import Plus from '../../assets/plus.png';
import Minus from '../../assets/minus.png';
import UpDown from '../../assets/up-and-down.png';
import AsyncStorage from '@react-native-community/async-storage';
import {RECIPES_KEY} from '../statics/Statics';

class NewRecipeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      style: '',
      volume: '',
      og: '',
      fg: '',
      ibu: '',
      abv: '',
      color: '',
      ingredients: [],
      ramps: [],
      boil: [],
      fermentation: [],
      ageing: [],
      carbonation: '',
      unit: '',
      inputLinkClicked: false,
      recipes: [],
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes = async () => {
    try {
      const value = await AsyncStorage.getItem(RECIPES_KEY);
      if (value !== null) {
        this.setState({recipes: JSON.parse(value)});
        console.log(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleAddSecondInput = () => {
    this.setState({
      inputLinkClicked: true,
    });
  };

  handleRemoveSecondInput = () => {
    this.setState({
      inputLinkClicked: false,
    });
  };

  addRecipe = () => {
    const recipe = {
      id: Date.now() + this.state.title,
      title: this.state.title,
      volume: this.state.volume,
      style: this.state.style,
      og: this.state.og,
      fg: this.state.fg,
      ibu: this.state.ibu,
      abv: this.state.abv,
      color: this.state.color,
      ingredients: this.state.ingredients,
      ramps: this.state.ramps,
      boil: this.state.boil,
      fermentation: this.state.fermentation,
      ageing: this.state.ageing,
      carbonation: this.state.carbonation,
      createdAt: new Date(),
    };

    const recipes = this.state.recipes;
    let allRecipes = [this.state.recipes, recipe];

    if (recipes != null) {
      if (recipes.length === 0) {
        allRecipes = [recipe];
      } else {
        allRecipes = recipes.concat(recipe);
      }
    }

    AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(allRecipes), (err) => {
      if (err) {
        console.log('an error occured');
        throw err;
      }
      console.log('Success. Recipe added');
    }).catch((err) => {
      console.log('error is: ' + err);
    });

    Alert.alert('Receita salva com sucesso!');
    this.props.navigation.navigate('Receitas', {recipes: allRecipes});
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <ScrollView>
          <View style={styles.titleContainer}>
            <TextInput
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              style={styles.titleInputMask}
              placeholder="Nome da receita"
              underlineColorAndroid="transparent"
            />
            <View style={styles.parametersRow} marginTop={-5}>
              <TextInput
                onChangeText={(style) => this.setState({style})}
                value={this.state.style}
                style={styles.styleInputMask}
                placeholder="Estilo"
                underlineColorAndroid="transparent"
              />
              <TextInput
                onChangeText={(volume) => this.setState({volume})}
                value={this.state.volume}
                style={styles.styleInputMask}
                keyboardType="numeric"
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
                onChangeText={(og) => this.setState({og})}
                value={this.state.og}
                style={styles.bodyInputMask}
                placeholder="OG"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
                marginLeft={10}
              />
              <TextInput
                onChangeText={(fg) => this.setState({fg})}
                value={this.state.fg}
                style={styles.bodyInputMask}
                placeholder="FG"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
                marginLeft={10}
              />
              <TextInput
                onChangeText={(ibu) => this.setState({ibu})}
                value={this.state.ibu}
                style={styles.bodyInputMask}
                placeholder="IBU"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
                marginLeft={10}
              />
            </View>
            <View style={styles.parametersRow} marginTop={-5}>
              <TextInput
                onChangeText={(abv) => this.setState({abv})}
                value={this.state.abv}
                style={styles.bodyInputMask}
                placeholder="ABV (%)"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
                marginLeft={10}
              />
              <TextInput
                onChangeText={(color) => this.setState({color})}
                value={this.state.color}
                style={styles.bodyInputMask}
                placeholder="Color"
                keyboardType="numeric"
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
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={50}
              />
              <View style={styles.onePickerContainer}>
                <Picker
                  style={styles.onePicker}
                  itemStyle={styles.onePickerItem}
                  selectedValue={this.state.recipe}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({recipe: itemValue})
                  }>
                  <Picker.Item label="g" value="gramas" />
                  <Picker.Item label="Kg" value="kilogramas" />
                  <Picker.Item label="L" value="litros" />
                  <Picker.Item label="mL" value="mililitros" />
                </Picker>
                <View style={styles.signContainer}>
                  <Image source={UpDown} style={{height: 10, width: 10}} />
                </View>
              </View>
              <TextInput
                style={styles.bodyInputMask}
                placeholder="Nome"
                underlineColorAndroid="transparent"
                width={200}
                marginLeft={5}
              />
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleAddSecondInput}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.addButtonContainer} marginLeft={-1} />
            </View>
            <View>
              {this.state.inputLinkClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    placeholder="Qte"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.recipe}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({recipe: itemValue})
                      }>
                      <Picker.Item label="g" value="gramas" />
                      <Picker.Item label="Kg" value="kilogramas" />
                      <Picker.Item label="L" value="litros" />
                      <Picker.Item label="mL" value="mililitros" />
                    </Picker>
                    <View style={styles.signContainer}>
                      <Image source={UpDown} style={{height: 10, width: 10}} />
                    </View>
                  </View>
                  <TextInput
                    style={styles.bodyInputMask}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={200}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.handleAddSecondInput}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={this.handleRemoveSecondInput}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
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
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              width={80}
            />
            <View style={styles.addButtonContainer}>
              <Text style={styles.smallBodyText}> por </Text>
            </View>
            <TextInput
              style={styles.bodyInputMask}
              placeholder="Tempo (min)"
              keyboardType="numeric"
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
                    keyboardType="numeric"
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
                    keyboardType="numeric"
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
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={90}
                    marginLeft={10}
                  />
                </View>
              </View>
              <View
                style={styles.addButtonContainer}
                height={80}
                marginLeft={20}>
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
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
              />
              <View style={styles.addButtonContainer}>
                <Text style={styles.smallBodyText}> por </Text>
              </View>
              <TextInput
                style={styles.bodyInputMask}
                placeholder="Tempo (dias)"
                keyboardType="numeric"
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
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
              />
              <View style={styles.addButtonContainer}>
                <Text style={styles.smallBodyText}> por </Text>
              </View>
              <TextInput
                style={styles.bodyInputMask}
                placeholder="Tempo (dias)"
                keyboardType="numeric"
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
                keyboardType="numeric"
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
                  onPress={() => this.addRecipe()}
                />
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
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
  onePickerContainer: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 55,
    height: 30,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  onePicker: {
    width: 35,
    height: 30,
  },
  onePickerItem: {
    height: 30,
    color: 'black',
    fontSize: 10,
    textAlign: 'left',
    marginLeft: 10,
  },
  signContainer: {
    height: 30,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewRecipeScreen;
