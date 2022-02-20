import {faComment, faSave, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {setInfoUser} from '../Redux/slice';
const TabFunctions = ({
  idPost,
  numLike,
  setNumLike,
  listLike,
  changeComment,
}) => {
  const [like, setLike] = useState(false);
  const userId = useSelector(state => state.slice.uid);
  const infoUser = useSelector(state => state.slice.infoUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let color = 'gray';

  const handleSave = () => {
    if (userId != null && userId != undefined && userId != '') {
      const list = infoUser.listPostSave || [];
      if (list?.indexOf(idPost) == -1 || list == undefined) {
        firestore()
          .collection('users')
          .doc(userId)
          .update({
            listPostSave: [...list, idPost],
          })
          .then(() => {
            firestore()
              .collection('users')
              .doc(userId)
              .get()
              .then(documentSnapshot => {
                if (documentSnapshot.exists) {
                  dispatch(setInfoUser(documentSnapshot.data()));
                }
              });
            Alert.alert('', 'Đã lưu bài viết !');
          })
          .catch(() => {
            Alert.alert('', 'Bài viết chưa được lưu');
          });
      } else {
        Alert.alert('', 'Bài viết bạn đã lưu trước rồi');
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

  const handleLike = () => {
    console.log('userId', userId);
    if (userId != null && userId != undefined && userId != '') {
      if (like == false) {
        console.log('userId', userId);
        setNumLike(numLike + 1);
        setLike(true);
        firestore()
          .collection('posts')
          .doc(idPost)
          .update({
            reaction: [...listLike, userId],
          })
          .then(() => {})
          .catch(() => {
            setNumLike(numLike - 1);
            setLike(false);
          });
      }
      if (like == true) {
        setNumLike(numLike - 1);
        setLike(false);
        let index = listLike.indexOf(userId);
        let fakeList = listLike;
        const fakeList1 = fakeList.slice(0, index);
        const fakeList2 = fakeList.slice(index + 1, fakeList.length);
        fakeList = fakeList1.concat(fakeList2);
        firestore()
          .collection('posts')
          .doc(idPost)
          .update({
            reaction: fakeList,
          })
          .then(() => {})
          .catch(() => {
            setNumLike(numLike + 1);
            setLike(faTemperatureHigh);
          });
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

  useEffect(() => {
    setLike(listLike?.includes(userId));
  }, []);

  if (like == true) {
    color = 'orange';
  }

  return (
    <View style={styles2.container}>
      <TouchableOpacity onPress={handleLike} style={styles2.boxLike}>
        <FontAwesomeIcon color={color} style={styles2.icon} icon={faThumbsUp} />
        <Text style={[styles2.txt, {color: 'orange'}]}>Thích</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={changeComment} style={styles2.boxLike}>
        <FontAwesomeIcon
          style={styles2.icon}
          color={'#3f6db3'}
          icon={faComment}
        />
        <Text style={[styles2.txt, {color: '#3f6db3'}]}>Bình luận</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSave} style={styles2.boxLike}>
        <FontAwesomeIcon style={styles2.icon} color={'#33ff3a'} icon={faSave} />
        <Text style={[styles2.txt, {color: '#33ff3a'}]}>Lưu</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles2 = StyleSheet.create({
  txt: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    color: '#aaaaaa',
  },
  boxLike: {
    width: 100,
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  container: {
    width: '95%',
    height: 40,
    alignSelf: 'center',
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    borderColor: '#ababab',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
});
export default TabFunctions;
