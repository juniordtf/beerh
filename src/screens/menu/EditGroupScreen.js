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

function EditGroupScreen({navigation, route}) {
  const [loading, isLoading] = useState(false);
  const [group, setGroup] = useState(emptyList);

  const saveChanges = () => {};

  React.useEffect(() => {
    if (route.params?.group) {
      setGroup(route.params.group);
    }
  }, [route.params?.group]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View style={styles.detailsPage}>
          <View style={styles.detailsBody}>
            <Text style={styles.formTitle}>Nome: </Text>
            <TextInput style={styles.inputField}>{group.name}</TextInput>
            <Text style={styles.formTitle}>Descrição: </Text>
            <TextInput style={styles.inputField}>{group.description}</TextInput>
            <Text style={styles.formTitle}>Avatar: </Text>
            <Image>{group.avatar}</Image>
          </View>
          <TouchableHighlight
            style={styles.confirmButtonContainer}
            onPress={() => saveChanges()}>
            <Text style={styles.confirmButtonText}>Salvar</Text>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}

export default EditGroupScreen;
