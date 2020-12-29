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

class FinalCleaningChecklistScreen extends Component {
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
      checklistItemOneDone: false,
      checklistItemTwoDone: false,
      checklistItemThreeDone: false,
      checklistItemFourDone: false,
      checklistItemFiveDone: false,
    };
  }

  componentDidMount() {
    this.keepStopwatchGoing();
    this.getProductions();
    this.getCurrentProduction();
    this.getCurrentRecipe();
  }

  keepStopwatchGoing = () => {
    let currentProduction = this.props.route.params?.currentProduction;
    this.setState({todaysProduction: currentProduction});
    window.stopwatchComponent.startStopwatch();
    window.stopwatchComponent.continueStopwatch(currentProduction.duration);
  };

  getCurrentProduction = () => {
    let currentProduction = this.props.route.params?.currentProduction;
    this.setState({todaysProduction: currentProduction});
  };

  getCurrentRecipe = () => {
    let currentRecipe = this.props.route.params?.currentRecipe;
    this.setState({todaysRecipe: currentRecipe});
  };

  getProductions = async () => {
    try {
      let currentProduction = this.props.route.params?.production;
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
      viewToRestore: 'Checklist Final de Limpeza',
    };

    this.updateProduction(productionUpdated).then(
      this.props.navigation.navigate('Checklist de Desmontagem', {
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
                  <Text style={styles.bodyText}>9</Text>
                </View>
              </View>
              <View style={styles.sectionContainerRight}>
                <Text style={styles.bodyText}>Limpeza</Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer} marginTop={15}>
            <View style={styles.rowContainer}>
              <Image source={ChecklistIcon} marginLeft={5} />
              <Text style={styles.bodyText}> Checklist Final de Limpeza</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.sectionContainer}>
              <View style={styles.boxContainerLeft}>
                <Text style={styles.checklistText}>Lavar a área</Text>
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
                <Text style={styles.checklistText}>Lavar as panelas</Text>
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
                <Text style={styles.checklistText}>Lavar fundos falsos</Text>
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
                  Lavar kit de recirculação
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
                <Text style={styles.checklistText}>Lavar as bombas</Text>
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
            style={
              this.state.checklistItemOneDone &&
              this.state.checklistItemTwoDone &&
              this.state.checklistItemThreeDone &&
              this.state.checklistItemFourDone &&
              this.state.checklistItemFiveDone
                ? styles.buttonContainer
                : styles.buttonDisabledContainer
            }
            disabled={
              !this.state.checklistItemOneDone &&
              !this.state.checklistItemTwoDone &&
              !this.state.checklistItemThreeDone &&
              !this.state.checklistItemFourDone &&
              !this.state.checklistItemFiveDone
            }
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
    textAlign: 'left',
  },
  checklistText: {
    marginLeft: 15,
    fontSize: 14,
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
  buttonDisabledContainer: {
    marginTop: 25,
    marginRight: 15,
    marginBottom: 15,
    alignSelf: 'flex-end',
    width: 170,
    height: 40,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#345722',
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
    alignItems: 'center',
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

export default FinalCleaningChecklistScreen;
