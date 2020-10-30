import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

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
    };
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
    let intervalId = setInterval(this.addSecond, 1000);
    this.setState({
      intervalId: intervalId,

      iniciarHabilitado: false,
      pausarHabilitado: true,
      pararHabilitado: true,
    });
  };

  pauseStopwatch = () => {
    clearInterval(this.state.intervalId);

    this.setState({
      iniciarHabilitado: true,
      pausarHabilitado: false,
      pararHabilitado: false,
    });
  };

  stopStopwatch = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      pausarHabilitado: false,
      pararHabilitado: false,
      zerarHabilitado: true,
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
      contadorSegundo: parseInt(time.slice(6, 8), 10),
      contadorMinuto: parseInt(time.slice(3, 5), 10),
      contadorHora: parseInt(time.slice(0, 2), 10),
    });
  }

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
