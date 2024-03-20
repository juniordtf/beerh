import React, {useState, useEffect} from 'react';
import {
  Text,
  Alert,
  View,
  StatusBar,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import EmptyBox from '../../assets/EmptyBox.png';
import GoldCircle from '../../assets/goldCircle.png';
import GreenCircle from '../../assets/greenCircle.png';
import GreyCircle from '../../assets/greyCircle.png';
import {ChonseSelect} from 'react-native-chonse-select';
import {PRODUCTIONS_KEY, RECIPES_KEY, AUTH_DATA_KEY} from '../statics/Statics';
import {recipeService} from '../services/recipeService';
import {productionService} from '../services/productionService';

const ProductionSource = [
  {
    value: '0',
    label: 'Compartilhadas',
  },
  {
    value: '1',
    label: 'Próprias',
  },
];

function ProductionScreen({navigation}) {
  const [initialGroupRecipes, setInitialGroupRecipes] = useState([]);
  const [initialGroupProductions, setInitialGroupProductions] = useState([]);
  const [sharedProductions, setSharedProductions] = useState([]);
  const [initialUserRecipes, setInitialUserRecipes] = useState([]);
  const [initialUserProductions, setInitialUserProductions] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [userProductions, setUserProductions] = useState([]);
  const [userRecipes, setUserRecipes] = useState([]);
  const [userData, setUserData] = useState([]);
  const [source, setSource] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect((): void => {
    const getUserData = async () => {
      try {
        const value = await AsyncStorage.getItem(AUTH_DATA_KEY);

        if (value !== null) {
          const data = JSON.parse(value);
          setUserData(data);
          getUserProductions(data);
          getSharedProductions(data);
          setIsFetching(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  const getUserProductions = async (data) => {
    try {
      const value = await productionService.getOwnProductions(data);
      if (value !== null) {
        setInitialUserProductions(value.data);
        setUserProductions(value.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSharedProductions = async (data) => {
    try {
      const value = await productionService.getSharedProductions(data);
      if (value !== null) {
        setInitialGroupProductions(value.data);
        setSharedProductions(value.data);
        console.log(value.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function onRefresh() {
    setIsFetching(true, async () => {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);

      if (value !== null) {
        const data = JSON.parse(value);
        setUserData(data);
        getUserProductions(data);
        getSharedProductions(data);
        setIsFetching(false);
      }
      setSearchText('');
    });
  }

  const filterProductions = (text) => {
    setSearchText(text.e);
    console.log(text.e);

    if (source.toString() === ProductionSource[0].value) {
      let filteredData = initialGroupProductions.filter(function (item) {
        return item.name.includes(text.e);
      });

      if (!text.e || text.e === '') {
        console.log('-------');
        setSharedProductions(initialGroupProductions);
      } else {
        console.log('---[][][][][][][]----');
        console.log(filteredData);
        setSharedProductions(filteredData);
      }
    } else {
      let filteredData = initialUserProductions.filter(function (item) {
        return item.name.includes(text.e);
      });

      if (!text.e || text.e === '') {
        console.log('-------');
        setUserRecipes(initialUserProductions);
      } else {
        console.log('---================----');
        console.log(filteredData);
        setUserProductions(filteredData);
      }
    }
  };

  function renderProductionStatusImage(status) {
    var imgSource;

    if (status === 'in progress') {
      imgSource = GreenCircle;
    } else if (status === 'finished') {
      imgSource = GoldCircle;
    } else {
      imgSource = GreyCircle;
    }
    return <Image source={imgSource} />;
  }

  const goToDetailView = (currentProduction) => {
    navigation.navigate('Detalhe de Produção', {
      production: currentProduction,
    });
  };

  const goToCreationView = () => {
    navigation.navigate('Nova Produção');
  };

  const goToCreateGroupScreen = () => {
    navigation.navigate('Criar grupo');
  };

  const importProduction = async (production) => {
    let allProductions = [];
    let isNotDuplicated = true;

    if (sharedRecipes.some((x) => x.title === production.name)) {
      if (sharedProductions != null) {
        if (sharedProductions.length === 0) {
          allProductions = [production];
        } else {
          if (sharedProductions.some((x) => x.id === production.id)) {
            isNotDuplicated = false;
            Alert.alert(
              'Atençāo',
              'A produção não pôde ser importada, pois já existe outra idêntica à ela!',
            );
          } else {
            allProductions = sharedProductions.concat(production);
          }
        }
      }

      if (isNotDuplicated) {
        await AsyncStorage.setItem(
          PRODUCTIONS_KEY,
          JSON.stringify(allProductions),
          (err) => {
            if (err) {
              console.log('an error occured');
              throw err;
            }
            console.log('Success. Production added');
          },
        ).catch((err) => {
          console.log('error is: ' + err);
        });

        Alert.alert('Produção importada com sucesso!');

        if (window.productionsScreen !== undefined) {
          window.productionsScreen.getProductions();
        }
      }
    } else {
      Alert.alert(
        'Atençāo',
        'A produção não pôde ser importada, pois você não possui uma receita com o nome "' +
          production.name +
          '".',
      );
    }
  };

  const renderEmptyView = () => {
    return (
      <View>
        <Image source={EmptyBox} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.bodyText}>
            Nenhuma produção em andamento ou finalizada...
          </Text>
        </View>

        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => goToCreationView()}>
          <Text style={styles.bodyText}>Começar uma produção</Text>
        </TouchableHighlight>
      </View>
    );
  };

  const renderProductions = (productions) => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={productions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
          style={styles.flatList}
        />
      </View>
    );
  };

  const decideRenderUserList = () => {
    return (
      <View>
        {userProductions === null ||
        userProductions === '' ||
        userProductions.length === 0
          ? renderEmptyView()
          : renderProductions(userProductions)}
      </View>
    );
  };

  const decideRenderGroupList = () => {
    let groupProductions = sharedProductions;

    return (
      <View>
        {groupProductions === null ||
        groupProductions === '' ||
        groupProductions.length === 0
          ? renderEmptyView()
          : renderProductions(groupProductions)}
      </View>
    );
  };

  const handleViewToRender = (source) => {
    return (
      <View>
        {source === 'group' ? decideRenderGroupList() : decideRenderUserList()}
      </View>
    );
  };

  const chooseViewToRender = () => {
    return (
      <View>
        {source.toString() === ProductionSource[0].value
          ? handleViewToRender('group')
          : handleViewToRender('user')}
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => goToDetailView(item)}>
          <View style={styles.sectionContainer}>
            <View style={styles.boxContainerLeft}>
              {renderProductionStatusImage(item.status)}
            </View>
            <View style={styles.boxContainerRight}>
              <View style={styles.listItemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.listItemTitle}>{item.name} - </Text>
                  <Text style={styles.listItemTitle2}>{item.style.trim()}</Text>
                  <Text style={styles.listItemTitle2}> ({item.volume} L)</Text>
                </View>
                <View style={styles.rowContainer} marginTop={5}>
                  <Text style={styles.listItemBodyField}>
                    Data da brassagem:{' '}
                  </Text>
                  <Text style={styles.listItemBody}>{item.brewDate}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ChonseSelect
        height={35}
        style={styles.choosenSelectContainer}
        data={ProductionSource}
        initValue={source}
        onPress={(item) => setSource(item.value)}
      />
      <TextInput
        onChangeText={(e) => filterProductions({e})}
        value={searchText}
        style={styles.searchField}
        placeholder="Buscar..."
        underlineColorAndroid="transparent"
      />
      <View style={styles.line} />
      <View style={styles.listContainer}>{chooseViewToRender()}</View>
    </View>
  );
}

const marginHorizontal = 1;
const marginVertical = 1;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
  container: {
    marginTop: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 300,
  },
  flatList: {
    marginBottom: 100,
  },
  choosenSelectContainer: {
    marginTop: 12,
    marginBottom: 12,
    height: 35,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  searchField: {
    height: 40,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    textAlign: 'left',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 2,
  },
  image: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 100,
    height: 100,
    marginTop: 80,
  },
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 35,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 250,
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
  listItemContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  listContainer: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 12,
  },
  listItemTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  listItemTitle2: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  listItemBodyField: {
    fontSize: 12,
    color: 'black',
    fontWeight: '600',
  },
  listItemBody: {
    fontSize: 12,
    color: 'black',
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 2,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  boxContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: 5,
    marginRight: marginHorizontal,
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: 5,
    marginRight: marginHorizontal,
    maxWidth: 280,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default ProductionScreen;
