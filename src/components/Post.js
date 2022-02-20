import React, {useCallback, useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import TabFunctions from './TabFunctions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import useConvertTime from '../Hook/useConvertTime';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/core';
const Post = ({item, index, setShowImage, setImg}) => {
  const navigation = useNavigation();
  const timeCreate = new Date(item?.timeCreate?.seconds * 1000).getTime();
  const time = useConvertTime({timeCreate});
  const lengthMedia = item?.media?.length || 0;
  const [author, setAuthor] = useState();
  const [numLike, setNumLike] = useState();

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
    console.log('item?.reaction?.length', item?.reaction?.length);
    setNumLike(item?.reaction?.length);
  }, [item]);
  const handlePress = () => {
    setShowImage(true);
    setImg(item?.media);
  };
  const changeComment = () => {
    navigation.navigate('Comment', {
      data: item,
      author: author,
      time: time,
    });
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
  return (
    <View key={index} style={styles.container}>
      <View style={styles.header}>
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
      <View style={styles.boxLocal}>
        <Text style={styles.txtLocal}>
          {item?.location?.city} - {item?.location?.district} -{' '}
          {item?.location?.ward}
        </Text>
        <Image
          style={{width: 10, height: 10, alignSelf: 'center', marginRight: 10}}
          source={require('../assets/Icons/iconLocal.png')}
        />
      </View>
      <View style={styles.content}>
        <Text>{`${item?.content}`}</Text>
      </View>
      <CustomImage />
      <View style={styles.blockInteractive}>
        <Text style={styles.txtLike}>{numLike} Lượt thích</Text>
        <Text style={styles.txtCmt}>Bình luận</Text>
      </View>
      <TabFunctions
        idPost={item?.id}
        numLike={numLike}
        setNumLike={setNumLike}
        listLike={item?.reaction}
        changeComment={changeComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  txtLocal: {
    marginRight: 5,
    fontSize: 12,
    alignSelf: 'center',
    fontWeight: '300',
  },
  boxLocal: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
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
  imageType3RightTop: {
    height: '49.5%',
    width: '100%',
    marginTop: 5,
  },
  imageType3Right: {
    width: '49.5%',
    height: '100%',
  },
  imageType3Left: {
    width: '49.5%',
    height: '100%',
    marginTop: 5,
  },
  imageType2Left: {
    width: '49.5%',
    height: '100%',
  },
  boxImage3: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.75,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxImage2: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.75,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtCmt: {
    alignSelf: 'center',
    fontSize: 12,
  },
  txtLike: {
    alignSelf: 'center',
    fontSize: 12,
  },
  blockInteractive: {
    width: '88%',
    height: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 10,
  },
  imgProduct: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  content: {
    width: '100%',
    height: 'auto',
    paddingHorizontal: '5%',
    marginBottom: 8,
  },
  txtTime: {
    alignSelf: 'center',
    fontSize: 13,
    color: '#ababab',
  },
  txtUser: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '400',
  },
  avt: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    minHeight: 150,
    alignSelf: 'center',
    height: 'auto',
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 10,
    borderColor: '#e5e5e5',
  },
});
export default React.memo(Post);
