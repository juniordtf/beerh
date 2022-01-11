import React, {useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import {useAuth} from '../../contexts/Auth';
import BeerhIcon from '../../../assets/beerhIcon.png';

import {styles} from './styles';

function CreateAccountScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();

  const signUp = async () => {
    isLoading(true);
    let userData = {name, email, password};
    await auth.signUp(userData, navigation);
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
          <Text>Name</Text>
          <TextInput
            onChangeText={(p) => setName(p)}
            value={name}
            placeholder="Name"
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
