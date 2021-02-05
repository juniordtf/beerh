import React, {Component} from 'react';
import {Text, StyleSheet, Platform, AppState} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-community/async-storage';
import {differenceInSeconds} from 'date-fns';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    window.stopwatchComponent = this;
    this.startStopwatch = this.startStopwatch.bind(this);
    this.pauseStopwatch = this.pauseStopwatch.bind(this);
    this.stopStopwatch = this.stopStopwatch.bind(this);
    this.clearStopwatch = this.clearStopwatch.bind(this);
    this.showDisplay = this.showDisplay.bind(this);
    this.addSecond = this.addSecond.bind(this);
    this.state = {
      contadorSegundo: 0,
      contadorMinuto: 0,
      contadorHora: 0,

      iniciarHabilitado: true,
      pausarHabilitado: false,
      pararHabilitado: false,
      zerarHabilitado: false,
      elapsed: 0,
      appState: AppState.currentState,
      isActive: true,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  addSecond = () => {
    let segundo = this.state.contadorSegundo;
    let minuto = this.state.contadorMinuto;
    let hora = this.state.contadorHora;

    segundo += 1;

    if (segundo === 60) {
      minuto += 1;
      segundo = 0;
    }
    if (minuto === 60) {
      hora += 1;
      minuto = 0;
    }
    if (hora === 24) {
      hora = 0;
    }
    this.setState({
      contadorSegundo: segundo,
      contadorMinuto: minuto,
      contadorHora: hora,
    });
  };

  showDisplay = () => {
    let formatado = '';

    if (this.state.contadorHora < 10) {
      formatado = formatado + '0' + this.state.contadorHora + ':';
    } else {
      formatado = formatado + this.state.contadorHora + ':';
    }

    if (this.state.contadorMinuto < 10) {
      formatado = formatado + '0' + this.state.contadorMinuto + ':';
    } else {
      formatado = formatado + this.state.contadorMinuto + ':';
    }

    if (this.state.contadorSegundo < 10) {
      formatado = formatado + '0' + this.state.contadorSegundo;
    } else {
      formatado = formatado + this.state.contadorSegundo;
    }

    return formatado;
  };

  startStopwatch = () => {
    if (Platform.OS === 'ios') {
      BackgroundTimer.start();
    }

    let intervalId = BackgroundTimer.setInterval(this.addSecond, 1000);

    this.recordStartTime();

    this.setState({
      intervalId: intervalId,

      iniciarHabilitado: false,
      pausarHabilitado: true,
      pararHabilitado: true,
    });
  };

  pauseStopwatch = () => {
    BackgroundTimer.clearInterval(this.state.intervalId);

    this.setState({
      iniciarHabilitado: true,
      pausarHabilitado: false,
      pararHabilitado: false,
    });
  };

  stopStopwatch = () => {
    BackgroundTimer.clearInterval(this.state.intervalId);
    this.clearStartTime();

    this.setState({
      pausarHabilitado: false,
      pararHabilitado: false,
      zerarHabilitado: true,
      isActive: false,
    });
  };

  clearStopwatch = () => {
    this.setState({
      contadorSegundo: 0,
      contadorMinuto: 0,
      contadorHora: 0,

      zerarHabilitado: false,
      iniciarHabilitado: true,
    });
  };

  continueStopwatch(time) {
    this.setState({
      contadorSegundo: parseInt(time.slice(6, 8), 10) + 1,
      contadorMinuto: parseInt(time.slice(3, 5), 10),
      contadorHora: parseInt(time.slice(0, 2), 10),
    });
  }

  recordStartTime = async () => {
    try {
      const now = new Date();
      await AsyncStorage.setItem('@start_time', now.toISOString());
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };

  recordStartTime = async () => {
    try {
      const now = new Date();
      console.log(now);

      await AsyncStorage.setItem('@start_time', now.toISOString());
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };

  clearStartTime = async () => {
    try {
      await AsyncStorage.setItem('@start_time', 0);
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };

  handleAppStateChange = async (nextAppState) => {
    let elapsed = this.state.elapsed;

    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // We just became active again: recalculate elapsed time based
      // on what we stored in AsyncStorage when we started.
      elapsed = await this.getElapsedTime();
      // Update the elapsed seconds state
    }

    this.setState({
      elapsed: elapsed,
      appState: nextAppState,
    });

    if (elapsed > 0) {
      let display = new Date(elapsed * 1000).toISOString().substr(11, 8);
      this.setState({
        contadorSegundo: parseInt(display.slice(6, 8), 10) + 1,
        contadorMinuto: parseInt(display.slice(3, 5), 10),
        contadorHora: parseInt(display.slice(0, 2), 10),
      });
    }
  };

  getElapsedTime = async () => {
    try {
      const startTime = await AsyncStorage.getItem('@start_time');
      const now = new Date();
      return differenceInSeconds(now, Date.parse(startTime));
    } catch (err) {
      // TODO: handle errors from setItem properly
      console.warn(err);
    }
  };

  render() {
    return <Text style={styles.bodyText}>{this.showDisplay()}</Text>;
  }
}

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
});

export default Stopwatch;
