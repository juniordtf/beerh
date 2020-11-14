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
import {Units} from '../statics/Statics';

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
      ingredient: '',
      ingredients: [],
      ramp: '',
      ramps: [],
      boilIem: '',
      boil: [],
      fermentationItem: '',
      fermentation: [],
      ageingItem: '',
      ageing: [],
      carbonation: '',
      unit: '',
      annotation: '',
      recipes: [],
      units: Units,
      inputSecondIngridientClicked: false,
      inputThirdIngridientClicked: false,
      inputFourthIngridientClicked: false,
      inputFifthIngridientClicked: false,
      inputSixthIngridientClicked: false,
      inputSeventhIngridientClicked: false,
      inputEightIngridientClicked: false,
      inputNinthIngridientClicked: false,
      inputTenthIngridientClicked: false,
      inputSecondRampClicked: false,
      inputThirdRampClicked: false,
      inputFourthRampClicked: false,
      inputFifthRampClicked: false,
      inputSecondBoilClicked: false,
      inputThirdBoilClicked: false,
      inputFourthBoilClicked: false,
      inputFifthBoilClicked: false,
      inputSecondFermentationClicked: false,
      inputThirdFermentationClicked: false,
      inputSecondAgeingClicked: false,
      inputThirdAgeingClicked: false,
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

  handleAddIngridientInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondIngridientClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdIngridientClicked: true,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthIngridientClicked: true,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthIngridientClicked: true,
      });
    } else if (value === '4') {
      this.setState({
        inputSixthIngridientClicked: true,
      });
    } else if (value === '5') {
      this.setState({
        inputSeventhIngridientClicked: true,
      });
    } else if (value === '6') {
      this.setState({
        inputEightIngridientClicked: true,
      });
    } else if (value === '7') {
      this.setState({
        inputNinthIngridientClicked: true,
      });
    } else if (value === '8') {
      this.setState({
        inputTenthIngridientClicked: true,
      });
    }
  };

  handleRemoveIngridientInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondIngridientClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdIngridientClicked: false,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthIngridientClicked: false,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthIngridientClicked: false,
      });
    } else if (value === '4') {
      this.setState({
        inputSixthIngridientClicked: false,
      });
    } else if (value === '5') {
      this.setState({
        inputSeventhIngridientClicked: false,
      });
    } else if (value === '6') {
      this.setState({
        inputEightIngridientClicked: false,
      });
    } else if (value === '7') {
      this.setState({
        inputNinthIngridientClicked: false,
      });
    } else if (value === '8') {
      this.setState({
        inputTenthIngridientClicked: false,
      });
    }
  };

  handleAddRampInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondRampClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdRampClicked: true,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthRampClicked: true,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthRampClicked: true,
      });
    }
  };

  handleRemoveRampInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondRampClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdRampClicked: false,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthRampClicked: false,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthRampClicked: false,
      });
    }
  };

  handleAddBoilInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondBoilClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdBoilClicked: true,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthBoilClicked: true,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthBoilClicked: true,
      });
    }
  };

  handleRemoveBoilInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondBoilClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdBoilClicked: false,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthBoilClicked: false,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthBoilClicked: false,
      });
    }
  };

  handleAddFermentationInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondFermentationClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdFermentationClicked: true,
      });
    }
  };

  handleRemoveFermentationInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondFermentationClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdFermentationClicked: false,
      });
    }
  };

  handleAddAgeingInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondAgeingClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdAgeingClicked: true,
      });
    }
  };

  handleRemoveAgeingInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondAgeingClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdAgeingClicked: false,
      });
    }
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
      annotation: this.state.annotation,
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
                  selectedValue={this.state.unit}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({unit: itemValue})
                  }>
                  {this.state.units.map((item, value) => {
                    return (
                      <Picker.Item
                        label={item.unit}
                        value={item.unit}
                        key={item.unit}
                      />
                    );
                  })}
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
                  onPress={() => this.handleAddIngridientInput('0')}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.addButtonContainer} marginLeft={-1} />
            </View>
            <View>
              {this.state.inputSecondIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleAddIngridientInput('1')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('0')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputThirdIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleAddIngridientInput('2')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('1')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputFourthIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleAddIngridientInput('3')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('2')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputFifthIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleAddIngridientInput('4')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('3')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputSixthIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleAddIngridientInput('5')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('4')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputSeventhIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleAddIngridientInput('6')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('5')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputEightIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleAddIngridientInput('7')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('6')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputNinthIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleAddIngridientInput('8')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('7')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputTenthIngridientClicked ? (
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
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
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
                      onPress={() => this.handleRemoveIngridientInput('8')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1} />
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
                onPress={() => this.handleAddRampInput('0')}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
            <View style={styles.addButtonContainer} marginLeft={-1} />
          </View>
          <View>
            {this.state.inputSecondRampClicked ? (
              <View style={styles.parametersRow} marginTop={-5}>
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
                    onPress={() => this.handleAddRampInput('1')}>
                    <Image source={Plus} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addButtonContainer} marginLeft={-1}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleRemoveRampInput('0')}>
                    <Image source={Minus} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          <View>
            {this.state.inputThirdRampClicked ? (
              <View style={styles.parametersRow} marginTop={-5}>
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
                    onPress={() => this.handleAddRampInput('2')}>
                    <Image source={Plus} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addButtonContainer} marginLeft={-1}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleRemoveRampInput('1')}>
                    <Image source={Minus} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          <View>
            {this.state.inputFourthRampClicked ? (
              <View style={styles.parametersRow} marginTop={-5}>
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
                    onPress={() => this.handleAddRampInput('3')}>
                    <Image source={Plus} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addButtonContainer} marginLeft={-1}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleRemoveRampInput('2')}>
                    <Image source={Minus} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          <View>
            {this.state.inputFifthRampClicked ? (
              <View style={styles.parametersRow} marginTop={-5}>
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
                    onPress={() => this.handleRemoveRampInput('3')}>
                    <Image source={Minus} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addButtonContainer} marginLeft={-1} />
              </View>
            ) : (
              <View />
            )}
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
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.unit}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({unit: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
                        return (
                          <Picker.Item
                            label={item.unit}
                            value={item.unit}
                            key={item.unit}
                          />
                        );
                      })}
                    </Picker>
                    <View style={styles.signContainer}>
                      <Image source={UpDown} style={{height: 10, width: 10}} />
                    </View>
                  </View>
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
                  onPress={() => this.handleAddBoilInput('0')}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              {this.state.inputSecondBoilClicked ? (
                <View
                  style={styles.parametersRow}
                  marginLeft={47}
                  marginTop={-2}>
                  <View>
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
                          selectedValue={this.state.unit}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({unit: itemValue})
                          }>
                          {this.state.units.map((item, value) => {
                            return (
                              <Picker.Item
                                label={item.unit}
                                value={item.unit}
                                key={item.unit}
                              />
                            );
                          })}
                        </Picker>
                        <View style={styles.signContainer}>
                          <Image
                            source={UpDown}
                            style={{height: 10, width: 10}}
                          />
                        </View>
                      </View>
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
                      onPress={() => this.handleAddBoilInput('1')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveBoilInput('0')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputThirdBoilClicked ? (
                <View
                  style={styles.parametersRow}
                  marginLeft={47}
                  marginTop={-2}>
                  <View>
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
                          selectedValue={this.state.unit}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({unit: itemValue})
                          }>
                          {this.state.units.map((item, value) => {
                            return (
                              <Picker.Item
                                label={item.unit}
                                value={item.unit}
                                key={item.unit}
                              />
                            );
                          })}
                        </Picker>
                        <View style={styles.signContainer}>
                          <Image
                            source={UpDown}
                            style={{height: 10, width: 10}}
                          />
                        </View>
                      </View>
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
                      onPress={() => this.handleAddBoilInput('2')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveBoilInput('1')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputFourthBoilClicked ? (
                <View
                  style={styles.parametersRow}
                  marginLeft={47}
                  marginTop={-2}>
                  <View>
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
                          selectedValue={this.state.unit}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({unit: itemValue})
                          }>
                          {this.state.units.map((item, value) => {
                            return (
                              <Picker.Item
                                label={item.unit}
                                value={item.unit}
                                key={item.unit}
                              />
                            );
                          })}
                        </Picker>
                        <View style={styles.signContainer}>
                          <Image
                            source={UpDown}
                            style={{height: 10, width: 10}}
                          />
                        </View>
                      </View>
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
                      onPress={() => this.handleAddBoilInput('3')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveBoilInput('2')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputFifthBoilClicked ? (
                <View
                  style={styles.parametersRow}
                  marginLeft={49}
                  marginTop={-2}>
                  <View>
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
                          selectedValue={this.state.unit}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({unit: itemValue})
                          }>
                          {this.state.units.map((item, value) => {
                            return (
                              <Picker.Item
                                label={item.unit}
                                value={item.unit}
                                key={item.unit}
                              />
                            );
                          })}
                        </Picker>
                        <View style={styles.signContainer}>
                          <Image
                            source={UpDown}
                            style={{height: 10, width: 10}}
                          />
                        </View>
                      </View>
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
                      onPress={() => this.handleRemoveBoilInput('3')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={-1}
                  />
                </View>
              ) : (
                <View />
              )}
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
                  onPress={() => this.handleAddFermentationInput('0')}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.addButtonContainer} marginLeft={-1} />
            </View>
            <View>
              {this.state.inputSecondFermentationClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
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
                      onPress={() => this.handleAddFermentationInput('1')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveFermentationInput('0')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputThirdFermentationClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
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
                      onPress={() => this.handleRemoveFermentationInput('1')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1} />
                </View>
              ) : (
                <View />
              )}
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
                  onPress={() => this.handleAddAgeingInput('0')}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.addButtonContainer} marginLeft={-1} />
            </View>
            <View>
              {this.state.inputSecondAgeingClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
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
                      onPress={() => this.handleAddAgeingInput('1')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveAgeingInput('0')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputThirdAgeingClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
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
                      onPress={() => this.handleRemoveAgeingInput('1')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1} />
                </View>
              ) : (
                <View />
              )}
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
          <View marginTop={5}>
            <Text style={styles.sectionText}>* Observações</Text>
            <TextInput
              onChangeText={(annotation) => this.setState({annotation})}
              value={this.state.annotation}
              style={styles.styleInputMask}
              width={350}
              height={90}
              marginTop={10}
              multiline={true}
              fontSize={12}
              underlineColorAndroid="transparent"
            />
          </View>
          <View marginTop={5}>
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
    height: 32,
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
    height: 34,
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
    marginLeft: 10,
    marginTop: -2,
  },
  onePickerContainer: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 55,
    height: 34,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  onePicker: {
    width: 35,
    height: 40,
  },
  onePickerItem: {
    height: 40,
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    marginLeft: 10,
    marginTop: -4,
  },
  signContainer: {
    height: 34,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewRecipeScreen;
