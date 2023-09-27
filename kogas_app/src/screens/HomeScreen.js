import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, GRAY, WHITE } from '../color';
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';
import { useEffect, useState } from 'react';

const HomeScreen = () => {
  const navigation = useNavigation();
  const mydocs = {
      id: 1,
      status: '서명진행중', //상태
      title: '모바일 구축사업 인수인계 협의2',
      department: '수요공급처',
      name: 'aa',
      registrationDate: '2023-09-25', //등록 날짜
      content: [{
        department: '계약운용부',
        name: 'aaa',
        status: '서명완료',
        date: '2023/09/25 15:00'
      }, {
        department: '발전영업부',
        name: 'aaaa',
        status: '서명 진행중',
        date: '2023/09/25 15:00'
        }]
    }
  const newdocs = {
      id: 1,
      status: '서명진행중', //상태
      title: '모바일 구축사업 인수인계 협의2',
      department: '수요공급처',
      name: 'bb',
      registrationDate: '2023-09-25', //등록 날짜
      content: [{
        department: '계약운용부',
        name: 'bbb',
        status: '서명완료',
        date: '2023/09/25 15:00'
      }, {
        department: '계약운용부',
        name: 'bbb',
        status: '서명 진행중',
        date: '2023/09/25 15:00'
      },{
        department: '발전영업부',
        name: 'bbbb',
        status: '서명완료',
        date: '2023/09/25 15:00'
        }]
  }
  const [mycount, setMyCount] = useState(0); // useState로 상태 변수 관리
  const [newcount, setNewCount] = useState(0); // useState로 상태 변수 관리

  const myperc = Math.floor((mycount / mydocs.content.length) * 100); // mycount 사용
  const newperc = Math.floor((newcount / newdocs.content.length) * 100); // newcount 사용

  useEffect(() => {
    setMyCount(0); // 초기화
    setNewCount(0); // 초기화
    mydocs.content.forEach((item) => {
      if (item.status === '서명완료') {
        setMyCount((prevCount) => prevCount + 1); // 상태 업데이트
      }
    });

    newdocs.content.forEach((item) => {
      if (item.status === '서명완료') {
        setNewCount((prevCount) => prevCount + 1); // 상태 업데이트
      }
    });
  }, [mydocs, newdocs]);
  
  const List = [
    {
      id: 1,
      status: '서명진행중', //상태
      title: '모바일 구축사업 인수인계 협의2',
      department: '수요공급처',
      name: 'aaa',
      registrationDate: '2023-09-25', //등록 날짜
      content: [{
        department: '계약운용부',
        name: 'aaa',
        status: '서명완료',
        date: '2023/09/25 15:00'
      }, {
        department: '발전영업부',
        name: 'bbb',
        status: '서명완료',
        date: '2023/09/25 15:00'
        }]
    },
    {
      id: 2,
      status: '서명완료', //상태
      title: '모바일 구축사업 인수인계 협의1',
      department: '수요공급처',
      name: 'bbb',
      registrationDate: '2023-09-25', //등록 날짜
      content: [{department: '발전영업부', name: 'bbb', status: '서명완료', date: '2023/09/25 15:00'}]
    },
  ];

  return (
    <View style={styles.container}>
    <View style={styles.containerTop}>
      <Text style={styles.title}>내 진행 상황</Text>
      <Pressable
            onPress={() => {
              navigation.navigate('ListDetail',{
            status: mydocs.status,
            title: mydocs.title,
            department: mydocs.department,
            name: mydocs.name,
            registrationDate: mydocs.registrationDate,
            content: mydocs.content,
          });
            }}
        hitSlop={10}
        style={styles.mydocs}
      >
        <View>
          <Text>{myperc}%</Text><Text>내 문서 진행률</Text>
          <Text>서명 대상자 {mydocs.content.length}명 중 {mycount}명이 서명을 완료하였습니다.</Text>
        </View>
      </Pressable>
      <Pressable
            onPress={() => {
              navigation.navigate('ListDetail',{
            status: newdocs.status,
            title: newdocs.title,
            department: newdocs.department,
            name: newdocs.name,
            registrationDate: newdocs.registrationDate,
            content: newdocs.content,
          });
            }}
        hitSlop={10}
        style={styles.mydocs}
      >
        <View>
          <Text>{newperc}%</Text><Text>최근 문서 진행률</Text>
          <Text>서명 대상자 {newdocs.content.length}명 중 {newcount}명이 서명을 완료하였습니다.</Text>
        </View>
      </Pressable>
    </View>
    <View style={styles.containerBottom}>
        <Text style={styles.title}>서명 이력</Text>
        <View>
        <FlatList
        data={List}
        renderItem={({item}) => (
          <ListItem name="HomeScreen" item={item} />
        )}
        // windowSize={5}
        ListHeaderComponent={View}
      />
        </View>
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    flex:1,
  },
  containerTop: {
    
  },
  mydocs: {
    borderWidth: 0.5,
    borderColor: GRAY,
    borderRadius: 10, 
    margin: 10,
    padding:20,
  },
  title: {
    color: BLACK,
    //marginTop: 5,
    fontWeight: '900',
    borderBottomWidth: 0.5, 
    borderBottomColor: BLACK,
    paddingVertical: 5,
    marginHorizontal:10,
  }
});
export default HomeScreen;
