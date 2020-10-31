import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import TimerIcon from '../../assets/timer.png';
import PlayIcon from '../../assets/play-button.png';
import PauseIcon from '../../assets/pause-button.png';
import StopIcon from '../../assets/stop-button.png';

class Timer extends Component {
  constructor(props) {
    super(props);
    window.timerComponent = this;
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.showDisplay = this.showDisplay.bind(this);
    this.addMinute = this.addMinute.bind(this);
    this.subtractSecond = this.subtractSecond.bind(this);

    this.state = {
      contadorSegundo: 0,
      contadorMinuto: 1,

      iniciarHabilitado: true,
      pausarHabilitado: false,
      pararHabilitado: false,
      somarHabilitado: true,
    };
  }

  subtractSecond = () => {
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
  };

  showDisplay = () => {
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

    return formatado;
  };

  startTimer = () => {
    let intervalId = setInterval(this.subtractSecond, 1000);
    this.setState({
      intervalId: intervalId,

      iniciarHabilitado: false,
      pausarHabilitado: true,
      somarHabilitado: true,
      pararHabilitado: true,
    });
  };

  pauseTimer = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      iniciarHabilitado: true,
      pausarHabilitado: false,
      pararHabilitado: false,
      somarHabilitado: true,
    });
  };

  stopTimer = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      contadorSegundo: 0,
      contadorMinuto: 1,

      iniciarHabilitado: true,
      pausarHabilitado: false,
      pararHabilitado: false,
      somarHabilitado: true,
    });
  };

  addMinute = () => {
    let minutoAtual = this.state.contadorMinuto;
    let minutoSomado = minutoAtual + 1;
    this.setState({
      contadorMinuto: minutoSomado,

      iniciarHabilitado: true,
      pararHabilitado: true,
      somarHabilitado: true,
    });
  };

  setTimer(minutes) {
    let minutoAtual = this.state.contadorMinuto;
    let minutoSomado = minutoAtual + parseInt(minutes, 10);
    this.setState({
      contadorMinuto: minutoSomado,

      iniciarHabilitado: true,
      pararHabilitado: true,
      somarHabilitado: true,
    });
  }

  render() {
    return (
      <View>
        <View style={styles.rowContainer}>
          <View style={styles.timerContainer}>
            <Image source={TimerIcon} />
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.bodyText}>{this.showDisplay()}</Text>
          </View>
        </View>
        <View style={styles.rowContainer} marginLeft={5}>
          <TouchableHighlight
            style={styles.timerContainer}
            onPress={this.startTimer}
            disabled={!this.state.iniciarHabilitado}>
            <Image source={PlayIcon} style={styles.imageStyle} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonsContainer}
            onPress={this.pauseTimer}
            disabled={!this.state.pausarHabilitado}>
            <Image source={PauseIcon} style={styles.imageStyle} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonsContainer}
            onPress={this.stopTimer}
            disabled={!this.state.pararHabilitado}>
            <Image source={StopIcon} style={styles.imageStyle} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const marginHorizontal = 2;
const marginVertical = 2;

const styles = StyleSheet.create({
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
  timerContainer: {
    marginTop: marginVertical,
    marginLeft: marginHorizontal,
    marginRight: marginHorizontal,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    marginTop: marginVertical,
    marginRight: marginHorizontal,
    marginLeft: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default Timer;
