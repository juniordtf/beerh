import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fcff',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
    backgroundColor: '#d1d1d1',
  },
  menuHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 120,
    backgroundColor: '#f9fcff',
  },
  menuHeaderText: {
    marginLeft: 12,
    fontSize: 18,
    textAlignVertical: 'center',
  },
  menuItem: {
    padding: 15,
    marginRight: 0,
    marginLeft: 0,
    borderBottomColor: '#d1d1d1',
    borderBottomWidth: 1,
    backgroundColor: '#929191',
  },
  menuItemText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    backgroundColor: '#929191',
  },
  menuItemImage: {
    marginLeft: 15,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  inputField: {
    marginTop: 5,
    marginBottom: 10,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  confirmButtonContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: 120,
    height: 40,
    backgroundColor: '#65FF14',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  listContainer: {
    marginTop: 5,
    marginRight: 5,
  },
  line: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginTop: 2,
  },
  groupName: {
    fontSize: 18,
  },
});
