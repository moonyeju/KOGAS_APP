import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import SignInScreen from '../screens/SignInScreen';
import MainStack from './MainStack';
import { url } from '../url';

const RootStack = createStackNavigator();

const Navigation = () => {
  const [session, setSession] = useState(''); // 세션 정보가 유효한지 여부

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
        console.log('서버에서 받은 세션 정보index:', data);
        if (data) {
        setSession(data.user);
      }
      } else {
        console.error('세션 정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={session!==undefined ? 'Main' : 'Login'}  // 세션 정보에 따라 초기 라우트 설정
        //initialRouteName={'Login'}  // 세션 정보에 따라 초기 라우트 설정
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Login" component={SignInScreen} />
        <RootStack.Screen name="Main" component={MainStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
