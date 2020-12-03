import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import HomeStack from './homeStack';
import AboutStack from './aboutStack';

const RootDrawerNavigator = createDrawerNavigator({
  Itineraries: {
    screen: HomeStack,
  },
  Upload: {
    screen: AboutStack,
  },
});

export default createAppContainer(RootDrawerNavigator);
