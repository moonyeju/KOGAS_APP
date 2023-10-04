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
        fetch(`${url}/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: id,
            password: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
            try {
              //await SecureStore.setItemAsync('Token', token);
              // 로그인 성공 후 메인 화면으로 이동
              console.log("성공")
              Alert.alert('로그인 성공');
              try {
                const response = await fetch(`${url}/`); // 세션 정보를 가져오는 엔드포인트로 변경
                if (response.ok) {
                  console.log('세션성공');
                    navigation.navigate('Main');
                } else {
                  console.error('세션 정보를 가져오는 데 실패했습니다.');
                }
              } catch (error) {
                console.error('오류:', error);
              }
            } catch (e) {
              console.log("실패")
              Alert.alert('로그인 실패');
              setIsLoading(false);
            }
      } catch (e) {
        console.log("실패")
        Alert.alert('로그인 실패', e, [
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
