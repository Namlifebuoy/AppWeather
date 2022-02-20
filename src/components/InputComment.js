import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
var RNFS = require('react-native-fs');
import { useSelector } from 'react-redux';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/core';
const InputComment = props => {
  const [input, setInput] = useState('');
  const [img, setImg] = useState([]);
  const userId = useSelector(state => state.slice.uid);
  const infoUser = useSelector(state => state.slice.infoUser);
  const navigation = useNavigation();
  console.log('props', props?.data?.userId);
  const handleSend = () => {
    if (userId != null && userId != undefined && userId != '') {
      if (input != null && input != undefined && input != '') {
        firestore()
          .collection('comments')
          .add({
            content: input,
            isActive: 1,
            postId: props?.id,
            timeCreate: firestore.FieldValue.serverTimestamp(),
            userId: userId,
            mediaUrl: img,
          })
          .then(() => {
            setInput('');
            setImg([]);
            if (userId!=props?.data?.userId) {
              firestore().collection('notifications').add({
                toUserId: props?.data?.userId,
                fromUserId: userId,
                fromUserName: infoUser?.displayName,
                isRead: 0,
                postId: props?.id,
                timeCreate: firestore.FieldValue.serverTimestamp(),
                type: 2,
              });
            }
          })
          .catch(err => console.log('err', err));
      } else {
        Alert.alert('Lưu ý', 'Bạn phải nhập gì đó');
      }
    } else {
      Alert.alert('Thông báo', 'Bạn cần đăng nhập để dùng chức năng này', [
        {
          text: 'Huỷ',
        },
        {
          text: 'Đăng nhập',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    }
  };

  const handleChooseImage = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Đã có lỗi xảy ra', 'Thử lại', [{ text: 'Ok' }]);
      } else {
        console.log('response', response);
        const link = response.assets[0].uri;
        RNFS.readFile(link, 'base64')
          .then(base64Data => {
            // console.log('base64Data', base64Data);
            const linkImg = `data:image/png;base64,${base64Data}`;
            // setImg(img.concat(linkImg));
            setImg([linkImg]);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const ImageChoose = () => {
    return img?.length ? (
      <View style={styles.boxImageChoose}>
        <TouchableOpacity onPress={() => setImg()} style={styles.iconDelete}>
          <FastImage
            style={{ width: 15, height: 15, borderRadius: 30 }}
            source={require('../assets/Icons/iconCancel.png')}
          />
        </TouchableOpacity>
        <FastImage
          source={{ uri: img[0] }}
          style={{
            width: 50,
            height: 70,
            backgroundColor: 'red',
            marginLeft: '5%',
            borderRadius: 10,
          }}
        />
      </View>
    ) : (
      <></>
    );
  };
  return (
    <>
      <View style={styles.container}>
        <ImageChoose />
        <TextInput
          placeholder={'Bình luận ..'}
          multiline={true}
          style={styles.input}
          value={input}
          onChangeText={setInput}
        />
        <View style={styles.listBt}>
          <TouchableOpacity
            onPress={handleChooseImage}
            style={styles.boxChooseImg}>
            <Image
              style={styles.iconSend}
              source={require('../assets/Icons/iconImage.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boxSend} onPress={handleSend}>
            <Image
              style={styles.iconSend}
              source={require('../assets/Icons/iconSend.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  iconDelete: {
    width: 15,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 30,
    position: 'absolute',
    zIndex: 10,
    marginLeft: 40,
    marginTop: -7,
  },
  boxImageChoose: {
    position: 'absolute',
    marginTop: -73,
    marginLeft: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 10,
  },
  iconSend: {
    width: 25,
    height: 25,
    borderRadius: 5,
  },
  boxSend: {
    width: 25,
    height: 25,
    borderRadius: 5,
    marginLeft: 15,
  },
  boxChooseImg: {
    width: 20,
    height: 20,
    borderRadius: 5,
  },
  listBt: {
    width: 'auto',
    height: 30,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  input: {
    width: '76%',
    alignSelf: 'center',
    height: 'auto',
    backgroundColor: '#fef9ee',
    fontSize: 15,
    borderRadius: 4,
    color: 'black',
    maxHeight: 100,
  },
  container: {
    width: '100%',
    minHeight: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: 5,
    justifyContent: 'space-between',
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
export default InputComment;
