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
import {useAuth} from '../../contexts/Auth';

function PasswordRecoverScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const route = useRoute();
  const auth = useAuth();

  const sendToken = async () => {
    isLoading(true);
    await auth.forgotPassword(email, navigation);
    isLoading(false);
  };

  useEffect((): void => {
    let insertedEmail = route.params.email;
    setEmail(insertedEmail);
  }, [route.params.email]);

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
              Insira o seu e-mail no campo abaixo para que possamos enviar um
              token para troca de senha:
            </Text>
            <Text>E-mail</Text>
            <TextInput
              onChangeText={(p) => setEmail(p)}
              value={email}
              placeholder="E-mail"
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
            <View style={styles.mainButton}>
              <Button title="Enviar" onPress={sendToken} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default PasswordRecoverScreen;
