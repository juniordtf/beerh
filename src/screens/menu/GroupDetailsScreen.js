import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  Image,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {styles} from './styles';
import {groupService} from '../../services/groupService';
import AsyncStorage from '@react-native-community/async-storage';
import {AUTH_DATA_KEY} from '../../statics/Statics';
import {format, parseISO} from 'date-fns';
import Add from '../../../assets/add.png';
import Garbage from '../../../assets/garbage.png';
import Pen from '../../../assets/pen.png';
import GroupIcon from '../../../assets/people.png';

const emptyList: Object = [];

function GroupDetailsScreen({navigation, route}) {
  const [loading, isLoading] = useState(false);
  const [userData, setUserData] = useState('');
  const [group, setGroup] = useState(emptyList);
  const [createdAt, setCreatedAt] = useState('');
  const [imageUri, setImageUri] = useState('');

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

    const getGroupData = async () => {
      if (route.params?.group) {
        const groupData = route.params.group;
        setGroup(groupData);
      }
    };

    getGroupData();

    if (group !== undefined && group.length > 0) {
      const date = format(parseISO(group.createdAt), 'dd/MM/yyyy');
      setCreatedAt(date);

      if (group.avatar !== null && group.avatar !== undefined) {
        console.log('http://192.168.15.5:8001/v1/uploads/' + group.avatar);
        setImageUri('http://192.168.15.5:8001/v1/uploads/' + group.avatar);
      }
    }
  }, [route.params?.group, group]);

  const goToAddMember = (currentGroup) => {
    navigation.navigate('Adicionar membro', {
      group: currentGroup,
    });
  };

  const goToEditGroup = (currentGroup) => {
    navigation.navigate('Editar grupo', {
      group: currentGroup,
    });
  };

  const deleteGroup = async (currentGroup) => {
    if (userData.id === currentGroup.ownerId) {
      isLoading(true);
      await groupService.deleteGroup(userData, currentGroup.id);
      isLoading(false);
    }
  };

  const renderMembersData = ({item}) => {
    console.log(item);
    return (
      <View>
        <View style={styles.menuItemImage}>
          <Text style={styles.groupName}>{item.name}</Text>
        </View>
        <View style={styles.line} />
      </View>
    );
  };

  const renderGroupData = () => {
    var date = '';
    if (group.createdAt !== null && group.createdAt !== undefined) {
      date = format(parseISO(group.createdAt), 'dd/MM/yyyy');
      console.log(date);
      //setCreatedAt(date);
    }
    var imgUri = '';
    if (group.avatar !== null && group.avatar !== undefined) {
      console.log('http://192.168.15.5:8001/v1/uploads/' + group.avatar);
      imgUri = 'http://192.168.15.5:8001/v1/uploads/' + group.avatar;
    }

    console.log('Img Uri: ' + imgUri);

    return (
      <View>
        <View style={styles.centeredTitleContainer}>
          {imgUri !== '' ? (
            <Image style={styles.groupAvatarImage} source={{uri: imgUri}} />
          ) : (
            <Image style={styles.groupAvatarImage} source={GroupIcon} />
          )}
          <Text style={styles.detailsTitle}>{group.name}</Text>
        </View>
        <View style={styles.detailsBody}>
          <Text style={styles.bodyText}>{group.description}</Text>
          <Text style={styles.bodyText}>Desde: {date}</Text>
          <Text style={styles.bodyText}>Membros:</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={group.members}
              renderItem={renderMembersData}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={'#000'} animating={true} size="small" />
      ) : (
        <View style={styles.detailsPage}>
          {renderGroupData()}

          {group.ownerId === userData.id ? (
            <ActionButton buttonColor="#818181">
              <ActionButton.Item
                buttonColor="#1abc9c"
                title="Adicionar membro"
                onPress={() => goToAddMember(group)}>
                <Image source={Add} style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#D3C72E"
                title="Editar"
                onPress={() => goToEditGroup(group)}>
                <Image source={Pen} style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#FF2424"
                title="Excluir"
                onPress={() => deleteGroup(group)}>
                <Image source={Garbage} style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          ) : (
            <View />
          )}
        </View>
      )}
    </View>
  );
}

export default GroupDetailsScreen;
