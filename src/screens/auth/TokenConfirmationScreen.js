import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  TouchableHighlight,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import BeerhIcon from '../../../assets/beerhIcon.png';
import {styles} from './styles';

function ToeknConfirmationScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [confirmToken, setConfirmToken] = useState('');
  const route = useRoute();

  const checkToken = async () => {
    isLoading(true);

    if (token === confirmToken) {
      navigation.navigate('Trocar senha', {email, token});
    } else {
      Alert.alert(
        'O token inserido não confere com o que foi enviado para o email!',
      );
      isLoading(false);
    }
    isLoading(false);
  };

  useEffect((): void => {
    let receivedToken = route.params.token;
    setToken(receivedToken);
    let receivedEmail = route.params.email;
    setEmail(receivedEmail);
  }, [route.params.token, route.params.email]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View>
          <View style={styles.imageContainer}>
            <Image source={BeerhIcon} />
            <Text style={styles.logoText}> Cervejaria BeerH</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyText}>
              Insira o token de confirmação que enviamos para seu e-mail:
            </Text>
            <Text>Token</Text>
            <TextInput
              onChangeText={(p) => setConfirmToken(p)}
              value={confirmToken}
              placeholder="Token"
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
            <View style={styles.mainButton}>
              <Button title="Enviar" onPress={checkToken} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default ToeknConfirmationScreen;
