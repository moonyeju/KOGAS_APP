import {Pressable, StyleSheet, Text, View} from 'react-native';
import {memo} from 'react';
import {useNavigation} from '@react-navigation/native';

const DetailListItem = memo(({name, item}) => {
  const navigation = useNavigation();
  return (
    <Pressable>
      <View style={styles.container}>
        <View style={styles.left}>
          <Text>{item.department}</Text>
          <Text> {item.name}</Text>
        </View>

        <View style={styles.right}>
            <Text>{item.status}</Text>
            <Text>{item.date}</Text>
        </View>
      </View>
    </Pressable>
  );
});

DetailListItem.displayName = 'DetailListItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical:5,
    borderBottomWidth: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    },
    left: {
        flexDirection: 'row',
    },
    right: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    }
});

export default DetailListItem;
