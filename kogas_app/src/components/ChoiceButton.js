import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {WHITE} from '../color';

const Button = ({title, onPress, color}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.choicecontainer, {backgroundColor: color}]}>
      <Text style={styles.choicetitle}>{title}</Text>
    </Pressable>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const styles = StyleSheet.create({
  choicecontainer: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  choicetitle: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});

export default Button;
