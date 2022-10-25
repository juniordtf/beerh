import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  TouchableHighlight,
} from 'react-native';

import {styles} from './styles';

const emptyList: Object = [];

function AddGroupMemberScreen({navigation, route}) {
  const [loading, isLoading] = useState(false);
  const [group, setGroup] = useState(emptyList);
  const [memberEmail, setMemberEmail] = useState('');

  React.useEffect(() => {
    if (route.params?.group) {
      setGroup(route.params.group);
    }
  }, [route.params?.group]);

  const sendInvitation = () => {};

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View style={styles.detailsPage}>
          <View style={styles.detailsBody}>
            <Text style={styles.formTitle}>
              Informe abaixo o e-mail da pessoa que você deseja convidar para o
              grupo:{' '}
            </Text>
            <TextInput
              onChangeText={(p) => setMemberEmail(p)}
              value={memberEmail}
              placeholder="E-mail"
              underlineColorAndroid="transparent"
              style={styles.inputField}
              width={250}
            />
          </View>
          <TouchableHighlight
            style={styles.confirmButtonContainer}
            onPress={() => sendInvitation()}>
            <Text style={styles.confirmButtonText}>Enviar convite</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

export default AddGroupMemberScreen;
