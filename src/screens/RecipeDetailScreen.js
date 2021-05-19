import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  Modal,
  Alert,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import AsyncStorage from '@react-native-community/async-storage';
import Bullet from '../../assets/bullet.png';
import Export from '../../assets/export.png';
import Garbage from '../../assets/garbage.png';
import Pen from '../../assets/pen.png';
import Date from '../../assets/date.png';
import {RECIPES_KEY, PRODUCTIONS_KEY} from '../statics/Statics';
import ActionButton from 'react-native-action-button';

var RNFS = require('react-native-fs');

class RecipeDetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      style: '',
      volume: '',
      og: '',
      fg: '',
      ibu: '',
      abv: '',
      color: '',
      ingredients: [],
      ramps: [],
      boil: [],
      fermentation: [],
      ageing: [],
      carbonationMethod: '',
      carbonationValue: '',
      carbonationUnit: '',
      annotation: '',
      lastUpdateDate: '',
      modalVisible: false,
      exportModalVisible: false,
      recipes: [],
      currentRecipe: '',
      productions: [],
    };
  }

  componentDidMount() {
    this.getCurrentRecipe();
    this.getRecipes();
    this.getProductions();
  }

  getCurrentRecipe = () => {
    let recipe = this.props.route.params?.recipe;
    this.setState({
      currentRecipe: recipe,
      title: recipe.title,
      style: recipe.style,
      volume: recipe.volume,
      og: recipe.og,
      fg: recipe.fg,
      ibu: recipe.ibu,
      abv: recipe.abv,
      color: recipe.color,
      ingredients: recipe.ingredients,
      ramps: recipe.ramps,
      boil: recipe.boil,
      fermentation: recipe.fermentation,
      ageing: recipe.ageing,
      carbonationMethod: recipe.carbonationMethod,
      carbonationValue: recipe.carbonationValue,
      carbonationUnit: recipe.carbonationUnit,
      annotation: recipe.annotation,
      lastUpdateDate: recipe.lastUpdateDate,
    });
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

  openModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  openExportModal = () => {
    this.setState({
      exportModalVisible: true,
    });
  };

  closeExportModal = () => {
    this.setState({
      exportModalVisible: false,
    });
  };

  deleteRecipe = async (currentRecipe) => {
    var production = this.state.productions.find(
      (x) => x.name === currentRecipe.title,
    );
    if (production != null) {
      Alert.alert(
        'Atenção',
        'Esta receita não pode ser removida, pois ela está sendo utilizada em uma produção!',
        [{text: 'OK', onPress: () => this.closeModal()}],
      );
    } else {
      let allRecipes = this.state.recipes;
      const recipe = allRecipes.find((x) => x.id === currentRecipe.id);
      const index = allRecipes.indexOf(recipe);

      if (index > -1) {
        allRecipes.splice(index, 1);
      }

      await AsyncStorage.setItem(
        RECIPES_KEY,
        JSON.stringify(allRecipes),
        (err) => {
          if (err) {
            console.log('an error occured');
            throw err;
          }
          console.log('Success. Recipe removed');
        },
      )
        .then(this.afterDeletion(allRecipes))
        .catch((err) => {
          console.log('error is: ' + err);
        });
    }
  };

  afterDeletion = (allRecipes) => {
    this.closeModal();

    this.props.navigation.navigate('Receitas', {productions: allRecipes});
    Alert.alert('Receita removida com sucesso!');

    if (window.recipesScreen !== undefined) {
      window.recipesScreen.getRecipes();
    }

    if (window.productionsScreen !== undefined) {
      window.productionsScreen
        .getRecipes()
        .then(window.productionsScreen.getProductions());
    }
  };

  saveRecipeInFile = async (currentRecipe) => {
    this.closeExportModal();

    var path =
      RNFS.DownloadDirectoryPath +
      '/' +
      'Receita_' +
      currentRecipe.title +
      '_' +
      currentRecipe.volume +
      'L' +
      '.txt';

    RNFS.writeFile(path, JSON.stringify(currentRecipe), 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
        console.log(
          RNFS.DownloadDirectoryPath +
            '/' +
            'Receita_' +
            currentRecipe.title +
            '_' +
            currentRecipe.volume +
            'L' +
            '.txt',
        );
        Alert.alert(
          'Sucesso',
          'Arquivo com nome "' +
            'Receita_' +
            currentRecipe.title +
            '_' +
            currentRecipe.volume +
            'L' +
            '" salvo na pasta Downloads!',
        );
      })
      .catch((err) => {
        console.log(err.message);
        Alert.alert(
          'Atençāo',
          'Erro ao gravar o arquivo. Verifique se já não existe um arquivo com nome ' +
            'Receita_' +
            currentRecipe.title +
            '_' +
            currentRecipe.volume +
            'L' +
            ' na pasta Downloads!',
        );
      });
  };

  goToEditView = (currentRecipe) => {
    this.props.navigation.navigate('Editar Receita', {
      recipe: currentRecipe,
    });
  };

  renderIngredients() {
    return this.state.ingredients.map((item) => {
      return (
        <View key={item.id}>
          <View style={styles.rowContainer}>
            <View style={styles.boxContainerLeft}>
              <Image source={Bullet} />
            </View>
            <View style={styles.boxContainerRight}>
              <View style={styles.rowContainer}>
                <Text>{item.quantity} </Text>
                <Text>{item.unit} de </Text>
                <Text>{item.name};</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }

  renderRamps() {
    return this.state.ramps.map((item) => {
      return (
        <View key={item.id}>
          <View style={styles.rowContainer}>
            <View style={styles.boxContainerLeft}>
              <Image source={Bullet} />
            </View>
            <View style={styles.boxContainerRight}>
              <View style={styles.rowContainer}>
                <Text>{item.temperature} °C </Text>
                <Text>por </Text>
                <Text>{item.time} minutos;</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }

  renderBoil() {
    return this.state.boil.map((item) => {
      return (
        <View key={item.id}>
          <View style={styles.rowContainer}>
            <View style={styles.boxContainerLeft}>
              <Image source={Bullet} />
            </View>
            <View style={styles.boxContainerRight}>
              <View style={styles.rowContainer}>
                <Text>{item.quantity} </Text>
                <Text>{item.unit} de </Text>
                <Text>{item.name} </Text>
                <Text>por </Text>
                <Text>{item.time} minutos;</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }

  renderFermentation() {
    return this.state.fermentation.map((item) => {
      return (
        <View key={item.id}>
          <View style={styles.rowContainer}>
            <View style={styles.boxContainerLeft}>
              <Image source={Bullet} />
            </View>
            <View style={styles.boxContainerRight}>
              <View style={styles.rowContainer}>
                <Text>{item.temperature} °C </Text>
                <Text>por </Text>
                <Text>{item.time} dias;</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }

  renderAgeing() {
    return this.state.ageing.map((item) => {
      return (
        <View key={item.id}>
          <View style={styles.rowContainer}>
            <View style={styles.boxContainerLeft}>
              <Image source={Bullet} />
            </View>
            <View style={styles.boxContainerRight}>
              <View style={styles.rowContainer}>
                <Text>{item.temperature} °C </Text>
                <Text>por </Text>
                <Text>{item.time} dias;</Text>
              </View>
            </View>
          </View>
        </View>
      );
    });
  }

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <ScrollView>
          <View marginTop={5}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>
                {this.state.title} ({this.state.volume} L)
              </Text>
            </View>
            <View>
              <View>
                <View style={styles.bodyContainer}>
                  <Text style={styles.bodyText}>Parâmetros</Text>
                </View>
                <View style={styles.listContainer}>
                  <View style={styles.centeredRowContainer}>
                    <Text>OG: </Text>
                    <Text>{this.state.og}</Text>
                    <Text> {'  '}</Text>
                    <Text>FG: </Text>
                    <Text>{this.state.fg}</Text>
                    <Text> {'  '}</Text>
                    <Text>IBU: </Text>
                    <Text>{this.state.ibu}</Text>
                  </View>
                  <View style={styles.centeredRowContainer}>
                    <Text>ABV: </Text>
                    <Text>{this.state.abv} %</Text>
                    <Text> {'  '}</Text>
                    <Text>Cor: </Text>
                    <Text>{this.state.color} EBC</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View>
                <Text style={styles.bodyText}>Ingredientes</Text>
                <View style={styles.listContainer}>
                  {this.renderIngredients()}
                </View>
              </View>
            </View>
            <View
              backgroundColor={'#000000'}
              height={1}
              marginBottom={5}
              marginTop={10}
            />
            <View style={styles.bodyContainer}>
              <View>
                <Text style={styles.bodyText}>Brassagem</Text>
                <Text style={styles.bodyText2}>Rampas</Text>
                <View style={styles.listContainer}>{this.renderRamps()}</View>
                <Text style={styles.bodyText2}>Fervura</Text>
                <View style={styles.listContainer}>{this.renderBoil()}</View>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View>
                <Text style={styles.bodyText}>Fermentação</Text>
                <View style={styles.listContainer}>
                  {this.renderFermentation()}
                </View>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View>
                <Text style={styles.bodyText}>Maturação</Text>
                <View style={styles.listContainer}>{this.renderAgeing()}</View>
              </View>
            </View>
            <View style={styles.bodyContainer}>
              <View>
                <Text style={styles.bodyText}>Carbonatação</Text>
                <View style={styles.listContainer} marginBottom={10}>
                  <View style={styles.rowContainer}>
                    <Text>{this.state.carbonationMethod}, </Text>
                    <Text>{this.state.carbonationValue} </Text>
                    <Text>{this.state.carbonationUnit}. </Text>
                  </View>
                </View>
                <Text style={styles.bodyText}>Observações:</Text>
                <View style={styles.listContainer}>
                  <Text>{this.state.annotation}</Text>
                </View>
              </View>
            </View>
          </View>
          <View marginTop={60} marginBottom={15}>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText4}>
                Última atualização: {this.state.lastUpdateDate}
              </Text>
            </View>
          </View>
          <ActionButton buttonColor="#767575">
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="Exportar receita"
              onPress={() => this.openExportModal()}>
              <Image source={Export} style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#D3C72E"
              title="Editar"
              onPress={() => this.goToEditView(this.state.currentRecipe)}>
              <Image source={Pen} style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#FF2424"
              title="Apagar"
              onPress={() => this.openModal()}>
              <Image source={Garbage} style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </ScrollView>

        <Modal
          name="DeleteModal"
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Tem certeza que deseja apagar essa receita?
              </Text>
              <View style={styles.rowContainer}>
                <TouchableHighlight
                  style={styles.cancelButton}
                  onPress={this.closeModal}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.confirmButton}
                  onPress={() => this.deleteRecipe(this.state.currentRecipe)}>
                  <Text style={styles.textStyle}>Confirmar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          name="ExportModal"
          animationType="slide"
          transparent={true}
          visible={this.state.exportModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Deseja salvar esta receita como JSON em um arquivo ".txt"?
              </Text>
              <View style={styles.rowContainer}>
                <TouchableHighlight
                  style={styles.cancelButton}
                  onPress={this.closeExportModal}>
                  <Text style={styles.textStyle}>Cancelar</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.confirmButton}
                  onPress={() =>
                    this.saveRecipeInFile(this.state.currentRecipe)
                  }>
                  <Text style={styles.textStyle}>Sim</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const marginHorizontal = 2;
const marginVertical = 2;

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  recipeContainer: {
    marginLeft: 15,
    backgroundColor: '#D8D8D8',
  },
  signContainer: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onePickerContainer: {
    backgroundColor: '#F6F0F0',
    borderColor: 'black',
    width: 280,
    height: 44,
    borderWidth: 1,
    marginLeft: 15,
    marginBottom: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  onePicker: {
    width: 250,
    height: 44,
  },
  onePickerItem: {
    height: 44,
    color: 'black',
    fontSize: 17,
    textAlign: 'left',
    marginLeft: 15,
  },
  dateStyle: {
    color: 'black',
    fontSize: 17,
    textAlign: 'left',
  },
  twoPickers: {
    width: 200,
    height: 88,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  twoPickerItems: {
    height: 88,
    color: 'red',
  },
  calendarContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
    height: 300,
    width: 300,
  },
  dateContainer: {
    height: 44,
    width: 235,
    marginLeft: 15,
    justifyContent: 'center',
  },
  date: {
    fontSize: 17,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: 100,
    marginRight: 'auto',
    marginLeft: 'auto',
    backgroundColor: '#99C7EB',
  },
  confirmButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    width: 100,
    marginRight: 'auto',
    marginLeft: 15,
    backgroundColor: '#2196F3',
  },
  modalText: {
    marginBottom: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  editButtonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 160,
    height: 40,
    backgroundColor: 'yellow',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  eraseButtonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 160,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  exportButtonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 210,
    height: 40,
    backgroundColor: '#CAC5C5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
  },
  legendContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  bodyContainer: {
    marginTop: 10,
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  bodyText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  bodyText2: {
    fontSize: 15,
    color: 'black',
    marginLeft: 10,
    marginTop: 15,
  },
  bodyText3: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  centeredRowContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
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
    width: 25,
    height: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 5,
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: 10,
    marginRight: marginHorizontal,
    width: 300,
    height: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 5,
  },
  sectionContainerLeft: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainerRight: {
    marginTop: marginVertical,
    marginBottom: marginVertical,
    marginRight: marginHorizontal,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  blueCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greyCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orangeCircle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 1,
    borderColor: '#979797',
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    marginRight: 5,
    marginLeft: 10,
    marginTop: 5,
    flex: 1,
    flexGrow: 0,
  },
  image: {
    marginLeft: 15,
    marginRight: 15,
  },
  bodyText4: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default RecipeDetailScreen;
