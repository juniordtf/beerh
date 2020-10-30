import * as React from 'react';
import {Text} from 'react-native';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.iniciarCronometro = this.iniciarCronometro.bind(this);
    this.pararCronometro = this.pararCronometro.bind(this);
    this.formatarDisplay = this.formatarDisplay.bind(this);
    this.somarUmMinuto = this.somarUmMinuto.bind(this);
    this.subtrairUmSegundo = this.subtrairUmSegundo.bind(this);

    this.state = {
      contadorSegundo: 0,
      contadorMinuto: 1,

      iniciarHabilitado: true,
      pararHabilitado: false,
      somarHabilitado: true,
    };
  }

  subtractSecond() {
    let segundo = this.state.contadorSegundo;
    let minuto = this.state.contadorMinuto;

    if (minuto >= 1 && segundo === 0) {
      minuto -= 1;
      segundo = 60;
    }
    if (segundo <= 0) {
      segundo = 1;
    }

    segundo -= 1;

    this.setState({
      contadorSegundo: segundo,
      contadorMinuto: minuto,
    });
  }

  formatDisplay() {
    let formatado = '';

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

    return <Text style={estilo.estiloDisplay}>{formatado}</Text>;
  }

  startTimer() {
    let intervalId = setInterval(this.subtrairUmSegundo, 1000);
    this.setState({
      intervalId: intervalId,

      iniciarHabilitado: false,
      somarHabilitado: true,
      pararHabilitado: true,
    });
  }

  stopTimer() {
    clearInterval(this.state.intervalId);
    this.setState({
      contadorSegundo: 0,
      contadorMinuto: 1,

      iniciarHabilitado: true,
      pararHabilitado: false,
      somarHabilitado: true,
    });
  }

  addMinute() {
    let minutoAtual = this.state.contadorMinuto;
    let minutoSomado = minutoAtual + 1;
    this.setState({
      contadorMinuto: minutoSomado,

      iniciarHabilitado: true,
      pararHabilitado: true,
      somarHabilitado: true,
    });
  }
}

const estilo = {
  estiloDisplay: {
    textAlign: 'center',
  },
};
