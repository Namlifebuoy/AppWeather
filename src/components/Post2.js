import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  Modal,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import useConvertTime from '../Hook/useConvertTime';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';

const Post2 = ({item, index, setShowImage, setImg, setModalVisible}) => {
  const timeCreate = new Date(item?.timeCreate?.seconds * 1000).getTime();
  const time = useConvertTime({timeCreate});
  const lengthMedia = item?.media?.length || 0;
  const [author, setAuthor] = useState();
  const [txt, setTxt] = useState('');
  const [modal, setModal] = useState(false);
  const uid = useSelector(state => state.slice.uid);
  const infoUser = useSelector(state => state.slice.infoUser);
  console.log('item.data()', item.userId);

  let disableBt = true;
  if (txt == '') {
    disableBt = false;
  }

  const handlePress = () => {
    setShowImage(true);
    setImg(item?.media);
  };

  const handleBrowse = () => {
    setModalVisible(true);
    try {
      firestore()
        .collection('posts')
        .doc(item?.id)
        .update({
          status: 1,
          timeCreate: firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          firestore().collection('notifications').add({
            toUserId: item.userId,
            fromUserId: uid,
            fromUserName: infoUser.displayName,
            isRead: 0,
            postId: item?.id,
            timeCreate: firestore.FieldValue.serverTimestamp(),
            type: 3,
          });
          setModalVisible(false);
          Alert.alert('', 'Đã duyệt');
        });
    } catch (error) {
      setModalVisible(false);
      console.log('lỗi');
    }
  };

  const handleCancel = () => {
    setModal(true);
  };

  const handleSubmitCancel = () => {
    setModal(false);
    setModalVisible(true);
    try {
      firestore()
        .collection('posts')
        .doc(item?.id)
        .update({
          status: -1,
          note: txt,
        })
        .then(() => {
          firestore().collection('notifications').add({
            toUserId: item.userId,
            fromUserId: uid,
            fromUserName: infoUser.displayName,
            isRead: 0,
            postId: item?.id,
            timeCreate: firestore.FieldValue.serverTimestamp(),
            type: 4,
          });
          setModalVisible(false);
          Alert.alert('', 'Đã bỏ bài viết');
        });
    } catch (error) {
      setModalVisible(false);
    }
  };

  const CustomImage = useCallback(() => {
    if (lengthMedia >= 5)
      return (
        <View style={styles.boxImage3}>
          <View style={styles.imageType3Right}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[0],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[1],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageType3Right}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[2],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[3],
                  priority: FastImage.priority.high,
                }}
              />
              <View style={styles.moreImage}>
                <FontAwesomeIcon
                  size={15}
                  style={styles.iconMore}
                  icon={faPlus}
                  color={'black'}
                />
                <Text style={styles.txtMore}>3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    if (lengthMedia == 1)
      return (
        <TouchableOpacity onPress={handlePress} style={styles.boxImage}>
          <FastImage
            style={styles.imgProduct}
            source={{uri: item?.media[0], priority: FastImage.priority.high}}
          />
        </TouchableOpacity>
      );

    if (lengthMedia == 2)
      return (
        <View style={styles.boxImage2}>
          <TouchableOpacity style={styles.imageType2Left} onPress={handlePress}>
            <FastImage
              style={styles.imgProduct}
              source={{uri: item?.media[0], priority: FastImage.priority.high}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageType2Left} onPress={handlePress}>
            <FastImage
              style={styles.imgProduct}
              source={{uri: item?.media[1], priority: FastImage.priority.high}}
            />
          </TouchableOpacity>
        </View>
      );
    if (lengthMedia == 3)
      return (
        <View style={styles.boxImage3}>
          <TouchableOpacity onPress={handlePress} style={styles.imageType3Left}>
            <FastImage
              style={styles.imgProduct}
              source={{uri: item?.media[0], priority: FastImage.priority.high}}
            />
          </TouchableOpacity>
          <View style={styles.imageType3Right}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[1],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[2],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    if (lengthMedia == 4)
      return (
        <View style={styles.boxImage3}>
          <View style={styles.imageType3Right}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[0],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[1],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageType3Right}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[2],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: item?.media[3],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    else return <></>;
  }, [item?.media]);

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(item?.userId)
      .get()
      .then(item => {
        const name = item.data().displayName;
        const avatar = item.data().avatar;
        setAuthor({name: name, avatar: avatar});
      });
  }, [item]);

  return (
    <>
      <View key={index} style={styles.item}>
        <View style={styles.headerItem}>
          <View style={{flexDirection: 'row'}}>
            <FastImage
              style={styles.avt}
              source={
                author?.avatar
                  ? {uri: author?.avatar, priority: FastImage.priority.high}
                  : require('../assets/Images/avatarDefault.png')
              }
            />
            <Text style={styles.txtUser}>{author?.name}</Text>
          </View>
          <Text style={styles.txtTime}>{time}</Text>
        </View>
        <View style={styles.content}>
          <Text>{`${item?.content}`}</Text>
        </View>
        <CustomImage />
        <View style={styles.footerItem}>
          <TouchableOpacity
            onPress={handleBrowse}
            style={[styles.btn, {backgroundColor: 'orange'}]}>
            <Text style={styles.textBtn}>Phê duyệt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCancel}
            style={[styles.btn, {backgroundColor: '#bfbfbfb3'}]}>
            <Text style={styles.textBtn}>Từ chối</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableNativeFeedback
          onPress={() => {
            setModal(false);
          }}
          style={styles.centeredView}>
          <View style={styles.centeredView}>
            <TouchableNativeFeedback>
              <View style={styles.modal}>
                <Text style={styles.txtHeaderModal}>
                  Bạn đã chọn không duyệt bài viết này
                </Text>
                <Text style={styles.txtModal}>
                  Để cải thiện chất lượng bài viết và giúp cho tác giả sửa lại
                  bài, bạn hãy nêu ra lý do không duyệt bài !
                </Text>
                <TextInput
                  multiline={true}
                  style={styles.inputModal}
                  value={txt}
                  onChangeText={a => setTxt(a)}
                />
                <TouchableOpacity
                  disabled={!disableBt}
                  onPress={handleSubmitCancel}
                  style={[
                    styles.btSubmitModal,
                    {
                      backgroundColor: disableBt
                        ? 'orange'
                        : 'rgba(134, 134, 134, .8)',
                    },
                  ]}>
                  <Text style={styles.txtBtSubmit}>Xác nhận</Text>
                </TouchableOpacity>
              </View>
            </TouchableNativeFeedback>
          </View>
        </TouchableNativeFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  txtBtSubmit: {
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    fontWeight: '500',
  },
  btSubmitModal: {
    width: '50%',
    height: 45,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 80,
    justifyContent: 'center',
  },
  inputModal: {
    width: '100%',
    height: 160,
    backgroundColor: 'white',
    marginTop: 15,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  txtModal: {
    fontSize: 15,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: 10,
  },
  txtHeaderModal: {
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 15,
  },
  modal: {
    width: '96%',
    minHeight: 400,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: '5%',
  },
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(223,223,223,0.3)',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '88%',
    flex: 0.6,
    marginTop: 10,
  },
  left_arrow: {
    width: 20,
    height: 20,
  },
  textTitle: {
    alignSelf: 'center',
    marginLeft: '22%',
    fontSize: 20,
    fontWeight: '500',
  },
  main: {
    width: '92%',
    flex: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    height: 'auto',
    paddingBottom: 10,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  headerItem: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  avt: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  txtUser: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '400',
  },
  txtTime: {
    alignSelf: 'center',
    fontSize: 13,
    color: '#ababab',
  },
  content: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: '5%',
    marginVertical: 8,
  },
  imgProduct: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  footerItem: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  btn: {
    width: '45%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  textBtn: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
  boxImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxImage2: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxImage3: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.75,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageType2Left: {
    width: '49.5%',
    height: '100%',
  },
  imageType3Left: {
    width: '49.5%',
    height: '100%',
    marginTop: 5,
  },
  imageType3Right: {
    width: '49.5%',
    height: '100%',
  },
  imageType3RightTop: {
    height: '49.5%',
    width: '100%',
    marginTop: 5,
  },
  txtMore: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  iconMore: {
    alignSelf: 'center',
    opacity: 0.95,
  },
  moreImage: {
    backgroundColor: 'rgba(134, 134, 134, .8)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Post2;
