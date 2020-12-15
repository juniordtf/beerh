import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button,
  ScrollView,
} from 'react-native';
import Bullet from '../../assets/bullet.png';
import SafeAreaView from 'react-native-safe-area-view';
import Stopwatch from '../Utils/Stopwatch';
import Timer from '../Utils/Timer';
import BrewBoiler from '../../assets/brewBoiler.png';
import AsyncStorage from '@react-native-community/async-storage';
import {PRODUCTIONS_KEY} from '../statics/Statics';

class BrewPartFScreen extends Component {
  constructor(props) {
    super(props);
    const todayPt =
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear();

    this.state = {
      productions: [],
      todaysProduction: [],
      todaysDatePt: todayPt,
      todaysRecipe: [],
    };
  }

  componentDidMount() {
    this.keepStopwatchGoing();
    this.startTimer();
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

  keepStopwatchGoing = () => {
    let currentProduction = this.props.route.params?.currentProduction;
    this.setState({todaysProduction: currentProduction});
    window.stopwatchComponent.startStopwatch();
    window.stopwatchComponent.continueStopwatch(currentProduction.duration);
  };

  startTimer() {
    const currentRecipe = this.props.route.params?.currentRecipe;
    this.setState({todaysRecipe: currentRecipe});

    let rampDuration = 59;
    if (currentRecipe != null) {
      console.log(currentRecipe.ramps[0].time);
      rampDuration = parseInt(currentRecipe.ramps[4].time, 10) - 1;
    }

    window.timerComponent.setTimer(rampDuration);
  }

  getInitialTemperature() {
    let currentRecipe = this.props.route.params?.currentRecipe;

    if (currentRecipe != null) {
      return parseFloat(currentRecipe.ramps[4].temperature, 10).toFixed(1);
    }

    return '76.0';
  }

  getStepsTotal() {
    let currentRecipe = this.props.route.params?.currentRecipe;

    return currentRecipe.ramps.length + 1;
  }

  goToNextView = () => {
    window.stopwatchComponent.stopStopwatch();

    const productionUpdated = {
      id: this.state.todaysProduction.id,
      name: this.state.todaysProduction.name,
      volume: this.state.todaysProduction.volume,
      og: this.state.todaysProduction.og,
      realOg: this.state.todaysProduction.realOg,
      fg: this.state.todaysProduction.fg,
      realFg: this.state.todaysProduction.realFg,
      style: this.state.todaysProduction.style,
      estimatedTime: this.state.todaysProduction.estimatedTime,
      status: this.state.todaysProduction.status,
      brewDate: this.state.todaysProduction.brewDate,
      fermentationDate: this.state.todaysProduction.fermentationDate,
      carbonationDate: this.state.todaysProduction.carbonationDate,
      ageingDate: this.state.todaysProduction.ageingDate,
      fillingDate: this.state.todaysProduction.fillingDate,
      initialCalendarDate: this.state.todaysProduction.initialCalendarDate,
      duration: window.stopwatchComponent.showDisplay(),
      createdAt: this.state.todaysProduction.createdAt,
      lastUpdateDate: this.state.todaysDatePt,
      viewToRestore: 'Brassagem Parte F',
    };

    //this.updateProduction(productionUpdated);

    this.props.navigation.navigate('Lavagem', {
      currentProduction: productionUpdated,
      currentRecipe: this.state.todaysRecipe,
    });

    window.stopwatchComponent.clearStopwatch();
  };

  updateProduction = (currentProduction) => {
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
        console.log('Success. Production updated');
      },
    ).catch((err) => {
      console.log('error is: ' + err);
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
              {this.state.todaysProduction.volume}L
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
                  5ª Rampa - Brassagem (6/{this.getStepsTotal()})
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer} marginTop={15}>
            <View style={styles.rowContainer}>
              <Text style={styles.bodyText}>Atividades:</Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.rowContainer} marginTop={5}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.listContainerRight}>
                <Text style={styles.bodyText}>
                  Alterar temperatura de controle para{' '}
                  {this.getInitialTemperature()} °C;
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer} marginTop={30}>
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
          <TouchableHighlight>
            <View style={styles.buttonContainer}>
              <Button title="Avançar" onPress={() => this.goToNextView()} />
            </View>
          </TouchableHighlight>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const marginHorizontal = 2;
const marginVertical = 2;

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
    marginLeft: 30,
    alignItems: 'flex-start',
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
    marginTop: 140,
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
    textAlign: 'center',
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
    marginLeft: 200,
    width: 170,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
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
    width: 210,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 40,
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
    justifyContent: 'center',
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
});

export default BrewPartFScreen;
