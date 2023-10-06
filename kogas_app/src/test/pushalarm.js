// //App.js
// import React, {useEffect} from 'react';
// import {View} from 'react-native';
// import messaging from '@react-native-firebase/messaging';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('[Background Remote Message]', remoteMessage);
// });

// const pushalarm = () => {
//   const getFcmToken = async () => {
//     const fcmToken = await messaging().getToken();
//     console.log('[FCM Token] ', fcmToken);
//   };

//   useEffect(() => {
//     getFcmToken();
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('[Remote Message] ', JSON.stringify(remoteMessage));
//     });
//     return unsubscribe;
//   }, []);

//   return <View></View>;
// };

// export default pushalarm;

import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const pushalarm = () => {
  const [deviceToken, setDeviceToken] = useState('');

  //   useEffect(() => {
  //     // Firebase 메시지 서비스 초기화
  //     messaging()
  //       .getToken()
  //       .then(token => {
  //         console.log('Device Token:', token);
  //         setDeviceToken(token);
  //       })
  //       .catch(error => {
  //         console.error('토큰을 가져오는 중 오류 발생:', error);
  //       });

  //     // 백그라운드에서 메시지 처리
  //     messaging().setBackgroundMessageHandler(async remoteMessage => {
  //       console.log('백그라운드 메시지 수신:', remoteMessage);
  //       // 백그라운드에서 메시지를 처리하는 로직을 여기에 추가할 수 있습니다.
  //     });

  //     // 앱이 실행 중일 때 메시지 처리
  //     const unsubscribe = messaging().onMessage(async remoteMessage => {
  //       console.log('앱 실행 중 메시지 수신:', remoteMessage);
  //       // 앱이 실행 중일 때 메시지를 처리하는 로직을 여기에 추가할 수 있습니다.
  //       Alert.alert('새로운 메시지 도착', remoteMessage.notification.title);
  //     });

  //     // Cleanup 함수 등록
  //     return unsubscribe;
  //   }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Device Token: {deviceToken}</Text>
      <Button
        title="토큰 가져오기"
        onPress={async () => {
          try {
            const token = await messaging().getToken();
            console.log('Device Token:', token);
            setDeviceToken(token);
            Alert.alert('기기가 등록되었습니다.');
          } catch (error) {
            console.error('토큰을 가져오는 중 오류 발생:', error);
            Alert.alert('토큰을 가져오는 중 오류가 발생했습니다.');
          }
        }}
      />
    </View>
  );
};

export default pushalarm;
