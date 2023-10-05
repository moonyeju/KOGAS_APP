import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import SignInScreen from '../screens/SignInScreen';
import MainStack from './MainStack';
import { url } from '../url';
import PDFOpen from '../test/PdfOpen';
import LoadingScreen from '../screens/LoadingScreen';

const RootStack = createStackNavigator();

const Navigation = () => {
  const [session, setSession] = useState(undefined); // 세션 정보가 유효한지 여부
  const [loading, setLoading] = useState(true); // 추가: 로딩 상태
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
        console.log('서버에서 받은 세션 정보index:', data.user);
        if (data) {
          setSession(data.user);
          setLoading(false); // 세션 정보가 준비되었으므로 로딩 완료
          }
      } else {
        console.error('세션 정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };
  if (loading) { // 데이터가 아직 준비되지 않았으면 로딩 화면 표시
    return <LoadingScreen />; // LoadingScreen 컴포넌트를 별도로 정의해야 합니다.
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={session!==undefined ? 'Main' : 'Login'}  // 세션 정보에 따라 초기 라우트 설정
        //initialRouteName={'pdf'}  // 세션 정보에 따라 초기 라우트 설정
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Login" component={SignInScreen} />
        <RootStack.Screen name="Main" component={MainStack} />
        <RootStack.Screen name="pdf" component={PDFOpen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
