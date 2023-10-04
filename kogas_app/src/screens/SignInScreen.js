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
  const [containerWidth, setContainerWidth] = useState(0);
  const [fontSize, setFontSize] = useState(30);

  useEffect(() => {
    setDisabled(!id || !password);
  }, [id, password]);
  useEffect(() => {
    if (containerWidth > 0) {
      setFontSize(containerWidth * 0.8);
    }
  }, [containerWidth]);
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
        <View style={styles.titleContainer}>
          <Image source={require('../img/logo.png')} style={styles.image} />
          <Text
            style={[styles.textContainer, {fontSize}, {alignSelf: 'center'}]}>
            스마트 전자서명 시스템
          </Text>
        </View>
        <View style={styles.viewContainer}>
          <TextInput
            value={id}
            onChangeText={text => setId(text.trim())}
            placeholder={'아이디'}
            returnKeyType={ReturnKeyTypes.NEXT}
            iconName={IconNames.ID}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <TextInput
            ref={passwordRef}
            value={password}
            onChangeText={text => setPassword(text.trim())}
            placeholder={'비밀번호'}
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
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    flex: 1,
    width: '60%',
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewContainer: {
    flex: 2,
    width: '90%',
  },
  buttonContainer: {
    padding: 5,
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    fontSize: 5,
    justifyContent: 'flex-start',
    fontWeight: '900',
  },
});

export default SignInScreen;
