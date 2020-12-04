import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import HomeStack from './homeStack';
import UploadStack from './uploadStack';

const RootDrawerNavigator = createDrawerNavigator({
  Itineraries: {
    screen: HomeStack,
  },
  Upload: {
    screen: UploadStack,
  },
});

export default createAppContainer(RootDrawerNavigator);
