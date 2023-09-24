import {FlatList, StyleSheet, View} from 'react-native';
import ListItem from '../components/ListItem';
import EmptyList from '../components/EmptyList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const SignaturesScreen = () => {
  const List = [
    {
      id: 1,
      status: '서명 진행중', //상태
      title: '제목',
      writer: '작성자',
      registrationDate: '2023-09-25', //등록 날짜
      content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
      id: 2,
      status: '서명완료', //상태
      title: '제목',
      writer: '작성자',
      registrationDate: '2023-09-25', //등록 날짜
      content: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
  ];

  return List.length ? (
    <View style={styles.container}>
      <FlatList
        data={List}
        renderItem={({item}) => (
          <ListItem name="SignaturesScreen" item={item} />
        )}
        windowSize={5}
        ListHeaderComponent={View}
        ListHeaderComponentStyle={{height: 10}}
      />
    </View>
  ) : (
    <EmptyList />
  );
};

export default SignaturesScreen;
