import {Pressable, StyleSheet, Text, View} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {BLACK, GRAY, PRIMARY, RED} from '../color';

const DetailListItem = memo(({name, item}) => {
  const navigation = useNavigation();
  const [statusMessage, setStatusMessage] = useState('');
  const [statusColor, setStatusColor] = useState('');

  useEffect(() => {
    if (item.status === 'Y') {
      setStatusMessage('서명완료');
      setStatusColor(PRIMARY.DEFAULT);
    } else if (item.status === 'N') {
      setStatusMessage('진행중');
      setStatusColor(BLACK);
    } else if (item.status === 'X') {
      setStatusMessage('반려');
      setStatusColor(RED);
    }
  }, [item.status, statusMessage]);
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={{color: BLACK, fontSize: 14}}>{item.department}</Text>
          <Text style={{color: BLACK, fontSize: 14}}> {item.name}</Text>
        </View>

        <View style={styles.right}>
          <Text style={{color: {statusColor}, fontSize: 14, marginBottom: 10}}>
            {statusMessage}
          </Text>
          <Text style={{fontSize: 12, marginBottom: 4}}>{item.datetime}</Text>
        </View>
      </View>
    </Pressable>
  );
});

DetailListItem.displayName = 'DetailListItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 5,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
});

export default DetailListItem;
