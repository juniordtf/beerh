import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import Bullet from '../../assets/bullet.png';
import SafeAreaView from 'react-native-safe-area-view';
import Stopwatch from '../Utils/Stopwatch';
import Timer from '../Utils/Timer';
import BrewBoiler from '../../assets/brewBoiler.png';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../statics/Statics';
import {format} from 'date-fns';
import {recipeService} from '../services/recipeService';
import {productionService} from '../services/productionService';
const Sound = require('react-native-sound');

Sound.setCategory('Playback');

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

class BrewPartEScreen extends Component {
  constructor(props) {
    super(props);
    const todayPt = format(new Date(), 'dd/MM/yyyy');

    this.state = {
      userData: [],
      todaysProduction: [],
      todaysRecipe: [],
      todaysDatePt: todayPt,
      modalVisible: false,
      isThisViewOnDisplay: true,
    };
  }

  componentDidMount() {
    this.preloadSound();
    this.getUserData();
  }

  getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);

      if (value !== null) {
        const data = JSON.parse(value);
        this.setState({userData: data});
        this.getProduction(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProduction = async (data) => {
    try {
      let currentProduction = this.props.route.params?.currentProduction;
      const value = await productionService.getProduction(
        data,
        currentProduction.id,
      );
      if (value !== null) {
        this.setState({todaysProduction: value.data});
        this.getRecipe(data, currentProduction.recipeId);
        this.keepStopwatchGoing(currentProduction.duration);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getRecipe = async (data, recipeId) => {
    try {
      const value = await recipeService.getRecipe(data, recipeId);
      if (value !== null) {
        this.setState({todaysRecipe: value.data});
        this.startTimer(value.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  keepStopwatchGoing = (duration) => {
    window.stopwatchComponent.startStopwatch();
    window.stopwatchComponent.continueStopwatch(duration);
  };

  startTimer(currentRecipe) {
    let rampDuration = 59;
    if (currentRecipe != null && currentRecipe.ramps !== undefined) {
      console.log(currentRecipe.ramps[0].time);
      rampDuration = parseInt(currentRecipe.ramps[3].time, 10) - 1;
    }

    window.timerComponent.setTimer(
      rampDuration,
      'Tempo da 4ª rampa alcançado!',
    );

    this.whenTimerIsDone();
  }

  whenTimerIsDone = async () => {
    while (true) {
      if (
        window.timerComponent.showDisplay() === '00:00' &&
        this.state.isThisViewOnDisplay
      ) {
        this.playAlarmSound();
        Alert.alert('Tempo da 4ª rampa alcançado!');
        break;
      }
      await sleep(1000);
    }
  };

  preloadSound = () => {
    this.bell = new Sound('bell.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }

      console.log(
        'duration in seconds: ' +
          this.bell.getDuration() +
          ', ' +
          'number of channels: ' +
          this.bell.getNumberOfChannels(),
      );
    });
  };

  playAlarmSound() {
    this.bell.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  }

  getInitialTemperature() {
    let currentRecipe = this.state.todaysRecipe;

    if (currentRecipe != null && currentRecipe.ramps !== undefined) {
      return parseFloat(currentRecipe.ramps[3].temperature, 10).toFixed(1);
    }

    return '76.0';
  }

  getStepsTotal() {
    let currentRecipe = this.state.todaysRecipe;
    let rampsLength = currentRecipe.ramps ? currentRecipe.ramps.length + 1 : 1;
    return rampsLength;
  }

  goToNextView = () => {
    if (this.state.modalVisible === true) {
      this.closeModal();
    }

    window.stopwatchComponent.stopStopwatch();

    const productionUpdated = {
      id: this.state.todaysProduction.id,
      name: this.state.todaysProduction.name,
      recipeId: this.state.todaysProduction.recipeId,
      recipeName: this.state.todaysProduction.recipeName,
      volume: this.state.todaysProduction.volume,
      realVolume: this.state.todaysProduction.realVolume,
      og: this.state.todaysProduction.og,
      realOg: this.state.todaysProduction.realOg,
      fg: this.state.todaysProduction.fg,
      realFg: this.state.todaysProduction.realFg,
      abv: this.state.todaysProduction.abv,
      realAbv: this.state.todaysProduction.realAbv,
      style: this.state.todaysProduction.style,
      estimatedTime: this.state.todaysProduction.estimatedTime,
      status: this.state.todaysProduction.status,
      initialBrewDate: this.state.todaysProduction.initialBrewDate,
      brewDate: this.state.todaysProduction.brewDate,
      fermentationDate: this.state.todaysProduction.fermentationDate,
      carbonationDate: this.state.todaysProduction.carbonationDate,
      ageingDate: this.state.todaysProduction.ageingDate,
      fillingDate: this.state.todaysProduction.fillingDate,
      initialCalendarDate: this.state.todaysProduction.initialCalendarDate,
      duration: window.stopwatchComponent.showDisplay(),
      viewToRestore: 'Brassagem Parte E',
      ownerId: this.state.todaysProduction.ownerId,
      ownerName: this.state.todaysProduction.ownerName,
    };

    this.updateProduction(productionUpdated).then(
      this.decideNextView(productionUpdated),
    );

    window.stopwatchComponent.clearStopwatch();
    this.setState({isThisViewOnDisplay: false});
  };

  decideNextView = (productionUpdated) => {
    if (this.state.todaysRecipe.ramps[4] != null) {
      this.props.navigation.navigate('Brassagem Parte F', {
        currentProduction: productionUpdated,
      });
    } else {
      this.props.navigation.navigate('Lavagem', {
        currentProduction: productionUpdated,
      });
    }
  };

  updateProduction = async (currentProduction) => {
    productionService.editProduction(currentProduction, this.state.userData);
  };

  canGoToNextView = () => {
    if (window.timerComponent.showDisplay() === '00:00') {
      this.goToNextView();
    } else {
      this.openModal();
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

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>
              {this.state.todaysProduction.name} -{' '}
              {this.state.todaysProduction.volume} L
            </Text>
          </View>
          <View style={styles.subContainer}>
            <Stopwatch />
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.sectionContainerLeft}>
                <View style={styles.circle}>
                  <Text style={styles.bodyText}>3</Text>
                </View>
              </View>
              <View style={styles.sectionContainerRight}>
                <Text style={styles.bodyText}>
                  4ª Rampa - Brassagem (5/{this.getStepsTotal()})
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer} marginTop={15}>
            <View style={styles.rowContainer} marginLeft={15}>
              <Text style={styles.bodyText}>Atividades:</Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.rowContainer} marginTop={5} marginLeft={15}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.listContainerRight}>
                <Text style={styles.bodyText}>
                  Alterar temperatura de controle {'\n'} para{' '}
                  {this.getInitialTemperature()} °C;
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.centeredbodyContainer} marginTop={40}>
            <View style={styles.sectionContainer}>
              <View style={styles.boxContainerLeft}>
                <Image source={BrewBoiler} />
              </View>
              <View style={styles.boxContainerRight}>
                <View>
                  <View style={styles.blackBoxContainer} marginBottom={15}>
                    <Text style={styles.redText}>
                      {this.getInitialTemperature()} °C
                    </Text>
                  </View>
                  <Timer />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <Text style={styles.bodyTextLeft}>
              Etapas a serem feitas em paralelo:
            </Text>
            <View style={styles.rowContainer} marginTop={5}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.listContainerRight}>
                <Text style={styles.bodyText}>
                  Esquentar a água de lavagem;
                </Text>
              </View>
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.listContainerRight}>
                <Text style={styles.bodyText}>
                  Lavar e sanitizar baldes fermentadores;
                </Text>
              </View>
            </View>
          </View>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.canGoToNextView()}>
            <Text style={styles.bodyText2}>Avançar</Text>
          </TouchableHighlight>
        </ScrollView>

        <Modal
          name="AdvanceModal"
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                O tempo da 4ª rampa ainda não foi atingido. Deseja realmente
                avançar?
              </Text>
              <View style={styles.rowContainer}>
                <TouchableHighlight
                  style={styles.cancelButton}
                  onPress={this.closeModal}>
                  <Text style={styles.textStyle}>Não</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.confirmButton}
                  onPress={() => this.goToNextView()}>
                  <Text style={styles.textStyle}>Sim</Text>
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
const marginVertical = 3;

const styles = StyleSheet.create({
  container: {marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  subContainer: {marginTop: 10, justifyContent: 'center', alignItems: 'center'},
  headerContainer: {
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  bodyContainer: {
    marginTop: 10,
    marginLeft: 15,
    alignItems: 'flex-start',
  },
  centeredbodyContainer: {
    marginTop: 10,
    marginLeft: 15,
    alignItems: 'center',
  },
  title: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 5,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardContainer: {
    marginTop: 40,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 330,
    height: 100,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#979797',
  },
  bodyText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
  },
  bodyTextLeft: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#979797',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 25,
    marginRight: 15,
    marginBottom: 15,
    alignSelf: 'flex-end',
    width: 170,
    height: 40,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  bodyText2: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
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
    width: 160,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 110,
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sectionContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginRight: marginHorizontal,
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  listContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginRight: marginHorizontal,
    width: 320,
    height: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  blackBoxContainer: {
    marginTop: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 80,
    height: 30,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#979797',
  },
  redText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
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
});

export default BrewPartEScreen;
