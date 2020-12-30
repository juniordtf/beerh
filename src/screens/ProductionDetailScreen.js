import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Modal,
  Alert,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';
import {PRODUCTIONS_KEY} from '../statics/Statics';

class ProductionDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: '',
      brewDate: '',
      fermentationDate: '',
      carbonationDate: '',
      ageingDate: '',
      fillingDate: '',
      initialCalendarDate: '',
      volume: '',
      og: '',
      realOg: '',
      fg: '',
      realFg: '',
      estimatedTime: '',
      duration: '',
      status: '',
      initialDate: '',
      year: '',
      month: '',
      modalVisible: false,
      currentProduction: '',
      productions: [],
    };
  }

  componentDidMount() {
    this.getCurrentProduction();
    this.getProductions();
  }

  getCurrentProduction = () => {
    let production = this.props.route.params?.production;
    this.setState({
      currentProduction: production,
      recipe: production.name,
      brewDate:
        production.brewDate.slice(6, 10) +
        '-' +
        production.brewDate.slice(3, 5) +
        '-' +
        production.brewDate.slice(0, 2),
      fermentationDate:
        production.fermentationDate.slice(6, 10) +
        '-' +
        production.fermentationDate.slice(3, 5) +
        '-' +
        production.fermentationDate.slice(0, 2),
      carbonationDate:
        production.carbonationDate.slice(6, 10) +
        '-' +
        production.carbonationDate.slice(3, 5) +
        '-' +
        production.carbonationDate.slice(0, 2),
      ageingDate:
        production.ageingDate.slice(6, 10) +
        '-' +
        production.ageingDate.slice(3, 5) +
        '-' +
        production.ageingDate.slice(0, 2),
      fillingDate:
        production.fillingDate.slice(6, 10) +
        '-' +
        production.fillingDate.slice(3, 5) +
        '-' +
        production.fillingDate.slice(0, 2),
      volume: production.volume,
      og: production.og,
      realOg: production.realOg,
      fg: production.fg,
      realFg: production.realFg,
      estimatedTime: parseInt(production.estimatedTime, 10) / 60,
      duration: production.duration,
      status: production.state,
      initialCalendarDate: production.initialCalendarDate,
    });
  };

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

  deleteProduction = async (currentProduction) => {
    let allProductions = this.state.productions;
    const production = allProductions.find(
      (x) => x.id === currentProduction.id,
    );
    const index = allProductions.indexOf(production);

    if (index > -1) {
      allProductions.splice(index, 1);
    }

    await AsyncStorage.setItem(
      PRODUCTIONS_KEY,
      JSON.stringify(allProductions),
      (err) => {
        if (err) {
          console.log('an error occured');
          throw err;
        }
        console.log('Success. Production removed');
      },
    )
      .then(this.afterDeletion(allProductions))
      .catch((err) => {
        console.log('error is: ' + err);
      });
  };

  afterDeletion = (allProductions) => {
    this.closeModal();

    this.props.navigation.navigate('Produções', {productions: allProductions});
    Alert.alert('Produção removida com sucesso!');

    window.productionsScreen.getProductions();
    window.brewScreen.getProductions();
  };

  goToEditView = (currentProduction) => {
    this.props.navigation.navigate('Editar Produção', {
      production: currentProduction,
    });
  };

  render() {
    let formattedDuration =
      parseInt(this.state.duration.slice(0, 2), 10) +
      parseInt(this.state.duration.slice(3, 5), 10) / 60;
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <ScrollView>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                {this.state.recipe} ({this.state.volume} L)
              </Text>
            </View>
          </View>
          <View marginTop={15}>
            <View backgroundColor={'#000000'} height={1} />
            <Calendar
              markingType="simple"
              minDate={this.state.brewDate}
              maxDate={this.state.fillingDate}
              current={this.state.initialCalendarDate}
              markedDates={{
                [this.state.brewDate]: {
                  selected: true,
                  selectedColor: 'blue',
                },
                [this.state.fermentationDate]: {
                  selected: true,
                  selectedColor: 'red',
                },
                [this.state.carbonationDate]: {
                  selected: true,
                  selectedColor: 'green',
                },
                [this.state.ageingDate]: {
                  selected: true,
                  selectedColor: 'grey',
                },
                [this.state.fillingDate]: {
                  selected: true,
                  selectedColor: 'orange',
                },
              }}
            />
            <View backgroundColor={'#000000'} height={1} />
          </View>
          <View marginTop={5}>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>Legenda:</Text>
            </View>
          </View>
          <View style={styles.legendContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.boxContainerLeft}>
                <View style={styles.rowContainer}>
                  <View style={styles.sectionContainerLeft}>
                    <View style={styles.blueCircle} />
                  </View>
                  <View style={styles.sectionContainerRight}>
                    <Text style={styles.bodyText}>Brassagem</Text>
                  </View>
                </View>
              </View>
              <View style={styles.boxContainerRight}>
                <View style={styles.rowContainer}>
                  <View style={styles.sectionContainerLeft}>
                    <View style={styles.redCircle} />
                  </View>
                  <View style={styles.sectionContainerRight}>
                    <Text style={styles.bodyText}>Fermentação</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.boxContainerLeft}>
                <View style={styles.rowContainer}>
                  <View style={styles.sectionContainerLeft}>
                    <View style={styles.greyCircle} />
                  </View>
                  <View style={styles.sectionContainerRight}>
                    <Text style={styles.bodyText}>Maturação</Text>
                  </View>
                </View>
              </View>
              <View style={styles.boxContainerRight}>
                <View style={styles.rowContainer}>
                  <View style={styles.sectionContainerLeft}>
                    <View style={styles.greenCircle} />
                  </View>
                  <View style={styles.sectionContainerRight}>
                    <Text style={styles.bodyText}>Carbonatação</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.boxContainerLeft}>
                <View style={styles.rowContainer}>
                  <View style={styles.sectionContainerLeft}>
                    <View style={styles.orangeCircle} />
                  </View>
                  <View style={styles.sectionContainerRight}>
                    <Text style={styles.bodyText}>Envase</Text>
                  </View>
                </View>
              </View>
              <View style={styles.boxContainerRight} />
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>
                OG (real / estimada): {this.state.realOg} / {this.state.og}
              </Text>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>
                FG (real / estimada): {this.state.realFg} / {this.state.fg}
              </Text>
            </View>
          </View>
          <View marginTop={5}>
            <View style={styles.rowContainer}>
              <View style={styles.textContainerLeft} marginTop={10}>
                <Text style={styles.bodyText}>Tempo de brassagem:</Text>
                <Text>(real / estimado)</Text>
              </View>
              <View style={styles.textContainerRight}>
                <Text>
                  {formattedDuration.toFixed(2)} /{' '}
                  {parseInt(this.state.estimatedTime, 10).toFixed(2)} hrs
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.rowContainer} marginTop={10}>
            <View style={styles.rowContainer}>
              <View marginTop={10} marginBottom={10}>
                <TouchableHighlight
                  style={styles.eraseButtonContainer}
                  onPress={() => this.openModal()}>
                  <Text style={styles.bodyText2}>Apagar</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View marginTop={10} marginBottom={10} marginLeft={10}>
              <TouchableHighlight
                style={styles.editButtonContainer}
                onPress={() => this.goToEditView(this.state.currentProduction)}>
                <Text style={styles.bodyText2}>Editar</Text>
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
                Tem certeza que deseja apagar essa produção?
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
                    this.deleteProduction(this.state.currentProduction)
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
    width: 160,
    height: 40,
    backgroundColor: 'yellow',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  eraseButtonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 160,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
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
  bodyText2: {
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
  textContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 185,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 175,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
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

export default ProductionDetailScreen;
