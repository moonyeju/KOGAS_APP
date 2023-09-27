import {FlatList, StyleSheet, Text, View,Button} from 'react-native';
import {GRAY} from '../color';
import DetailListItem from '../components/DetailListItem';

const ListDetailScreen = ({ route, navigation }) => {
  const {status} = route.params;
  const { title } = route.params;
  const { name } = route.params;
  const {department} = route.params;
  const {registrationDate} = route.params;
  const { content } = route.params;
  return (
    
    <View style={styles.container}>
      <View>
      <Text style={styles.title}>{status}</Text>
      <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>기안자: {department} {name}</Text>
        <Text style={styles.date}>기안일자: {registrationDate}</Text>
      </View>
      <Button title={'문서보기'}/> 
      <View>
        <Text style={styles.v}>서명 정보</Text>
        <FlatList
        data={content}
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
