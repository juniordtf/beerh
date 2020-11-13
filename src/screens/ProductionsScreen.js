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
import AsyncStorage from '@react-native-community/async-storage';
import SafeAreaView from 'react-native-safe-area-view';
import EmptyBox from '../../assets/EmptyBox.png';
import GoldCircle from '../../assets/goldCircle.png';
import GreenCircle from '../../assets/greenCircle.png';
import GreyCircle from '../../assets/greyCircle.png';
import {PRODUCTIONS_KEY} from '../statics/Statics';

class ProductionScreen extends React.Component {
  constructor(props) {
    super(props);
    window.productionsScreen = this;
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
                  <Text style={styles.listItemTitle}>{item.name}</Text>
                  <Text style={styles.listItemTitle2}>{item.style}</Text>
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
    let productions = this.state.productions;
    let updatedProductions = this.props.route.params?.productions;

    if (updatedProductions != null && updatedProductions.length > 0) {
      productions = updatedProductions;
    }

    if (productions != null && productions.length > 0) {
      return (
        <SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <View style={styles.listContainer}>
            <FlatList
              data={productions}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView>
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <Image source={EmptyBox} style={styles.image} />
          <View style={styles.container}>
            <Text style={styles.bodyText}>
              Nenhuma produção em andamento ou finalizada...
            </Text>
          </View>
          <TouchableHighlight>
            <View style={styles.buttonContainer}>
              <Button
                title="Começar uma produção"
                color="#000000"
                onPress={() => this.props.navigation.navigate('Nova Produção')}
              />
            </View>
          </TouchableHighlight>
        </SafeAreaView>
      );
    }
  }
}

const marginHorizontal = 1;
const marginVertical = 1;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 300,
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
  listItemContainer: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
  },
  listContainer: {
    marginRight: 5,
    marginLeft: 5,
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
    marginLeft: 5,
    marginRight: marginHorizontal,
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxContainerRight: {
    marginTop: marginVertical,
    marginLeft: 30,
    marginRight: marginHorizontal,
    width: 150,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductionScreen;
