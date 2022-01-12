import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from 'react-native';
import {useAuth} from '../../contexts/Auth';
import BeerhIcon from '../../../assets/beerhIcon.png';

import {styles} from './styles';

function CreateAccountScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const auth = useAuth();
  let errors = {};

  function handleValidation() {
    let formIsValid = true;

    //Name
    if (name.trim() === '') {
      formIsValid = false;
      errors.name = 'O campo nome é obrigatório';
    }

    if (name.trim() !== '' && name !== undefined) {
      if (name.match(/\d/)) {
        formIsValid = false;
        errors.name = 'O campo nome deve conter apenas letras';
      }
    }

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

  const signUp = async () => {
    if (handleValidation()) {
      isLoading(true);
      let userData = {name, email, password};
      await auth.signUp(userData, navigation);
      errors = {};
    } else {
      let text = '';

      if (errors.name !== undefined) text = errors.name + '\n';
      if (errors.email !== undefined) text += errors.email + '\n';
      if (errors.password !== undefined) text += errors.password + '\n';
      if (errors.confirmPassword !== undefined)
        text += errors.confirmPassword + '\n';

      Alert.alert('Atençāo', text);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View>
          <View style={styles.imageContainer}>
            <Image source={BeerhIcon} />
            <Text style={styles.logoText}>Cervejaria BeerH</Text>
          </View>
          <Text>Nome</Text>
          <TextInput
            onChangeText={(p) => setName(p)}
            value={name}
            placeholder="Nome"
            underlineColorAndroid="transparent"
            style={styles.inputField}
            width={250}
          />
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
            <Button title="Criar conta" onPress={signUp} />
          </View>
        </View>
      )}
    </View>
  );
}

export default CreateAccountScreen;
