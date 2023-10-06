import React, {useState, useRef, useEffect} from 'react';
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
import TextInput, {IconNames, ReturnKeyTypes} from '../components/TextInput';
import PropTypes from 'prop-types';
import {url} from '../url';

const SignInScreen = ({navigation}) => {
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

  const handleFailure = error => {
    Alert.alert('알림', error, [
      {
        text: '확인',
        onPress: () => {
          setIsLoading(false);
          setId('');
          setPassword('');
        },
      },
    ]);
  };

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        const loginResponse = await fetch(`${url}/login`, {
          method: 'POST',
          body: JSON.stringify({
            username: id,
            password: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          console.log('ssdata' + loginData.status);
          Alert.alert(loginData.message);
          navigation.navigate('Main');
        } else {
          handleFailure(loginData.message);
        }
      } catch (error) {
        handleFailure('로그인 요청 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Image source={require('../img/logo.png')} style={styles.image} />
          <Text style={[styles.textContainer, {alignSelf: 'center'}]}>
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
    fontSize: 30,
    justifyContent: 'flex-start',
    fontWeight: '900',
  },
});

export default SignInScreen;
