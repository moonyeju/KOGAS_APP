import { Button,Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomStack from './BottomStack';
import ListDetailScreen from '../screens/ListDetailScreen';
import {useNavigation} from '@react-navigation/native';
import { PRIMARY } from '../color';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Stack = createStackNavigator();


const MainStack = () => {
  const navigation = useNavigation();
  const a = '수요공급처 000';
  return (
      <Stack.Navigator initialRouteName="BottomHome" screenOptions={{
        title: 'KOGAS',
        tabBarActiveTintColor: PRIMARY.DEFAULT,
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
      headerTitleStyle: { fontWeight: '700' },
        headerRight: () => (
    <TouchableOpacity onPress={() => {/* 오른쪽 헤더 버튼 눌렀을 때 수행할 동작 */}}>
      <Text>{a}</Text>
    </TouchableOpacity>
  ),
      }}>
          <Stack.Screen
        name="BottomHome"
        component={BottomStack}
        options={{
          headerLeft: null, // 뒤로 가기 버튼 숨김
        }}
      />
      <Stack.Screen name="ListDetail"
        component={ListDetailScreen}/>
      </Stack.Navigator>
  );
};
export default MainStack;
