import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from 'react-native';
import Bullet from '../../assets/bullet.png';
import SafeAreaView from 'react-native-safe-area-view';
import Stopwatch from '../Utils/Stopwatch';
import Brewery from '../../assets/brewery.png';
import AsyncStorage from '@react-native-community/async-storage';
import {PRODUCTIONS_KEY} from '../statics/Statics';

class FermentationStartScreen extends Component {
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
      realOg: '',
    };
  }

  componentDidMount() {
    this.keepStopwatchGoing();
    this.getProductions();
  }

  getProductions = async () => {
    try {
      let currentProduction = this.props.route.params?.currentProduction;
      this.setState({todaysProduction: currentProduction});

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

  getInitialTemperature() {
    let currentRecipe = this.props.route.params?.currentRecipe;

    if (currentRecipe != null && currentRecipe.fermentation != null) {
      return parseFloat(currentRecipe.fermentation[0].temperature, 10).toFixed(
        1,
      );
    }

    return '18.0';
  }

  goToNextView = () => {
    window.stopwatchComponent.stopStopwatch();

    const productionUpdated = {
      id: this.state.todaysProduction.id,
      name: this.state.todaysProduction.name,
      volume: this.state.todaysProduction.volume,
      og: this.state.todaysProduction.og,
      realOg: this.state.realOg,
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
      viewToRestore: 'Início da Fermentação',
    };

    this.updateProduction(productionUpdated).then(
      this.props.navigation.navigate('Checklist Final de Limpeza', {
        currentProduction: productionUpdated,
        currentRecipe: this.state.todaysRecipe,
      }),
    );

    window.stopwatchComponent.clearStopwatch();
  };

  updateProduction = async (currentProduction) => {
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
                  <Text style={styles.bodyText}>8</Text>
                </View>
              </View>
              <View style={styles.sectionContainerRight}>
                <Text style={styles.bodyText}>Início da fermentação</Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer} marginTop={15}>
            <View style={styles.rowContainer} marginLeft={15}>
              <Text style={styles.bodyText}>Atividades:</Text>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.rowContainer} marginTop={5} marginLeft={10}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.listContainerRight}>
                <Text style={styles.bodyText}>
                  Medir a densidade inicial (OG);
                </Text>
              </View>
            </View>
            <View style={styles.rowContainer} marginLeft={10}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.doubleListContainerRight}>
                <Text style={styles.bodyText}>
                  Alterar temperatura de controle do freezer para{' '}
                  {this.getInitialTemperature()} °C;
                </Text>
              </View>
            </View>
            <View style={styles.rowContainer} marginLeft={10}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.listContainerRight}>
                <Text style={styles.bodyText}>
                  Fazer solução de água + álcool para blow-offs;
                </Text>
              </View>
            </View>
            <View style={styles.rowContainer} marginTop={15} marginLeft={10}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.doubleListContainerRight}>
                <Text style={styles.bodyText}>
                  Colocar o mosto nos baldes, acrescentar a levedura e
                  tampá-los;
                </Text>
              </View>
            </View>
            <View style={styles.rowContainer} marginLeft={10}>
              <View style={styles.listContainerLeft}>
                <Image source={Bullet} />
              </View>
              <View style={styles.listContainerRight}>
                <Text style={styles.bodyText}>
                  Colocar baldes fermentadores no freezer;
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.centeredBodyContainer} marginTop={40}>
            <View style={styles.sectionContainer}>
              <View style={styles.boxContainerLeft}>
                <Image source={Brewery} />
              </View>
              <View style={styles.boxContainerRight}>
                <View>
                  <View style={styles.blackBoxContainer} marginBottom={15}>
                    <Text style={styles.redText}>
                      {this.getInitialTemperature()} °C
                    </Text>
                  </View>
                  <View style={styles.centeredTitleContainer}>
                    <Text style={styles.bodyTextLeft}>OG medida: </Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={styles.inputText}
                      onChangeText={(realOg) => this.setState({realOg})}
                      value={this.state.realOg}
                      keyboardType="numeric"
                      underlineColorAndroid="transparent"
                      width={120}
                    />
                  </View>
                </View>
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
  centeredBodyContainer: {
    marginTop: 10,
    marginLeft: 30,
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
    marginTop: 140,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 330,
    height: 210,
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
  inputText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    paddingTop: 0,
    paddingBottom: 0,
  },
  bodyTextLeft: {
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
  },
  checklistText: {
    marginLeft: 15,
    fontSize: 15,
    color: 'black',
    textAlign: 'left',
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
    marginTop: 50,
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
    marginLeft: marginVertical,
    marginRight: marginHorizontal,
    width: 135,
    height: 100,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 100,
    height: 100,
    justifyContent: 'flex-end',
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
    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginRight: marginHorizontal,
    width: 300,
    height: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  doubleListContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginRight: marginHorizontal,
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardListContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginRight: marginHorizontal,
    width: 250,
    height: 40,
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
  inputContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: 20,
    marginRight: marginHorizontal,
    width: 150,
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  centeredTitleContainer: {
    marginTop: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FermentationStartScreen;
