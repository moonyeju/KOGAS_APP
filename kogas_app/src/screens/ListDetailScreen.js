import { FlatList, StyleSheet, Text, View, Button, Alert } from 'react-native';
import { GRAY } from '../color';
import DetailListItem from '../components/DetailListItem';
import { useEffect, useState } from 'react';
import { url } from '../url';

const ListDetailScreen = ({ route, navigation }) => {
  const { document_id } = route.params;
  const { document_name } = route.params;
  const { name } = route.params;
  const { main_department } = route.params;
  const { reg_date } = route.params;
  const { stage } = route.params;
  const [user, setUser] = useState('');
  const [department, setDepartment] = useState('');
  const [list, setList] = useState([]);
  const [actionType, setActionType] = useState(null); // 서명 완료, 승인, 반려 액션 타입

  useEffect(() => {
    // 세션 정보를 가져옴
    getSession();
  }, []); // 여기에서는 세션 정보를 한 번만 가져오도록 수정

  // 세션 정보를 가져오는 함수
  const getSession = async () => {
    try {
      const response = await fetch(`${url}/`); // 세션 정보를 가져오는 엔드포인트로 변경
      if (response.ok) {
        const data = await response.json();
        console.log('서버에서 받은 세션 정보listdetail:', data);
        setUser(data.user);
        setDepartment(data.department);
      } else {
        console.error('세션 정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    //await SInfo.getItem('SessionId', {}).then(sessionId => {
    //if (sessionId) {
    fetch(`${url}/show_sig`, {
      method: 'POST',
      body: JSON.stringify({
        document_id: document_id
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

  // user와 department 정보를 기반으로 stage 정보를 필터링
  const filteredItem = list.find(item => item.name === user && item.department === department);

  // 서명 완료, 승인, 반려 여부에 따라 액션 타입 설정
  useEffect(() => {
    if (filteredItem) {
      setActionType(filteredItem.status);
    }
  }, [filteredItem, actionType]);

  // 승인 또는 반려 버튼 클릭 시
  const handleApproveOrReject = (isApprove) => {
    const message = isApprove ? '승인하시겠습니까?' : '반려하시겠습니까?';
    Alert.alert(
      '알림',
      message,
      [
        {
          text: '예',
          onPress: () => {
            // 승인 또는 반려 동작 처리
            if (isApprove) {
              // 승인 처리 로직
              // ...
              console.log('승인 처리');
            } else {
              // 반려 처리 로직
              // ...
              console.log('반려 처리');
            }
          }
        },
        {
          text: '아니요',
          style: 'cancel'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{stage}</Text>
        <Text style={styles.title}>{document_name}</Text>
        <Text style={styles.date}>기안자: {main_department} {name}</Text>
        <Text style={styles.date}>기안일자: {reg_date}</Text>
      </View>
      <Button title={'문서 보기'} />
      <View>
        <Text style={styles.v}>서명 정보</Text>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <DetailListItem name="ListDetailScreen" item={item} />
          )}
          windowSize={5}
          ListHeaderComponent={View}
          ListHeaderComponentStyle={{ height: 10 }}
        />
        {actionType === 'Y' && (
          <Button title={'서명 완료'} />
        )}
        {actionType === 'N' && (
          <View>
            <Button title={'승인'} onPress={() => handleApproveOrReject(true)} />
            <Button title={'반려'} onPress={() => handleApproveOrReject(false)} />
          </View>
        )}
        {actionType === 'X' && (
          <Button title={'반려 처리'} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  v: {
    marginTop: 10,
    fontWeight: 'bold',
  }
});

export default ListDetailScreen;
