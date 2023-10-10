import {Pressable, StyleSheet, Text, View} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {BLACK, WHITE, STICK, SHADOW} from '../color';
import {useEffect, useState} from 'react';

const ListItem = memo(({name, item}) => {
  const navigation = useNavigation();
  const [stageMessage, setStageMessage] = useState('');
  const [stickColor, setStickColor] = useState();

  useEffect(() => {
    if (item.stage === 0) {
      setStageMessage('서명 진행중');
      setStickColor(STICK.ING);
    } else if (item.stage === -1) {
      setStageMessage('반려 처리');
      setStickColor(STICK.NO);
    } else if (item.stage >= 1) {
      setStageMessage(`${item.stage}차 서명완료`);
      setStickColor(STICK.COMPLETE);
    }
  }, [stageMessage, stickColor]);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ListDetail', {
          document_id: item.document_id,
          document_name: item.document_name,
          main_department: item.main_department,
          reg_date: item.reg_date,
          name: item.name,
          stage: stageMessage,
        });
      }}
      hitSlop={10}>
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 3,
                height: 14,
                backgroundColor: stickColor,
                marginRight: 5,
                marginLeft: 3,
                marginTop: 4,
                marginBottom: 7,
              }}></View>
            <Text style={{fontWeight: 'bold', fontSize: 13, color: BLACK}}>
              {stageMessage}
            </Text>
          </View>
          <Text
            style={{
              color: BLACK,
              fontWeight: 'bold',
              marginBottom: 5,
              fontSize: 13,
            }}>
            {item.document_name}
          </Text>
          <Text style={{fontSize: 13}}>
            기안자: {item.main_department} {item.name}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{fontSize: 9}}>기안일자: {item.reg_date}</Text>
        </View>
      </View>
    </Pressable>
  );
});

ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flexDirection: 'column',
    marginHorizontal: '4%',
    marginVertical: '2%',
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    borderRadius: 20,
    borderColor: WHITE,
    // borderWidth: 1,
    elevation: 6,
  },
  textContainer: {
    marginVertical: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default ListItem;
