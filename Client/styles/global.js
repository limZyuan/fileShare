import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleText: {
    fontFamily: 'nunito-bold',
    fontSize: 18,
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 6,
    textAlign: 'center',
  },
  searchBar: {
    fontSize: 20,
    paddingLeft: 10,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: '#3a7c91',
    borderBottomWidth: 2,
  },
});
