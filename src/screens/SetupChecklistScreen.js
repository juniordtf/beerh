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
import ChecklistIcon from '../../assets/checklistIcon.png';
import CircleChecked from '../../assets/CircleChecked.png';
import CircleUnchecked from '../../assets/CircleUnchecked.png';
import SafeAreaView from 'react-native-safe-area-view';
import Stopwatch from '../Utils/Stopwatch';

class SetupChecklistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todaysProduction: [],
      checklistItemOneDone: false,
      checklistItemTwoDone: false,
      checklistItemThreeDone: false,
      checklistItemFourDone: false,
      checklistItemFiveDone: false,
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
    };

    this.props.navigation.navigate('Brassagem Parte A', {
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
                <Text style={styles.bodyText}>2</Text>
              </View>
            </View>
            <View style={styles.sectionContainerRight}>
              <Text style={styles.bodyText}>Montagem</Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyContainer} marginTop={15}>
          <View style={styles.rowContainer}>
            <Image source={ChecklistIcon} marginLeft={5} />
            <Text style={styles.bodyText}> Checklist de Montagem</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.sectionContainer}>
            <View style={styles.boxContainerLeft}>
              <Text>Colocar cortina</Text>
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
              <Text>Montar fogões e gás</Text>
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
              <Text>Montar kit de recirculação</Text>
            </View>
            <View style={styles.boxContainerRight}>
              <TouchableHighlight
                onPress={() =>
                  this.setState({
                    checklistItemThreeDone: !this.state.checklistItemThreeDone,
                  })
                }>
                {this.renderCheckImage03()}
              </TouchableHighlight>
            </View>
            <View style={styles.boxContainerLeft}>
              <Text>Montar controlador de temperatura</Text>
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
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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

export default SetupChecklistScreen;
