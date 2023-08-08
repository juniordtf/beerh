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
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import SafeAreaView from 'react-native-safe-area-view';
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
  const [selectedModalId, setSelectedModalId] = useState('');
  const [genericModalTitle, setGenericModalTitle] = useState('');
  const [genericTimeUnit, setGenericTimeUnit] = useState('');
  const [genericTemperatureField, setGenericTemperatureField] = useState('');
  const [genericDurationField, setGenericDurationField] = useState('');
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
  const [rampId, setRampId] = useState(0);
  const [fermentationStepId, setFermentationStepId] = useState(0);
  const [ageingStepId, setAgeingStepId] = useState(0);
  const [boilId, setBoilId] = useState(0);
  const [boilItemQuantity, setBoilItemQuantity] = useState('');
  const [boilItemUnit, setBoilItemUnit] = useState('g');
  const [boilItemName, setBoilItemName] = useState('');
  const [boilItemTime, setBoilItemTime] = useState('');
  const [carbonationValue, setCarbonationValue] = useState('');
  const [carbonationUnit, setCarbonationUnit] = useState(
    CarbonationMethods[0].unit,
  );
  const [carbonationMethod, setCarbonationMethod] = useState(
    CarbonationMethods[0].method,
  );
  const [annotation, setAnnotation] = useState('');
  const [groups, setGroups] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');

  const [ingridients, setIngridients] = useState([]);
  const [ramps, setRamps] = useState([]);
  const [boilSteps, setBoilSteps] = useState([]);
  const [fermentationSteps, setFermentationSteps] = useState([]);
  const [ageingSteps, setAgeingSteps] = useState([]);
  const [ingridientsModalVisible, setIngridientsModalVisible] = useState(false);
  const [genericModalVisible, setGenericModalVisible] = useState(false);
  const [boilModalVisible, setBoilModalVisible] = useState(false);

  /**
   * Gets user and group data
   */
  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);
      if (value !== null) {
        const data = JSON.parse(value);
        setUserData(data);
        getGroups(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGroups = async (data) => {
    const _groupsData = await groupService.getAllowedGroups(data);
    setGroups(_groupsData.data);
  };

  useEffect((): void => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Ingridient' Methods
   */
  const handleCancelAddIngridient = () => {
    setIngridientQuantity('');
    setIngridientUnit('');
    setIngridientName('');
    setIngridientsModalVisible(false);
  };

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

  /**
   * Generic Methods
   */
  const handleCancelGenericModal = () => {
    setGenericTemperatureField('');
    setGenericDurationField('');
    setGenericModalVisible(false);
  };

  const handleAddInGenericModal = () => {
    if (selectedModalId === 1) {
      handleAddRamp();
    } else if (selectedModalId === 2) {
      handleAddFermentationStep();
    } else {
      handleAddAgeingStep();
    }
  };

  /**
   * Ramp Methods
   */
  const handleAddRamp = () => {
    isLoading(true);
    if (typeof rampId !== undefined && rampId !== 0) {
      editRamp();
      return;
    }

    var nextId = 0;

    if (typeof ramps !== undefined && ramps.length > 0) {
      nextId = Math.max(...ramps.map((x) => x.id)) + 1;
    } else {
      nextId = 1;
    }

    const rampToBeAdded = {
      id: nextId,
      temperature: genericTemperatureField,
      time: genericDurationField,
    };

    var rampsList = [];

    if (typeof ramps !== undefined && ramps.length > 0) {
      rampsList = ramps;
      rampsList.push(rampToBeAdded);
    } else {
      rampsList = [rampToBeAdded];
    }

    setRamps(rampsList);
    setGenericTemperatureField('');
    setGenericDurationField('');
    setGenericModalVisible(false);
    isLoading(false);
  };

  const handleEditRamp = (item) => {
    setRampId(item.id);
    setGenericTemperatureField(item.temperature);
    setGenericDurationField(item.time);
    setGenericModalVisible(true);
  };

  const editRamp = () => {
    var selectedRamp = ramps.find((x) => x.id === rampId);
    selectedRamp.temperature = genericTemperatureField;
    selectedRamp.time = genericDurationField;
    const idx = ramps.indexOf(selectedRamp);
    var rampsClone = ramps;
    rampsClone[idx] = selectedRamp;

    setRampId(0);
    setGenericTemperatureField('');
    setGenericDurationField('');
    setGenericModalVisible(false);
    isLoading(false);
  };

  const removeRamp = (item) => {
    isLoading(true);
    const itemToBeRemoved = ramps.find((x) => x.id === item.id);
    const index = ramps.indexOf(itemToBeRemoved);
    var rampsClone = [...ramps];

    if (index > -1) {
      rampsClone.splice(index, 1);
    }

    setRamps(rampsClone);
    isLoading(false);
  };

  /**
   * Fermentation Methods
   */
  const handleAddFermentationStep = () => {
    isLoading(true);
    if (typeof fermentationStepId !== undefined && fermentationStepId !== 0) {
      editFermentationStep();
      return;
    }

    var nextId = 0;

    if (
      typeof fermentationSteps !== undefined &&
      fermentationSteps.length > 0
    ) {
      nextId = Math.max(...fermentationSteps.map((x) => x.id)) + 1;
    } else {
      nextId = 1;
    }

    const fermentationStepToBeAdded = {
      id: nextId,
      temperature: genericTemperatureField,
      time: genericDurationField,
    };

    var fermentationStepsList = [];

    if (
      typeof fermentationSteps !== undefined &&
      fermentationSteps.length > 0
    ) {
      fermentationStepsList = fermentationSteps;
      fermentationStepsList.push(fermentationStepToBeAdded);
    } else {
      fermentationStepsList = [fermentationStepToBeAdded];
    }

    setFermentationSteps(fermentationStepsList);
    setGenericTemperatureField('');
    setGenericDurationField('');
    setGenericModalVisible(false);
    isLoading(false);
  };

  const handleEditFermentationStep = (item) => {
    setFermentationStepId(item.id);
    setGenericTemperatureField(item.temperature);
    setGenericDurationField(item.time);
    setGenericModalVisible(true);
  };

  const editFermentationStep = () => {
    var selectedFermentationStep = fermentationSteps.find(
      (x) => x.id === fermentationStepId,
    );
    selectedFermentationStep.temperature = genericTemperatureField;
    selectedFermentationStep.time = genericDurationField;
    const idx = fermentationSteps.indexOf(selectedFermentationStep);
    var fermentationStepsClone = fermentationSteps;
    fermentationStepsClone[idx] = selectedFermentationStep;

    setFermentationSteps(fermentationStepsClone);
    setFermentationStepId(0);
    setGenericTemperatureField('');
    setGenericDurationField('');
    setGenericModalVisible(false);
    isLoading(false);
  };

  const removeFermentationStep = (item) => {
    isLoading(true);
    const itemToBeRemoved = fermentationSteps.find((x) => x.id === item.id);
    const index = fermentationSteps.indexOf(itemToBeRemoved);
    var fermentationStepsClone = [...fermentationSteps];

    if (index > -1) {
      fermentationStepsClone.splice(index, 1);
    }

    setFermentationSteps(fermentationStepsClone);
    isLoading(false);
  };

  /**
   * Ageing Methods
   */
  const handleAddAgeingStep = () => {
    isLoading(true);
    if (typeof ageingStepId !== undefined && ageingStepId !== 0) {
      editAgeingStep();
      return;
    }

    var nextId = 0;

    if (typeof ageingSteps !== undefined && ageingSteps.length > 0) {
      nextId = Math.max(...ageingSteps.map((x) => x.id)) + 1;
    } else {
      nextId = 1;
    }

    const ageingStepToBeAdded = {
      id: nextId,
      temperature: genericTemperatureField,
      time: genericDurationField,
    };

    var ageingStepsList = [];

    if (typeof ageingSteps !== undefined && ageingSteps.length > 0) {
      ageingStepsList = ageingSteps;
      ageingStepsList.push(ageingStepToBeAdded);
    } else {
      ageingStepsList = [ageingStepToBeAdded];
    }

    setAgeingSteps(ageingStepsList);
    setGenericTemperatureField('');
    setGenericDurationField('');
    setGenericModalVisible(false);
    isLoading(false);
  };

  const handleEditAgeingStep = (item) => {
    setAgeingStepId(item.id);
    setGenericTemperatureField(item.temperature);
    setGenericDurationField(item.time);
    setGenericModalVisible(true);
  };

  const editAgeingStep = () => {
    var selectedAgeingStep = ageingSteps.find((x) => x.id === ageingStepId);
    selectedAgeingStep.temperature = genericTemperatureField;
    selectedAgeingStep.time = genericDurationField;
    const idx = ageingSteps.indexOf(selectedAgeingStep);
    var ageingStepsClone = ageingSteps;
    ageingStepsClone[idx] = selectedAgeingStep;
    setAgeingSteps(ageingStepsClone);
    setAgeingStepId(0);
    setGenericTemperatureField('');
    setGenericDurationField('');
    setGenericModalVisible(false);
    isLoading(false);
  };

  const removeAgeingStep = (item) => {
    isLoading(true);
    const itemToBeRemoved = ageingSteps.find((x) => x.id === item.id);
    const index = ageingSteps.indexOf(itemToBeRemoved);
    var ageingStepsClone = [...ageingSteps];

    if (index > -1) {
      ageingStepsClone.splice(index, 1);
    }

    setAgeingSteps(ageingStepsClone);
    isLoading(false);
  };

  /**
   * Boild Methods
   */
  const handleCancelAddBoilItem = () => {
    setBoilItemQuantity('');
    setBoilItemUnit('g');
    setBoilItemName('');
    setBoilItemTime('');
    setBoilModalVisible(false);
  };

  const handleAddBoilItem = () => {
    isLoading(true);
    if (typeof boilId !== undefined && boilId !== 0) {
      editBoilStep();
      return;
    }

    var nextId = 0;

    if (typeof boilSteps !== undefined && boilSteps.length > 0) {
      nextId = Math.max(...boilSteps.map((x) => x.id)) + 1;
    } else {
      nextId = 1;
    }

    const boilStepToBeAdded = {
      id: nextId,
      name: boilItemName,
      quantity: boilItemQuantity,
      time: boilItemTime,
      unit: boilItemUnit === '' ? 'g' : boilItemUnit,
    };

    var boilList = [];

    if (typeof boilSteps !== undefined && boilSteps.length > 0) {
      boilList = boilSteps;
      boilList.push(boilStepToBeAdded);
    } else {
      boilList = [boilStepToBeAdded];
    }

    setBoilSteps(boilList);
    setBoilItemQuantity('');
    setBoilItemUnit('g');
    setBoilItemName('');
    setBoilItemTime('');
    setBoilModalVisible(false);
    isLoading(false);
  };

  const handleEditBoilStep = (item) => {
    setBoilId(item.id);
    setBoilItemQuantity(item.quantity);
    setBoilItemUnit(item.unit);
    setBoilItemName(item.name);
    setBoilItemTime(item.time);
    setBoilModalVisible(true);
  };

  const editBoilStep = () => {
    var selectedBoilStep = boilSteps.find((x) => x.id === boilId);
    selectedBoilStep.name = boilItemName;
    selectedBoilStep.quantity = boilItemQuantity;
    selectedBoilStep.unit = boilItemUnit;
    const idx = boilSteps.indexOf(selectedBoilStep);
    var boilStepsClone = boilSteps;
    boilStepsClone[idx] = selectedBoilStep;
    setBoilSteps(boilStepsClone);
    setBoilId(0);
    setBoilItemQuantity('');
    setBoilItemUnit('');
    setBoilItemName('');
    setBoilItemTime('');
    setBoilModalVisible(false);
    isLoading(false);
  };

  const removeBoilStep = (item) => {
    isLoading(true);
    const itemToBeRemoved = boilSteps.find((x) => x.id === item.id);
    const index = boilSteps.indexOf(itemToBeRemoved);
    var boilsClone = [...boilSteps];

    if (index > -1) {
      boilsClone.splice(index, 1);
    }

    setBoilSteps(boilsClone);
    isLoading(false);
  };

  const handleGenericModal = (modalId) => {
    setSelectedModalId(modalId);

    if (modalId === 1) {
      setGenericModalTitle('Adicionar rampa');
      setGenericTimeUnit('Tempo (min)');
    } else if (modalId === 2) {
      setGenericModalTitle('Adicionar etapa de fermentação');
      setGenericTimeUnit('Tempo (dias)');
    } else {
      setGenericModalTitle('Adicionar etapa de maturação');
      setGenericTimeUnit('Tempo (dias)');
    }

    setGenericModalVisible(true);
  };

  /**
   * Toogle Recipe
   */
  const toggleSharingSwitch = () => {
    setSharedRecipe(!sharedRecipe);
    setSelectedGroup(groups[0]);
    setSelectedGroupId(groups[0].id);
  };

  /**
   * Handle Selected Group Change
   */
  const handleSelectedGroupChange = (value) => {
    const group = groups.find((x) => x.id === value);
    setSelectedGroup(group);
    setSelectedGroupId(value);
  };

  /**
   * Handle Selected Carbonation Type Change
   */
  const handleSelectedCarbonationTypeChange = (value) => {
    const selectedMethod = CarbonationMethods.find((x) => x.method === value);
    setCarbonationMethod(selectedMethod.method);
    setCarbonationUnit(selectedMethod.unit);
  };

  /**
   * Create Recipe Method
   */
  const addRecipe = async () => {
    let elapsedTime = 0;

    ramps.forEach((x) => {
      elapsedTime += parseFloat(x.time);
    });

    if (boilSteps.length > 0) {
      elapsedTime += parseFloat(boilSteps[0].time);
    }

    const newRecipe = {
      title: title,
      volume: volume,
      style: style,
      og: og,
      fg: fg,
      ibu: ibu,
      abv: abv,
      color: color,
      ingredients: ingridients,
      ramps: ramps,
      boil: boilSteps,
      fermentation: fermentationSteps,
      ageing: ageingSteps,
      carbonationMethod: carbonationMethod,
      carbonationValue: carbonationValue,
      carbonationUnit: carbonationUnit,
      estimatedTime: elapsedTime,
      annotation: annotation,
      ownerName: sharedRecipe ? selectedGroup.name : userData.name,
      ownerId: sharedRecipe ? selectedGroup.id : userData.id,
    };

    recipeService.createRecipe(newRecipe, userData);

    if (window.productionsScreen !== undefined) {
      window.productionsScreen.getUserData();
    }

    if (window.brewScreen !== undefined) {
      window.brewScreen.getUserData();
    }

    navigation.navigate('Receitas');
  };

  /**
   *  Render methods
   */
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

  const renderRamp = (item) => {
    return (
      <View key={item.id} style={styles.sectionItem}>
        <View style={styles.rowContainer}>
          <Text style={styles.bodySectionText2}>{item.temperature} °C</Text>
          <Text style={styles.bodySectionText2}>por</Text>
          <Text style={styles.bodySectionText2}>{item.time} min</Text>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEditRamp(item)}>
              <Image source={Pen} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeRamp(item)}>
              <Image source={Minus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderBoilStep = (item) => {
    return (
      <View key={item.id} style={styles.sectionItem}>
        <View style={styles.rowContainer}>
          <View style={styles.boilItemValuesArea}>
            <Text style={styles.bodySectionValue}>
              {item.quantity} {item.unit}
            </Text>
          </View>
          <Text style={styles.genericBodySectionText}>
            {item.name} por {item.time} min
          </Text>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEditBoilStep(item)}>
              <Image source={Pen} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeBoilStep(item)}>
              <Image source={Minus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderFermentationStep = (item) => {
    return (
      <View key={item.id} style={styles.sectionItem}>
        <View style={styles.rowContainer}>
          <View style={styles.genericItemValuesArea}>
            <Text style={styles.bodySectionValue}>{item.temperature} ºC</Text>
          </View>
          <Text style={styles.genericBodySectionText}>
            por {item.time} dias
          </Text>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEditFermentationStep(item)}>
              <Image source={Pen} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeFermentationStep(item)}>
              <Image source={Minus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderAgeingStep = (item) => {
    return (
      <View key={item.id} style={styles.sectionItem}>
        <View style={styles.rowContainer}>
          <View style={styles.genericItemValuesArea}>
            <Text style={styles.bodySectionValue}>{item.temperature} ºC</Text>
          </View>
          <Text style={styles.genericBodySectionText}>
            por {item.time} dias
          </Text>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEditAgeingStep(item)}>
              <Image source={Pen} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeAgeingStep(item)}>
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
          <View marginTop={10}>
            <View backgroundColor={'#000000'} height={1} marginBottom={15} />
            <Text style={styles.sectionHeaderText}>Etapas</Text>
          </View>
          <Text style={styles.sectionText}>{'\u2B24' + ' Brassagem'}</Text>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>Rampas</Text>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleGenericModal(1)}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionContainer2}>
            {ramps.map((item) => renderRamp(item))}
          </View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>Fervura</Text>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setBoilModalVisible(true)}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionContainer3}>
            {boilSteps.map((item) => renderBoilStep(item))}
          </View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>Fermentação</Text>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleGenericModal(2)}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionContainer2}>
            {fermentationSteps.map((item) => renderFermentationStep(item))}
          </View>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>Maturação</Text>
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleGenericModal(3)}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionContainer2}>
            {ageingSteps.map((item) => renderAgeingStep(item))}
          </View>
          <View marginTop={15}>
            <Text style={styles.sectionText}>{'\u2B24' + ' Carbonatação'}</Text>
            <View style={styles.parametersRow}>
              <View style={styles.onePickerContainerLarge}>
                <Picker
                  style={styles.onePickerLarge}
                  itemStyle={styles.onePickerItem}
                  selectedValue={carbonationMethod}
                  onValueChange={(itemValue) =>
                    handleSelectedCarbonationTypeChange(itemValue)
                  }>
                  {CarbonationMethods.map((item, value) => {
                    return (
                      <Picker.Item
                        label={item.method}
                        value={item.method}
                        key={item.method}
                        itemIndex={item.unit}
                      />
                    );
                  })}
                </Picker>
              </View>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(value) => setCarbonationValue(value)}
                value={carbonationValue}
                placeholder="Valor"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={70}
                marginLeft={5}
              />
              <View style={styles.centeredBodyTextContainer}>
                <Text style={styles.smallBodyText}>{carbonationUnit}</Text>
              </View>
            </View>
          </View>
          <View marginTop={10}>
            <View backgroundColor={'#000000'} height={1} marginBottom={5} />
          </View>
          <View marginTop={5}>
            <Text style={styles.sectionText}>{'\u2B24' + ' Observações'}</Text>
            <TextInput
              onChangeText={(text) => setAnnotation(text)}
              value={annotation}
              style={styles.styleInputMask}
              width={320}
              height={90}
              marginTop={10}
              multiline={true}
              fontSize={12}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.parametersRow}>
            <Text style={styles.sectionText}>Compartilhar receita?</Text>
            <Switch
              trackColor={{false: '#767577', true: '#A0C2A8'}}
              thumbColor={sharedRecipe ? '#75C186' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => toggleSharingSwitch()}
              value={sharedRecipe}
            />
          </View>
          {sharedRecipe ? (
            <View style={styles.parametersRow}>
              <View style={styles.centeredBodyTextContainer}>
                <Text style={styles.smallBodyText}>Grupo: </Text>
              </View>
              <View style={styles.onePickerContainerLarge}>
                <Picker
                  style={styles.onePickerLarge}
                  itemStyle={styles.onePickerItem}
                  selectedValue={selectedGroupId}
                  onValueChange={(itemValue, itemIndex) =>
                    handleSelectedGroupChange(itemValue)
                  }>
                  {groups.map((item, value) => {
                    return (
                      <Picker.Item
                        label={item.name}
                        value={item.id}
                        key={item.id}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
          ) : (
            <View />
          )}
          <View marginTop={5}>
            <View backgroundColor={'#000000'} height={1} marginBottom={5} />
          </View>
          <View marginTop={10} marginBottom={10}>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => addRecipe()}>
              <Text style={styles.bodyText}>Salvar</Text>
            </TouchableHighlight>
          </View>
          <View marginBottom={10} />
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
                onPress={() => handleCancelAddIngridient()}>
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
      <Modal
        name="GenericModal"
        animationType="slide"
        transparent={true}
        visible={genericModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{genericModalTitle}</Text>
            <View style={styles.parametersRow}>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(temp) => setGenericTemperatureField(temp)}
                value={genericTemperatureField}
                placeholder="Temp. (ºC)"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
              />
              <View style={styles.addButtonContainer}>
                <Text style={styles.smallBodyText}> por </Text>
              </View>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(time) => setGenericDurationField(time)}
                value={genericDurationField}
                placeholder={genericTimeUnit}
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={120}
                marginLeft={10}
              />
            </View>
            <View style={styles.rowContainer}>
              <TouchableHighlight
                style={styles.cancelButton}
                onPress={() => handleCancelGenericModal()}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.confirmButton}
                onPress={() => handleAddInGenericModal()}>
                <Text style={styles.textStyle}>Confirmar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        name="AddBoilItemModal"
        animationType="slide"
        transparent={true}
        visible={boilModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Item para fervura</Text>
            <View style={styles.parametersRow}>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(boilQte) => setBoilItemQuantity(boilQte)}
                value={boilItemQuantity}
                placeholder="Qte"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={50}
              />
              <View style={styles.onePickerContainer}>
                <Picker
                  style={styles.onePicker}
                  itemStyle={styles.onePickerItem}
                  selectedValue={boilItemUnit}
                  onValueChange={(itemValue, itemIndex) =>
                    setBoilItemUnit(itemValue)
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
            <View style={styles.parametersRow}>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(name) => setBoilItemName(name)}
                value={boilItemName}
                placeholder="Nome"
                underlineColorAndroid="transparent"
              />
              <Text style={styles.smallBodyText}> por </Text>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(time) => setBoilItemTime(time)}
                value={boilItemTime}
                placeholder="Tempo (min)"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={styles.rowContainer}>
              <TouchableHighlight
                style={styles.cancelButton}
                onPress={() => handleCancelAddBoilItem()}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.confirmButton}
                onPress={() => handleAddBoilItem()}>
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
