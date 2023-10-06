import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';
import {url} from '../url';
import {WHITE, RADIO, PRIMARY} from '../color';

// 라디오 버튼 컴포넌트
const RadioButton = ({options, selectedOption, onSelect}) => {
  return (
    <View style={styles.radioButton}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onSelect(option, index);
          }}>
          <View
            style={{
              backgroundColor:
                selectedOption === option ? RADIO.SELECT : RADIO.DEFAULT,
              borderRadius: selectedOption === option ? 50 : 0,
              paddingVertical: 5,
              paddingHorizontal: 20,
            }}>
            {/* 선택된 옵션에 따라 스타일 변경 */}
            <Text
              style={{
                fontSize: 16,
                marginRight: 10,
                fontWeight: 800,
                color: selectedOption === option ? 'white' : 'black',
              }}>
              {option}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const SignatureScreen = () => {
  //const [myList, setMyList] = useState([]);
  //const [proceedingList, setProceedingList] = useState([]);
  //const [doneList, setDoneList] = useState([]);
  const [user, setUser] = useState('');
  const options = ['내 기안', '진행 문서', '완료 문서'];
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedList, setSelectedList] = useState([]);
  useEffect(() => {
    if (user !== '') {
      if (selectedOption === null && options.length > 0) {
        getMyDoc();
        setSelectedOption(options[0]);
      }
    } else {
      console.log('user 없음');
    }
  }, [user, selectedList]);

  // 옵션 선택 시 호출되는 함수
  const handleSelect = (option, index) => {
    setSelectedOption(option);
    // 선택된 옵션에 따라 다른 리스트 데이터를 설정
    if (index === 0) {
      getMyDoc();
    } else if (index === 1) {
      getProceedingDoc();
    } else if (index === 2) {
      getDoneDoc();
    }
  };
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
        console.log('서버에서 받은 세션 정보signaturelist:', data);
        setUser(data.user);
      } else {
        console.error('세션 정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  const getMyDoc = async () => {
    console.log('mydoc user signaturelist:', user);
    try {
      const response = await fetch(`${url}/my_doc`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: user,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('my' + data);
        setSelectedList(data);
      } else {
        console.error('mydoc 데이터를 가져오는 데 실패했습니다.', response);
      }
    } catch (error) {
      console.error('mydoc 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const getProceedingDoc = async () => {
    try {
      const response = await fetch(`${url}/trying_doc`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: user,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('proceed' + data);
        //console.log('listpage:', data);
        setSelectedList(data);
      } else {
        console.error('proceedingdoc 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('proceedingdoc 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  const getDoneDoc = async () => {
    try {
      const response = await fetch(`${url}/done_doc`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        //console.log('listpage:', data);
        setSelectedList(data);
      } else {
        console.error('donedoc 데이터를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('donedoc 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={{textAlign: 'center'}}>내 문서 현황</Text>
        <Text style={{textAlign: 'center'}}>내 문서 현황을 보여드립니다</Text>
      </View>
      {/* 라디오 버튼 컴포넌트 사용 */}
      <RadioButton
        options={options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />
      {selectedList.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          {selectedOption} 없습니다.
        </Text>
      ) : (
        <FlatList
          data={selectedList}
          renderItem={({item}) => (
            <ListItem name="SignatureScreen" item={item} />
          )}
          windowSize={5}
          ListHeaderComponent={View}
          ListHeaderComponentStyle={{height: 10}}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    alignItems: 'center',
  },
  flatListContainer: {
    paddingBottom: 20, // 여백 조절
  },
  radioButton: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: RADIO.DEFAULT,
    borderRadius: 50,
    elevation: 10,
    marginTop: 20,
  },
});

export default SignatureScreen;
