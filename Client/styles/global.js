import {StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 15,
    width: '90%',
    color: '#333',
    paddingLeft: 10,
    flexDirection: 'column',
    lineHeight: 25,
    fontFamily: 'Roboto',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 23,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginTop: 8,
    fontSize: 15,
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
    fontSize: 18,
    paddingLeft: 10,
    width: '90%',
    height: '100%',
  },
  searchWrap: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderBottomColor: '#5ca9fb',
    borderBottomWidth: 2,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  uploadText: {
    fontSize: 16,
    color: '#6e6e6e',
    paddingLeft: 0,
    paddingBottom: 20,
    lineHeight: 18,
    fontFamily: 'Roboto',
  },
});
