import React, {useState} from 'react';
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
import BeerhIcon from '../../../assets/beerhIcon.png';
import {styles} from './styles';
import {useAuth} from '../../contexts/Auth';

function LoginScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  let errors = {};

  function handleValidation() {
    let formIsValid = true;

    //Email
    if (email.trim() === '') {
      formIsValid = false;
      errors.email = 'O campo e-mail é obrigatório';
    }

    if (email.trim() !== '' && email !== undefined) {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.email = 'O e-mail fornecido não é válido';
      }
    }

    //Password
    if (password.trim() === '') {
      formIsValid = false;
      errors.password = 'O campo password é obrigatório';
    } else if (password.length < 6) {
      formIsValid = false;
      errors.password = 'O password deve possuir ao menos 6 caracteres';
    }

    return formIsValid;
  }

  const signIn = async () => {
    if (handleValidation()) {
      isLoading(true);
      let credentials = {email, password};
      const loginResult = await auth.signIn(credentials);
      isLoading(loginResult);
      errors = {};
    } else {
      let text = '';

      if (errors.email !== undefined) text = errors.email + '\n';
      if (errors.password !== undefined) text += errors.password + '\n';

      Alert.alert('Atençāo', text);
    }
  };

  const recoverPassword = () => {
    navigation.navigate('Recuperar senha', {email});
  };

  const signUp = () => {
    navigation.navigate('Criar conta');
  };

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
          <Text>E-mail</Text>
          <TextInput
            onChangeText={(p) => setEmail(p)}
            value={email}
            placeholder="E-mail"
            underlineColorAndroid="transparent"
            style={styles.inputField}
            width={250}
          />
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
          <TouchableHighlight
            style={styles.recoverButton}
            onPress={recoverPassword}>
            <Text style={styles.menuItemText}>Esqueci minha senha</Text>
          </TouchableHighlight>
          <View style={styles.mainButton}>
            <Button title="Fazer login" onPress={signIn} />
          </View>
          <View style={styles.signUpButton}>
            <Button title="Criar conta" onPress={() => signUp()} />
          </View>
        </View>
      )}
    </View>
  );
}

export default LoginScreen;
