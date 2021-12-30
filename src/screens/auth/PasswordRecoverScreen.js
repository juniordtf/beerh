import React, {Component} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {StatusBar} from 'react-native';

class PasswordRecoverScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#000000" />
      </SafeAreaView>
    );
  }
}

export default PasswordRecoverScreen;
