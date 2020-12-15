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
import ChecklistIcon from '../../assets/checklistIcon.png';
import CircleChecked from '../../assets/CircleChecked.png';
import CircleUnchecked from '../../assets/CircleUnchecked.png';
import SafeAreaView from 'react-native-safe-area-view';
import Stopwatch from '../Utils/Stopwatch';
import AsyncStorage from '@react-native-community/async-storage';
import {PRODUCTIONS_KEY} from '../statics/Statics';

class DisassembleChecklistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productions: [],
      todaysProduction: [],
      todaysRecipe: [],
      checklistItemOneDone: false,
      checklistItemTwoDone: false,
      checklistItemThreeDone: false,
      checklistItemFourDone: false,
      checklistItemFiveDone: false,
    };
  }

  componentDidMount() {
    this.keepStopwatchGoing();
    this.getCurrentRecipe();
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

  getCurrentRecipe = () => {
    let currentRecipe = this.props.route.params?.currentRecipe;
    this.setState({todaysRecipe: currentRecipe});
  };

  renderCheckImage01 = () => {
    var imgSource = this.state.checklistItemOneDone
      ? CircleChecked
      : CircleUnchecked;
    return <Image source={imgSource} />;
  };

  renderCheckImage02 = () => {
    var imgSource = this.state.checklistItemTwoDone
      ? CircleChecked
      : CircleUnchecked;
    return <Image source={imgSource} />;
  };

  renderCheckImage03 = () => {
    var imgSource = this.state.checklistItemThreeDone
      ? CircleChecked
      : CircleUnchecked;
    return <Image source={imgSource} />;
  };

  renderCheckImage04 = () => {
    var imgSource = this.state.checklistItemFourDone
      ? CircleChecked
      : CircleUnchecked;
    return <Image source={imgSource} />;
  };

  renderCheckImage05 = () => {
    var imgSource = this.state.checklistItemFiveDone
      ? CircleChecked
      : CircleUnchecked;
    return <Image source={imgSource} />;
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
      viewToRestore: 'Checklist de Desmontagem',
    };

    //this.updateProduction(productionUpdated);

    this.props.navigation.navigate('Sucesso', {
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
                  <Text style={styles.bodyText}>10</Text>
                </View>
              </View>
              <View style={styles.sectionContainerRight}>
                <Text style={styles.bodyText}>Desmontagem</Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer} marginTop={15}>
            <View style={styles.rowContainer}>
              <Image source={ChecklistIcon} marginLeft={5} />
              <Text style={styles.bodyText}> Checklist de Desmontagem</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.sectionContainer}>
              <View style={styles.boxContainerLeft}>
                <Text style={styles.checklistText}>Remover cortina</Text>
              </View>
              <View style={styles.boxContainerRight}>
                <TouchableHighlight
                  onPress={() =>
                    this.setState({
                      checklistItemOneDone: !this.state.checklistItemOneDone,
                    })
                  }>
                  {this.renderCheckImage01()}
                </TouchableHighlight>
              </View>
              <View style={styles.boxContainerLeft}>
                <Text style={styles.checklistText}>
                  Desmontar fogões e conexões com gás
                </Text>
              </View>
              <View style={styles.boxContainerRight}>
                <TouchableHighlight
                  onPress={() =>
                    this.setState({
                      checklistItemTwoDone: !this.state.checklistItemTwoDone,
                    })
                  }>
                  {this.renderCheckImage02()}
                </TouchableHighlight>
              </View>
              <View style={styles.boxContainerLeft}>
                <Text style={styles.checklistText}>
                  Desfazer conexões com o kit de recirculação
                </Text>
              </View>
              <View style={styles.boxContainerRight}>
                <TouchableHighlight
                  onPress={() =>
                    this.setState({
                      checklistItemThreeDone: !this.state
                        .checklistItemThreeDone,
                    })
                  }>
                  {this.renderCheckImage03()}
                </TouchableHighlight>
              </View>
              <View style={styles.boxContainerLeft}>
                <Text style={styles.checklistText}>
                  Retirar controlador de temperatura
                </Text>
              </View>
              <View style={styles.boxContainerRight}>
                <TouchableHighlight
                  onPress={() =>
                    this.setState({
                      checklistItemFourDone: !this.state.checklistItemFourDone,
                    })
                  }>
                  {this.renderCheckImage04()}
                </TouchableHighlight>
              </View>
              <View style={styles.boxContainerLeft}>
                <Text style={styles.checklistText}>
                  Desmontar sistema de resfriamento de mosto
                </Text>
              </View>
              <View style={styles.boxContainerRight}>
                <TouchableHighlight
                  onPress={() =>
                    this.setState({
                      checklistItemFiveDone: !this.state.checklistItemFiveDone,
                    })
                  }>
                  {this.renderCheckImage05()}
                </TouchableHighlight>
              </View>
            </View>
          </View>

          <TouchableHighlight
            style={styles.buttonContainer}
            onPress={() => this.goToNextView(this.state.todaysProduction)}>
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
  checklistText: {
    marginLeft: 15,
    fontSize: 14,
    color: 'black',
    textAlign: 'left',
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
    height: 280,
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 5,
    backgroundColor: '#EDEDED',
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#EDEDED',
  },
  sectionContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sectionContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginRight: marginHorizontal,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default DisassembleChecklistScreen;
