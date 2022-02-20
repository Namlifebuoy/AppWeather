import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import useConvertTime from '../Hook/useConvertTime';
const BoxComment = props => {
  const [author, setAuthor] = useState();
  const timeCreate = new Date(props?.item.timeCreate?.seconds * 1000).getTime();
  const time = useConvertTime({timeCreate});

  const CustomImage = () => {
    if (props?.item.mediaUrl.length > 0) {
      return (
        <FastImage
          style={{width: 50, height: 70, borderRadius: 10, marginTop: 5}}
          source={{uri: props?.item?.mediaUrl[0]}}
        />
      );
    } else return <></>;
  };

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(props?.item?.userId)
      .get()
      .then(res => setAuthor(res.data()));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <FastImage
          source={
            author?.avatar
              ? {uri: author?.avatar}
              : require('../assets/Images/avatarDefault.png')
          }
          style={styles.avatar}
        />
        <View style={styles.boxComment}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.txtAuthor}>{author?.displayName}</Text>
            <Text style={styles.txtTime}>{time}</Text>
          </View>
          <Text style={styles.txtComment}>{props?.item?.content}</Text>
          <CustomImage />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  txtTime: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'flex-start',
  },
  txtAuthor: {
    fontSize: 14,
    fontWeight: '700',
    alignSelf: 'flex-start',
  },
  boxComment: {
    marginBottom: 10,
    backgroundColor: '#dedcc4',
    minHeight: 50,
    width: '90%',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingTop: 5,
    borderRadius: 10,
    marginLeft: 5,
  },
  txtComment: {
    fontSize: 14,
    fontWeight: '400',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignSelf: 'flex-start',
    backgroundColor: 'gray',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    minHeight: 50,
    flexDirection: 'row',
    marginTop: 10,
  },
});
export default BoxComment;
