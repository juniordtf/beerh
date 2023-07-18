import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Switch,
  TextInput,
  FlatList,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import SafeAreaView from 'react-native-safe-area-view';
import {format} from 'date-fns';
import Plus from '../../../assets/plus.png';
import Minus from '../../../assets/minus.png';
import Pen from '../../../assets/pen.png';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../../statics/Statics';
import {Units} from '../../statics/Statics';
import {CarbonationMethods} from '../../statics/Statics';
import {recipeService} from '../../services/recipeService';
import {groupService} from '../../services/groupService';

import {styles} from './NewRecipeStyles';

function NewRecipeScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const [sharedRecipe, setSharedRecipe] = useState(false);
  const [title, setTitle] = useState('');
  const [style, setStyle] = useState('');
  const [volume, setVolume] = useState('');
  const [og, setOg] = useState('');
  const [fg, setFg] = useState('');
  const [ibu, setIbu] = useState('');
  const [abv, setAbv] = useState('');
  const [color, setColor] = useState('');
  const [ingridientId, setIngridientId] = useState(0);
  const [ingridientQuantity, setIngridientQuantity] = useState('');
  const [ingridientUnit, setIngridientUnit] = useState('g');
  const [ingridientName, setIngridientName] = useState('');
  const [carbonationValue, setCarbonationValue] = useState('');
  const [annotation, setAnnotation] = useState('');
  const [groups, setGroups] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedCarbonationUnit, setSelectedCarbonationUnit] = useState('');
  const [selectedCarbonationMethod, setSelectedCarbonationMethod] = useState(
    '',
  );
  const [ingridients, setIngridients] = useState([]);
  const [ramps, setRamps] = useState([]);
  const [boil, setBoil] = useState([]);
  const [fermentation, setFermentation] = useState([]);
  const [ageing, setAgeing] = useState([]);
  const [ingridientsModalVisible, setIngridientsModalVisible] = useState(false);
  const [rampsModalVisible, setRampsModalVisible] = useState(false);
  const [boilModalVisible, setBoilModalVisible] = useState(false);
  const [fermentationModalVisible, setFermentationModalVisible] = useState(
    false,
  );
  const [ageingModalVisible, setAgeingModalVisible] = useState(false);

  const handleAddIngridient = () => {
    isLoading(true);
    if (typeof ingridientId !== undefined && ingridientId !== 0) {
      editIngridient();
      return;
    }

    var nextId = 0;

    if (typeof ingridients !== undefined && ingridients.length > 0) {
      nextId = Math.max(...ingridients.map((x) => x.id)) + 1;
    } else {
      nextId = 1;
    }

    const ingridientToBeAdded = {
      id: nextId,
      name: ingridientName,
      quantity: ingridientQuantity,
      unit: ingridientUnit === '' ? 'g' : ingridientUnit,
    };

    var ingridientsList = [];

    if (typeof ingridients !== undefined && ingridients.length > 0) {
      ingridientsList = ingridients;
      ingridientsList.push(ingridientToBeAdded);
    } else {
      ingridientsList = [ingridientToBeAdded];
    }

    setIngridients(ingridientsList);
    setIngridientQuantity('');
    setIngridientUnit('');
    setIngridientName('');
    setIngridientsModalVisible(false);
    isLoading(false);
  };

  const handleEditIngridient = (item) => {
    setIngridientId(item.id);
    setIngridientQuantity(item.quantity);
    setIngridientUnit(item.unit);
    setIngridientName(item.name);
    setIngridientsModalVisible(true);
  };

  const editIngridient = () => {
    var selectedIngridient = ingridients.find((x) => x.id === ingridientId);
    selectedIngridient.name = ingridientName;
    selectedIngridient.quantity = ingridientQuantity;
    selectedIngridient.unit = ingridientUnit;
    const idx = ingridients.indexOf(selectedIngridient);
    var ingridientsClone = ingridients;
    ingridientsClone[idx] = selectedIngridient;
    setIngridients(ingridientsClone);
    setIngridientId(0);
    setIngridientQuantity('');
    setIngridientUnit('');
    setIngridientName('');
    setIngridientsModalVisible(false);
    isLoading(false);
  };

  const removeIngridient = (item) => {
    isLoading(true);
    const itemToBeRemoved = ingridients.find((x) => x.id === item.id);
    const index = ingridients.indexOf(itemToBeRemoved);
    var ingridientsClone = [...ingridients];

    if (index > -1) {
      ingridientsClone.splice(index, 1);
    }

    setIngridients(ingridientsClone);
    isLoading(false);
  };

  const renderIngridient = (item) => {
    return (
      <View key={item.id} style={styles.sectionItem}>
        <View style={styles.rowContainer}>
          <View style={styles.itemValuesArea}>
            <Text style={styles.bodySectionValue}>{item.quantity}</Text>
            <Text style={styles.bodySectionValue}>{item.unit}</Text>
          </View>
          <Text style={styles.bodySectionText}>{item.name}</Text>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEditIngridient(item)}>
              <Image source={Pen} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeIngridient(item)}>
              <Image source={Minus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      {loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator color={'#000'} animating={true} size={50} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.titleContainer}>
            <TextInput
              onChangeText={(t) => setTitle(t)}
              value={title}
              style={styles.titleInputMask}
              placeholder="Nome da receita"
              underlineColorAndroid="transparent"
            />
            <View style={styles.parametersRow} marginTop={-5}>
              <TextInput
                onChangeText={(s) => setStyle(s)}
                value={style}
                style={styles.styleInputMask}
                placeholder="Estilo"
                underlineColorAndroid="transparent"
              />
              <TextInput
                onChangeText={(v) => setVolume(v)}
                value={volume}
                style={styles.styleInputMask}
                keyboardType="numeric"
                placeholder="Volume (L)"
                underlineColorAndroid="transparent"
                width={90}
                marginLeft={5}
              />
            </View>
          </View>
          <View marginTop={10}>
            <Text style={styles.sectionHeaderText}>Parâmetros</Text>
            <View marginTop={10}>
              <View style={styles.parametersRow}>
                <TextInput
                  onChangeText={(o) => setOg(o)}
                  value={og}
                  style={styles.bodyInputMask}
                  placeholder="OG"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={80}
                  marginLeft={10}
                />
                <TextInput
                  onChangeText={(f) => setFg(f)}
                  value={fg}
                  style={styles.bodyInputMask}
                  placeholder="FG"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={80}
                  marginLeft={10}
                />
                <TextInput
                  onChangeText={(i) => setIbu(i)}
                  value={ibu}
                  style={styles.bodyInputMask}
                  placeholder="IBU"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={80}
                  marginLeft={10}
                />
              </View>
              <View style={styles.parametersRow} marginTop={-5}>
                <TextInput
                  onChangeText={(a) => setAbv(a)}
                  value={abv}
                  style={styles.bodyInputMask}
                  placeholder="ABV (%)"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={80}
                  marginLeft={10}
                />
                <TextInput
                  onChangeText={(c) => setColor(c)}
                  value={color}
                  style={styles.bodyInputMask}
                  placeholder="Color"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={80}
                  marginLeft={10}
                />
              </View>
            </View>
          </View>
          <View marginTop={10}>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeaderText}>Ingredientes</Text>
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIngridientsModalVisible(true)}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            {ingridients.map((item) => renderIngridient(item))}
          </View>
        </ScrollView>
      )}

      <Modal
        name="AddIngridientModal"
        animationType="slide"
        transparent={true}
        visible={ingridientsModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Adicionar ingrediente</Text>
            <View style={styles.parametersRow}>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(q) => setIngridientQuantity(q)}
                value={ingridientQuantity}
                placeholder="Qte"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={70}
              />
              <View style={styles.onePickerContainer}>
                <Picker
                  style={styles.onePicker}
                  itemStyle={styles.onePickerItem}
                  selectedValue={ingridientUnit}
                  onValueChange={(itemValue, itemIndex) =>
                    setIngridientUnit(itemValue)
                  }>
                  {Units.map((item, value) => {
                    return (
                      <Picker.Item
                        label={item.unit}
                        value={item.unit}
                        key={item.unit}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <TextInput
              style={styles.bodyInputMask}
              onChangeText={(n) => setIngridientName(n)}
              value={ingridientName}
              placeholder="Nome"
              underlineColorAndroid="transparent"
            />
            <View style={styles.rowContainer}>
              <TouchableHighlight
                style={styles.cancelButton}
                onPress={() => setIngridientsModalVisible(false)}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.confirmButton}
                onPress={() => handleAddIngridient()}>
                <Text style={styles.textStyle}>Confirmar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default NewRecipeScreen;
