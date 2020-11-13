import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Beach from '../../assets/beach.png';
import AsyncStorage from '@react-native-community/async-storage';
import {PRODUCTIONS_KEY} from '../statics/Statics';

class BrewScreen extends React.Component {
  constructor(props) {
    super(props);
    window.brewScreen = this;
    this.state = {
      productions: [],
    };
  }

  componentDidMount() {
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

  render() {
    let productions = this.state.productions;
    const todayPt =
      new Date().getDate() +
      '/' +
      (new Date().getMonth() + 1) +
      '/' +
      new Date().getFullYear();

    if (
      productions != null &&
      productions.length > 0 &&
      productions.find((x) => x.brewDate === todayPt)
    ) {
      const todaysProduction = productions.find((x) => x.brewDate === todayPt);
      return (
        <SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <View>
            <Text style={styles.title}>Fala, cervejeiro!</Text>
            <Text style={styles.bodyText2}>
              Você possui uma brassagem agendada para hoje:
            </Text>
          </View>
          <View style={styles.cardContainer}>
            <View style={styles.rowContainer} marginLeft={20} marginTop={10}>
              <Text style={styles.listItemTitle}>{todaysProduction.name}</Text>
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
                <Text style={styles.bodyText}>{todaysProduction.brewDate}</Text>
              </View>
              <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                <Text style={styles.bodyText}>Tempo estimado: </Text>
                <Text style={styles.bodyText}>
                  {todaysProduction.estimatedTime} hrs
                </Text>
              </View>
            </View>
            <TouchableHighlight>
              <View style={styles.buttonContainer}>
                <Button
                  title="Iniciar"
                  color="#000000"
                  onPress={() =>
                    this.props.navigation.navigate('Checklist de Limpeza', {
                      production: todaysProduction,
                    })
                  }
                />
              </View>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
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
    marginLeft: 40,
    marginTop: 40,
    fontSize: 27,
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
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
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
