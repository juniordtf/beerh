import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Beach from '../../assets/beach.png';
import AsyncStorage from '@react-native-community/async-storage';
import {PRODUCTIONS_KEY, RECIPES_KEY} from '../statics/Statics';

class BrewScreen extends React.Component {
  constructor(props) {
    const todayPt =
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear();

    super(props);
    window.brewScreen = this;
    this.state = {
      todaysDatePt: todayPt,
      productions: [],
      recipes: [],
    };
  }

  componentDidMount() {
    this.getRecipes().then(this.getProductions());
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

  getRecipes = async () => {
    try {
      const value = await AsyncStorage.getItem(RECIPES_KEY);
      if (value !== null) {
        this.setState({recipes: JSON.parse(value)});
        console.log(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  startBrewing = (todaysProduction) => {
    const currentRecipe = this.state.recipes.find(
      (x) => x.title === todaysProduction.name,
    );

    const currentProduction = {
      id: todaysProduction.id,
      name: todaysProduction.name,
      volume: todaysProduction.volume,
      og: todaysProduction.og,
      realOg: todaysProduction.realOg,
      fg: todaysProduction.fg,
      realFg: todaysProduction.realFg,
      style: todaysProduction.style,
      estimatedTime: todaysProduction.estimatedTime,
      status: 'in progress',
      brewDate: todaysProduction.brewDate,
      fermentationDate: todaysProduction.fermentationDate,
      carbonationDate: todaysProduction.carbonationDate,
      ageingDate: todaysProduction.ageingDate,
      fillingDate: todaysProduction.fillingDate,
      initialCalendarDate: todaysProduction.initialCalendarDate,
      duration: todaysProduction.duration,
      createdAt: todaysProduction.createdAt,
      lastUpdateDate: this.state.todaysDatePt,
      viewToRestore: '',
    };

    this.updateProduction(currentProduction);

    this.props.navigation.navigate('Checklist de Limpeza', {
      currentProduction: currentProduction,
      currentRecipe: currentRecipe,
    });
  };

  continueBrewing = (todaysProduction) => {
    const currentRecipe = this.state.recipes.find(
      (x) => x.title === todaysProduction.name,
    );

    const currentProduction = {
      id: todaysProduction.id,
      name: todaysProduction.name,
      volume: todaysProduction.volume,
      og: todaysProduction.og,
      realOg: todaysProduction.realOg,
      fg: todaysProduction.fg,
      realFg: todaysProduction.realFg,
      style: todaysProduction.style,
      estimatedTime: todaysProduction.estimatedTime,
      status: 'in progress',
      brewDate: todaysProduction.brewDate,
      fermentationDate: todaysProduction.fermentationDate,
      carbonationDate: todaysProduction.carbonationDate,
      ageingDate: todaysProduction.ageingDate,
      fillingDate: todaysProduction.fillingDate,
      initialCalendarDate: todaysProduction.initialCalendarDate,
      duration: todaysProduction.duration,
      createdAt: todaysProduction.createdAt,
      lastUpdateDate: this.state.todaysDatePt,
      viewToRestore: todaysProduction.viewToRestore,
    };

    this.updateProduction(currentProduction);

    this.props.navigation.navigate(todaysProduction.viewToRestore, {
      currentProduction: currentProduction,
      currentRecipe: currentRecipe,
    });
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
    let productions = this.state.productions;

    let currentDate = this.state.todaysDatePt;
    if (currentDate.length < 10) {
      currentDate = 0 + currentDate;
    }

    if (
      productions != null &&
      productions.length > 0 &&
      productions.find(
        (x) => x.brewDate === currentDate && x.status !== 'finished',
      )
    ) {
      const todaysProduction = productions.find(
        (x) => x.brewDate === currentDate,
      );
      const duration = (
        parseInt(todaysProduction.estimatedTime, 10) / 60
      ).toFixed(2);

      if (todaysProduction.status === 'in progress') {
        return (
          <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <View>
              <Text style={styles.title}>Fala, cervejeiro!</Text>
              <Text style={styles.bodyText2}>
                Você possui uma brassagem em andamento:
              </Text>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.rowContainer} marginLeft={20} marginTop={10}>
                <Text style={styles.listItemTitle}>
                  {todaysProduction.name}
                </Text>
                <Text style={styles.listItemTitle2}> - </Text>
                <Text style={styles.listItemTitle2}>
                  {todaysProduction.volume} L
                </Text>
              </View>
              <View marginTop={15}>
                <View style={styles.rowContainer} marginLeft={20}>
                  <Text style={styles.bodyText}>Estilo: </Text>
                  <Text style={styles.bodyText}>{todaysProduction.style}</Text>
                </View>
                <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                  <Text style={styles.bodyText}>Data: </Text>
                  <Text style={styles.bodyText}>
                    {todaysProduction.brewDate}
                  </Text>
                </View>
                <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                  <Text style={styles.bodyText}>Tempo estimado: </Text>
                  <Text style={styles.bodyText}>{duration} hrs</Text>
                </View>
              </View>

              <TouchableHighlight
                style={styles.buttonContainer}
                onPress={() => this.continueBrewing(todaysProduction)}>
                <Text style={styles.bodyText}>Retomar</Text>
              </TouchableHighlight>
            </View>
          </SafeAreaView>
        );
      } else {
        return (
          <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />
            <View>
              <Text style={styles.title}>Fala, cervejeiro!</Text>
              <Text style={styles.bodyText2}>
                Você possui uma brassagem agendada para hoje:
              </Text>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.rowContainer} marginLeft={20} marginTop={10}>
                <Text style={styles.listItemTitle}>
                  {todaysProduction.name}
                </Text>
                <Text style={styles.listItemTitle2}> - </Text>
                <Text style={styles.listItemTitle2}>
                  {todaysProduction.volume} L
                </Text>
              </View>
              <View marginTop={15}>
                <View style={styles.rowContainer} marginLeft={20}>
                  <Text style={styles.bodyText}>Estilo: </Text>
                  <Text style={styles.bodyText}>{todaysProduction.style}</Text>
                </View>
                <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                  <Text style={styles.bodyText}>Data: </Text>
                  <Text style={styles.bodyText}>
                    {todaysProduction.brewDate}
                  </Text>
                </View>
                <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                  <Text style={styles.bodyText}>Tempo estimado: </Text>
                  <Text style={styles.bodyText}>{duration} hrs</Text>
                </View>
              </View>

              <TouchableHighlight
                style={styles.buttonContainer}
                onPress={() => this.startBrewing(todaysProduction)}>
                <Text style={styles.bodyText}>Iniciar</Text>
              </TouchableHighlight>
            </View>
          </SafeAreaView>
        );
      }
    } else {
      return (
        <SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Day off</Text>
          </View>
          <Image source={Beach} style={styles.image} />
          <View style={styles.container}>
            <Text style={styles.bodyText}>
              Nenhuma brassagem agendada para hoje...
            </Text>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  labelContainer: {
    width: 100,
    height: 40,
    marginLeft: 15,
    marginTop: 20,
    backgroundColor: '#8DDFF6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  bodyText2: {
    fontSize: 17,
    color: 'black',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },
  label: {
    color: '#000000',
    fontSize: 20,
  },
  image: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 30,
  },
  title: {
    marginLeft: 30,
    marginTop: 40,
    fontSize: 27,
    color: 'black',
  },
  cardContainer: {
    marginTop: 35,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 310,
    height: 210,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#979797',
  },
  buttonContainer: {
    marginTop: 25,
    marginLeft: 130,
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
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  listItemTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  listItemTitle2: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
});

export default BrewScreen;
