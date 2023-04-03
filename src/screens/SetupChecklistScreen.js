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
import ChecklistIcon from '../../assets/checklistIcon.png';
import CircleChecked from '../../assets/CircleChecked.png';
import CircleUnchecked from '../../assets/CircleUnchecked.png';
import SafeAreaView from 'react-native-safe-area-view';
import Stopwatch from '../Utils/Stopwatch';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../statics/Statics';
import {format} from 'date-fns';
import {recipeService} from '../services/recipeService';
import {productionService} from '../services/productionService';

class SetupChecklistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
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
        console.log(value);
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
        console.log(value);
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
      viewToRestore: 'Checklist de Montagem',
      ownerId: this.state.todaysProduction.ownerId,
      ownerName: this.state.todaysProduction.ownerName,
    };

    this.updateProduction(productionUpdated).then(
      this.props.navigation.navigate('Brassagem Parte A', {
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
                  <Text style={styles.bodyText}>2</Text>
                </View>
              </View>
              <View style={styles.sectionContainerRight}>
                <Text style={styles.bodyText}>Montagem</Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyContainer} marginTop={15}>
            <View style={styles.rowContainer} marginLeft={5}>
              <Image source={ChecklistIcon} marginLeft={5} />
              <Text style={styles.bodyText}> Checklist de Montagem</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.sectionContainer}>
              <View style={styles.boxContainerLeft}>
                <Text style={styles.checklistText}>Colocar cortina</Text>
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
                <Text style={styles.checklistText}>Montar fogões e gás</Text>
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
                  Montar kit de recirculação
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
                  Montar controlador de temperatura
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
            </View>
          </View>

          <TouchableHighlight
            style={
              this.state.checklistItemOneDone &&
              this.state.checklistItemTwoDone &&
              this.state.checklistItemThreeDone &&
              this.state.checklistItemFourDone
                ? styles.buttonContainer
                : styles.buttonDisabledContainer
            }
            disabled={
              !this.state.checklistItemOneDone &&
              !this.state.checklistItemTwoDone &&
              !this.state.checklistItemThreeDone &&
              !this.state.checklistItemFourDone
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
  bodyText2: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
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
    height: 230,
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

export default SetupChecklistScreen;
