import React from 'react';
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

class ProductionScreen extends React.Component {
  constructor(props) {
    super(props);
    window.productionsScreen = this;
    this.state = {
      initialGroupRecipes: [],
      initialGroupProductions: [],
      sharedProductions: [],
      initialUserRecipes: [],
      initialUserProductions: [],
      sharedRecipes: [],
      userProductions: [],
      userRecipes: [],
      userData: [],
      source: 0,
      searchText: '',
    };
  }

  componentDidMount() {
    this.getUserData();
    //this.getRecipes().then(this.getProductions());
  }

  // getProductions = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem(PRODUCTIONS_KEY);
  //     if (value !== null) {
  //       this.setState({sharedProductions: JSON.parse(value)});
  //       this.setState({initialGroupProductions: JSON.parse(value)});
  //       console.log(JSON.parse(value));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);

      if (value !== null) {
        const data = JSON.parse(value);
        this.setState({userData: data});
        this.getUserProductions(data);
        this.getSharedProductions(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getUserProductions = async (data) => {
    try {
      const value = await productionService.getOwnProductions(data);
      if (value !== null) {
        this.setState({initialUserProductions: value.data});
        this.setState({userProductions: value.data});
      }
    } catch (error) {
      console.log(error);
    }
  };

  getSharedProductions = async (data) => {
    try {
      const value = await productionService.getSharedProductions(data);
      if (value !== null) {
        this.setState({initialGroupProductions: value.data});
        this.setState({sharedProductions: value.data});
      }
    } catch (error) {
      console.log(error);
    }
  };

  // getRecipes = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem(RECIPES_KEY);
  //     if (value !== null) {
  //       this.setState({
  //         sharedRecipes: JSON.parse(value),
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // getUserRecipes = async (data) => {
  //   try {
  //     const value = await recipeService.getRecipes(data);
  //     if (value !== null) {
  //       this.setState({initialUserRecipes: value.data});
  //       this.setState({userRecipes: value.data});
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  searchText = (text) => {
    this.setState({searchText: text.e});
    console.log(text.e);

    if (this.state.source.toString() === ProductionSource[0].value) {
      let filteredData = this.state.initialGroupProductions.filter(function (
        item,
      ) {
        return item.name.includes(text.e);
      });

      if (!text.e || text.e === '') {
        console.log('-------');
        this.setState({
          sharedProductions: this.state.initialGroupProductions,
        });
      } else {
        console.log('---[][][][][][][]----');
        console.log(filteredData);
        this.setState({sharedProductions: filteredData});
      }
    } else {
      let filteredData = this.state.initialUserProductions.filter(function (
        item,
      ) {
        return item.name.includes(text.e);
      });

      if (!text.e || text.e === '') {
        console.log('-------');
        this.setState({
          userRecipes: this.state.initialUserProductions,
        });
      } else {
        console.log('---================----');
        console.log(filteredData);
        this.setState({userProductions: filteredData});
      }
    }
  };

  renderProductionStatusImage(status) {
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

  goToDetailView = (currentProduction) => {
    this.props.navigation.navigate('Detalhe de Produção', {
      production: currentProduction,
    });
  };

  goToCreationView = () => {
    this.props.navigation.navigate('Nova Produção');
  };

  goToCreateGroupScreen = () => {
    this.props.navigation.navigate('Criar grupo');
  };

  importProduction = async (production) => {
    const sharedProductions = this.state.sharedProductions;
    const sharedRecipes = this.state.sharedRecipes;
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

  renderEmptyView = () => {
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
          onPress={() => this.goToCreationView()}>
          <Text style={styles.bodyText}>Começar uma produção</Text>
        </TouchableHighlight>
      </View>
    );
  };

  renderProductions = (sharedProductions) => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={sharedProductions}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      </View>
    );
  };

  decideRenderUserList = () => {
    let userProductions = this.state.userProductions;

    return (
      <View>
        {userProductions === null ||
        userProductions === '' ||
        userProductions.length === 0
          ? this.renderEmptyView()
          : this.renderProductions(userProductions)}
      </View>
    );
  };

  decideRenderGroupList = () => {
    let groupProductions = this.state.sharedProductions;

    return (
      <View>
        {groupProductions === null ||
        groupProductions === '' ||
        groupProductions.length === 0
          ? this.renderEmptyView()
          : this.renderProductions(groupProductions)}
      </View>
    );
  };

  handleViewToRender = (source) => {
    return (
      <View>
        {source === 'group'
          ? this.decideRenderGroupList()
          : this.decideRenderUserList()}
      </View>
    );
  };

  chooseViewToRender = () => {
    return (
      <View>
        {this.state.source.toString() === ProductionSource[0].value
          ? this.handleViewToRender('group')
          : this.handleViewToRender('user')}
      </View>
    );
  };

  renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.goToDetailView(item)}>
          <View style={styles.sectionContainer}>
            <View style={styles.boxContainerLeft}>
              {this.renderProductionStatusImage(item.status)}
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

  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <ChonseSelect
          height={35}
          style={styles.choosenSelectContainer}
          data={ProductionSource}
          initValue={this.state.source}
          onPress={(item) => this.setState({source: item.value})}
        />
        <TextInput
          onChangeText={(e) => this.searchText({e})}
          value={this.state.searchText}
          style={styles.searchField}
          placeholder="Buscar..."
          underlineColorAndroid="transparent"
        />
        <View style={styles.line} />
        <View style={styles.listContainer}>{this.chooseViewToRender()}</View>
      </View>
    );
  }
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
