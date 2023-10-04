import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BLACK, GRAY, WHITE } from '../color';
import {useNavigation} from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';
import { useEffect, useState } from 'react';
import { url } from '../url';
import CircularProgressBar from '../components/CircularProgressBar';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [list, setList] = useState([]);
  const [signatureAll, setSignatureAll] = useState(0);
  const [signatureClear, setSignatureClear] = useState(0);
  const [recentAll, setRecentAll] = useState(0);
  const [recentClear, setRecentClear] = useState(0);
  const myperc = Math.floor((signatureClear / signatureAll) * 100);
  const recentperc = Math.floor((recentClear / recentAll) * 100); 

useEffect(() => {
  getMainChart();
}, [signatureAll, signatureClear, recentAll, recentClear]);
  
const getMainChart = async () => {
  try {
    const response = await fetch(`${url}/main_chart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const data = await response.json();
      //console.log('aalistpage:', data);
      setSignatureAll(data.signature_all);
      setSignatureClear(data.signature_clear);
      setRecentAll(data.now_all);
      setRecentClear(data.now_clear);
      } else {
      console.error('main_chart 데이터를 가져오는 데 실패했습니다.');
    }
  }catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
  };
  useEffect(() => {
  getList();
}, []);
const getList = async () => {
  try {
    const response = await fetch(`${url}/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const data = await response.json();
      //console.log('listpage:', data);
      setList(data);
    } else {
      console.error('list 데이터를 가져오는 데 실패했습니다.');
    }
  } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
    }
};


  return (
    <View style={styles.container}>
    <View style={styles.containerTop}>
      <Text style={styles.title}>내 진행 상황</Text>
        <View style={styles.mydocs}><CircularProgressBar percentage={myperc} />
          <View style={styles.text}>
            <Text>내 문서 진행률</Text>
          <Text>서명 대상자 {signatureAll}명 중 {signatureClear}명이 서명을 완료하였습니다.</Text>
        </View></View>
        <View style={styles.mydocs}><CircularProgressBar percentage={recentperc} />
          <View style={styles.text}>
            <Text>내 문서 진행률</Text>
          <Text>서명 대상자 {recentAll}명 중 {recentClear}명이 서명을 완료하였습니다.</Text>
        </View></View>
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
    flexDirection: 'row',
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
  },
});
export default HomeScreen;
