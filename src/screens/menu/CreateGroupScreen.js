import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import {styles} from './styles';

function CreateGroupScreen({navigation}) {
  const [loading, isLoading] = useState(false);

  return (
    <View style={styles.centeredContainer}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View></View>
      )}
    </View>
  );
}

export default CreateGroupScreen;
