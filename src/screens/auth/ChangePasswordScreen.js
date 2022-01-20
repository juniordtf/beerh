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

function ChangePasswordScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const route = useRoute();
  const auth = useAuth();
  let errors = {};

  function handleValidation() {
    let formIsValid = true;

    //Password
    if (password.trim() === '') {
      formIsValid = false;
      errors.password = 'O campo password é obrigatório';
    } else if (password.length < 6) {
      formIsValid = false;
      errors.password = 'O password deve possuir ao menos 6 caracteres';
    }

    //Confirm Password
    if (confirmPassword.trim() === '') {
      formIsValid = false;
      errors.confirmPassword = 'O campo confirmar password é obrigatório';
    } else if (confirmPassword.length < 6) {
      formIsValid = false;
      errors.confirmPassword =
        'O campo confirmar password deve possuir ao menos 6 caracteres';
    } else if (confirmPassword !== password) {
      formIsValid = false;
      errors.confirmPassword =
        'O campo confirmar password precisa ser idêntico ao campo password';
    }

    return formIsValid;
  }

  const resetEmail = async () => {
    if (handleValidation()) {
      isLoading(true);
      await auth.resetPassword(
        email,
        token,
        password,
        confirmPassword,
        navigation,
      );
      errors = {};
    } else {
      let text = '';

      if (errors.password !== undefined) text = errors.password + '\n';
      if (errors.confirmPassword !== undefined)
        text += errors.confirmPassword + '\n';

      Alert.alert('Atençāo', text);
    }
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
              Insira e confirme sua nova senha nos campos abaixo:
            </Text>
            <Text>Password</Text>
            <TextInput
              onChangeText={(p) => setPassword(p)}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
            <Text>Confirmar Password</Text>
            <TextInput
              onChangeText={(p) => setConfirmPassword(p)}
              value={confirmPassword}
              placeholder="Confirmar password"
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
            <View style={styles.mainButton}>
              <Button title="Enviar" onPress={resetEmail} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default ChangePasswordScreen;
