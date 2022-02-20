import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import BoxFunction from '../../components/BoxFunction';
import {
  setInfoUser,
  changeAvatar,
  changeName,
  changeAccount,
} from '../../Redux/slice';
import firestore from '@react-native-firebase/firestore';
var RNFS = require('react-native-fs');

const UserScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const infoUser = useSelector(state => state.slice.infoUser);
  const uid = useSelector(state => state.slice.uid);
  const statusAccount = useSelector(state => state.slice.change);
  const [modalVisible, setModalVisible] = useState(false);
  const [txtName, setTxtName] = useState('');
  const [change, setChange] = useState(false);
  const listButton = useMemo(
    () => [
      {
        title: 'Bài viết đã đăng',
        icon: require('../../assets/Icons/iconPost.png'),
        press: () => navigation.navigate('Posted'),
      },
      {
        title: 'Đổi mật khẩu',
        icon: require('../../assets/Icons/iconLock.png'),
        press: () => navigation.navigate('ChangePass'),
      },
      {
        title: 'Hướng dẫn sử dụng',
        icon: require('../../assets/Icons/iconGuide.png'),
        press: () => navigation.navigate('Instruct'),
      },
      {
        title: 'Trung tâm trợ giúp',
        icon: require('../../assets/Icons/iconHelp.png'),
        press: () => navigation.navigate('Instruct'),
      },
    ],
    [],
  );
  let txtRole = 'Người dùng';
  if (infoUser?.role == 1) {
    txtRole = 'Quản trị';
  }
  if (infoUser?.role == 2) {
    txtRole = 'Người kiểm duyệt';
  }
  const txtAccount = infoUser?.email.split('@');
  const handleChoose = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Đã có lỗi xảy ra', 'Thử lại', [{text: 'Ok'}]);
      } else {
        const link = response.assets[0].uri;
        RNFS.readFile(link, 'base64')
          .then(base64Data => {
            dispatch(changeAvatar(base64Data));
            setChange(true);
          })
          .catch(err => {
            setChange(false);
            Alert.alert('Đã có lỗi xảy ra', 'Thử lại', [
              {
                text: 'Ok',
              },
            ]);
          });
      }
    });
  };
  const handleSubmit = async () => {
    setModalVisible(false);
    if (txtName.trim() != infoUser?.displayName.trim()) {
      dispatch(changeName(txtName.trim()));
      await firestore()
        .collection('users')
        .doc(uid)
        .update({
          displayName: txtName,
        })
        .then(() => {
          if (change == false)
            Alert.alert('Đổi thông tin thành công ', 'Tiếp tục', [
              {text: 'OK'},
            ]);
        })
        .catch(er => console.log('bách', er));
    }
    if (change) {
      await firestore()
        .collection('users')
        .doc(uid)
        .update({
          avatar: infoUser?.avatar,
        })
        .then(() => {
          Alert.alert('Đổi thông tin thành công ', 'Tiếp tục', [{text: 'OK'}]);
        })
        .catch(er => console.log('bách2', er));
    }
  };
  const logOut = useCallback(() => {
    Alert.alert('Bạn muốn đăng xuất ?', 'Tếp tục', [
      {text: 'Huỷ'},
      {
        text: 'OK',
        onPress: async () => {
          dispatch(setInfoUser(null));
          try {
            await AsyncStorage.setItem('key', '');
            navigation.navigate('Login');
          } catch (e) {
            Alert.alert('Đã có lỗi xảy ra', 'Thử lại', [{text: 'Ok'}]);
          }
        },
      },
    ]);
  }, []);

  let defaulName;
  useEffect(() => {
    if (infoUser == null) {
      Alert.alert('Thông báo', 'Bạn cần đăng nhập để dùng chức năng này', [
        {
          text: 'Đăng nhập',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    } else {
      setTxtName(infoUser.displayName);
      defaulName = infoUser.displayName;
    }
  }, [statusAccount, modalVisible]);
  const CustomModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={stylesModal.container}>
          <View style={stylesModal.main}>
            <TouchableOpacity
              style={styles.btCancel}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../assets/Icons/iconClose.png')}
              />
            </TouchableOpacity>
            <Image style={stylesModal.avatar} source={{uri: infoUser.avatar}} />
            <TextInput
              value={txtName}
              onChangeText={setTxtName}
              placeholder={'Nhập tên của bạn'}
              fontSize={17}
              style={stylesModal.input}
            />
            <TouchableOpacity
              onPress={handleChoose}
              style={stylesModal.btChangeImage}>
              <Text style={stylesModal.txtChangeImage}>Chọn ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={stylesModal.btSubmit}>
              <Text style={stylesModal.txtSubmit}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const Censorship = () => {
    if (infoUser?.role == 1)
      return (
        <View style={styles.boxCensorship}>
          <View style={{marginTop: -10}}>
            <BoxFunction
              title={'Duyệt bài viết'}
              icon={require('../../assets/Icons/iconCensorship.png')}
              press={() => navigation.navigate('Censorship')}
            />
          </View>
          <View style={{marginTop: -10}}>
            <BoxFunction
              title={'Quản lý thành viên'}
              icon={require('../../assets/Icons/iconGroup.png')}
              press={() => navigation.navigate('CensorshipMember')}
            />
          </View>
        </View>
      );
    else if (infoUser?.role == 2)
      return (
        <View style={styles.boxCensorship}>
          <View style={{marginTop: -10}}>
            <BoxFunction
              title={'Duyệt bài viết'}
              icon={require('../../assets/Icons/iconCensorship.png')}
              press={() => navigation.navigate('Censorship')}
            />
          </View>
        </View>
      );
    else return <></>;
  };
  if (infoUser == null) {
    return <SafeAreaView style={styles.container}></SafeAreaView>;
  } else
    return (
      <SafeAreaView style={styles.container}>
        <>
          {CustomModal()}
          <View style={stylesHeader.container}>
            <View style={stylesHeader.header}>
              <View style={stylesHeader.blockInfo}>
                <View style={stylesHeader.boxAvatar}>
                  <Image
                    style={stylesHeader.avatar}
                    source={{uri: infoUser?.avatar || ''}}
                  />
                </View>
              </View>
              {/* abc */}
              <View style={styles.blockMore}>
                <View style={stylesHeader.role}>
                  <View style={stylesHeader.boxName}>
                    <Text style={stylesHeader.name}>
                      {infoUser?.displayName}
                    </Text>
                  </View>
                </View>
                <View style={stylesHeader.role}>
                  <View style={stylesHeader.boxRole}>
                    <View style={stylesHeader.boxIconMedal}>
                      <Image
                        style={stylesHeader.iconMedal}
                        source={require('../../assets/Icons/iconMedal.png')}
                      />
                    </View>
                    <Text style={stylesHeader.txtRole}>{txtRole}</Text>
                  </View>
                </View>
              </View>
              {/* cba */}
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible), setChange(false);
                }}
                style={stylesHeader.blockIcon}>
                <Image
                  style={stylesHeader.iconPen}
                  source={require('../../assets/Icons/iconPen.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Censorship />
            <View style={styles.main}>
              {listButton.map((item, index) => (
                <BoxFunction
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  press={item.press}
                />
              ))}
              <View>
                <TouchableOpacity style={styles.container2} onPress={logOut}>
                  <View style={styles.main2}>
                    <View style={styles.backgroundIcon}>
                      <Image
                        style={styles.icon}
                        source={require('../../assets/Icons/iconLogout.png')}
                      />
                    </View>
                    <Text style={styles.title}>Đăng xuất</Text>
                  </View>
                  <Image style={styles.iconArrow} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.footer} />
          </ScrollView>
        </>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  btCancel: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 20,
  },
  footer: {
    width: '100%',
    height: 200,
  },
  blockMore: {
    width: '60%',
    height: 'auto',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginLeft: 10,
  },
  iconArrow: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginRight: 20,
  },
  title: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
  },
  backgroundIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 15,
    borderRadius: 15,
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  boxCensorship: {
    width: '90%',
    height: 'auto',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container2: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    width: '90%',
    height: 'auto',
    minHeight: 300,
    backgroundColor: 'white',
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 20,
  },
  main2: {
    flexDirection: 'row',
  },
});
const stylesHeader = StyleSheet.create({
  line: {
    width: 1,
    height: 35,
    backgroundColor: 'black',
    opacity: 0.9,
    alignSelf: 'center',
  },
  iconPen: {
    width: 25,
    height: 25,
  },
  txtRole: {
    fontWeight: '600',
    marginLeft: 5,
  },
  txtName: {
    fontSize: 20,
    fontWeight: '700',
  },
  titleRole: {
    fontSize: 18,
    fontWeight: '500',
    color: 'orange',
  },
  boxName: {
    height: 40,
    width: 'auto',
    justifyContent: 'center',
  },
  boxRole: {
    height: 30,
    width: 'auto',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  role: {
    width: '95%',
    height: 40,
    flexDirection: 'row',
  },
  boxIconMedal: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    backgroundColor: '#ffd264',
    borderRadius: 30,
  },
  iconMedal: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    alignSelf: 'center',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginLeft: 10,
  },
  blockIcon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginRight: 10,
  },
  blockInfo: {
    height: 80,
    width: 80,
    flexDirection: 'row',
  },
  header: {
    width: '100%',
    height: 80,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -5,
  },
  container: {
    width: '90%',
    height: 'auto',
    minHeight: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
const stylesModal = StyleSheet.create({
  txtSubmit: {
    color: 'white',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '600',
  },
  btSubmit: {
    width: '70%',
    height: 58,
    alignSelf: 'center',
    backgroundColor: 'black',
    marginTop: 15,
    borderRadius: 25,
    justifyContent: 'center',
  },
  txtChangeImage: {
    color: 'black',
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: '600',
  },
  btChangeImage: {
    width: '70%',
    height: 58,
    alignSelf: 'center',
    backgroundColor: 'orange',
    marginTop: 15,
    borderRadius: 25,
    justifyContent: 'center',
  },
  input: {
    width: '70%',
    height: 58,
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: '#ebebeb',
    padding: 0,
    paddingLeft: 15,
    alignSelf: 'center',
  },
  boxInput: {
    width: '70%',
    height: 50,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 15,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  avatar: {
    width: 130,
    height: 130,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: 'red',
    marginTop: 20,
  },
  main: {
    width: '90%',
    height: 'auto',
    minHeight: 400,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
  },
  container: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(218,218,218,.5)',
    justifyContent: 'center',
  },
});
export default UserScreen;
