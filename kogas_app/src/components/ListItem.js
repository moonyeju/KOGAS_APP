import {Pressable, StyleSheet, Text, View} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const ListItem = memo(({name, item}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ListDetail', {
          title: item.title,
          registrationDate: item.registrationDate,
          content: item.content,
        });
      }}
      hitSlop={10}>
      (
      <View style={styles.container}>
        <View style={styles.task1}>
          <Text style={styles.task1txt}>{item.status}</Text>
          <Text style={styles.task1txt}>{item.title}</Text>
          <Text style={styles.task1txt}>{item.writer}</Text>
        </View>

        <View style={styles.task2}>
          <Text>{item.registrationDate}</Text>
        </View>
      </View>
      )
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
  task1: {
    marginVertical: 15,
  },
  task1txt: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  task2: {
    alignItems: 'flex-end',
    marginVertical: 3,
  },
  centerlist: {
    marginVertical: 10,
  },
});

export default ListItem;
