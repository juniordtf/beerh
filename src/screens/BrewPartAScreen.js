import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import BrewingMill from '../../assets/brewingMill.png';
import HotWater from '../../assets/hotWater.png';
import SafeAreaView from 'react-native-safe-area-view';
import Stopwatch from '../Utils/Stopwatch';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../statics/Statics';
import {format} from 'date-fns';
import {recipeService} from '../services/recipeService';
import {productionService} from '../services/productionService';

class BrewPartAScreen extends Component {
  constructor(props) {
    super(props);

    const todayPt = format(new Date(), 'dd/MM/yyyy');

    this.state = {
      userData: [],
      todaysProduction: [],
      todaysRecipe: [],
      todaysDatePt: todayPt,
    };
  }

  componentDidMount() {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  keepStopwatchGoing = (duration) => {
    window.stopwatchComponent.startStopwatch();
    window.stopwatchComponent.continueStopwatch(duration);
  };

  getInitialTemperature() {
    let currentRecipe = this.state.todaysRecipe;
    let initialTemp = currentRecipe.ramps
      ? (parseFloat(currentRecipe.ramps[0].temperature, 10) + 2).toFixed(1)
      : '68.0';

    return initialTemp;
  }

  getStepsTotal() {
    let currentRecipe = this.state.todaysRecipe;
    let rampsLength = currentRecipe.ramps ? currentRecipe.ramps.length + 1 : 1;
    return rampsLength;
  }

  goToNextView = () => {
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
      viewToRestore: 'Brassagem Parte A',
      ownerId: this.state.todaysProduction.ownerId,
      ownerName: this.state.todaysProduction.ownerName,
    };

    this.updateProduction(productionUpdated).then(
      this.props.navigation.navigate('Brassagem Parte B', {
        currentProduction: productionUpdated,
      }),
    );

    window.stopwatchComponent.clearStopwatch();
  };

  updateProduction = async (currentProduction) => {
    productionService.editProduction(currentProduction, this.state.userData);
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
                  Brassagem (1/{this.getStepsTotal()})
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer} marginTop={15}>
            <View style={styles.rowContainer} marginLeft={15}>
              <Text style={styles.bodyText}>
                {' '}
                Realizar as tarefas abaixo em paralelo:
              </Text>
            </View>
          </View>
          <View style={styles.centeredbodyContainer}>
            <View>
              <View style={styles.rowContainer}>
                <View style={styles.boxContainerRight}>
                  <Image source={BrewingMill} />
                </View>
                <View style={styles.boxContainerLeft}>
                  <Text style={styles.bodyText}>Moer os grãos</Text>
                </View>
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.boxContainerRight}>
                  <Image source={HotWater} />
                </View>
                <View style={styles.boxContainerLeft}>
                  <Text style={styles.bodyText}>
                    Encher as panelas com água e colocar para esquentar
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.centeredbodyContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.boxContainerRight}>
                <Text style={styles.bodyText}>Obs.:</Text>
              </View>
              <View style={styles.boxContainerLeft} alignItems={'flex-start'}>
                <Text style={styles.bodyText}>
                  Alterar temperatura do controlador para:{' '}
                  {this.getInitialTemperature()} °C
                </Text>
              </View>
            </View>
          </View>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.goToNextView()}>
            <Text style={styles.bodyText2}>Avançar</Text>
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
    marginTop: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 330,
    height: 380,
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
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default BrewPartAScreen;
