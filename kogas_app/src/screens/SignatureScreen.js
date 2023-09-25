import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ListItem from '../components/ListItem';

// 라디오 버튼 컴포넌트
const RadioButton = ({ options, selectedOption, onSelect }) => {
  return (
    <View style={{ flexDirection: 'row'}}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onSelect(option,index);
          }}
        >
          <View>
            {/* 선택된 옵션에 따라 스타일 변경 */}
            <Text
              style={{
                fontSize: 16,
                marginRight: 10,
                color: selectedOption === option ? 'blue' : 'black',
              }}
            >
              {option}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// 예제 앱
const SignatureScreen = () => {
    const List0 = [
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
      name: 'aaa',
      registrationDate: '2023-09-25', //등록 날짜
      content: [{department: '발전영업부', name: 'bbb', status: '서명완료', date: '2023/09/25 15:00'}]
    },
    ];
    const List1 = [
    {
      id: 1,
      status: '서명진행중', //상태
      title: '모바일 구축사업 인수인계 협의2',
      department: '수요공급처',
      name: 'bbb',
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
    const List2 = [
    {
      id: 1,
      status: '서명진행중', //상태
      title: '모바일 구축사업 인수인계 협의2',
      department: '수요공급처',
      name: 'ccc',
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
  ];
  const options = ['내 기안', '진행 문서', '완료 문서'];
  const [selectedOption, setSelectedOption] = useState(null);
    const [selectedList, setSelectedList] = useState([]);
    useEffect(() => {
    if (selectedOption === null && options.length > 0) {
        setSelectedOption(options[0]);
        setSelectedList(List0);
    }
  }, []);
  // 옵션 선택 시 호출되는 함수
  const handleSelect = (option,index) => {
      setSelectedOption(option);
      // 선택된 옵션에 따라 다른 리스트 데이터를 설정
    if (index === 0) {
      setSelectedList(List0);
    } else if (index === 1) {
      setSelectedList(List1);
    } else if (index === 2) {
      setSelectedList(List2);
    }
  };

    return (
    <View>
      {/* 라디오 버튼 컴포넌트 사용 */}
      <RadioButton
        options={options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
      />
          <FlatList
              data={selectedList}
        renderItem={({item}) => (
          <ListItem name="SignatureScreen" item={item} />
        )}
        windowSize={5}
        ListHeaderComponent={View}
        ListHeaderComponentStyle={{height: 10}}
      />
    </View>
  );
};

export default SignatureScreen;
