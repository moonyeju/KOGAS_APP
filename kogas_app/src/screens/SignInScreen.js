import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  Alert,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from '../components/Button';
import TextInput, { IconNames, ReturnKeyTypes } from '../components/TextInput';
import PropTypes from 'prop-types';
import {url} from '../url';

const SignInScreen = ({ navigation }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(!id || !password);
  }, [id, password]);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        // 서버로 보낼 데이터 생성
        const data = {
                username: id,
                password: password
            };
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                
            });// 서버의 실제 엔드포인트로 변경해야 합니다.
        if (response.status === 200) {
          // 로그인 성공 후 메인 화면으로 이동
          Alert.alert('로그인 성공');
          navigation.navigate('Main');
        }else {
          Alert.alert('아이디 또는 비밀번호를 다시 확인해주세요.');
          setIsLoading(false);
        }
      } catch (error) {
        Alert.alert('로그인 실패', error.message, [
          {
            text: 'Ok',
            onPress: () => setIsLoading(false),
          },
        ]);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <Text style={styles.text}>스마트 전자서명 시스템</Text>
        <View style={styles.view}>
          <TextInput
            value={id}
            onChangeText={(text) => setId(text.trim())}
            title={'아이디'}
            returnKeyType={ReturnKeyTypes.NEXT}
            iconName={IconNames.ID}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <TextInput
            ref={passwordRef}
            value={password}
            onChangeText={(text) => setPassword(text.trim())}
            title={'비밀번호'}
            secureTextEntry
            iconName={IconNames.PASSWORD}
            onSubmitEditing={onSubmit}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={'로그인'}
              onPress={onSubmit}
              disabled={disabled}
              isLoading={isLoading}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    width: '70%',
  },
  view2: {
    width: '65%',
  },
  buttonContainer: {
    padding: 5,
    marginTop: 10,
  },
  textContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 5,
    justifyContent: 'space-evenly',
  },
  text: {
    fontSize: 25,
    padding: 30,
    fontWeight: 'bold',
  },

  line: { flex: 1, height: 1, backgroundColor: 'black' },
});

export default SignInScreen;
