import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Chefhat from '../../assets/chef-hat.png';
import BeerCupYellow from '../../assets/beerCupYellow.png';
import BeerCupOrange from '../../assets/beerCupOrange.png';
import BeerCupRed from '../../assets/beerCupRed.png';
import BeerCupBrown from '../../assets/beerCupBrown.png';
import BeerCupBlack from '../../assets/beerCupBlack.png';
import AsyncStorage from '@react-native-community/async-storage';
import {RECIPES_KEY} from '../statics/Statics';

class RecipesScreen extends React.Component {
  constructor(props) {
    super(props);
    window.recipesScreen = this;
    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    this.getRecipes();
  }

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

  goToDetailView = (currentRecipe) => {
    this.props.navigation.navigate('Detalhe de Receita', {
      recipe: currentRecipe,
    });
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
                  <Text style={styles.listItemTitle2}> ({item.volume}L)</Text>
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
                <View style={styles.rowContainer} marginTop={2}>
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

  render() {
    let recipes = this.state.recipes;
    let updatedRecipes = this.props.route.params?.recipes;

    if (updatedRecipes != null && updatedRecipes.length > 0) {
      recipes = updatedRecipes;
    }

    if (recipes != null && recipes.length > 0) {
      return (
        <SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <View style={styles.listContainer}>
            <FlatList
              data={recipes}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <Image source={Chefhat} style={styles.image} />
          <View style={styles.container}>
            <Text style={styles.bodyText}>Você ainda não possui receitas</Text>
          </View>
          <TouchableHighlight>
            <View style={styles.buttonContainer}>
              <Button
                title="Criar uma receita"
                color="#000000"
                onPress={() => this.props.navigation.navigate('Nova Receita')}
              />
            </View>
          </TouchableHighlight>
        </SafeAreaView>
      );
    }
  }
}

const marginHorizontal = 2;
const marginVertical = 2;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 300,
  },
  listItemContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  listContainer: {
    marginTop: 5,
    marginRight: 5,
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
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
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
  },
  boxContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: 5,
    marginRight: marginHorizontal,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: 5,
    marginRight: marginHorizontal,
    width: 330,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default RecipesScreen;
