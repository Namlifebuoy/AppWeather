import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import BoxComment from '../../components/BoxComment';
import {useNavigation} from '@react-navigation/core';
import {useRoute} from '@react-navigation/core';
import FastImage from 'react-native-fast-image';
import TabFunctions from '../../components/TabFunctions';
import ImageViewScreen from '../../components/ImageViewScreen';
import InputComment from '../../components/InputComment';
import firestore from '@react-native-firebase/firestore';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity
        style={styles.boxIcon}
        onPress={() => navigation.goBack()}>
        <Image
          style={styles.iconHeader}
          source={require('../../assets/Icons/left_arrow.png')}
        />
      </TouchableOpacity>

      <Text style={styles.titleHeader}>{props?.title}</Text>
      <View style={styles.iconHeader}></View>
    </View>
  );
};
const Author = props => {
  return (
    <View style={styles.headerPost}>
      <View style={styles.infoAuthor}>
        <Image style={styles.avatar} source={{uri: props?.avatar}} />
        <View style={styles.boxTxtAuthor}>
          <Text style={styles.nameAuthor}>{props?.name}</Text>
          <Text style={styles.timePost}>{props?.time}</Text>
        </View>
      </View>
      <TouchableOpacity style={{alignSelf: 'center'}}>
        <Image
          style={styles.iconBookmark}
          source={require('../../assets/Icons/iconBookmark.png')}
        />
      </TouchableOpacity>
    </View>
  );
};
const CommentScreen = () => {
  const route = useRoute();
  const data = route.params.data;
  const author = route.params.author;
  const time = route.params.time;
  const lengthMedia = data?.media?.length || 0;
  const [numLike, setNumLike] = useState();
  const [documents, setDocuments] = useState([]);
  const [img, setImg] = useState();
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    firestore()
      .collection('comments')
      .orderBy('timeCreate', 'asc')
      .onSnapshot(snapshot => {
        if (snapshot != undefined && snapshot != null) {
          const res = snapshot?.docs.map(doc => {
            if (doc.data().postId == data?.id) {
              return {
                ...doc.data(),
                id: doc.id,
              };
            }
          });
          setDocuments(res);
        }
      });
  }, []);
  const handlePress = () => {
    setShowImage(true);
    setImg(data?.media);
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
                  uri: data?.media[0],
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
                  uri: data?.media[1],
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
                  uri: data?.media[2],
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
                  uri: data?.media[3],
                  priority: FastImage.priority.high,
                }}
              />
              <View style={styles.moreImage}>
                {/* <FontAwesomeIcon
                  size={15}
                  style={styles.iconMore}
                  icon={faPlus}
                  color={'black'}
                /> */}
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
            source={{uri: data?.media[0], priority: FastImage.priority.high}}
          />
        </TouchableOpacity>
      );

    if (lengthMedia == 2)
      return (
        <View style={styles.boxImage2}>
          <TouchableOpacity style={styles.imageType2Left} onPress={handlePress}>
            <FastImage
              style={styles.imgProduct}
              source={{uri: data?.media[0], priority: FastImage.priority.high}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageType2Left} onPress={handlePress}>
            <FastImage
              style={styles.imgProduct}
              source={{uri: data?.media[1], priority: FastImage.priority.high}}
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
              source={{uri: data?.media[0], priority: FastImage.priority.high}}
            />
          </TouchableOpacity>
          <View style={styles.imageType3Right}>
            <TouchableOpacity
              onPress={handlePress}
              style={styles.imageType3RightTop}>
              <FastImage
                style={styles.imgProduct}
                source={{
                  uri: data?.media[1],
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
                  uri: data?.media[2],
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
                  uri: data?.media[0],
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
                  uri: data?.media[1],
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
                  uri: data?.media[2],
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
                  uri: data?.media[3],
                  priority: FastImage.priority.high,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    else return <></>;
  }, [data?.media]);
  return (
    <View style={styles.container}>
      <ImageViewScreen
        img={img}
        showImage={showImage}
        setShowImage={setShowImage}
        setImg={setImg}
      />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <Header title={'Bài viết'} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Author name={author?.name} avatar={author?.avatar} time={time} />
            <View style={styles.content}>
              <Text>{`${data?.content}`}</Text>
            </View>
            <CustomImage />
            <TabFunctions
              idPost={data?.id}
              numLike={numLike}
              setNumLike={setNumLike}
              listLike={data?.reaction}
            />
            {/* <FlatList
              data={documents}
              renderItem={({item, index}) =>
                item ? <BoxComment item={item} /> : <></>
              }
              keyExtractor={(a, b) => b}
            /> */}
            {documents.map((item, index) =>
              item ? <BoxComment item={item} /> : <></>,
            )}
          </ScrollView>
          <InputComment id={data?.id} data={data} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    width: '94%',
    height: 'auto',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  blockInteractive: {
    width: '88%',
    height: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
  },
  imgProduct: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
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
  iconBookmark: {width: 20, height: 20},
  timePost: {
    fontSize: 14,
    fontWeight: '400',
    marginLeft: 15,
    alignSelf: 'center',
  },
  boxTxtAuthor: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    width: 'auto',
  },
  nameAuthor: {
    fontSize: 15,
    fontWeight: '700',
    alignSelf: 'center',
  },
  infoAuthor: {
    height: '100%',
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  headerPost: {
    width: '100%',
    height: 50,
    paddingHorizontal: '5%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  boxIcon: {
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
  },
  titleHeader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  iconHeader: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
  containerHeader: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default CommentScreen;
