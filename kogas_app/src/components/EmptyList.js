import {Image, StyleSheet, Text, View} from 'react-native';
import {PRIMARY} from '../color';

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>기록이 없습니다.</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '700',
    color: PRIMARY.DEFAULT,
  },
});
export default EmptyList;
