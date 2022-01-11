import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  TouchableHighlight,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import BeerhIcon from '../../../assets/beerhIcon.png';
import {styles} from './styles';
import {useAuth} from '../../contexts/Auth';

function LoginScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    let credentials = {email, password};
    await auth.signIn(credentials);
  };

  const recoverPassword = () => {
    navigation.navigate('Recuperar senha');
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
            placeholder="Email"
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
