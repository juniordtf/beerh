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
import SadFace from '../../../assets/sad.png';

function GroupsScreen({navigation}) {
  const [loading, isLoading] = useState(false);

  return (
    <View style={styles.centeredContainer}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View>
          <Image source={SadFace} style={styles.imageContainer} />
          <Text>Você ainda não faz parte de nenhum grupo.</Text>
        </View>
      )}
    </View>
  );
}

export default GroupsScreen;
