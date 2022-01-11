import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d1d1d1',
  },
  menuHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    backgroundColor: '#d1d1d1',
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
});
