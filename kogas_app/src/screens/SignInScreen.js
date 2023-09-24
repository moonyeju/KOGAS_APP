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
import {PRIMARY} from '../color';
import PropTypes from 'prop-types';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = async () => {
    if (!disabled && !isLoading) {
      Keyboard.dismiss();
      setIsLoading(true);
      try {
        try {
          // 로그인 성공 후 메인 화면으로 이동
          navigation.navigate('Main');
        } catch (e) {
          Alert.alert('로그인 실패');
          setIsLoading(false);
        }
      } catch (e) {
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
        <Text style={styles.text}>APP</Text>
        <View style={styles.view}>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text.trim())}
            title={'아이디'}
            returnKeyType={ReturnKeyTypes.NEXT}
            iconName={IconNames.EMAIL}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <TextInput
            ref={passwordRef}
            value={password}
            onChangeText={text => setPassword(text.trim())}
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
    color: PRIMARY.DARK,
    fontWeight: 'bold',
  },

  line: {flex: 1, height: 1, backgroundColor: 'black'},
});

export default SignInScreen;
