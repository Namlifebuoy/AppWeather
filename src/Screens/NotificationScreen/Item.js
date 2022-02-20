import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import useConvertTime from '../../Hook/useConvertTime';
import firestore from '@react-native-firebase/firestore';

const Item = props => {
  const [author, setAuthor] = useState('');
  const timeCreate = new Date(props?.item.timeCreate?.seconds * 1000).getTime();
  const time = useConvertTime({timeCreate});
  let txtNotification = 'đã thích bài viết của bạn';

  if (props?.item.type == 2) {
    txtNotification = 'đã bình luận bài viết của bạn';
  }
  if (props?.item.type == 3) {
    txtNotification = 'đã duyệt bài viết của bạn';
  }
  if (props?.item.type == 4) {
    txtNotification = 'đã từ chối bài viết của bạn';
  }
  if (props?.item.type == 5) {
    txtNotification = 'đã đăng bài viết mới cần bạn duyệt';
  }
  if (props?.item.type == 6) {
    txtNotification = 'đã cấp cho bạn quyền kiểm duyệt';
  }
  if (props?.item.type == 7) {
    txtNotification = 'đã đăng lại bài viết mới cần bạn duyệt';
  }

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(props.item?.fromUserId)
      .get()
      .then(item => {
        const name = item.data().displayName;
        const avatar = item.data().avatar;
        setAuthor({name: name, avatar: avatar});
      });
  }, [props]);

  return (
    <View style={styles.boxNoti}>
      <FastImage
        style={styles.avt}
        source={
          author?.avatar
            ? {uri: author?.avatar}
            : require('../../assets/Images/avatarDefault.png')
        }
      />
      <View style={styles.boxText}>
        <Text style={styles.textNoti}>
          <Text style={styles.textColor}>{author?.name}</Text> {txtNotification}
        </Text>
        <Text style={styles.textNoti}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 15,
    fontWeight: '500',
    color: '#a1b2be',
    marginTop: 10,
  },
  textColor: {
    color: '#55BAE9',
  },
  btnOption: {
    width: 40,
    height: 40,
    paddingTop: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c0e7ff',
  },
  imgBtn: {
    width: 23,
    height: 23,
  },
  wrapper: {
    width: '100%',
    height: '100%',
  },
  titleWrap: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    backgroundColor: 'lightgreen',
    paddingLeft: 20,
  },
  boxNoti: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  avt: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  boxText: {
    width: '70%',
    height: 60,
    justifyContent: 'space-evenly',
  },
  textNoti: {
    fontSize: 15,
    color: '#707070',
    fontWeight: '500',
  },
});

export default Item;
