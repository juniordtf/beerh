import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Modal,
  Alert,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import SafeAreaView from 'react-native-safe-area-view';
import CalendarIcon from '../../assets/calendar.png';
import AsyncStorage from '@react-native-community/async-storage';
import {RECIPES_KEY, AUTH_DATA_KEY, PRODUCTIONS_KEY} from '../statics/Statics';
import {format} from 'date-fns';
import {productionService} from '../services/productionService';

class NewProductionScreen extends React.Component {
  constructor(props) {
    super(props);

    const today = format(new Date(), 'dd-MM-yyyy');
    const todayPt = format(new Date(), 'dd/MM/yyyy');

    this.state = {
      userData: [],
      todaysDatePt: todayPt,
      selectedRecipe: '',
      selectedBrewDate: today,
      selectedFermentationDate: today,
      selectedAgeingDate: today,
      selectedCarbonationDate: today,
      selectedFillingDate: today,
      today: today,
      brewDate: todayPt,
      fermentationDate: todayPt,
      carbonationDate: todayPt,
      ageingDate: todayPt,
      fillingDate: todayPt,
      modalBrewCalendarVisible: false,
      modalFermentationCalendarVisible: false,
      modalCarbonationCalendarVisible: false,
      modalAgeingCalendarVisible: false,
      modalFillingCalendarVisible: false,
      status: 'not started',
      recipes: [],
      productions: [],
    };
  }

  componentDidMount() {
    this.getRecipes().then(this.getProductions());
    this.getUserData();
  }

  getProductions = async () => {
    try {
      const value = await AsyncStorage.getItem(PRODUCTIONS_KEY);
      if (value !== null) {
        this.setState({productions: JSON.parse(value)});
        console.log(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  getRecipes = async () => {
    try {
      const value = await AsyncStorage.getItem(RECIPES_KEY);
      if (value !== null) {
        const retrievedRecipes = JSON.parse(value);
        this.setState({
          recipes: retrievedRecipes,
          selectedRecipe: retrievedRecipes[0].title,
        });
        console.log(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);

      if (value !== null) {
        this.setState({userData: JSON.parse(value)});
      }
    } catch (error) {
      console.log(error);
    }
  };

  openModalBrewCalendar = () => {
    this.setState({
      modalBrewCalendarVisible: true,
    });
  };

  closeModalBrewCalendar = () => {
    this.setState({
      modalBrewCalendarVisible: false,
    });
  };

  setBrewDay(dayObj) {
    const {dateString} = dayObj;
    const newbrewDate =
      dateString.slice(8, 10) +
      '/' +
      dateString.slice(5, 7) +
      '/' +
      dateString.slice(0, 4);
    this.setState({
      brewDate: newbrewDate,
      fermentationDate: newbrewDate,
      selectedBrewDate: dateString,
      selectedFermentationDate: dateString,
    });
  }

  openModalFermentationCalendar = () => {
    this.setState({
      modalFermentationCalendarVisible: true,
    });
  };

  closeModalFermentationCalendar = () => {
    this.setState({
      modalFermentationCalendarVisible: false,
    });
  };

  setFermentationDay(dayObj) {
    const {dateString} = dayObj;
    const newFermentationDate =
      dateString.slice(8, 10) +
      '/' +
      dateString.slice(5, 7) +
      '/' +
      dateString.slice(0, 4);
    this.setState({
      fermentationDate: newFermentationDate,
      ageingDate: newFermentationDate,
      selectedFermentationDate: dateString,
      selectedAgeingDate: dateString,
    });
  }

  openModalCarbonationCalendar = () => {
    this.setState({
      modalCarbonationCalendarVisible: true,
    });
  };

  closeModalCarbonationCalendar = () => {
    this.setState({
      modalCarbonationCalendarVisible: false,
    });
  };

  setCarbonationDay(dayObj) {
    const {dateString} = dayObj;
    const newCarbonationDate =
      dateString.slice(8, 10) +
      '/' +
      dateString.slice(5, 7) +
      '/' +
      dateString.slice(0, 4);
    this.setState({
      carbonationDate: newCarbonationDate,
      fillingDate: newCarbonationDate,
      selectedCarbonationDate: dateString,
      selectedFillingDate: dateString,
    });
  }

  openModalAgeingCalendar = () => {
    this.setState({
      modalAgeingCalendarVisible: true,
    });
  };

  closeModalAgeingCalendar = () => {
    this.setState({
      modalAgeingCalendarVisible: false,
    });
  };

  setAgeingDay(dayObj) {
    const {dateString} = dayObj;
    const newAgeingDate =
      dateString.slice(8, 10) +
      '/' +
      dateString.slice(5, 7) +
      '/' +
      dateString.slice(0, 4);
    this.setState({
      ageingDate: newAgeingDate,
      carbonationDate: newAgeingDate,
      selectedAgeingDate: dateString,
      selectedCarbonationDate: dateString,
    });
  }

  openModalFillingCalendar = () => {
    this.setState({
      modalFillingCalendarVisible: true,
    });
  };

  closeModalFillingCalendar = () => {
    this.setState({
      modalFillingCalendarVisible: false,
    });
  };

  setFillingDay(dayObj) {
    const {dateString} = dayObj;
    const newFillingDate =
      dateString.slice(8, 10) +
      '/' +
      dateString.slice(5, 7) +
      '/' +
      dateString.slice(0, 4);
    this.setState({
      fillingDate: newFillingDate,
      selectedFillingDate: dateString,
    });
  }

  addProduction = async () => {
    const currentRecipe = this.state.recipes.find(
      (x) => x.title === this.state.selectedRecipe,
    );

    let initialDate = this.state.selectedBrewDate;
    const totalEstimatedTime = parseFloat(currentRecipe.estimatedTime) + 360;

    const production = {
      id: Date.now() + this.state.selectedRecipe,
      recipeId: currentRecipe.id,
      name: this.state.selectedRecipe,
      volume: currentRecipe.volume,
      realVolume: 0,
      og: currentRecipe.og,
      realOg: 0,
      fg: currentRecipe.fg,
      realFg: 0,
      abv: currentRecipe.abv,
      realAbv: 0,
      style: currentRecipe.style,
      estimatedTime: totalEstimatedTime,
      status: this.state.status,
      brewDate: this.state.brewDate,
      fermentationDate: this.state.fermentationDate,
      carbonationDate: this.state.carbonationDate,
      ageingDate: this.state.ageingDate,
      fillingDate: this.state.fillingDate,
      initialCalendarDate:
        initialDate.slice(0, 4) +
        '-' +
        initialDate.slice(5, 7) +
        '-' +
        initialDate.slice(8, 10),
      duration: '',
      createdAt: this.state.todaysDatePt,
      lastUpdateDate: this.state.todaysDatePt,
      viewToRestore: '',
    };

    productionService.createProduction(
      production,
      this.state.userData,
      this.state.userData.userId,
      this.props.navigation,
    );

    const productions = this.state.productions;
    let allProductions = [];

    if (productions != null) {
      if (productions.length === 0) {
        allProductions = [production];
      } else {
        allProductions = productions.concat(production);
      }
    }

    await AsyncStorage.setItem(
      PRODUCTIONS_KEY,
      JSON.stringify(allProductions),
      (err) => {
        if (err) {
          console.log('an error occured');
          throw err;
        }
        console.log('Success. Production added');
      },
    )
      .then(this.returnToPreviousView(allProductions))
      .catch((err) => {
        console.log('error is: ' + err);
      });
  };

  returnToPreviousView = (allProductions) => {
    this.props.navigation.navigate('Produções');
    Alert.alert('Produção salva com sucesso!');

    if (window.productionsScreen !== undefined) {
      window.productionsScreen
        .getRecipes()
        .then(window.productionsScreen.getProductions());
    }

    if (window.brewScreen !== undefined) {
      window.brewScreen.getProductions();
    }
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <ScrollView>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Selecione uma receita:</Text>
            </View>
            <View style={styles.onePickerContainer}>
              <Picker
                style={styles.onePicker}
                itemStyle={styles.onePickerItem}
                selectedValue={this.state.selectedRecipe}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({selectedRecipe: itemValue})
                }>
                {this.state.recipes.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.title}
                      value={item.title}
                      key={item.id}
                    />
                  );
                })}
              </Picker>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Data de brassagem:</Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight onPress={this.openModalBrewCalendar}>
                  <Text style={styles.dateStyle}>{this.state.brewDate}</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.signContainer}>
                <Image source={CalendarIcon} />
              </View>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Data de início da fermentação:
              </Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight
                  onPress={this.openModalFermentationCalendar}>
                  <Text style={styles.dateStyle}>
                    {this.state.fermentationDate}
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.signContainer}>
                <Image source={CalendarIcon} />
              </View>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Data de início da maturação:</Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight onPress={this.openModalAgeingCalendar}>
                  <Text style={styles.dateStyle}>{this.state.ageingDate}</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.signContainer}>
                <Image source={CalendarIcon} />
              </View>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Data da carbonatação:</Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight onPress={this.openModalCarbonationCalendar}>
                  <Text style={styles.dateStyle}>
                    {this.state.carbonationDate}
                  </Text>
                </TouchableHighlight>
              </View>
              <View style={styles.signContainer}>
                <Image source={CalendarIcon} />
              </View>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Data do envase:</Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight onPress={this.openModalFillingCalendar}>
                  <Text style={styles.dateStyle}>{this.state.fillingDate}</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.signContainer}>
                <Image source={CalendarIcon} />
              </View>
            </View>
          </View>
          <View marginTop={10} marginBottom={10}>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => this.addProduction()}>
              <Text style={styles.bodyText}>Salvar</Text>
            </TouchableHighlight>
          </View>

          <Modal
            name="BrewModal"
            animationType="slide"
            transparent={true}
            visible={this.state.modalBrewCalendarVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Data da brassagem</Text>
                <View style={styles.calendarContainer}>
                  <Calendar
                    markingType="simple"
                    markedDates={{
                      [this.state.selectedBrewDate]: {
                        selected: true,
                        selectedColor: 'blue',
                      },
                    }}
                    onDayPress={this.setBrewDay.bind(this)}
                  />
                </View>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={this.closeModalBrewCalendar}>
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <Modal
            name="FermentationModal"
            animationType="slide"
            transparent={true}
            visible={this.state.modalFermentationCalendarVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Data inicial da fermentação
                </Text>
                <View style={styles.calendarContainer}>
                  <Calendar
                    markingType="simple"
                    minDate={this.state.selectedBrewDate}
                    markedDates={{
                      [this.state.selectedFermentationDate]: {
                        selected: true,
                        selectedColor: 'blue',
                      },
                    }}
                    onDayPress={this.setFermentationDay.bind(this)}
                  />
                </View>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={this.closeModalFermentationCalendar}>
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <Modal
            name="AgeingModal"
            animationType="slide"
            transparent={true}
            visible={this.state.modalAgeingCalendarVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Data de início da maturação
                </Text>
                <View style={styles.calendarContainer}>
                  <Calendar
                    markingType="simple"
                    minDate={this.state.selectedFermentationDate}
                    markedDates={{
                      [this.state.selectedAgeingDate]: {
                        selected: true,
                        selectedColor: 'blue',
                      },
                    }}
                    onDayPress={this.setAgeingDay.bind(this)}
                  />
                </View>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={this.closeModalAgeingCalendar}>
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <Modal
            name="CarbonationModal"
            animationType="slide"
            transparent={true}
            visible={this.state.modalCarbonationCalendarVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Data de início da carbonatação
                </Text>
                <View style={styles.calendarContainer}>
                  <Calendar
                    markingType="simple"
                    minDate={this.state.selectedAgeingDate}
                    markedDates={{
                      [this.state.selectedCarbonationDate]: {
                        selected: true,
                        selectedColor: 'blue',
                      },
                    }}
                    onDayPress={this.setCarbonationDay.bind(this)}
                  />
                </View>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={this.closeModalCarbonationCalendar}>
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
          <Modal
            name="FillingModal"
            animationType="slide"
            transparent={true}
            visible={this.state.modalFillingCalendarVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Data de envase</Text>
                <View style={styles.calendarContainer}>
                  <Calendar
                    markingType="simple"
                    minDate={this.state.selectedCarbonationDate}
                    markedDates={{
                      [this.state.selectedFillingDate]: {
                        selected: true,
                        selectedColor: 'blue',
                      },
                    }}
                    onDayPress={this.setFillingDay.bind(this)}
                  />
                </View>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={this.closeModalFillingCalendar}>
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    width: 320,
  },
  titleText: {
    fontSize: 17,
    color: 'black',
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
    width: 220,
    height: 44,
    borderWidth: 1,
    marginLeft: 15,
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  onePicker: {
    width: 225,
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
    width: 175,
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
  openButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
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
  buttonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 220,
    height: 40,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
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

export default NewProductionScreen;
