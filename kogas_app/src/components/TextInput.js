import {StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes from 'prop-types';
import {forwardRef, useState} from 'react';
import {GRAY, BLACK, PRIMARY, WHITE} from '../color';
import Icon from 'react-native-vector-icons/Ionicons';

export const ReturnKeyTypes = {
  DONE: 'done',
  NEXT: 'next',
};

export const IconNames = {
  ID: 'mail',
  PASSWORD: 'lock-closed',
};

const Input = forwardRef(({placeholder, value, iconName, ...props}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          ref={ref}
          {...props}
          value={value}
          style={[
            styles.input,
            iconName && {paddingLeft: 50},
            value && styles.hasValueInput,
            isFocused && styles.focusedInput,
          ]}
          autoCapitalize={'none'}
          autoCorrect={false}
          autoCompleteType={'off'}
          textContentType={'none'}
          keyboardAppearance={'light'}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
        />

        <View style={styles.icon}>
          <Icon
            name={iconName}
            size={20}
            color={WHITE}
            // color={(() => {
            //   switch (true) {
            //     case isFocused:
            //       return PRIMARY.DEFAULT;
            //     case !!value:
            //       return BLACK;
            //     default:
            //       return GRAY;
            //   }
            // })()}
          />
        </View>
      </View>
    </View>
  );
});
Input.displayName = 'Input';

Input.defaultProps = {
  returnKeyType: ReturnKeyTypes.DONE,
};

Input.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  iconName: PropTypes.oneOf(Object.values(IconNames)),
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
    color: GRAY,
  },
  focusedTitle: {
    fontWeight: '600',
    color: PRIMARY.DEFAULT,
  },
  hasValueTitle: {
    color: BLACK,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E7EEEE',
    // paddingHorizontal: 20,
    // height: 42,
    // paddingLeft: 5,
  },
  focusedInput: {
    borderBottomWidth: 2,
    borderBottomColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  hasValueInput: {
    borderColor: BLACK,
    color: BLACK,
  },
  icon: {
    position: 'absolute',
    width: 'auto',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: PRIMARY.DEFAULT,
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default Input;
