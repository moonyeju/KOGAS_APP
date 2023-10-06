import {Button, Text, View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomStack from './BottomStack';
import ListDetailScreen from '../screens/ListDetailScreen';
import {useNavigation} from '@react-navigation/native';
import {PRIMARY} from '../color';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import {url} from '../url';
import HomeScreen from '../screens/HomeScreen';
//import {Image} from 'react-native-svg';
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
    <Stack.Navigator
      initialRouteName="BottomHome"
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              /* 오른쪽 헤더 버튼 눌렀을 때 수행할 동작 */
            }}>
            <View style={{marginRight: 12}}>
              <Text style={{textAlign: 'right', fontSize: 12, fontWeight: 700}}>
                {department}
              </Text>
              <Text style={{textAlign: 'right', fontSize: 12, fontWeight: 700}}>
                {user}
              </Text>
            </View>
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen
        name="BottomHome"
        component={BottomStack}
        options={{
          headerLeft: null, // 뒤로 가기 버튼 숨김
          headerTitle: () => (
            <Image
              source={require('../img/logo.png')}
              style={{
                width: 150,
                height: 150,
                resizeMode: 'contain',
                marginTop: 5,
              }}
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen name="ListDetail" component={ListDetailScreen} />
    </Stack.Navigator>
  );
};
export default MainStack;
