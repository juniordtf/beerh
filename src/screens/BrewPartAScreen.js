import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button,
} from 'react-native';
import BrewingMill from '../../assets/brewingMill.png';
import HotWater from '../../assets/hotWater.png';
import SafeAreaView from 'react-native-safe-area-view';
import Stopwatch from '../Utils/Stopwatch';

class BrewPartAScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todaysProduction: [],
    };
  }

  componentDidMount() {
    this.keepStopwatchGoing();
  }

  keepStopwatchGoing = () => {
    let currentProduction = this.props.route.params?.production;
    this.setState({todaysProduction: currentProduction});
    window.stopwatchComponent.startStopwatch();
    window.stopwatchComponent.continueStopwatch(currentProduction.duration);
  };

  goToNextView = (currentProduction) => {
    window.stopwatchComponent.stopStopwatch();

    const productionUpdated = {
      id: currentProduction.id,
      name: currentProduction.name,
      volume: currentProduction.volume,
      og: currentProduction.og,
      fg: currentProduction.fg,
      style: currentProduction.style,
      estimatedTime: currentProduction.estimatedTime,
      status: currentProduction.status,
      brewDate: currentProduction.brewDate,
      fermentationDate: currentProduction.fermentationDate,
      carbonationDate: currentProduction.carbonationDate,
      ageingDate: currentProduction.ageingDate,
      fillingDate: currentProduction.fillingDate,
      duration: window.stopwatchComponent.showDisplay(),
      createdAt: currentProduction.createdAt,
    };

    this.props.navigation.navigate('Brassagem Parte B', {
      production: productionUpdated,
    });
    window.stopwatchComponent.clearStopwatch();
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
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
              <Text style={styles.bodyText}>Brassagem (1/4)</Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyContainer} marginTop={15}>
          <View style={styles.rowContainer}>
            <Text style={styles.bodyText}>
              {' '}
              Realizar as tarefas abaixo em paralelo:
            </Text>
          </View>
        </View>
        <View style={styles.bodyContainer}>
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
        <View style={styles.bodyContainer}>
          <View style={styles.rowContainer}>
            <View style={styles.boxContainerRight}>
              <Text style={styles.bodyText}>Obs.:</Text>
            </View>
            <View style={styles.boxContainerLeft} alignItems={'flex-start'}>
              <Text style={styles.bodyText}>
                Alterar temperatura do controlador para: 72 °C
              </Text>
            </View>
          </View>
        </View>
        <TouchableHighlight>
          <View style={styles.buttonContainer}>
            <Button
              title="Avançar"
              color="#000000"
              onPress={() => this.goToNextView(this.state.todaysProduction)}
            />
          </View>
        </TouchableHighlight>
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
    marginLeft: 40,
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
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default BrewPartAScreen;
