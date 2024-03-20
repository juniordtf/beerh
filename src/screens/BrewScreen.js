import React, {useState, useEffect} from 'react';
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
import {format} from 'date-fns';
import {AUTH_DATA_KEY} from '../statics/Statics';
import {productionService} from '../services/productionService';
import {recipeService} from '../services/recipeService';

function BrewScreen({navigation}) {
  const [todaysDatePt, setTodaysDatePt] = useState(
    format(new Date(), 'dd/MM/yyyy'),
  );
  const [userData, setUserData] = useState([]);
  const [productions, setProductions] = useState([]);
  const [sharedProductions, setSharedProductions] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);

  useEffect((): void => {
    const getUserProductions = async (data) => {
      try {
        const value = await productionService.getOwnProductions(data);
        if (value !== null) {
          setProductions(value.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getSharedProductions = async (data) => {
      try {
        const value = await productionService.getSharedProductions(data);
        if (value !== null) {
          setSharedProductions(value.data);
          var allProductions = productions;
          allProductions = allProductions.concat(value.data);
          setProductions(allProductions);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getUserRecipes = async (data) => {
      try {
        const value = await recipeService.getOwnRecipes(data);
        if (value !== null) {
          setRecipes(value.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getSharedRecipes = async (data) => {
      try {
        const value = await recipeService.getSharedRecipes(data);
        if (value !== null) {
          setSharedRecipes(value.data);
          var allRecipes = recipes;
          allRecipes = allRecipes.concat(value.data);
          setRecipes(allRecipes);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem(AUTH_DATA_KEY);

        if (value !== null) {
          const data = JSON.parse(value);
          setUserData(data);
          getUserProductions(data).then(getSharedProductions(data));
          getUserRecipes(data).then(getSharedRecipes(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (productions.length === 0) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startBrewing = (todaysProduction) => {
    const currentProduction = {
      id: todaysProduction.id,
      name: todaysProduction.name,
      recipeId: todaysProduction.recipeId,
      recipeName: todaysProduction.recipeName,
      volume: todaysProduction.volume,
      realVolume: todaysProduction.realVolume,
      og: todaysProduction.og,
      realOg: todaysProduction.realOg,
      fg: todaysProduction.fg,
      realFg: todaysProduction.realFg,
      abv: todaysProduction.abv,
      realAbv: todaysProduction.realAbv,
      style: todaysProduction.style,
      estimatedTime: todaysProduction.estimatedTime,
      status: 'in progress',
      initialBrewDate: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      brewDate: todaysProduction.brewDate,
      fermentationDate: todaysProduction.fermentationDate,
      carbonationDate: todaysProduction.carbonationDate,
      ageingDate: todaysProduction.ageingDate,
      fillingDate: todaysProduction.fillingDate,
      initialCalendarDate: todaysProduction.initialCalendarDate,
      duration: todaysProduction.duration,
      viewToRestore: 'Checklist de Limpeza',
      ownerId: todaysProduction.ownerId,
      ownerName: todaysProduction.ownerName,
    };

    updateProduction(currentProduction).then(
      navigation.navigate('Checklist de Limpeza', {
        currentProduction: currentProduction,
      }),
    );
  };

  const continueBrewing = (todaysProduction) => {
    const currentProduction = {
      id: todaysProduction.id,
      name: todaysProduction.name,
      recipeId: todaysProduction.recipeId,
      recipeName: todaysProduction.recipeName,
      volume: todaysProduction.volume,
      realVolume: todaysProduction.realVolume,
      og: todaysProduction.og,
      realOg: todaysProduction.realOg,
      fg: todaysProduction.fg,
      realFg: todaysProduction.realFg,
      abv: todaysProduction.abv,
      realAbv: todaysProduction.realAbv,
      style: todaysProduction.style,
      estimatedTime: todaysProduction.estimatedTime,
      status: todaysProduction.status,
      initialBrewDate: todaysProduction.initialBrewDate,
      brewDate: todaysProduction.brewDate,
      fermentationDate: todaysProduction.fermentationDate,
      carbonationDate: todaysProduction.carbonationDate,
      ageingDate: todaysProduction.ageingDate,
      fillingDate: todaysProduction.fillingDate,
      initialCalendarDate: todaysProduction.initialCalendarDate,
      duration: todaysProduction.duration,
      viewToRestore: todaysProduction.viewToRestore,
      ownerId: todaysProduction.ownerId,
      ownerName: todaysProduction.ownerName,
    };

    updateProduction(currentProduction).then(
      navigation.navigate(todaysProduction.viewToRestore, {
        currentProduction: currentProduction,
      }),
    );
  };

  const updateProduction = async (currentProduction) => {
    productionService.editProduction(currentProduction, userData);
  };

  function getTodaysProduction() {
    let currentDate = todaysDatePt;
    let todaysProductions = null;

    if (productions != null && productions.length > 0) {
      todaysProductions = productions.filter(
        (x) => x.brewDate === currentDate && x.status !== 'finished',
      );
    }

    return todaysProductions;
  }

  if (getTodaysProduction() != null) {
    const todaysInProgressProduction = productions.find(
      (x) => x.brewDate === todaysDatePt && x.status === 'in progress',
    );

    const todaysNewProduction = productions.find(
      (x) => x.brewDate === todaysDatePt && x.status === 'not started',
    );

    if (todaysInProgressProduction != null) {
      const duration = (
        parseInt(todaysInProgressProduction.estimatedTime, 10) / 60
      ).toFixed(2);

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
                {todaysInProgressProduction.name}
              </Text>
              <Text style={styles.listItemTitle2}> - </Text>
              <Text style={styles.listItemTitle2}>
                {todaysInProgressProduction.volume} L
              </Text>
            </View>
            <View marginTop={15}>
              <View style={styles.rowContainer} marginLeft={20}>
                <Text style={styles.bodyText}>Estilo: </Text>
                <Text style={styles.bodyText}>
                  {todaysInProgressProduction.style}
                </Text>
              </View>
              <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                <Text style={styles.bodyText}>Data: </Text>
                <Text style={styles.bodyText}>
                  {todaysInProgressProduction.brewDate}
                </Text>
              </View>
              <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                <Text style={styles.bodyText}>Tempo estimado: </Text>
                <Text style={styles.bodyText}>{duration} hrs</Text>
              </View>
            </View>

            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => continueBrewing(todaysInProgressProduction)}>
              <Text style={styles.bodyText}>Retomar</Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      );
    } else if (todaysNewProduction != null) {
      const duration = (
        parseInt(todaysNewProduction.estimatedTime, 10) / 60
      ).toFixed(2);
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
                {todaysNewProduction.name}
              </Text>
              <Text style={styles.listItemTitle2}> - </Text>
              <Text style={styles.listItemTitle2}>
                {todaysNewProduction.volume} L
              </Text>
            </View>
            <View marginTop={15}>
              <View style={styles.rowContainer} marginLeft={20}>
                <Text style={styles.bodyText}>Estilo: </Text>
                <Text style={styles.bodyText}>{todaysNewProduction.style}</Text>
              </View>
              <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                <Text style={styles.bodyText}>Data: </Text>
                <Text style={styles.bodyText}>
                  {todaysNewProduction.brewDate}
                </Text>
              </View>
              <View style={styles.rowContainer} marginLeft={20} marginTop={5}>
                <Text style={styles.bodyText}>Tempo estimado: </Text>
                <Text style={styles.bodyText}>{duration} hrs</Text>
              </View>
            </View>

            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => startBrewing(todaysNewProduction)}>
              <Text style={styles.bodyText}>Iniciar</Text>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      );
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
    marginRight: 10,
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
