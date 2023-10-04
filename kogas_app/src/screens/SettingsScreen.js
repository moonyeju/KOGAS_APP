import { Alert, StyleSheet, Switch, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY, WHITE } from '../color';
import { useState } from 'react';
import Button from '../components/Button';
import { url } from '../url';

const SettingsScreen = ({ navigation }) => {
  const [alarm, setAlarm] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleSwitchAlarm = () => setAlarm((previousState) => !previousState);
  const toggleSwitchDark = () => setDark((previousState) => !previousState);

  const handleLogout = () => {
    fetch(`${url}/logout`, {
      method: 'POST',
      credentials: 'same-origin'
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          navigation.navigate('Login');
        } else {
          Alert.alert('로그아웃 실패');
        }
      })
      .catch((error) => {
        console.error('로그아웃 중 오류 발생:', error);
        Alert.alert('로그아웃 중 오류가 발생했습니다.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerRadius}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>알림 설정</Text>
          <View style={styles.switchStyle}>
            <Switch
              trackColor={{ false: GRAY, true: PRIMARY.DEFAULT }}
              thumbColor={WHITE}
              ios_backgroundColor={GRAY}
              onValueChange={toggleSwitchAlarm}
              value={alarm}
            />
          </View>
        </View>
        {alarm && (
          <View>
            <Text>시간대별 알림 설정 여부</Text>
          </View>
        )}
        <View style={styles.view}>
          <Button title={'기기 등록'} onPress={() => {}} />
        </View>
        <View style={styles.view}>
          <Button title={'로그아웃'} onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

SettingsScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerRadius: {
    backgroundColor: WHITE,
    flex: 1,
    margin: 25,
    borderRadius: 15,
  },
  textContainer: {
    position: 'relative',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: GRAY,
    paddingVertical: 30,
  },
  text: {
    position: 'absolute',
    left: 0,
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
  },
  switchStyle: {
    position: 'absolute',
    right: 0,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  view: {
    margin: 15,
  },
});

export default SettingsScreen;
