import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  Platform,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';
import TimerIcon from '../../assets/timer.png';
import PlayIcon from '../../assets/play-button.png';
import PauseIcon from '../../assets/pause-button.png';

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
      message: 'Tempo alcançado!',
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
    this.sendScheduledPushNotification(
      this.state.message,
      this.state.contadorMinuto,
    );

    if (Platform.OS === 'ios') {
      BackgroundTimer.start();
    }

    let intervalId = BackgroundTimer.setInterval(this.subtractSecond, 1000);

    this.setState({
      intervalId: intervalId,

      iniciarHabilitado: false,
      pausarHabilitado: true,
      somarHabilitado: true,
      pararHabilitado: true,
    });
  };

  pauseTimer = () => {
    BackgroundTimer.clearInterval(this.state.intervalId);
    this.setState({
      iniciarHabilitado: true,
      pausarHabilitado: false,
      pararHabilitado: false,
      somarHabilitado: true,
    });
  };

  stopTimer = () => {
    BackgroundTimer.clearInterval(this.state.intervalId);
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

  setTimer(minutes, pushMessage) {
    let minutoAtual = this.state.contadorMinuto;
    let minutoSomado = minutoAtual + parseInt(minutes, 10);
    this.setState({
      message: pushMessage,
      contadorMinuto: minutoSomado,

      iniciarHabilitado: true,
      pararHabilitado: true,
      somarHabilitado: true,
    });
  }

  sendPushNotification(pushMessage) {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'beerh-01', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.

      /* iOS and Android properties */
      title: 'BeerH', // (optional)
      message: pushMessage, // (required)
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  }

  sendScheduledPushNotification(pushMessage, time) {
    console;
    PushNotification.localNotificationSchedule({
      /* Android Only Properties */
      channelId: 'beerh-01', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.

      /* iOS and Android properties */
      title: 'BeerH', // (optional)
      message: pushMessage, // (required)
      userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)

      date: new Date(Date.now() + time * 60 * 1000), // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
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
          <View marginLeft={3}>
            <View>
              {this.state.iniciarHabilitado ? (
                <TouchableHighlight
                  style={styles.timerContainer}
                  onPress={this.startTimer}
                  disabled={!this.state.iniciarHabilitado}>
                  <Image source={PlayIcon} style={styles.imageStyle} />
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  style={styles.buttonsContainer}
                  onPress={this.pauseTimer}
                  disabled={!this.state.pausarHabilitado}>
                  <Image source={PauseIcon} style={styles.imageStyle} />
                </TouchableHighlight>
              )}
            </View>
          </View>
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
    width: 22,
    height: 22,
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
