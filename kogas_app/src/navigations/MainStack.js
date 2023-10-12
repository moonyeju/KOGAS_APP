import {Button, Text, View, Image, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomStack from './BottomStack';
import ListDetailScreen from '../screens/ListDetailScreen';
import {useNavigation} from '@react-navigation/native';
import {BLACK, GRAY, PRIMARY} from '../color';
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
        if (Object.keys(data).length === 0) {
          Alert.alert('세션이 만료되었습니다.');
          // 데이터가 비어있으면 로그인 화면으로 이동
          navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        } else {
          // 데이터가 비어있지 않으면 정보 설정
          setUser(data.user);
          setDepartment(data.department);
        }
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
        headerStyle: {
          height: 75,
          // backgroundColor: GRAY,
        },
        headerTitle: () => (
          <Image
            source={require('../img/logo.png')}
            style={{
              width: 150,
              height: 150,
              resizeMode: 'contain',
              // justifyContent: 'center',
              // alignItems: 'center',
              // flex: 1,
            }}
          />
        ),
        headerTitleAlign: 'center',
        headerRight: () => (
          <View
            style={{
              marginRight: 10,
              // marginTop: 41,
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 'bold',
                color: BLACK,
                marginRight: 5,
              }}>
              {department}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: BLACK,
              }}>
              {user}
            </Text>
          </View>
        ),
      }}>
      <Stack.Screen
        name="BottomHome"
        component={BottomStack}
        options={{
          headerLeft: null, // 뒤로 가기 버튼 숨김
        }}
      />
      <Stack.Screen
        name="ListDetail"
        component={ListDetailScreen}
        // options={{
        //   headerTitle: () => (
        //     <Image
        //       source={require('../img/logo.png')}
        //       style={{
        //         width: 150,
        //         height: 150,
        //         resizeMode: 'contain',
        //         marginTop: 5,
        //       }}
        //     />
        //   ),
        //   headerTitleAlign: 'center',
        // }}
      />
    </Stack.Navigator>
  );
};
export default MainStack;
