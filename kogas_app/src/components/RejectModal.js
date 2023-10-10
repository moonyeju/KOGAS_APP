import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import ChoiceButton from './ChoiceButton';
import {BLACK, CHOICEBUTTON} from '../color';
import Icon from 'react-native-vector-icons/Ionicons';

const RejectModal = ({isVisible, onClose}) => {
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
          반려를 진행하겠습니까?
        </Text>
        <Text style={{color: BLACK}}>
          반려 처리시 모든 프로세스가 종료됩니다
        </Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonStyle}>
            <ChoiceButton
              title={'예'}
              onPress={() => handleApproveOrReject(true)}
              color={CHOICEBUTTON.ALLOW}
            />
          </View>
          <View style={styles.buttonStyle}>
            <ChoiceButton
              title={'아니오'}
              onPress={() => handleApproveOrReject(false)}
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
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonStyle: {
    marginTop: '8%',
    marginBottom: '5%',
    width: '40%',
  },
});

export default RejectModal;
