// import {FlatList, StyleSheet, View} from 'react-native';
// import ListItem from '../components/ListItem';
// import EmptyList from '../components/EmptyList';

// const SignatureListScreen = () => {
//   const List = [
//     {
//       id: 1,
//       status: '서명진행중', //상태
//       title: '제목',
//       writer: '작성자',
//       registrationDate: '2023-09-25', //등록 날짜
//       content: [{
//         department: '계약운용부',
//         name: 'aaa',
//         status: '서명완료',
//         date: '2023/09/25 15:00'
//       }, {
//         department: '발전영업부',
//         name: 'bbb',
//         status: '서명완료',
//         date: '2023/09/25 15:00'
//         }]
//     },
//     {
//       id: 2,
//       status: '서명완료', //상태
//       title: '제목',
//       writer: '작성자',
//       registrationDate: '2023-09-25', //등록 날짜
//       content: [{department: '발전영업부', name: 'bbb', status: '서명완료', date: '2023/09/25 15:00'}]
//     },
//   ];
//   return List.length ? (
//     <View style={styles.container}>
//       <FlatList
//         data={List}
//         renderItem={({item}) => (
//           <ListItem name="SignatureListScreen" item={item} />
//         )}
//         windowSize={5}
//         ListHeaderComponent={View}
//         ListHeaderComponentStyle={{height: 10}}
//       />
//     </View>
//   ) : (
//     <EmptyList />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default SignatureListScreen;
