import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  TextInput,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {styles} from './styles';
import {groupService} from '../../services/groupService';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../../statics/Statics';
import {format, parseISO} from 'date-fns';
import SadFace from '../../../assets/sad.png';

const emptyList: Object = [];

function GroupDetailsScreen({navigation, route}) {
  const [loading, isLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const [group, setGroup] = useState(emptyList);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);
      if (value !== null) {
        const data = JSON.parse(value);
        setUserData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect((): void => {
    getUserData();
  }, []);

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
        <View style={styles.detailsBody}>
          <Text style={styles.groupName}>{group.name}</Text>
          <Text>Desde {group.creationDate}</Text>
          <Text>Membros</Text>
          <ActionButton buttonColor="#818181">
            <ActionButton.Item
              buttonColor="#1abc9c"
              title="Exportar receita"
              onPress={() => this.openExportModal()}>
              <Image source={SadFace} style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#D3C72E"
              title="Editar"
              onPress={() => this.goToEditView(this.state.currentRecipe)}>
              <Image source={SadFace} style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="#FF2424"
              title="Apagar"
              onPress={() => this.openModal()}>
              <Image source={SadFace} style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </View>
      )}
    </View>
  );
}

export default GroupDetailsScreen;
