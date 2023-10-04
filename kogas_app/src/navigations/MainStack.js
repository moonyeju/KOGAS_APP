import { Button,Text ,View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomStack from './BottomStack';
import ListDetailScreen from '../screens/ListDetailScreen';
import {useNavigation} from '@react-navigation/native';
import { PRIMARY } from '../color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { url } from '../url';
const Stack = createStackNavigator();


const MainStack = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(''); 
  const [department, setDepartment] = useState(''); 
  useEffect(() => {
     // 세션 정보를 가져옴
    getSession();
  }, []); // 여기에서는 세션 정보를 한 번만 가져오도록 수정

  // 세션 정보를 가져오는 함수
  const getSession = async () => {
    try {
      const response = await fetch(`${url}/`); // 세션 정보를 가져오는 엔드포인트로 변경
      if (response.ok) {
        const data = await response.json();
        console.log('서버에서 받은 세션 정보mainstack:', data);
        setUser(data.user);
        setDepartment(data.department);
      } else {
        console.error('세션 정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };
  
  return (
      <Stack.Navigator initialRouteName="BottomHome" screenOptions={{
        title: 'KOGAS',
        tabBarActiveTintColor: PRIMARY.DEFAULT,
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
      headerTitleStyle: { fontWeight: '700' },
        headerRight: () => (
    <TouchableOpacity onPress={() => {/* 오른쪽 헤더 버튼 눌렀을 때 수행할 동작 */}}>
            <View><Text>{department}</Text>
            <Text>{user}</Text></View>
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
