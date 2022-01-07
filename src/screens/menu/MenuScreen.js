import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import {styles} from './styles';
import {useAuth} from '../../contexts/Auth';

function MenuScreen({navigation}) {
  const [loading, isLoading] = useState(false);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default MenuScreen;
