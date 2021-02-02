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
  TextInput,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import SafeAreaView from 'react-native-safe-area-view';
import CalendarIcon from '../../assets/calendar.png';
import AsyncStorage from '@react-native-community/async-storage';
import {PRODUCTIONS_KEY} from '../statics/Statics';

class EditProductionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      volume: '',
      realVolume: '',
      og: '',
      realOg: '',
      fg: '',
      realFg: '',
      abv: '',
      realAbv: '',
      style: '',
      estimatedTime: '',
      status: '',
      brewDate: '',
      fermentationDate: '',
      carbonationDate: '',
      ageingDate: '',
      fillingDate: '',
      duration: '',
      createdAt: '',
      selectedRecipe: '',
      selectedBrewDate: '',
      selectedFermentationDate: '',
      selectedAgeingDate: '',
      selectedCarbonationDate: '',
      selectedFillingDate: '',
      modalBrewCalendarVisible: false,
      modalFermentationCalendarVisible: false,
      modalCarbonationCalendarVisible: false,
      modalAgeingCalendarVisible: false,
      modalFillingCalendarVisible: false,
      productions: [],
      viewToRestore: '',
    };
  }

  componentDidMount() {
    this.getCurrentProduction();
    this.getProductions();
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

  getCurrentProduction = () => {
    let production = this.props.route.params?.production;
    this.setState({
      id: production.id,
      name: production.name,
      volume: production.volume,
      realVolume: production.realVolume,
      og: production.og,
      realOg: production.realOg,
      fg: production.fg,
      realFg: production.realFg,
      abv: production.abv,
      realAbv: production.realAbv,
      style: production.style,
      estimatedTime: production.estimatedTime,
      status: production.status,
      brewDate: production.brewDate,
      fermentationDate: production.fermentationDate,
      carbonationDate: production.carbonationDate,
      ageingDate: production.ageingDate,
      fillingDate: production.fillingDate,
      duration: production.duration,
      createdAt: production.createdAt,
      selectedBrewDate:
        production.brewDate.slice(6, 10) +
        '-' +
        production.brewDate.slice(3, 5) +
        '-' +
        production.brewDate.slice(0, 2),
      selectedFermentationDate:
        production.fermentationDate.slice(6, 10) +
        '-' +
        production.fermentationDate.slice(3, 5) +
        '-' +
        production.fermentationDate.slice(0, 2),
      selectedCarbonationDate:
        production.carbonationDate.slice(6, 10) +
        '-' +
        production.carbonationDate.slice(3, 5) +
        '-' +
        production.carbonationDate.slice(0, 2),
      selectedAgeingDate:
        production.ageingDate.slice(6, 10) +
        '-' +
        production.ageingDate.slice(3, 5) +
        '-' +
        production.ageingDate.slice(0, 2),
      selectedFillingDate:
        production.fillingDate.slice(6, 10) +
        '-' +
        production.fillingDate.slice(3, 5) +
        '-' +
        production.fillingDate.slice(0, 2),
      viewToRestore: production.viewToRestore,
    });
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
    this.setState({brewDate: newbrewDate, selectedBrewDate: dateString});
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
      selectedFermentationDate: dateString,
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
      selectedCarbonationDate: dateString,
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
      selectedAgeingDate: dateString,
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

  editProduction = async () => {
    let initialDate = this.state.selectedBrewDate;

    let todayPt =
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear();

    if (todayPt.length < 10) {
      todayPt = 0 + todayPt;
    }

    if (todayPt.length < 10) {
      todayPt =
        todayPt.slice(0, 2) +
        '/' +
        0 +
        todayPt.slice(3, 4) +
        '/' +
        todayPt.slice(5, 9);
    }

    const currentProduction = {
      id: this.state.id,
      name: this.state.name,
      volume: this.state.volume,
      realVolume: this.state.realVolume,
      og: this.state.og,
      realOg: this.state.realOg,
      fg: this.state.fg,
      realFg: this.state.realFg,
      abv: this.state.abv,
      realAbv: this.state.realAbv,
      style: this.state.style,
      estimatedTime: this.state.estimatedTime,
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
      duration: this.state.duration,
      createdAt: this.state.createdAt,
      lastUpdateDate: todayPt,
      viewToRestore: this.state.viewToRestore,
    };

    let allProductions = this.state.productions;
    const production = allProductions.find(
      (x) => x.id === currentProduction.id,
    );
    const index = allProductions.indexOf(production);

    if (index !== -1) {
      allProductions[index] = currentProduction;
    }

    await AsyncStorage.setItem(
      PRODUCTIONS_KEY,
      JSON.stringify(allProductions),
      (err) => {
        if (err) {
          console.log('an error occured');
          throw err;
        }
        console.log('Success. Production updated');
      },
    )
      .then(this.returnToPreviousView(allProductions))
      .catch((err) => {
        console.log('error is: ' + err);
      });
  };

  returnToPreviousView = (allProductions) => {
    this.props.navigation.navigate('Produções', {productions: allProductions});
    Alert.alert('Produção alterada com sucesso!');

    window.productionsScreen.getProductions();
    window.brewScreen.getProductions();
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <ScrollView>
          <View marginTop={5}>
            <View style={styles.productionTitleContainer}>
              <Text style={styles.productionTitleText}>
                {this.state.name} ({this.state.volume} L)
              </Text>
            </View>
          </View>
          <View marginTop={10}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Selecione uma data para a brassagem:
              </Text>
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
                Selecione uma data para o início da fermentação:
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
              <Text style={styles.titleText}>
                Selecione uma data para o início da maturação:
              </Text>
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
              <Text style={styles.titleText}>
                Selecione uma data para a carbonatação:
              </Text>
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
              <Text style={styles.titleText}>
                Selecione uma data para o envase:
              </Text>
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
          <View marginTop={5}>
            <View style={styles.rowContainer}>
              <View width={150}>
                <View style={styles.centeredTitleContainer}>
                  <Text style={styles.titleText}>OG Real:</Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(realOg) => this.setState({realOg})}
                    value={this.state.realOg}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={120}
                    marginLeft={10}
                  />
                </View>
              </View>
              <View>
                <View style={styles.centeredTitleContainer}>
                  <Text style={styles.titleText}>FG Real:</Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(realFg) => this.setState({realFg})}
                    value={this.state.realFg}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={120}
                    marginLeft={10}
                  />
                </View>
              </View>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.rowContainer}>
              <View width={150}>
                <View style={styles.centeredTitleContainer}>
                  <Text style={styles.titleText}>ABV Real:</Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(realAbv) => this.setState({realAbv})}
                    value={this.state.realAbv}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={120}
                    marginLeft={10}
                  />
                </View>
              </View>
              <View>
                <View style={styles.centeredTitleContainer}>
                  <Text style={styles.titleText}>{'   '}Volume Real:</Text>
                </View>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(realVolume) => this.setState({realVolume})}
                    value={this.state.realVolume}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={120}
                    marginLeft={10}
                  />
                </View>
              </View>
            </View>
          </View>
          <View marginTop={20} marginBottom={10}>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => this.editProduction()}>
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
                    minDate={this.state.today}
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
                <Text style={styles.modalText}>Data inicial da maturação</Text>
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
                  Data inicial da carbonatação
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
  productionTitleContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  productionTitleText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
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
    alignContent: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputContainer: {
    backgroundColor: '#F6F0F0',
    borderColor: 'black',
    width: 110,
    height: 44,
    borderWidth: 1,
    marginLeft: 15,
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  centeredTitleContainer: {
    marginTop: 10,
    marginBottom: 5,
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

export default EditProductionScreen;
