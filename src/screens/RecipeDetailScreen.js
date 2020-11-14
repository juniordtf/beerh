import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Modal,
  Button,
  Alert,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';
import {RECIPES_KEY} from '../statics/Statics';

class RecipeDetailScreen extends React.Component {
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
      modalVisible: false,
      recipes: [],
    };
  }

  componentDidMount() {
    this.getCurrentRecipe();
    this.getRecipes();
  }

  getCurrentRecipe = () => {
    let recipe = this.props.route.params?.recipe;
    this.setState({title: recipe.title, volume: recipe.volume});
  };

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

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  deleteRecipe = (currentRecipe) => {
    let allRecipes = this.state.recipes;
    const recipe = allRecipes.find((x) => x.id === currentRecipe.id);
    const index = allRecipes.indexOf(recipe);

    if (index > -1) {
      allRecipes.splice(index, 1);
    }

    AsyncStorage.setItem(RECIPES_KEY, JSON.stringify(allRecipes), (err) => {
      if (err) {
        console.log('an error occured');
        throw err;
      }
      console.log('Success. Production removed');
    }).catch((err) => {
      console.log('error is: ' + err);
    });

    this.closeModal();

    this.props.navigation.navigate('Receitas', {productions: allRecipes});
    Alert.alert('Receita removida com sucesso!');
  };

  goToEditView = (currentRecipe) => {
    this.props.navigation.navigate('Editar Receita', {
      receita: currentRecipe,
    });
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <ScrollView>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                {this.state.title} ({this.state.volume} L)
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer} marginTop={10}>
            <View style={styles.rowContainer}>
              <View marginTop={10} marginBottom={10}>
                <TouchableHighlight>
                  <View style={styles.eraseButtonContainer}>
                    <Button
                      title="Apagar"
                      color="#000000"
                      onPress={() => this.openModal()}
                    />
                  </View>
                </TouchableHighlight>
              </View>
            </View>
            <View marginTop={10} marginBottom={10} marginLeft={10}>
              <TouchableHighlight>
                <View style={styles.editButtonContainer}>
                  <Button
                    title="Editar"
                    color="#000000"
                    onPress={() => this.goToEditView(this.state.currentRecipe)}
                  />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>

        <Modal
          name="DeleteModal"
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Tem certeza que deseja apagar essa receita?
              </Text>
              <View style={styles.rowContainer}>
                <TouchableHighlight
                  style={styles.cancelButton}
                  onPress={this.closeModal}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.confirmButton}
                  onPress={() =>
                    this.deleteRecipe(this.state.currentProduction)
                  }>
                  <Text style={styles.textStyle}>Confirmar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const marginHorizontal = 2;
const marginVertical = 2;

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  recipeContainer: {
    marginLeft: 15,
    backgroundColor: '#D8D8D8',
  },
  signContainer: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onePickerContainer: {
    backgroundColor: '#F6F0F0',
    borderColor: 'black',
    width: 280,
    height: 44,
    borderWidth: 1,
    marginLeft: 15,
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  onePicker: {
    width: 250,
    height: 44,
  },
  onePickerItem: {
    height: 44,
    color: 'black',
    fontSize: 17,
    textAlign: 'left',
    marginLeft: 15,
  },
  dateStyle: {
    color: 'black',
    fontSize: 17,
    textAlign: 'left',
  },
  twoPickers: {
    width: 200,
    height: 88,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  twoPickerItems: {
    height: 88,
    color: 'red',
  },
  calendarContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    height: 300,
    width: 300,
  },
  dateContainer: {
    height: 44,
    width: 235,
    marginLeft: 15,
    justifyContent: 'center',
  },
  date: {
    fontSize: 17,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: '#99C7EB',
  },
  confirmButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: 100,
    marginRight: 'auto',
    marginLeft: 15,
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButtonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 190,
    height: 40,
    backgroundColor: 'yellow',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  eraseButtonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 190,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  legendContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  bodyContainer: {
    marginTop: 10,
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  bodyText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 180,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  sectionContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginRight: marginHorizontal,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  blueCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul.',
    'Ago',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

export default RecipeDetailScreen;
