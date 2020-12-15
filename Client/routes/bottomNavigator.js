import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import HomeStack from './homeStack';
import UploadStack from './uploadStack';
import Icon from 'react-native-vector-icons/FontAwesome';

const RootBottomNavigator = createBottomTabNavigator(
  {
    Itineraries: {
      screen: HomeStack,
    },
    Upload: {
      screen: UploadStack,
    },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let iconName = '';
        let iconColor = '';
        if (routeName === 'Itineraries') {
          iconName = 'search';
          iconColor = focused ? '#3695fb' : '#b7b7b7';
        } else if (routeName === 'Upload') {
          iconName = 'upload';
          iconColor = focused ? '#3695fb' : '#b7b7b7';
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={20} color={iconColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#3695fb',
      inactiveTintColor: '#b7b7b7',
      style: {
        height: 50,
      },
    },
  },
);

export default createAppContainer(RootBottomNavigator);
