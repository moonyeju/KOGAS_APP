import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import ChoiceButton from './ChoiceButton';
import {BLACK, CHOICEBUTTON} from '../color';
import Icon from 'react-native-vector-icons/Ionicons';
import {url} from '../url';

const accept = async () => {
  fetch(`${url}/update_okay`, {
    method: 'POST',
    body: JSON.stringify({
      answer: 1,
      document_id: document_id,
      user: user,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => {
      console.log('acc:', data);
      navigation.navigate('ListDetail');
      // setReload(!reload); // 상태를 변경하여 화면 리로드
    })
    .catch(error => {
      console.error(error);
    });
};

const AcceptModal = ({isVisible, onClose, item}) => {
  Icon.loadFont(); // Ionicons 폰트 로드
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      propagateSwipe>
      <View style={styles.modalContent}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" color={BLACK} size={30} />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 23, fontWeight: 'bold', color: BLACK}}>
          승인을 진행하겠습니까?
        </Text>
        <View style={styles.modalButtonContainer}>
          <View style={styles.modalButtonStyle}>
            <ChoiceButton
              title={'예'}
              onPress={() => accept()}
              color={CHOICEBUTTON.ALLOW}
            />
          </View>
          <View style={styles.modalButtonStyle}>
            <ChoiceButton
              title={'아니오'}
              onPress={onClose}
              color={CHOICEBUTTON.REJECT}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    marginTop: '3%',
    marginRight: '3%',
  },
  modalButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButtonStyle: {
    marginTop: '8%',
    marginBottom: '5%',
    width: '40%',
  },
});

export default AcceptModal;
