import React from 'react';
import {
  Text,
  TextInput,
  View,
  StatusBar,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Chefhat from '../../assets/chef-hat.png';
import BeerCupYellow from '../../assets/beerCupYellow.png';
import BeerCupOrange from '../../assets/beerCupOrange.png';
import BeerCupRed from '../../assets/beerCupRed.png';
import BeerCupBrown from '../../assets/beerCupBrown.png';
import BeerCupBlack from '../../assets/beerCupBlack.png';
import AsyncStorage from '@react-native-community/async-storage';
import {ChonseSelect} from 'react-native-chonse-select';
import {RECIPES_KEY, AUTH_DATA_KEY} from '../statics/Statics';
import {recipeService} from '../services/recipeService';

const RecipeSource = [
  {
    value: '0',
    label: 'Compartilhadas',
  },
  {
    value: '1',
    label: 'Próprias',
  },
];

class RecipesScreen extends React.Component {
  constructor(props) {
    super(props);
    window.recipesScreen = this;
    this.state = {
      initialGroupRecipes: [],
      sharedRecipes: [],
      initialUserRecipes: [],
      userRecipes: [],
      userData: [],
      source: 0,
      searchText: '',
    };
  }

  componentDidMount() {
    this.getUserData();
    //this.getRecipes();
  }

  getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);

      if (value !== null) {
        const data = JSON.parse(value);
        this.setState({userData: data});
        this.getUserRecipes(data);
        this.getSharedRecipes(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  getUserRecipes = async (data) => {
    try {
      const value = await recipeService.getOwnRecipes(data);
      if (value !== null) {
        this.setState({initialUserRecipes: value.data});
        this.setState({userRecipes: value.data});
      }
    } catch (error) {
      console.log(error);
    }
  };

  getSharedRecipes = async (data) => {
    try {
      const value = await recipeService.getSharedRecipes(data);
      if (value !== null) {
        this.setState({initialGroupRecipes: value.data});
        this.setState({sharedRecipes: value.data});
      }
    } catch (error) {
      console.log(error);
    }
  };

  getRecipes = async () => {
    try {
      const value = await AsyncStorage.getItem(RECIPES_KEY);
      if (value !== null) {
        this.setState({initialGroupRecipes: JSON.parse(value)});
        this.setState({sharedRecipes: JSON.parse(value)});
      }
    } catch (error) {
      console.log(error);
    }
  };

  goToDetailView = (currentRecipe) => {
    this.props.navigation.navigate('Detalhe de Receita', {
      recipe: currentRecipe,
    });
  };

  importRecipe = async (recipe) => {
    const sharedRecipes = this.state.sharedRecipes;
    let allRecipes = [];
    let isNotDuplicated = true;

    if (sharedRecipes != null) {
      if (sharedRecipes.length === 0) {
        allRecipes = [recipe];
      } else {
        if (sharedRecipes.some((x) => x.id === recipe.id)) {
          isNotDuplicated = false;
          Alert.alert(
            'Atençāo',
            'A receita não pôde ser importada, pois já existe outra idêntica à ela!',
          );
        } else {
          allRecipes = sharedRecipes.concat(recipe);
        }
      }
    }

    // if (isNotDuplicated) {
    //   await AsyncStorage.setItem(
    //     RECIPES_KEY,
    //     JSON.stringify(allRecipes),
    //     (err) => {
    //       if (err) {
    //         console.log('an error occured');
    //         throw err;
    //       }
    //       console.log('Success. Recipe added');
    //     },
    //   ).catch((err) => {
    //     console.log('error is: ' + err);
    //   });

    //   Alert.alert('Receita importada com sucesso!');

    //   if (window.recipesScreen !== undefined) {
    //     window.recipesScreen.getRecipes();
    //   }

    //   if (window.productionsScreen !== undefined) {
    //     window.productionsScreen
    //       .getRecipes()
    //       .then(window.productionsScreen.getProductions());
    //   }
    // }
  };

  searchText = (text) => {
    this.setState({searchText: text.e});
    console.log(text.e);

    if (this.state.source.toString() === RecipeSource[0].value) {
      let filteredData = this.state.initialGroupRecipes.filter(function (item) {
        return item.title.includes(text.e);
      });

      if (!text.e || text.e === '') {
        console.log('-------');
        this.setState({
          sharedRecipes: this.state.initialGroupRecipes,
        });
      } else {
        console.log(filteredData);
        this.setState({sharedRecipes: filteredData});
      }
    } else {
      let filteredData = this.state.initialUserRecipes.filter(function (item) {
        return item.title.includes(text.e);
      });

      if (!text.e || text.e === '') {
        console.log('-------');
        this.setState({
          userRecipes: this.state.initialUserRecipes,
        });
      } else {
        console.log(filteredData);
        this.setState({userRecipes: filteredData});
      }
    }
  };

  renderCupImage(color) {
    var imgSource;

    if (color < 10) {
      imgSource = BeerCupYellow;
    } else if (color >= 10 && color < 28) {
      imgSource = BeerCupOrange;
    } else if (color >= 28 && color < 36) {
      imgSource = BeerCupRed;
    } else if (color >= 36 && color < 60) {
      imgSource = BeerCupBrown;
    } else {
      imgSource = BeerCupBlack;
    }
    return <Image source={imgSource} />;
  }

  renderItem = ({item}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => this.goToDetailView(item)}>
          <View style={styles.sectionContainer}>
            <View style={styles.boxContainerLeft}>
              {this.renderCupImage(item.color)}
            </View>
            <View style={styles.boxContainerRight}>
              <View style={styles.listItemContainer}>
                <View style={styles.rowContainer}>
                  <Text style={styles.listItemTitle}>{item.title}</Text>
                  <Text style={styles.listItemTitle}> - </Text>
                  <Text style={styles.listItemTitle2}>{item.style.trim()}</Text>
                  <Text style={styles.listItemTitle2}> ({item.volume} L)</Text>
                </View>
                <View style={styles.rowContainer} marginTop={5}>
                  <Text style={styles.listItemBodyField}>OG: </Text>
                  <Text style={styles.listItemBody}>{item.og}</Text>
                  <Text style={styles.listItemBodyField}> FG: </Text>
                  <Text style={styles.listItemBody}>{item.fg}</Text>
                  <Text style={styles.listItemBodyField}> IBU: </Text>
                  <Text style={styles.listItemBody}>{item.ibu}</Text>
                  <Text style={styles.listItemBodyField}> ABV: </Text>
                  <Text style={styles.listItemBody}>{item.abv}%</Text>
                </View>
                <View
                  style={styles.rowContainer}
                  marginTop={2}
                  marginBottom={1}>
                  <Text style={styles.listItemBodyField}>
                    Data de criação:{' '}
                  </Text>
                  <Text style={styles.listItemBody}>{item.createdAt}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  };

  renderEmptyView = () => {
    return (
      <View>
        <Image source={Chefhat} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.bodyText}>Você ainda não possui receitas</Text>
        </View>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={() => this.props.navigation.navigate('Nova Receita')}>
          <Text style={styles.bodyText}>Criar uma receita</Text>
        </TouchableHighlight>
      </View>
    );
  };

  renderRecipies = (sharedRecipes) => {
    return (
      <View style={styles.listContainer}>
        <FlatList
          data={sharedRecipes}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          style={styles.flatList}
        />
      </View>
    );
  };

  decideRenderUserList = () => {
    let userRecipes = this.state.userRecipes;

    return (
      <View>
        {userRecipes === null || userRecipes === '' || userRecipes.length === 0
          ? this.renderEmptyView()
          : this.renderRecipies(userRecipes)}
      </View>
    );
  };

  decideRenderGroupList = () => {
    let groupRecipes = this.state.sharedRecipes;

    return (
      <View>
        {groupRecipes === null ||
        groupRecipes === '' ||
        groupRecipes.length === 0
          ? this.renderEmptyView()
          : this.renderRecipies(groupRecipes)}
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
        {this.state.source.toString() === RecipeSource[0].value
          ? this.handleViewToRender('group')
          : this.handleViewToRender('user')}
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
          data={RecipeSource}
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

const marginHorizontal = 2;
const marginVertical = 2;

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
  choosenSelectContainer: {
    marginTop: 12,
    marginBottom: 12,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  flatList: {
    marginBottom: 100,
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
  listItemContainer: {
    marginTop: 5,
    marginBottom: 5,
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
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 2,
    marginLeft: 4,
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
    marginTop: 2,
  },
  boxContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: 5,
    marginRight: marginHorizontal,
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: 5,
    marginRight: marginHorizontal,
    maxWidth: 270,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default RecipesScreen;
