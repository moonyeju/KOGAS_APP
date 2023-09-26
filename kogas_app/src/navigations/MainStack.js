import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomStack from './BottomStack';
import ListDetailScreen from '../screens/ListDetailScreen';
import {useNavigation} from '@react-navigation/native';
import { PRIMARY } from '../color';
const Stack = createStackNavigator();


const MainStack = () => {
  const navigation = useNavigation();
  return (
      <Stack.Navigator initialRouteName="BottomHome" screenOptions={{
        title: 'KOGAS',
        tabBarActiveTintColor: PRIMARY.DEFAULT,
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: {fontWeight: '700'},
      }}>
          <Stack.Screen
        name="BottomHome"
        component={BottomStack}
        
      />
      <Stack.Screen name="ListDetail"
        component={ListDetailScreen}/>
      </Stack.Navigator>
  );
};
export default MainStack;
