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

class NewProductionScreen extends React.Component {
  constructor(props) {
    super(props);

    const today =
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1) +
      '-' +
      new Date().getDate();

    this.state = {
      recipe: '',
      selectedDate: today,
      today: today,
      brewDate:
        new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear(),
      modalCalendarVisible: false,
      volume: '',
    };
  }

  openModalCalendar = () => {
    this.setState({
      modalCalendarVisible: true,
    });
  };

  closeModalCalendar = () => {
    this.setState({
      modalCalendarVisible: false,
    });
  };

  setBrewDay(dayObj) {
    const {dateString, day, month, year} = dayObj;
    const newbrewDate = day + '/' + month + '/' + year;
    this.setState({brewDate: newbrewDate, selectedDate: dateString});
  }

  addProduction = () => {
    Alert.alert('Produção salva com sucesso!');
    this.props.navigation.goBack();
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <ScrollView>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Selecione uma receita:</Text>
            </View>
            <View style={styles.onePickerContainer}>
              <Picker
                style={styles.onePicker}
                itemStyle={styles.onePickerItem}
                selectedValue={this.state.recipe}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({recipe: itemValue})
                }>
                <Picker.Item label="Hornero Vivaz" value="Hornero Vivaz" />
                <Picker.Item label="BeerH Pilsen" value="BeerH Pilsen" />
              </Picker>
              <View style={styles.signContainer}>
                <Image source={UpDown} />
              </View>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Volume final almejado (L):</Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TextInput
                  style={styles.dateStyle}
                  value={this.state.volume}
                  onChangeText={(volume) => this.setState({volume})}
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                Selecione uma data para a brassagem:
              </Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight onPress={this.openModalCalendar}>
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
                <TouchableHighlight onPress={this.openModalCalendar}>
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
                Selecione uma data para o início da maturação:
              </Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight onPress={this.openModalCalendar}>
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
                Selecione uma data para a carbonatação:
              </Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight onPress={this.openModalCalendar}>
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
                Selecione uma data para o envase:
              </Text>
            </View>
            <View style={styles.onePickerContainer}>
              <View style={styles.dateContainer}>
                <TouchableHighlight onPress={this.openModalCalendar}>
                  <Text style={styles.dateStyle}>{this.state.brewDate}</Text>
                </TouchableHighlight>
              </View>
              <View style={styles.signContainer}>
                <Image source={CalendarIcon} />
              </View>
            </View>
          </View>
          <View marginTop={10} marginBottom={10}>
            <TouchableHighlight>
              <View style={styles.buttonContainer}>
                <Button
                  title="Salvar"
                  color="#000000"
                  onPress={() => this.addProduction()}
                />
              </View>
            </TouchableHighlight>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalCalendarVisible}
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
                      [this.state.selectedDate]: {
                        selected: true,
                        selectedColor: 'blue',
                      },
                    }}
                    onDayPress={this.setBrewDay.bind(this)}
                  />
                </View>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={this.closeModalCalendar}>
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
    width: 280,
    height: 44,
    borderWidth: 1,
    marginLeft: 15,
    marginBottom: 5,
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

export default NewProductionScreen;
