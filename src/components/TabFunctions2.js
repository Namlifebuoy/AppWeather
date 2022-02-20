import {faComment, faSave, faThumbsUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/core';
import {useDispatch} from 'react-redux';
import {setInfoUser} from '../Redux/slice';
const TabFunctions2 = ({
  idPost,
  numLike,
  setNumLike,
  listLike,
  changeComment,
  status,
  navi,
}) => {
  const [like, setLike] = useState(false);
  const userId = useSelector(state => state.slice.uid);
  const infoUser = useSelector(state => state.slice.infoUser);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let color = 'gray';

  const handleEdit = () => {
    navi();
  };

  const handleComment = () => {
    if (status == 1) {
      changeComment();
    } else {
      Alert.alert('Thông báo', 'Bài viết này không bình luận');
    }
  };

  const handleLike = () => {
    if (status == 1) {
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
    } else {
      Alert.alert('Thông báo', 'Bài viết này không thể thích');
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
      <TouchableOpacity onPress={handleComment} style={styles2.boxLike}>
        <FontAwesomeIcon
          style={styles2.icon}
          color={'#3f6db3'}
          icon={faComment}
        />
        <Text style={[styles2.txt, {color: '#3f6db3'}]}>Bình luận</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleEdit} style={styles2.boxLike}>
        <Image
          style={styles2.icon2}
          source={require('../assets/Icons/iconEdit.png')}
        />
        <Text style={[styles2.txt, {color: '#6e8ef7'}]}>Sửa</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles2 = StyleSheet.create({
  icon2: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
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
export default TabFunctions2;
