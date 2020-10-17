import React from 'react';
import {Text, View, StatusBar, StyleSheet, Image} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import Beach from '../../assets/beach.png';

class BrewScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <View
          style={{
            width: 100,
            height: 40,
            marginLeft: 15,
            marginTop: 20,
            backgroundColor: '#8DDFF6',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#fff',
          }}>
          <Text style={{color: '#000000', fontSize: 20}}>Day off</Text>
        </View>
        <Image
          source={Beach}
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 30,
          }}
        />
        <View style={styles.container}>
          <Text style={styles.bodyText}>
            Nenhuma brassagem agendada para hoje...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {marginTop: 20, justifyContent: 'center', alignItems: 'center'},
  bodyText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
});

export default BrewScreen;
