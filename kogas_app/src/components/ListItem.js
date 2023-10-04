import {Pressable, StyleSheet, Text, View} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import { BLACK } from '../color';
import { useEffect, useState } from 'react';

const ListItem = memo(({name, item}) => {
  const navigation = useNavigation();
  const [stageMessage, setStageMessage] = useState('');

  useEffect(() => {
  if (item.stage === 0) {
    setStageMessage('서명 진행중');
  } else if (item.stage === -1) {
    setStageMessage('반려 처리');
  } else if (item.stage >= 1) {
    setStageMessage(`${item.stage}차 서명완료`);
  }
  }, [stageMessage]);
  
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ListDetail', {
            document_id: item.document_id,
            document_name: item.document_name,
            main_department: item.main_department,
            reg_date: item.reg_date,
            name: item.name, 
            stage: stageMessage
          });
    }}
    hitSlop={10}
    >
      <View style={styles.container}>
        <View>
          <Text>{stageMessage}</Text>
          <Text>제목: {item.document_name}</Text>
          <Text>기안자: {item.main_department} {item.name}</Text>
        </View>

        <View>
          <Text>기안일자: {item.reg_date}</Text>
        </View>
      </View>
    </Pressable>
  );
});

ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical:10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: BLACK,
    borderWidth: 1,
    
  },
});

export default ListItem;
