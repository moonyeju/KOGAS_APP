import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  Pressable,
  Button,
} from 'react-native';
import {BLACK, CHOICEBUTTON, GRAY, PRIMARY, STICK, WHITE, RED} from '../color';
import DetailListItem from '../components/DetailListItem';
import {useEffect, useState} from 'react';
import {pdfurl, url} from '../url';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';

const ListDetailScreen = ({route, navigation, item}) => {
  const {document_id} = route.params;
  const {document_name} = route.params;
  const {name} = route.params;
  const {main_department} = route.params;
  const {reg_date} = route.params;
  const {stage} = route.params;
  const [user, setUser] = useState('');
  const [department, setDepartment] = useState('');
  const [list, setList] = useState([]);
  const [actionType, setActionType] = useState(null); // 서명 완료, 승인, 반려 액션 타입
  const [reload, setReload] = useState(false); // 화면 리로드를 위한 상태 추가
  const [stickColor, setStickColor] = useState(STICK.ING);
  // 모달 상태 관리
  const [isAcceptModalVisible, setAcceptModalVisible] = useState(false);
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);

  // 모달 열기 및 닫기 함수
  const showAcceptModal = () => {
    setAcceptModalVisible(true);
  };

  const hideAcceptModal = () => {
    setAcceptModalVisible(false);
  };

  const showRejectModal = () => {
    setRejectModalVisible(true);
  };

  const hideRejectModal = () => {
    setRejectModalVisible(false);
  };

  useEffect(() => {
    // 세션 정보를 가져옴
    getSession();
  }, []); // 여기에서는 세션 정보를 한 번만 가져오도록 수정

  // 세션 정보를 가져오는 함수
  const getSession = async () => {
    try {
      const response = await fetch(`${url}/`); // 세션 정보를 가져오는 엔드포인트로 변경
      if (response.ok) {
        const data = await response.json();
        console.log('서버에서 받은 세션 정보listdetail:', data);
        setUser(data.user);
        setDepartment(data.department);
      } else {
        console.error('세션 정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  useEffect(() => {
    getList();
  }, [reload]);

  const getList = async () => {
    //await SInfo.getItem('SessionId', {}).then(sessionId => {
    //if (sessionId) {
    fetch(`${url}/show_sig`, {
      method: 'POST',
      body: JSON.stringify({
        document_id: document_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('listdetailpage:', data);
        setList(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // user와 department 정보를 기반으로 stage 정보를 필터링
  const filteredItem = list.find(
    item => item.name === user && item.department === department,
  );

  // 서명 완료, 승인, 반려 여부에 따라 액션 타입 설정
  useEffect(() => {
    if (filteredItem) {
      setActionType(filteredItem.status);
    }
  }, [filteredItem, actionType]);

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
        setReload(!reload); // 상태를 변경하여 화면 리로드
      })
      .catch(error => {
        console.error(error);
      });
  };
  const reject = async () => {
    fetch(`${url}/reject`, {
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
        console.log('rej:', data);
        setReload(!reload); // 상태를 변경하여 화면 리로드
      })
      .catch(error => {
        console.error(error);
      });
  };

  const ModalOpen = ({isVisible, onClose, item}) => {
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
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Icon name="close" color={BLACK} size={30} />
            </Pressable>
          </View>
          <Text style={{fontSize: 23, fontWeight: 'bold', color: BLACK}}>
            {item}
          </Text>
          <View style={styles.modalButtonContainer}>
            <View style={styles.modalButtonStyle}>
              <Pressable
                onPress={() => {
                  if (isAcceptModalVisible) {
                    console.log('승인 처리');
                    accept();
                  }
                  if (isRejectModalVisible) {
                    console.log('반려 처리');
                    reject();
                  }
                }}
                style={[
                  styles.choicecontainer,
                  {backgroundColor: CHOICEBUTTON.ALLOW},
                ]}>
                <Text style={styles.choicetitle}>예</Text>
              </Pressable>
            </View>
            <View style={styles.modalButtonStyle}>
              <Pressable
                onPress={onClose}
                style={[
                  styles.choicecontainer,
                  {backgroundColor: CHOICEBUTTON.REJECT},
                ]}>
                <Text style={styles.choicetitle}>아니요</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // PDF 파일을 열도록 유도하는 함수
  const openPDFInBrowser = () => {
    const pdfUrl = `${pdfurl}/view/test.pdf`; // PDF 파일의 URL을 여기에 설정
    Linking.openURL(pdfUrl); // PDF 파일을 기본 브라우저로 엽니다.
  };

  useEffect(() => {
    console.log(stage);
    if (stage === '서명 진행중') {
      setStickColor(STICK.ING);
    } else if (stage === '반려 처리') {
      setStickColor(STICK.NO);
    } else {
      setStickColor(STICK.COMPLETE);
    }
  }, [stickColor]);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              flexDirection: 'row',
              width: 3,
              height: 14,
              backgroundColor: stickColor,
              marginRight: 5,
              marginLeft: 3,
              marginTop: 4,
              marginBottom: 7,
            }}></View>
          <Text style={styles.title}>{stage}</Text>
        </View>
        <View style={styles.toptxtContainer}>
          <Text style={styles.title}>{document_name}</Text>
          <Text style={styles.date}>
            기안자: {main_department} {name}
          </Text>
          <View style={styles.pdfpress}>
            <Text style={styles.date}>기안일자: {reg_date}</Text>
            <Pressable onPress={openPDFInBrowser}>
              <Text style={styles.pdfbutton}>문서보기</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.stick}></View>
          <Text style={styles.v}>서명 정보</Text>
        </View>
        <FlatList
          data={list}
          renderItem={({item}) => (
            <DetailListItem name="ListDetailScreen" item={item} />
          )}
          windowSize={5}
          ListHeaderComponent={View}
        />
        {actionType === 'Y' && (
          <View style={styles.xyButtonStyle}>
            <Pressable
              onPress={() => {}}
              style={[styles.choicecontainer, {backgroundColor: GRAY}]}>
              <Text style={styles.choicetitle}>서명 완료</Text>
            </Pressable>
          </View>
        )}
        {actionType === 'N' && (
          <View style={styles.buttonContainer}>
            <View style={styles.nButtonStyle}>
              <View>
                <Pressable
                  onPress={showAcceptModal}
                  style={[
                    styles.choicecontainer,
                    {backgroundColor: CHOICEBUTTON.ALLOW},
                  ]}>
                  <Text style={styles.choicetitle}>승인</Text>
                </Pressable>
                <ModalOpen
                  isVisible={isAcceptModalVisible}
                  onClose={hideAcceptModal}
                  item={'승인하시겠습니까?'}
                />
              </View>
            </View>
            <View style={styles.nButtonStyle}>
              <View>
                <Pressable
                  onPress={showRejectModal}
                  style={[
                    styles.choicecontainer,
                    {backgroundColor: CHOICEBUTTON.REJECT},
                  ]}>
                  <Text style={styles.choicetitle}>반려</Text>
                </Pressable>
                <ModalOpen
                  isVisible={isRejectModalVisible}
                  onClose={hideRejectModal}
                  item={'반려하시겠습니까?'}
                />
              </View>
            </View>
          </View>
        )}
        {actionType === 'X' && (
          <View style={styles.xyButtonStyle}>
            <Pressable
              onPress={() => {}}
              style={[
                styles.choicecontainer,
                {backgroundColor: CHOICEBUTTON.REJECT},
              ]}>
              <Text style={styles.choicetitle}>반려</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: BLACK,
  },
  date: {
    color: BLACK,
    fontSize: 13,
    marginVertical: 3,
  },
  toptxtContainer: {
    marginHorizontal: 6,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingVertical: 5,
  },
  topContainer: {
    backgroundColor: WHITE,
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 8,
    paddingVertical: 9,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: WHITE,
    borderWidth: 1,
    elevation: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: WHITE,
    flexDirection: 'column',
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: WHITE,
    borderWidth: 1,
    elevation: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  stick: {
    flexDirection: 'row',
    width: 3,
    height: 15,
    backgroundColor: '#684DF5',
    marginRight: 5,
    marginLeft: 3,
    marginTop: 13,
    marginBottom: 7,
  },
  nButtonStyle: {
    width: '40%',
  },
  v: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  pdfpress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pdfbutton: {
    color: PRIMARY.DEFAULT,
    // fontWeight: 'bold',
  },
  xyButtonStyle: {
    marginVertical: 15,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: WHITE,
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

export default ListDetailScreen;
