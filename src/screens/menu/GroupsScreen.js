import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import SadFace from '../../../assets/sad.png';
import {groupService} from '../../services/groupService';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../../statics/Statics';
import {format, parseISO} from 'date-fns';

const emptyList: Object = [];

function GroupsScreen({navigation}) {
  const [loading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const [groups, setGroups] = useState(emptyList);
  const [isFetching, setIsFetching] = useState(false);

  const onRefresh = async () => {
    setIsFetching(true);
    await getGroups(userData);
    setIsLoading(false);
    setIsFetching(false);
  };

  const getGroups = async (data) => {
    const _groupsData = await groupService.getAllowedGroups(data);
    setGroups(_groupsData.data);
  };

  useEffect((): void => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const value = await AsyncStorage.getItem(AUTH_DATA_KEY);
        if (value !== null) {
          const data = JSON.parse(value);
          setUserData(data);
          await getGroups(data);
          setIsLoading(false);
          setIsFetching(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  const renderGroupData = ({item}) => {
    const createdAt = format(parseISO(item.createdAt), 'dd/MM/yyyy');

    return (
      <View>
        <TouchableOpacity onPress={() => goToDetailsView(item)}>
          <View style={styles.menuItemImage}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text>Desde {createdAt}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    );
  };

  const goToDetailsView = (currentGroup) => {
    navigation.navigate('Detalhes do grupo', {
      group: currentGroup,
    });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator color={'#000'} animating={true} size="large" />
        </View>
      ) : (
        <View>
          {groups.length === 0 ? (
            <View style={styles.centeredContainer}>
              <Image source={SadFace} style={styles.imageContainer} />
              <Text>Você ainda não faz parte de nenhum grupo</Text>
            </View>
          ) : (
            <View>
              <View style={styles.listContainer}>
                <FlatList
                  data={groups}
                  renderItem={renderGroupData}
                  keyExtractor={(item) => item.id}
                  onRefresh={() => onRefresh()}
                  refreshing={isFetching}
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
