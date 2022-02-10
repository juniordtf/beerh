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
import {styles} from './styles';
import SadFace from '../../../assets/sad.png';
import {groupService} from '../../services/groupService';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../../statics/Statics';
import {format, parseISO} from 'date-fns';

const emptyList: Object = [];

function GroupsScreen({navigation}) {
  const [loading, isLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const [groups, setGroups] = useState(emptyList);

  const getUserData = async () => {
    try {
      const value = await AsyncStorage.getItem(AUTH_DATA_KEY);
      if (value !== null) {
        const data = JSON.parse(value);
        setUserData(data);
        console.log(JSON.parse(value));

        getGroups(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGroups = async (data) => {
    const _groupsData = await groupService.getGroups(data);
    setGroups(_groupsData.data);
    console.log(_groupsData);
  };

  useEffect((): void => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderGroupData = ({item}) => {
    const creationDate = format(parseISO(item.creationDate), 'dd/MM/yyyy');

    return (
      <View>
        <TouchableOpacity>
          <View>
            <Text>{item.name}</Text>
            <Text>{creationDate}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  };

  return (
    <View style={styles.centeredContainer}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View>
          {groups === emptyList || groups === null ? (
            <View>
              <Image source={SadFace} style={styles.imageContainer} />
              <Text>Você ainda não faz parte de nenhum grupo.</Text>
            </View>
          ) : (
            <View>
              <View style={styles.listContainer}>
                <FlatList
                  data={groups}
                  renderItem={renderGroupData}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default GroupsScreen;
