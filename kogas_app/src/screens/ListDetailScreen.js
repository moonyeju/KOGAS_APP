import {FlatList, StyleSheet, Text, View,Button} from 'react-native';
import {GRAY} from '../color';
import DetailListItem from '../components/DetailListItem';
import { useEffect, useState } from 'react';
import { url } from '../url';

const ListDetailScreen = ({ route, navigation }) => {
  const {document_id} = route.params;
  const { document_name } = route.params;
  const { name } = route.params;
  const {main_department} = route.params;
  const {reg_date} = route.params;
  const { stage } = route.params;
  
const [list, setList] = useState([]);
useEffect(() => {
  listOpen();
}, []);

const listOpen = async () => {
  //await SInfo.getItem('SessionId', {}).then(sessionId => {
    //if (sessionId) {
      fetch(`${url}/show_sig`, {
        method: 'POST',
          body: JSON.stringify({
            document_id:document_id
          }),
        headers: {
          'Content-Type': 'application/json',
          //Authorization: `Bearer ${sessionId}`, // 세션 아이디 사용
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('listdetailpage:', data);
        setList(data);
      })
      .catch(error => {
        console.error(error);
      });
    //} else {
    //  console.log('세션 아이디 없음');
    //}
  //});
  };
  
  return (
    
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>{stage}</Text>
      <Text style={styles.title}>{document_name}</Text>
        <Text style={styles.date}>기안자: {main_department} {name}</Text>
        <Text style={styles.date}>기안일자: {reg_date}</Text>
      </View>
      <Button title={'문서보기'}/> 
      <View>
        <Text style={styles.v}>서명 정보</Text>
        <FlatList
        data={list}
        renderItem={({item}) => (
          <DetailListItem name="ListDetailScreen" item={item} />
        )}
        windowSize={5}
        ListHeaderComponent={View}
        ListHeaderComponentStyle={{height: 10}}
        />
        <Button title={'??'}/> 
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  v: {
    marginTop: 10,
    fontWeight: 'bold',
  }
  // container: {
  //   flex: 1,
  // },
  // title: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginHorizontal: 10,
  //   paddingVertical: 10,
  //   paddingHorizontal: 30,
  //   marginTop: 15,
  // },
  // content: {
  //   fontSize: 15,
  //   marginHorizontal: 25,
  //   paddingVertical: 25,
  // },
  // date: {
  //   fontSize: 15,
  //   color: GRAY,
  // },
  // dateview: {
  //   alignItems: 'flex-end',
  //   marginHorizontal: 10,
  //   paddingHorizontal: 10,
  //   paddingVertical: 10,
  //   borderBottomWidth: 1,
  // },
});

export default ListDetailScreen;
