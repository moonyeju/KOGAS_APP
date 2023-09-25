import { StyleSheet, Switch, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { GRAY, PRIMARY, WHITE } from '../color';
import { useState } from 'react';

const SettingsScreen = () => {
  const [alarm, setAlarm] = useState(false);
  const [dark, setDark] = useState(false);

  const toggleSwitchAlarm = () => setAlarm((previousState) => !previousState);
  const toggleSwitchDark = () => setDark((previousState) => !previousState);

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
        {alarm && ( // 알림 설정이 켜져 있을 때만 하단 텍스트를 표시
          <View>
            <Text>하단 텍스트</Text>
          </View>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.text}>다크 모드</Text>
          <View style={styles.switchStyle}>
            <Switch
              trackColor={{ false: GRAY, true: PRIMARY.DEFAULT }}
              thumbColor={WHITE}
              ios_backgroundColor={GRAY}
              onValueChange={toggleSwitchDark}
              value={dark}
            />
          </View>
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
});
export default SettingsScreen;