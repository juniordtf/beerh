import React from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import SafeAreaView from 'react-native-safe-area-view';
import Plus from '../../assets/plus.png';
import Minus from '../../assets/minus.png';
import AsyncStorage from '@react-native-community/async-storage';
import {RECIPES_KEY} from '../statics/Statics';
import {Units} from '../statics/Statics';
import {CarbonationMethods} from '../statics/Statics';
import {format} from 'date-fns';

class EditRecipeScreen extends React.Component {
  constructor(props) {
    super(props);

    const todayPt = format(new Date(), 'dd/MM/yyyy');

    this.state = {
      todaysDatePt: todayPt,
      id: '',
      title: '',
      style: '',
      volume: '',
      og: '',
      fg: '',
      ibu: '',
      abv: '',
      color: '',
      carbonationValue: '',
      annotation: '',
      recipes: [],
      units: Units,
      carbonationUnit: CarbonationMethods[0].unit,
      carbonationMethod: CarbonationMethods[0].method,
      carbonationMethods: CarbonationMethods,
      inputSecondIngridientClicked: false,
      inputThirdIngridientClicked: false,
      inputFourthIngridientClicked: false,
      inputFifthIngridientClicked: false,
      inputSixthIngridientClicked: false,
      inputSeventhIngridientClicked: false,
      inputEightIngridientClicked: false,
      inputNinthIngridientClicked: false,
      inputTenthIngridientClicked: false,
      inputSecondRampClicked: false,
      inputThirdRampClicked: false,
      inputFourthRampClicked: false,
      inputFifthRampClicked: false,
      inputSecondBoilClicked: false,
      inputThirdBoilClicked: false,
      inputFourthBoilClicked: false,
      inputFifthBoilClicked: false,
      inputSecondFermentationClicked: false,
      inputThirdFermentationClicked: false,
      inputSecondAgeingClicked: false,
      inputThirdAgeingClicked: false,
      QteIng01: '',
      QteIng02: '',
      QteIng03: '',
      QteIng04: '',
      QteIng05: '',
      QteIng06: '',
      QteIng07: '',
      QteIng08: '',
      QteIng09: '',
      QteIng10: '',
      UntIng01: Units[0].unit,
      UntIng02: Units[0].unit,
      UntIng03: Units[0].unit,
      UntIng04: Units[0].unit,
      UntIng05: Units[0].unit,
      UntIng06: Units[0].unit,
      UntIng07: Units[0].unit,
      UntIng08: Units[0].unit,
      UntIng09: Units[0].unit,
      UntIng10: Units[0].unit,
      NameIng01: '',
      NameIng02: '',
      NameIng03: '',
      NameIng04: '',
      NameIng05: '',
      NameIng06: '',
      NameIng07: '',
      NameIng08: '',
      NameIng09: '',
      NameIng10: '',
      TempRamp01: '',
      TempRamp02: '',
      TempRamp03: '',
      TempRamp04: '',
      TempRamp05: '',
      TimeRamp01: '',
      TimeRamp02: '',
      TimeRamp03: '',
      TimeRamp04: '',
      TimeRamp05: '',
      QteBoil01: '',
      QteBoil02: '',
      QteBoil03: '',
      QteBoil04: '',
      QteBoil05: '',
      UntBoil01: Units[0].unit,
      UntBoil02: Units[0].unit,
      UntBoil03: Units[0].unit,
      UntBoil04: Units[0].unit,
      UntBoil05: Units[0].unit,
      NameBoil01: '',
      NameBoil02: '',
      NameBoil03: '',
      NameBoil04: '',
      NameBoil05: '',
      TimeBoil01: '',
      TimeBoil02: '',
      TimeBoil03: '',
      TimeBoil04: '',
      TimeBoil05: '',
      TempFermentation01: '',
      TempFermentation02: '',
      TempFermentation03: '',
      TimeFermentation01: '',
      TimeFermentation02: '',
      TimeFermentation03: '',
      TempAgeing01: '',
      TempAgeing02: '',
      TempAgeing03: '',
      TimeAgeing01: '',
      TimeAgeing02: '',
      TimeAgeing03: '',
    };
  }

  componentDidMount() {
    this.getRecipes();
    this.getCurrentRecipe();
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

  getCurrentRecipe = () => {
    let recipe = this.props.route.params?.recipe;
    this.setState({
      id: recipe.id,
      title: recipe.title,
      style: recipe.style,
      volume: recipe.volume,
      og: recipe.og,
      fg: recipe.fg,
      ibu: recipe.ibu,
      abv: recipe.abv,
      color: recipe.color,
      carbonationValue: recipe.carbonationValue,
      annotation: recipe.annotation,
      carbonationUnit: recipe.carbonationUnit,
      carbonationMethod: recipe.carbonationMethod,
      inputSecondIngridientClicked:
        recipe.ingredients[1] != null ? true : false,
      inputThirdIngridientClicked: recipe.ingredients[2] != null ? true : false,
      inputFourthIngridientClicked:
        recipe.ingredients[3] != null ? true : false,
      inputFifthIngridientClicked: recipe.ingredients[4] != null ? true : false,
      inputSixthIngridientClicked: recipe.ingredients[5] != null ? true : false,
      inputSeventhIngridientClicked:
        recipe.ingredients[6] != null ? true : false,
      inputEightIngridientClicked: recipe.ingredients[7] != null ? true : false,
      inputNinthIngridientClicked: recipe.ingredients[8] != null ? true : false,
      inputTenthIngridientClicked: recipe.ingredients[9] != null ? true : false,
      inputSecondRampClicked: recipe.ramps[1] != null ? true : false,
      inputThirdRampClicked: recipe.ramps[2] != null ? true : false,
      inputFourthRampClicked: recipe.ramps[3] != null ? true : false,
      inputFifthRampClicked: recipe.ramps[4] != null ? true : false,
      inputSecondBoilClicked: recipe.boil[1] != null ? true : false,
      inputThirdBoilClicked: recipe.boil[2] != null ? true : false,
      inputFourthBoilClicked: recipe.boil[3] != null ? true : false,
      inputFifthBoilClicked: recipe.boil[4] != null ? true : false,
      inputSecondFermentationClicked:
        recipe.fermentation[1] != null ? true : false,
      inputThirdFermentationClicked:
        recipe.fermentation[2] != null ? true : false,
      inputSecondAgeingClicked: recipe.ageing[1] != null ? true : false,
      inputThirdAgeingClicked: recipe.ageing[2] != null ? true : false,
      QteIng01:
        recipe.ingredients[0] != null ? recipe.ingredients[0].quantity : '',
      QteIng02:
        recipe.ingredients[1] != null ? recipe.ingredients[1].quantity : '',
      QteIng03:
        recipe.ingredients[2] != null ? recipe.ingredients[2].quantity : '',
      QteIng04:
        recipe.ingredients[3] != null ? recipe.ingredients[3].quantity : '',
      QteIng05:
        recipe.ingredients[4] != null ? recipe.ingredients[4].quantity : '',
      QteIng06:
        recipe.ingredients[5] != null ? recipe.ingredients[5].quantity : '',
      QteIng07:
        recipe.ingredients[6] != null ? recipe.ingredients[6].quantity : '',
      QteIng08:
        recipe.ingredients[7] != null ? recipe.ingredients[7].quantity : '',
      QteIng09:
        recipe.ingredients[8] != null ? recipe.ingredients[8].quantity : '',
      QteIng10:
        recipe.ingredients[9] != null ? recipe.ingredients[9].quantity : '',
      UntIng01: recipe.ingredients[0] != null ? recipe.ingredients[0].unit : '',
      UntIng02: recipe.ingredients[1] != null ? recipe.ingredients[1].unit : '',
      UntIng03: recipe.ingredients[2] != null ? recipe.ingredients[2].unit : '',
      UntIng04: recipe.ingredients[3] != null ? recipe.ingredients[3].unit : '',
      UntIng05: recipe.ingredients[4] != null ? recipe.ingredients[4].unit : '',
      UntIng06: recipe.ingredients[5] != null ? recipe.ingredients[5].unit : '',
      UntIng07: recipe.ingredients[6] != null ? recipe.ingredients[6].unit : '',
      UntIng08: recipe.ingredients[7] != null ? recipe.ingredients[7].unit : '',
      UntIng09: recipe.ingredients[8] != null ? recipe.ingredients[8].unit : '',
      UntIng10: recipe.ingredients[9] != null ? recipe.ingredients[9].unit : '',
      NameIng01:
        recipe.ingredients[0] != null ? recipe.ingredients[0].name : '',
      NameIng02:
        recipe.ingredients[1] != null ? recipe.ingredients[1].name : '',
      NameIng03:
        recipe.ingredients[2] != null ? recipe.ingredients[2].name : '',
      NameIng04:
        recipe.ingredients[3] != null ? recipe.ingredients[3].name : '',
      NameIng05:
        recipe.ingredients[4] != null ? recipe.ingredients[4].name : '',
      NameIng06:
        recipe.ingredients[5] != null ? recipe.ingredients[5].name : '',
      NameIng07:
        recipe.ingredients[6] != null ? recipe.ingredients[6].name : '',
      NameIng08:
        recipe.ingredients[7] != null ? recipe.ingredients[7].name : '',
      NameIng09:
        recipe.ingredients[8] != null ? recipe.ingredients[8].name : '',
      NameIng10:
        recipe.ingredients[9] != null ? recipe.ingredients[9].name : '',
      TempRamp01: recipe.ramps[0] != null ? recipe.ramps[0].temperature : '',
      TempRamp02: recipe.ramps[1] != null ? recipe.ramps[1].temperature : '',
      TempRamp03: recipe.ramps[2] != null ? recipe.ramps[2].temperature : '',
      TempRamp04: recipe.ramps[3] != null ? recipe.ramps[3].temperature : '',
      TempRamp05: recipe.ramps[4] != null ? recipe.ramps[4].temperature : '',
      TimeRamp01: recipe.ramps[0] != null ? recipe.ramps[0].time : '',
      TimeRamp02: recipe.ramps[1] != null ? recipe.ramps[1].time : '',
      TimeRamp03: recipe.ramps[2] != null ? recipe.ramps[2].time : '',
      TimeRamp04: recipe.ramps[3] != null ? recipe.ramps[3].time : '',
      TimeRamp05: recipe.ramps[4] != null ? recipe.ramps[4].time : '',
      QteBoil01: recipe.boil[0] != null ? recipe.boil[0].quantity : '',
      QteBoil02: recipe.boil[1] != null ? recipe.boil[1].quantity : '',
      QteBoil03: recipe.boil[2] != null ? recipe.boil[2].quantity : '',
      QteBoil04: recipe.boil[3] != null ? recipe.boil[3].quantity : '',
      QteBoil05: recipe.boil[4] != null ? recipe.boil[4].quantity : '',
      UntBoil01: recipe.boil[0] != null ? recipe.boil[0].unit : '',
      UntBoil02: recipe.boil[1] != null ? recipe.boil[1].unit : '',
      UntBoil03: recipe.boil[2] != null ? recipe.boil[2].unit : '',
      UntBoil04: recipe.boil[3] != null ? recipe.boil[3].unit : '',
      UntBoil05: recipe.boil[4] != null ? recipe.boil[4].unit : '',
      NameBoil01: recipe.boil[0] != null ? recipe.boil[0].name : '',
      NameBoil02: recipe.boil[1] != null ? recipe.boil[1].name : '',
      NameBoil03: recipe.boil[2] != null ? recipe.boil[2].name : '',
      NameBoil04: recipe.boil[3] != null ? recipe.boil[3].name : '',
      NameBoil05: recipe.boil[4] != null ? recipe.boil[4].name : '',
      TimeBoil01: recipe.boil[0] != null ? recipe.boil[0].time : '',
      TimeBoil02: recipe.boil[1] != null ? recipe.boil[1].time : '',
      TimeBoil03: recipe.boil[2] != null ? recipe.boil[2].time : '',
      TimeBoil04: recipe.boil[3] != null ? recipe.boil[3].time : '',
      TimeBoil05: recipe.boil[4] != null ? recipe.boil[4].time : '',
      TempFermentation01:
        recipe.fermentation[0] != null
          ? recipe.fermentation[0].temperature
          : '',
      TempFermentation02:
        recipe.fermentation[1] != null
          ? recipe.fermentation[1].temperature
          : '',
      TempFermentation03:
        recipe.fermentation[2] != null
          ? recipe.fermentation[2].temperature
          : '',
      TimeFermentation01:
        recipe.fermentation[0] != null ? recipe.fermentation[0].time : '',
      TimeFermentation02:
        recipe.fermentation[1] != null ? recipe.fermentation[1].time : '',
      TimeFermentation03:
        recipe.fermentation[2] != null ? recipe.fermentation[2].time : '',
      TempAgeing01:
        recipe.ageing[0] != null ? recipe.ageing[0].temperature : '',
      TempAgeing02:
        recipe.ageing[1] != null ? recipe.ageing[1].temperature : '',
      TempAgeing03:
        recipe.ageing[2] != null ? recipe.ageing[2].temperature : '',
      TimeAgeing01: recipe.ageing[0] != null ? recipe.ageing[0].time : '',
      TimeAgeing02: recipe.ageing[1] != null ? recipe.ageing[1].time : '',
      TimeAgeing03: recipe.ageing[2] != null ? recipe.ageing[2].time : '',
    });
  };

  handleAddIngridientInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondIngridientClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdIngridientClicked: true,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthIngridientClicked: true,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthIngridientClicked: true,
      });
    } else if (value === '4') {
      this.setState({
        inputSixthIngridientClicked: true,
      });
    } else if (value === '5') {
      this.setState({
        inputSeventhIngridientClicked: true,
      });
    } else if (value === '6') {
      this.setState({
        inputEightIngridientClicked: true,
      });
    } else if (value === '7') {
      this.setState({
        inputNinthIngridientClicked: true,
      });
    } else if (value === '8') {
      this.setState({
        inputTenthIngridientClicked: true,
      });
    }
  };

  handleRemoveIngridientInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondIngridientClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdIngridientClicked: false,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthIngridientClicked: false,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthIngridientClicked: false,
      });
    } else if (value === '4') {
      this.setState({
        inputSixthIngridientClicked: false,
      });
    } else if (value === '5') {
      this.setState({
        inputSeventhIngridientClicked: false,
      });
    } else if (value === '6') {
      this.setState({
        inputEightIngridientClicked: false,
      });
    } else if (value === '7') {
      this.setState({
        inputNinthIngridientClicked: false,
      });
    } else if (value === '8') {
      this.setState({
        inputTenthIngridientClicked: false,
      });
    }
  };

  handleAddRampInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondRampClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdRampClicked: true,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthRampClicked: true,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthRampClicked: true,
      });
    }
  };

  handleRemoveRampInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondRampClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdRampClicked: false,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthRampClicked: false,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthRampClicked: false,
      });
    }
  };

  handleAddBoilInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondBoilClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdBoilClicked: true,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthBoilClicked: true,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthBoilClicked: true,
      });
    }
  };

  handleRemoveBoilInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondBoilClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdBoilClicked: false,
      });
    } else if (value === '2') {
      this.setState({
        inputFourthBoilClicked: false,
      });
    } else if (value === '3') {
      this.setState({
        inputFifthBoilClicked: false,
      });
    }
  };

  handleAddFermentationInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondFermentationClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdFermentationClicked: true,
      });
    }
  };

  handleRemoveFermentationInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondFermentationClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdFermentationClicked: false,
      });
    }
  };

  handleAddAgeingInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondAgeingClicked: true,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdAgeingClicked: true,
      });
    }
  };

  handleRemoveAgeingInput = (value) => {
    if (value === '0') {
      this.setState({
        inputSecondAgeingClicked: false,
      });
    } else if (value === '1') {
      this.setState({
        inputThirdAgeingClicked: false,
      });
    }
  };

  setIngridients = () => {
    const ingridient01 = {
      id: '01',
      quantity: this.state.QteIng01,
      unit: this.state.UntIng01,
      name: this.state.NameIng01,
    };

    const ingridient02 = {
      id: '02',
      quantity: this.state.QteIng02,
      unit: this.state.UntIng02,
      name: this.state.NameIng02,
    };

    const ingridient03 = {
      id: '03',
      quantity: this.state.QteIng03,
      unit: this.state.UntIng03,
      name: this.state.NameIng03,
    };

    const ingridient04 = {
      id: '04',
      quantity: this.state.QteIng04,
      unit: this.state.UntIng04,
      name: this.state.NameIng04,
    };

    const ingridient05 = {
      id: '05',
      quantity: this.state.QteIng05,
      unit: this.state.UntIng05,
      name: this.state.NameIng05,
    };

    const ingridient06 = {
      id: '06',
      quantity: this.state.QteIng06,
      unit: this.state.UntIng06,
      name: this.state.NameIng06,
    };

    const ingridient07 = {
      id: '07',
      quantity: this.state.QteIng07,
      unit: this.state.UntIng07,
      name: this.state.NameIng07,
    };

    const ingridient08 = {
      id: '08',
      quantity: this.state.QteIng08,
      unit: this.state.UntIng08,
      name: this.state.NameIng08,
    };

    const ingridient09 = {
      id: '09',
      quantity: this.state.QteIng09,
      unit: this.state.UntIng09,
      name: this.state.NameIng09,
    };

    const ingridient10 = {
      id: '10',
      quantity: this.state.QteIng10,
      unit: this.state.UntIng10,
      name: this.state.NameIng10,
    };

    let allIngridients = [ingridient01];

    if (this.state.inputSecondIngridientClicked) {
      allIngridients.push(ingridient02);
    }

    if (this.state.inputThirdIngridientClicked) {
      allIngridients.push(ingridient03);
    }

    if (this.state.inputFourthIngridientClicked) {
      allIngridients.push(ingridient04);
    }

    if (this.state.inputFifthIngridientClicked) {
      allIngridients.push(ingridient05);
    }

    if (this.state.inputSixthIngridientClicked) {
      allIngridients.push(ingridient06);
    }

    if (this.state.inputSeventhIngridientClicked) {
      allIngridients.push(ingridient07);
    }

    if (this.state.inputEightIngridientClicked) {
      allIngridients.push(ingridient08);
    }

    if (this.state.inputNinthIngridientClicked) {
      allIngridients.push(ingridient09);
    }

    if (this.state.inputTenthIngridientClicked) {
      allIngridients.push(ingridient10);
    }

    return allIngridients;
  };

  setRamps = () => {
    const ramp01 = {
      id: '01',
      temperature: this.state.TempRamp01,
      time: this.state.TimeRamp01,
    };

    const ramp02 = {
      id: '02',
      temperature: this.state.TempRamp02,
      time: this.state.TimeRamp02,
    };

    const ramp03 = {
      id: '03',
      temperature: this.state.TempRamp03,
      time: this.state.TimeRamp03,
    };

    const ramp04 = {
      id: '04',
      temperature: this.state.TempRamp04,
      time: this.state.TimeRamp04,
    };

    const ramp05 = {
      id: '05',
      temperature: this.state.TempRamp05,
      time: this.state.TimeRamp05,
    };

    let allRamps = [ramp01];

    if (this.state.inputSecondRampClicked) {
      allRamps.push(ramp02);
    }

    if (this.state.inputThirdRampClicked) {
      allRamps.push(ramp03);
    }

    if (this.state.inputFourthRampClicked) {
      allRamps.push(ramp04);
    }

    if (this.state.inputFifthRampClicked) {
      allRamps.push(ramp05);
    }

    return allRamps;
  };

  setBoil = () => {
    const boil01 = {
      id: '01',
      quantity: this.state.QteBoil01,
      unit: this.state.UntBoil01,
      name: this.state.NameBoil01,
      time: this.state.TimeBoil01,
    };

    const boil02 = {
      id: '02',
      quantity: this.state.QteBoil02,
      unit: this.state.UntBoil02,
      name: this.state.NameBoil02,
      time: this.state.TimeBoil02,
    };

    const boil03 = {
      id: '03',
      quantity: this.state.QteBoil03,
      unit: this.state.UntBoil03,
      name: this.state.NameBoil03,
      time: this.state.TimeBoil03,
    };

    const boil04 = {
      id: '04',
      quantity: this.state.QteBoil04,
      unit: this.state.UntBoil04,
      name: this.state.NameBoil04,
      time: this.state.TimeBoil04,
    };

    const boil05 = {
      id: '05',
      quantity: this.state.QteBoil05,
      unit: this.state.UntBoil05,
      name: this.state.NameBoil05,
      time: this.state.TimeBoil05,
    };

    let allBoils = [boil01];

    if (this.state.inputSecondBoilClicked) {
      allBoils.push(boil02);
    }

    if (this.state.inputThirdBoilClicked) {
      allBoils.push(boil03);
    }

    if (this.state.inputFourthBoilClicked) {
      allBoils.push(boil04);
    }

    if (this.state.inputFifthBoilClicked) {
      allBoils.push(boil05);
    }

    return allBoils;
  };

  setFermentation = () => {
    const fermentation01 = {
      id: '01',
      temperature: this.state.TempFermentation01,
      time: this.state.TimeFermentation01,
    };

    const fermentation02 = {
      id: '02',
      temperature: this.state.TempFermentation02,
      time: this.state.TimeFermentation02,
    };

    const fermentation03 = {
      id: '03',
      temperature: this.state.TempFermentation03,
      time: this.state.TimeFermentation03,
    };

    let allFermentationStages = [fermentation01];

    if (this.state.inputSecondFermentationClicked) {
      allFermentationStages.push(fermentation02);
    }

    if (this.state.inputThirdFermentationClicked) {
      allFermentationStages.push(fermentation03);
    }

    return allFermentationStages;
  };

  setAgeing = () => {
    const ageing01 = {
      id: '01',
      temperature: this.state.TempAgeing01,
      time: this.state.TimeAgeing01,
    };

    const ageing02 = {
      id: '02',
      temperature: this.state.TempAgeing02,
      time: this.state.TimeAgeing02,
    };

    const ageing03 = {
      id: '03',
      temperature: this.state.TempAgeing03,
      time: this.state.TimeAgeing03,
    };

    let allAgeingStages = [ageing01];

    if (this.state.inputSecondAgeingClicked) {
      allAgeingStages.push(ageing02);
    }

    if (this.state.inputThirdAgeingClicked) {
      allAgeingStages.push(ageing03);
    }

    return allAgeingStages;
  };

  setCarbonation(SelectedcarbonationMethod) {
    const selectedMethod = this.state.carbonationMethods.find(
      (x) => x.method === SelectedcarbonationMethod,
    );

    this.setState({
      carbonationMethod: selectedMethod.method,
      carbonationUnit: selectedMethod.unit,
    });
  }

  editRecipe = async () => {
    const ingredients = this.setIngridients();
    const ramps = this.setRamps();
    const boil = this.setBoil();
    const fermentation = this.setFermentation();
    const ageing = this.setAgeing();

    let elapsedTime = parseFloat(this.state.TimeRamp01);

    if (this.state.inputSecondRampClicked === true) {
      elapsedTime += parseFloat(this.state.TimeRamp02);
    }
    if (this.state.inputThirdRampClicked === true) {
      elapsedTime += parseFloat(this.state.TimeRamp03);
    }
    if (this.state.inputFourthRampClicked === true) {
      elapsedTime += parseFloat(this.state.TimeRamp04);
    }
    if (this.state.inputFifthRampClicked === true) {
      elapsedTime += parseFloat(this.state.TimeRamp05);
    }
    if (this.state.TimeBoil01 != null) {
      elapsedTime += parseFloat(this.state.TimeBoil01);
    }

    const currentRecipe = {
      id: this.state.id,
      title: this.state.title,
      volume: this.state.volume,
      style: this.state.style,
      og: this.state.og,
      fg: this.state.fg,
      ibu: this.state.ibu,
      abv: this.state.abv,
      color: this.state.color,
      ingredients: ingredients,
      ramps: ramps,
      boil: boil,
      fermentation: fermentation,
      ageing: ageing,
      carbonationMethod: this.state.carbonationMethod,
      carbonationValue: this.state.carbonationValue,
      carbonationUnit: this.state.carbonationUnit,
      estimatedTime: elapsedTime,
      annotation: this.state.annotation,
      createdAt: this.state.todaysDatePt,
      lastUpdateDate: this.state.todaysDatePt,
    };

    let allRecipes = this.state.recipes;
    const recipe = allRecipes.find((x) => x.id === currentRecipe.id);
    const index = allRecipes.indexOf(recipe);

    if (index !== -1) {
      allRecipes[index] = currentRecipe;
    }

    await AsyncStorage.setItem(
      RECIPES_KEY,
      JSON.stringify(allRecipes),
      (err) => {
        if (err) {
          console.log('an error occured');
          throw err;
        }
        console.log('Success. Recipe updated');
      },
    )
      .then(
        this.props.navigation.navigate('Receitas'),
        Alert.alert('Receita alterada com sucesso!'),
      )
      .catch((err) => {
        console.log('error is: ' + err);
      });

    if (window.recipesScreen !== undefined) {
      window.recipesScreen.getRecipes();
    }

    if (window.productionsScreen !== undefined) {
      window.productionsScreen
        .getRecipes()
        .then(window.productionsScreen.getProductions());
    }
  };

  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
        <ScrollView>
          <View style={styles.titleContainer}>
            <TextInput
              onChangeText={(title) => this.setState({title})}
              value={this.state.title}
              style={styles.titleInputMask}
              placeholder="Nome da receita"
              underlineColorAndroid="transparent"
            />
            <View style={styles.parametersRow} marginTop={-5}>
              <TextInput
                onChangeText={(style) => this.setState({style})}
                value={this.state.style}
                style={styles.styleInputMask}
                placeholder="Estilo"
                underlineColorAndroid="transparent"
              />
              <TextInput
                onChangeText={(volume) => this.setState({volume})}
                value={this.state.volume}
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
            <Text style={styles.sectionText}>Parâmetros:</Text>
            <View style={styles.parametersRow}>
              <TextInput
                onChangeText={(og) => this.setState({og})}
                value={this.state.og}
                style={styles.bodyInputMask}
                placeholder="OG"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
                marginLeft={10}
              />
              <TextInput
                onChangeText={(fg) => this.setState({fg})}
                value={this.state.fg}
                style={styles.bodyInputMask}
                placeholder="FG"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
                marginLeft={10}
              />
              <TextInput
                onChangeText={(ibu) => this.setState({ibu})}
                value={this.state.ibu}
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
                onChangeText={(abv) => this.setState({abv})}
                value={this.state.abv}
                style={styles.bodyInputMask}
                placeholder="ABV (%)"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
                marginLeft={10}
              />
              <TextInput
                onChangeText={(color) => this.setState({color})}
                value={this.state.color}
                style={styles.bodyInputMask}
                placeholder="Color"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={80}
                marginLeft={10}
              />
            </View>
          </View>
          <View marginTop={10}>
            <Text style={styles.sectionText}>Ingredientes:</Text>
            <View style={styles.parametersRow}>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(QteIng01) => this.setState({QteIng01})}
                value={this.state.QteIng01}
                placeholder="Qte"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={50}
              />
              <View style={styles.onePickerContainer}>
                <Picker
                  style={styles.onePicker}
                  itemStyle={styles.onePickerItem}
                  selectedValue={this.state.UntIng01}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({UntIng01: itemValue})
                  }>
                  {this.state.units.map((item, value) => {
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
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(NameIng01) => this.setState({NameIng01})}
                value={this.state.NameIng01}
                placeholder="Nome"
                underlineColorAndroid="transparent"
                width={130}
                marginLeft={5}
              />
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.handleAddIngridientInput('0')}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.addButtonContainer} marginLeft={-1} />
            </View>
            <View>
              {this.state.inputSecondIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng02) => this.setState({QteIng02})}
                    value={this.state.QteIng02}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng02}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng02: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng02) => this.setState({NameIng02})}
                    value={this.state.NameIng02}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddIngridientInput('1')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('0')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputThirdIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng03) => this.setState({QteIng03})}
                    value={this.state.QteIng03}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng03}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng03: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng03) => this.setState({NameIng03})}
                    value={this.state.NameIng03}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddIngridientInput('2')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('1')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputFourthIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng04) => this.setState({QteIng04})}
                    value={this.state.QteIng04}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng04}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng04: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng04) => this.setState({NameIng04})}
                    value={this.state.NameIng04}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddIngridientInput('3')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('2')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputFifthIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng05) => this.setState({QteIng05})}
                    value={this.state.QteIng05}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng05}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng05: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng05) => this.setState({NameIng05})}
                    value={this.state.NameIng05}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddIngridientInput('4')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('3')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputSixthIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng06) => this.setState({QteIng06})}
                    value={this.state.QteIng06}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng06}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng06: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng06) => this.setState({NameIng06})}
                    value={this.state.NameIng06}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddIngridientInput('5')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('4')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputSeventhIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng07) => this.setState({QteIng07})}
                    value={this.state.QteIng07}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng07}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng07: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng07) => this.setState({NameIng07})}
                    value={this.state.NameIng07}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddIngridientInput('6')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('5')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputEightIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng08) => this.setState({QteIng08})}
                    value={this.state.QteIng08}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng08}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng08: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng08) => this.setState({NameIng08})}
                    value={this.state.NameIng08}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddIngridientInput('7')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('6')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputNinthIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng09) => this.setState({QteIng09})}
                    value={this.state.QteIng09}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng09}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng09: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng09) => this.setState({NameIng09})}
                    value={this.state.NameIng09}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddIngridientInput('8')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('7')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputTenthIngridientClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteIng10) => this.setState({QteIng10})}
                    value={this.state.QteIng10}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntIng10}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntIng10: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameIng10) => this.setState({NameIng10})}
                    value={this.state.NameIng10}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveIngridientInput('8')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1} />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View marginTop={10}>
            <View backgroundColor={'#000000'} height={1} marginBottom={15} />
            <Text style={styles.stageText}>Etapas</Text>
          </View>
          <Text style={styles.sectionText}>* Brassagem</Text>
          <Text style={styles.innerSectionText}>Rampas:</Text>
          <View style={styles.parametersRow}>
            <TextInput
              style={styles.bodyInputMask}
              onChangeText={(TempRamp01) => this.setState({TempRamp01})}
              value={this.state.TempRamp01}
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
              onChangeText={(TimeRamp01) => this.setState({TimeRamp01})}
              value={this.state.TimeRamp01}
              placeholder="Tempo (min)"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              width={120}
              marginLeft={10}
            />
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.handleAddRampInput('0')}>
                <Image source={Plus} />
              </TouchableOpacity>
            </View>
            <View style={styles.addButtonContainer} marginLeft={-1} />
          </View>
          <View>
            {this.state.inputSecondRampClicked ? (
              <View style={styles.parametersRow} marginTop={-5}>
                <TextInput
                  style={styles.bodyInputMask}
                  onChangeText={(TempRamp02) => this.setState({TempRamp02})}
                  value={this.state.TempRamp02}
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
                  onChangeText={(TimeRamp02) => this.setState({TimeRamp02})}
                  value={this.state.TimeRamp02}
                  placeholder="Tempo (min)"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={120}
                  marginLeft={10}
                />
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleAddRampInput('1')}>
                    <Image source={Plus} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addButtonContainer} marginLeft={-1}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleRemoveRampInput('0')}>
                    <Image source={Minus} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          <View>
            {this.state.inputThirdRampClicked ? (
              <View style={styles.parametersRow} marginTop={-5}>
                <TextInput
                  style={styles.bodyInputMask}
                  onChangeText={(TempRamp03) => this.setState({TempRamp03})}
                  value={this.state.TempRamp03}
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
                  onChangeText={(TimeRamp03) => this.setState({TimeRamp03})}
                  value={this.state.TimeRamp03}
                  placeholder="Tempo (min)"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={120}
                  marginLeft={10}
                />
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleAddRampInput('2')}>
                    <Image source={Plus} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addButtonContainer} marginLeft={-1}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleRemoveRampInput('1')}>
                    <Image source={Minus} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          <View>
            {this.state.inputFourthRampClicked ? (
              <View style={styles.parametersRow} marginTop={-5}>
                <TextInput
                  style={styles.bodyInputMask}
                  placeholder="Temp. (ºC)"
                  onChangeText={(TempRamp04) => this.setState({TempRamp04})}
                  value={this.state.TempRamp04}
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={80}
                />
                <View style={styles.addButtonContainer}>
                  <Text style={styles.smallBodyText}> por </Text>
                </View>
                <TextInput
                  style={styles.bodyInputMask}
                  onChangeText={(TimeRamp04) => this.setState({TimeRamp04})}
                  value={this.state.TimeRamp04}
                  placeholder="Tempo (min)"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={120}
                  marginLeft={10}
                />
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleAddRampInput('3')}>
                    <Image source={Plus} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addButtonContainer} marginLeft={-1}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleRemoveRampInput('2')}>
                    <Image source={Minus} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View />
            )}
          </View>
          <View>
            {this.state.inputFifthRampClicked ? (
              <View style={styles.parametersRow} marginTop={-5}>
                <TextInput
                  style={styles.bodyInputMask}
                  onChangeText={(TempRamp05) => this.setState({TempRamp05})}
                  value={this.state.TempRamp05}
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
                  onChangeText={(TimeRamp05) => this.setState({TimeRamp05})}
                  value={this.state.TimeRamp05}
                  placeholder="Tempo (min)"
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  width={120}
                  marginLeft={10}
                />
                <View style={styles.addButtonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleRemoveRampInput('3')}>
                    <Image source={Minus} />
                  </TouchableOpacity>
                </View>
                <View style={styles.addButtonContainer} marginLeft={-1} />
              </View>
            ) : (
              <View />
            )}
          </View>
          <View marginTop={10}>
            <Text style={styles.innerSectionText}>Fervura:</Text>
            <View style={styles.parametersRow} marginLeft={28}>
              <View>
                <View style={styles.parametersRow}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(QteBoil01) => this.setState({QteBoil01})}
                    value={this.state.QteBoil01}
                    placeholder="Qte"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={50}
                  />
                  <View style={styles.onePickerContainer}>
                    <Picker
                      style={styles.onePicker}
                      itemStyle={styles.onePickerItem}
                      selectedValue={this.state.UntBoil01}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({UntBoil01: itemValue})
                      }>
                      {this.state.units.map((item, value) => {
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
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(NameBoil01) => this.setState({NameBoil01})}
                    value={this.state.NameBoil01}
                    placeholder="Nome"
                    underlineColorAndroid="transparent"
                    width={130}
                    marginLeft={5}
                  />
                </View>
                <View style={styles.parametersSecondRow}>
                  <View style={styles.addButtonContainer}>
                    <Text style={styles.smallBodyText}> por </Text>
                  </View>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(TimeBoil01) => this.setState({TimeBoil01})}
                    value={this.state.TimeBoil01}
                    placeholder="Tempo (min)"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={90}
                    marginLeft={10}
                  />
                </View>
              </View>
              <View
                style={styles.addButtonContainer}
                height={80}
                marginLeft={5}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.handleAddBoilInput('0')}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
              <View
                style={styles.addButtonContainer}
                height={80}
                marginLeft={-1}
              />
            </View>
            <View>
              {this.state.inputSecondBoilClicked ? (
                <View
                  style={styles.parametersRow}
                  marginLeft={28}
                  marginTop={-2}>
                  <View>
                    <View style={styles.parametersRow}>
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(QteBoil02) => this.setState({QteBoil02})}
                        value={this.state.QteBoil02}
                        placeholder="Qte"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        width={50}
                      />
                      <View style={styles.onePickerContainer}>
                        <Picker
                          style={styles.onePicker}
                          itemStyle={styles.onePickerItem}
                          selectedValue={this.state.UntBoil02}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({UntBoil02: itemValue})
                          }>
                          {this.state.units.map((item, value) => {
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
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(NameBoil02) =>
                          this.setState({NameBoil02})
                        }
                        value={this.state.NameBoil02}
                        placeholder="Nome"
                        underlineColorAndroid="transparent"
                        width={130}
                        marginLeft={5}
                      />
                    </View>
                    <View style={styles.parametersSecondRow}>
                      <View style={styles.centeredBodyTextContainer}>
                        <Text style={styles.smallBodyText}>
                          {' '}
                          durante os últimos{' '}
                        </Text>
                      </View>
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(TimeBoil02) =>
                          this.setState({TimeBoil02})
                        }
                        value={this.state.TimeBoil02}
                        placeholder="Tempo (min)"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        width={90}
                        marginLeft={10}
                      />
                    </View>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={5}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddBoilInput('1')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveBoilInput('0')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputThirdBoilClicked ? (
                <View
                  style={styles.parametersRow}
                  marginLeft={28}
                  marginTop={-2}>
                  <View>
                    <View style={styles.parametersRow}>
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(QteBoil03) => this.setState({QteBoil03})}
                        value={this.state.QteBoil03}
                        placeholder="Qte"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        width={50}
                      />
                      <View style={styles.onePickerContainer}>
                        <Picker
                          style={styles.onePicker}
                          itemStyle={styles.onePickerItem}
                          selectedValue={this.state.UntBoil03}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({UntBoil03: itemValue})
                          }>
                          {this.state.units.map((item, value) => {
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
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(NameBoil03) =>
                          this.setState({NameBoil03})
                        }
                        value={this.state.NameBoil03}
                        placeholder="Nome"
                        underlineColorAndroid="transparent"
                        width={130}
                        marginLeft={5}
                      />
                    </View>
                    <View style={styles.parametersSecondRow}>
                      <View style={styles.centeredBodyTextContainer}>
                        <Text style={styles.smallBodyText}>
                          {' '}
                          durante os últimos{' '}
                        </Text>
                      </View>
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(TimeBoil03) =>
                          this.setState({TimeBoil03})
                        }
                        value={this.state.TimeBoil03}
                        placeholder="Tempo (min)"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        width={90}
                        marginLeft={10}
                      />
                    </View>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={5}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddBoilInput('2')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveBoilInput('1')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputFourthBoilClicked ? (
                <View
                  style={styles.parametersRow}
                  marginLeft={28}
                  marginTop={-2}>
                  <View>
                    <View style={styles.parametersRow}>
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(QteBoil04) => this.setState({QteBoil04})}
                        value={this.state.QteBoil04}
                        placeholder="Qte"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        width={50}
                      />
                      <View style={styles.onePickerContainer}>
                        <Picker
                          style={styles.onePicker}
                          itemStyle={styles.onePickerItem}
                          selectedValue={this.state.UntBoil04}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({UntBoil04: itemValue})
                          }>
                          {this.state.units.map((item, value) => {
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
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(NameBoil04) =>
                          this.setState({NameBoil04})
                        }
                        value={this.state.NameBoil04}
                        placeholder="Nome"
                        underlineColorAndroid="transparent"
                        width={130}
                        marginLeft={5}
                      />
                    </View>
                    <View style={styles.parametersSecondRow}>
                      <View style={styles.centeredBodyTextContainer}>
                        <Text style={styles.smallBodyText}>
                          {' '}
                          durante os últimos{' '}
                        </Text>
                      </View>
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(TimeBoil04) =>
                          this.setState({TimeBoil04})
                        }
                        value={this.state.TimeBoil04}
                        placeholder="Tempo (min)"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        width={90}
                        marginLeft={10}
                      />
                    </View>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={5}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddBoilInput('3')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveBoilInput('2')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputFifthBoilClicked ? (
                <View
                  style={styles.parametersRow}
                  marginLeft={28}
                  marginTop={-2}>
                  <View>
                    <View style={styles.parametersRow}>
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(QteBoil05) => this.setState({QteBoil05})}
                        value={this.state.QteBoil05}
                        placeholder="Qte"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        width={50}
                      />
                      <View style={styles.onePickerContainer}>
                        <Picker
                          style={styles.onePicker}
                          itemStyle={styles.onePickerItem}
                          selectedValue={this.state.UntBoil05}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({UntBoil05: itemValue})
                          }>
                          {this.state.units.map((item, value) => {
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
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(NameBoil05) =>
                          this.setState({NameBoil05})
                        }
                        value={this.state.NameBoil05}
                        placeholder="Nome"
                        underlineColorAndroid="transparent"
                        width={130}
                        marginLeft={5}
                      />
                    </View>
                    <View style={styles.parametersSecondRow}>
                      <View style={styles.centeredBodyTextContainer}>
                        <Text style={styles.smallBodyText}>
                          {' '}
                          durante os últimos{' '}
                        </Text>
                      </View>
                      <TextInput
                        style={styles.bodyInputMask}
                        onChangeText={(TimeBoil05) =>
                          this.setState({TimeBoil05})
                        }
                        value={this.state.TimeBoil05}
                        placeholder="Tempo (min)"
                        keyboardType="numeric"
                        underlineColorAndroid="transparent"
                        width={90}
                        marginLeft={10}
                      />
                    </View>
                  </View>
                  <View
                    style={styles.addButtonContainer}
                    height={80}
                    marginLeft={5}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveBoilInput('3')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} height={80} />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View marginTop={5}>
            <Text style={styles.sectionText}>* Fermentação</Text>
            <View style={styles.parametersRow}>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(TempFermentation01) =>
                  this.setState({TempFermentation01})
                }
                value={this.state.TempFermentation01}
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
                onChangeText={(TimeFermentation01) =>
                  this.setState({TimeFermentation01})
                }
                value={this.state.TimeFermentation01}
                placeholder="Tempo (dias)"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={120}
                marginLeft={10}
              />
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.handleAddFermentationInput('0')}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.addButtonContainer} marginLeft={-1} />
            </View>
            <View>
              {this.state.inputSecondFermentationClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(TempFermentation02) =>
                      this.setState({TempFermentation02})
                    }
                    value={this.state.TempFermentation02}
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
                    onChangeText={(TimeFermentation02) =>
                      this.setState({TimeFermentation02})
                    }
                    value={this.state.TimeFermentation02}
                    placeholder="Tempo (dias)"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={120}
                    marginLeft={10}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddFermentationInput('1')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveFermentationInput('0')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputThirdFermentationClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(TempFermentation03) =>
                      this.setState({TempFermentation03})
                    }
                    value={this.state.TempFermentation03}
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
                    onChangeText={(TimeFermentation03) =>
                      this.setState({TimeFermentation03})
                    }
                    value={this.state.TimeFermentation03}
                    placeholder="Tempo (dias)"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={120}
                    marginLeft={10}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveFermentationInput('1')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1} />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View marginTop={5}>
            <Text style={styles.sectionText}>* Maturação</Text>
            <View style={styles.parametersRow}>
              <TextInput
                style={styles.bodyInputMask}
                onChangeText={(TempAgeing01) => this.setState({TempAgeing01})}
                value={this.state.TempAgeing01}
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
                onChangeText={(TimeAgeing01) => this.setState({TimeAgeing01})}
                value={this.state.TimeAgeing01}
                placeholder="Tempo (dias)"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={120}
                marginLeft={10}
              />
              <View style={styles.addButtonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.handleAddAgeingInput('0')}>
                  <Image source={Plus} />
                </TouchableOpacity>
              </View>
              <View style={styles.addButtonContainer} marginLeft={-1} />
            </View>
            <View>
              {this.state.inputSecondAgeingClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(TempAgeing02) =>
                      this.setState({TempAgeing02})
                    }
                    value={this.state.TempAgeing02}
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
                    onChangeText={(TimeAgeing02) =>
                      this.setState({TimeAgeing02})
                    }
                    value={this.state.TimeAgeing02}
                    placeholder="Tempo (dias)"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={120}
                    marginLeft={10}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleAddAgeingInput('1')}>
                      <Image source={Plus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveAgeingInput('0')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View />
              )}
            </View>
            <View>
              {this.state.inputThirdAgeingClicked ? (
                <View style={styles.parametersRow} marginTop={-5}>
                  <TextInput
                    style={styles.bodyInputMask}
                    onChangeText={(TempAgeing03) =>
                      this.setState({TempAgeing03})
                    }
                    value={this.state.TempAgeing03}
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
                    onChangeText={(TimeAgeing03) =>
                      this.setState({TimeAgeing03})
                    }
                    value={this.state.TimeAgeing03}
                    placeholder="Tempo (dias)"
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                    width={120}
                    marginLeft={10}
                  />
                  <View style={styles.addButtonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.handleRemoveAgeingInput('1')}>
                      <Image source={Minus} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.addButtonContainer} marginLeft={-1} />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View marginTop={5}>
            <Text style={styles.sectionText}>* Carbonatação</Text>
            <View style={styles.parametersRow}>
              <View style={styles.centeredBodyTextContainer}>
                <Text style={styles.smallBodyText}>Método: </Text>
              </View>
              <View style={styles.onePickerContainerLarge}>
                <Picker
                  style={styles.onePickerLarge}
                  itemStyle={styles.onePickerItem}
                  selectedValue={this.state.carbonationMethod}
                  onValueChange={(itemValue) => this.setCarbonation(itemValue)}>
                  {this.state.carbonationMethods.map((item, value) => {
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
                onChangeText={(carbonationValue) =>
                  this.setState({carbonationValue})
                }
                value={this.state.carbonationValue}
                placeholder="Valor"
                keyboardType="numeric"
                underlineColorAndroid="transparent"
                width={70}
                marginLeft={5}
              />
              <View style={styles.centeredBodyTextContainer}>
                <Text style={styles.smallBodyText}>
                  {this.state.carbonationUnit}
                </Text>
              </View>
            </View>
          </View>
          <View marginTop={10}>
            <View backgroundColor={'#000000'} height={1} marginBottom={5} />
          </View>
          <View marginTop={5}>
            <Text style={styles.sectionText}>* Observações</Text>
            <TextInput
              onChangeText={(annotation) => this.setState({annotation})}
              value={this.state.annotation}
              style={styles.styleInputMask}
              width={350}
              height={90}
              marginTop={10}
              multiline={true}
              fontSize={12}
              underlineColorAndroid="transparent"
            />
          </View>
          <View marginTop={5}>
            <View backgroundColor={'#000000'} height={1} marginBottom={5} />
          </View>
          <View marginTop={10} marginBottom={10}>
            <TouchableHighlight
              style={styles.buttonContainer}
              onPress={() => this.editRecipe()}>
              <Text style={styles.bodyText}>Salvar</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 300,
  },
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  sectionText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    paddingLeft: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  innerSectionText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'left',
    paddingLeft: 10,
    marginLeft: 20,
    marginTop: 2,
    marginBottom: 2,
  },
  stageText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  buttonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 220,
    height: 40,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    marginLeft: 5,
    width: 30,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleInputMask: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 20,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  styleInputMask: {
    height: 38,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginTop: -10,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  bodyInputMask: {
    height: 36,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  smallBodyText: {
    marginLeft: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  parametersRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  parametersSecondRow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: -2,
  },
  onePickerContainer: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 75,
    height: 36,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  onePicker: {
    width: 90,
    height: 36,
  },
  onePickerItem: {
    height: 36,
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  onePickerContainerLarge: {
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: 147,
    height: 36,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'row',
  },
  onePickerLarge: {
    width: 160,
    height: 36,
  },
  signContainer: {
    height: 36,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredBodyTextContainer: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditRecipeScreen;
