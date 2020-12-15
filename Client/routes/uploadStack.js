import {createStackNavigator} from 'react-navigation-stack';
import Upload from '../screens/upload';
import Header from '../shared/header';
import React from 'react';

// top one will be shown by default

// each screen will be automatically given the prop navigation by the library.
// allows for navigation between screens.
const screens = {
  Upload: {
    screen: Upload,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => (
          <Header navigation={navigation} title="Upload Itinerary" />
        ),
      };
    },
  },
};

const UploadStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#fff',
      height: 70,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
  },
});

export default UploadStack;
