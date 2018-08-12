import { createStackNavigator } from 'react-navigation';
import MapScreen from './screens/Map';

const RootStack = createStackNavigator(
  {
    Map: MapScreen,
  },
  {
    initialRouteName: 'Map',
    navigationOptions: {
      headerStyle: {
        display: 'none',
      }
    },
  }
);

export default RootStack;