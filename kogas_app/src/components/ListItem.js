import {Pressable, StyleSheet, Text, View} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const ListItem = memo(({name, item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
    // onPress={() => {
    //   navigation.navigate('ListDetail', {
    //     title: item.title,
    //     registrationDate: item.registrationDate,
    //     content: item.content,
    //   });
    // }}
    // hitSlop={10}
    >
      <View style={styles.container}>
        <View>
          <Text>{item.status}</Text>
          <Text>제목: {item.title}</Text>
          <Text>작성자: {item.writer}</Text>
        </View>

        <View>
          <Text>등록일자: {item.registrationDate}</Text>
        </View>
      </View>
    </Pressable>
  );
});

ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 10,
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});

export default ListItem;
