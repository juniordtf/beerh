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
      showCheckImg: false,
      todaysProduction: [],
    };
  }

  componentDidMount() {
    this.continueStopwatch;
    let currentProduction = this.props.route.params?.production;
    this.setState({todaysProduction: currentProduction});
    console.log(currentProduction.duration);
    window.stopwatchComponent.startStopwatch();
    window.stopwatchComponent.continueStopwatch(currentProduction.duration);
  }

  renderCheckImage = () => {
    var imgSource = this.state.showCheckImg ? CircleChecked : CircleUnchecked;
    return <Image source={imgSource} />;
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
            <View style={styles.circle}>
              <Text style={styles.bodyText}>1</Text>
            </View>
            <View style={styles.headerContainer}>
              <Text style={styles.bodyText}> </Text>
              <Text style={styles.bodyText}>Limpeza</Text>
            </View>
          </View>
        </View>
        <View style={styles.bodyContainer} marginTop={30}>
          <View style={styles.rowContainer}>
            <Image source={ChecklistIcon} />
            <Text style={styles.bodyText}> Checklist de Limpeza</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.sectionContainer}>
            <View style={styles.boxContainerLeft}>
              <Text>Lavar a área</Text>
            </View>
            <View style={styles.boxContainerRight}>
              <TouchableHighlight
                onPress={() =>
                  this.setState({showCheckImg: !this.state.showCheckImg})
                }>
                {this.renderCheckImage()}
              </TouchableHighlight>
            </View>
            <View style={styles.boxContainerLeft}>
              <Text>Lavar as panelas</Text>
            </View>
            <View style={styles.boxContainerRight}>
              <TouchableHighlight
                onPress={() =>
                  this.setState({showCheckImg: !this.state.showCheckImg})
                }>
                {this.renderCheckImage()}
              </TouchableHighlight>
            </View>
            <View style={styles.boxContainerLeft}>
              <Text>B5</Text>
            </View>
            <View style={styles.boxContainerRight}>
              <TouchableHighlight
                onPress={() =>
                  this.setState({showCheckImg: !this.state.showCheckImg})
                }>
                {this.renderCheckImage()}
              </TouchableHighlight>
            </View>
          </View>
        </View>
        <TouchableHighlight>
          <View style={styles.buttonContainer}>
            <Button
              title="Avançar"
              color="#000000"
              onPress={() => this.props.navigation.navigate('Receitas')}
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
});

export default SetupChecklistScreen;
