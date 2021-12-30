import React, {useState} from 'react';
import {ActivityIndicator, Button, Text, TextInput, View} from 'react-native';

import {styles} from './styles';
import {useAuth} from '../../contexts/Auth';

function LoginScreen() {
  const [loading, isLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const signIn = async () => {
    isLoading(true);
    let credentials = {email, password};
    await auth.signIn(credentials);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View>
          <Text>E-mail</Text>
          <TextInput
            onChangeText={(p) => setEmail(p)}
            value={email}
            placeholder="Email"
            underlineColorAndroid="transparent"
            width={250}
          />
          <Text>Password</Text>
          <TextInput
            onChangeText={(p) => setPassword(p)}
            value={password}
            placeholder="Password"
            underlineColorAndroid="transparent"
            width={250}
          />
          <Button title="Sign In" onPress={signIn} />
        </View>
      )}
    </View>
  );
}

export default LoginScreen;
