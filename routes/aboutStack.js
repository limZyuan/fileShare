import {createStackNavigator} from 'react-navigation-stack';
import About from '../screens/about';
import Header from '../shared/header';
import React from 'react';

// top one will be shown by default

// each screen will be automatically given the prop navigation by the library.
// allows for navigation between screens.
const screens = {
  About: {
    screen: About,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="About" />,
      };
    },
  },
};

const AboutStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {backgroundColor: '#eee', height: 100},
  },
});

export default AboutStack;
