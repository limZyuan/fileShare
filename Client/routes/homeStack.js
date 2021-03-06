import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/home';
import ItineraryDetails from '../screens/itineraryDetails';
import Header from '../shared/header';
import React from 'react';

// top one will be shown by default

// each screen will be automatically given the prop navigation by the library.
// allows for navigation between screens.
const screens = {
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <Header navigation={navigation} title="Explore" />,
        headerStyle: {
          height: 70,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      };
    },
  },
  ItineraryDetails: {
    screen: ItineraryDetails,
    navigationOptions: {
      title: 'Itinerary Details',
      headerStyle: {
        height: 70,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    },
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: {
      backgroundColor: '#eee',
      height: 100,
    },
  },
});

export default HomeStack;
