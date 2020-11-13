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
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import SafeAreaView from 'react-native-safe-area-view';
import UpDown from '../../assets/up-and-down.png';
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
      og: '',
      fg: '',
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
      og: production.og,
      fg: production.fg,
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
    const {dateString, day, month, year} = dayObj;
    const newbrewDate = day + '/' + month + '/' + year;
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
    const {dateString, day, month, year} = dayObj;
    const newFermentationDate = day + '/' + month + '/' + year;
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
    const {dateString, day, month, year} = dayObj;
    const newCarbonationDate = day + '/' + month + '/' + year;
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
    const {dateString, day, month, year} = dayObj;
    const newAgeingDate = day + '/' + month + '/' + year;
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
    const {dateString, day, month, year} = dayObj;
    const newFillingDate = day + '/' + month + '/' + year;
    this.setState({
      fillingDate: newFillingDate,
      selectedFillingDate: dateString,
    });
  }

  editProduction = () => {
    const currentProduction = {
      id: this.state.id,
      name: this.state.name,
      volume: this.state.volume,
      og: this.state.og,
      fg: this.state.fg,
      style: this.state.style,
      estimatedTime: this.state.estimatedTime,
      status: this.state.status,
      brewDate: this.state.brewDate,
      fermentationDate: this.state.fermentationDate,
      carbonationDate: this.state.carbonationDate,
      ageingDate: this.state.ageingDate,
      fillingDate: this.state.fillingDate,
      duration: '',
      createdAt: new Date(),
    };

    let allProductions = this.state.productions;
    const production = allProductions.find(
      (x) => x.id === currentProduction.id,
    );
    const index = allProductions.indexOf(production);

    if (index !== -1) {
      allProductions[index] = currentProduction;
    }

    AsyncStorage.setItem(
      PRODUCTIONS_KEY,
      JSON.stringify(allProductions),
      (err) => {
        if (err) {
          console.log('an error occured');
          throw err;
        }
        console.log('Success. Production removed');
      },
    ).catch((err) => {
      console.log('error is: ' + err);
    });

    this.props.navigation.navigate('Produções', {productions: allProductions});
    Alert.alert('Produção alterada com sucesso!');
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
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
          <View marginTop={20} marginBottom={10}>
            <TouchableHighlight>
              <View style={styles.buttonContainer}>
                <Button
                  title="Salvar"
                  color="#000000"
                  onPress={() => this.editProduction()}
                />
              </View>
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
                    minDate={this.state.selectedAgeingDate}
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
