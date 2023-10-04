import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, GRAY, WHITE } from '../color';
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';
import { useEffect, useState } from 'react';
import SInfo from 'react-native-sensitive-info';
import { url } from '../url';

const HomeScreen = () => {
  const navigation = useNavigation();
 /* const mydocs = {
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
  }, [mydocs, newdocs]);*/
  
  const [list, setList] = useState([]);
  const [signatureAll, setSignatureAll] = useState(0);
  const [signatureClear, setSignatureClear] = useState(0);
  const [recentAll, setRecentAll] = useState(0);
  const [recentClear, setRecentClear] = useState(0);
useEffect(() => {
  getMainChart();
  getList();
}, []);
const getMainChart = async () => {
      fetch(`${url}/main_chart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('aalistpage:', data);
        setSignatureAll(data.signature_all);
        setSignatureClear(data.signature_clear);
        setRecentAll(data.now_all);
        setRecentClear(data.now_clear);
        console.log(data.all_doc+' '+signatureAll + ' ' + signatureClear + ' ' + recentAll + ' ' + recentClear);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
const getList = async () => {
      fetch(`${url}/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('listpage:', data);
        setList(data);
      })
      .catch(error => {
        console.error(error);
      });
};


  return (
    <View style={styles.container}>
    <View style={styles.containerTop}>
      <Text style={styles.title}>내 진행 상황</Text>
        <View style={styles.mydocs}>
          <Text>0%</Text><Text>내 문서 진행률</Text>
          <Text>서명 대상자 0명 중 0명이 서명을 완료하였습니다.</Text>
        </View>
        <View style={styles.mydocs}>
          <Text>0%</Text><Text>최근 문서 진행률</Text>
          <Text>서명 대상자 0명 중 0명이 서명을 완료하였습니다.</Text>
        </View>
    </View>
    <View style={styles.containerBottom}>
        <Text style={styles.title}>서명 이력</Text>
        <View>
        <FlatList
        data={list}
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
