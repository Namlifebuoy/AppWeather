import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/Header';
import TabFunctions from '../../components/TabFunctions';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {rmVN} from '../../Hook/rnVN';
import Post from '../../components/Post';
import ImageViewScreen from '../../components/ImageViewScreen';
import {getProvince} from '../../services/Api';
import {listProvince} from '../../constant/listProvince';

const SearchResultScreen = ({item}) => {
  const route = useRoute();
  const txtSearch = route.params;
  const [listCategory, setListCategory] = useState([]);
  const listCity = listProvince;
  const [listCategorySearch, setListCategorySearch] = useState([]);
  const [listLocationSearch, setListLocationSearch] = useState([]);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(true);

  const getCategorys = () => {
    firestore()
      .collection('categorys')
      .onSnapshot(snapshot => {
        if (snapshot != undefined && snapshot != null) {
          const documents = snapshot?.docs.map(doc => {
            return {
              ...doc.data(),
            };
          });
          setListCategory(documents);
        }
      });
  };

  useEffect(async () => {
    setLoading(true);
    getCategorys();
    // const city = await getProvince();
    // setListCity(city);
  }, []);

  useEffect(() => {
    const newList = listCategory.filter(item =>
      rmVN(item.name).includes(rmVN(txtSearch)),
    );
    const newListText = newList.map(item => {
      return item.name;
    });
    setListCategorySearch(newListText);
  }, [txtSearch, listCategory]);

  useEffect(() => {
    const newList2 = listCity.filter(item =>
      rmVN(item.province_name).includes(rmVN(txtSearch)),
    );
    const newListText2 = newList2.map(item => {
      return item.province_name;
    });
    setListLocationSearch(newListText2);
  }, [txtSearch, listCity]);

  const getData = () => {
    firestore()
      .collection('posts')
      .orderBy('timeCreate', 'desc')
      .onSnapshot(async snapshot => {
        if (snapshot != undefined && snapshot != null) {
          const documents = await snapshot?.docs.map(doc => {
            if (doc.data().status == 1) {
              if (
                listCategorySearch.indexOf(doc.data().category) != -1 ||
                listLocationSearch.indexOf(doc.data().location.city) != -1
              ) {
                return {
                  ...doc.data(),
                  id: doc.id,
                };
              }
            }
          });
          await setData(documents);
        }
      });
  };

  useEffect(() => {
    getData();
  }, [listCategorySearch, listLocationSearch]);

  useEffect(() => {
    if (data.length != 0) {
      const new_arr = data.filter(item => item !== undefined);
      setData2(new_arr);
      console.log(loading);
      console.log(data);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [data]);

  const Main = useCallback(() => {
    if (loading)
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    else return (
        <>
          <FlatList
            data={data2}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) =>
              item ? (
                <Post
                  item={item}
                  index={index}
                  setShowImage={setShowImage}
                  setImg={setImg}
                />
              ) : (
                <></>
              )
            }
            keyExtractor={(a, b) => b}
            ListEmptyComponent={()=><View style={styles.boxEmpty}>
            <Image
              source={require('../../assets/Images/oops.png')}
              style={styles.imgEmpty}
            />
            <Text style={styles.txtEmpty}>Không tìm thấy </Text>
          </View>}
          />
        </>
      )
    });
  

  return (
    <View style={styles.container}>
      <ImageViewScreen
        img={img}
        showImage={showImage}
        setShowImage={setShowImage}
        setImg={setImg}
      />

      <SafeAreaView style={styles.container}>
        <Header title={'Kết quả tìm kiếm'} />
        <Main />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  imgEmpty: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.6,
    alignSelf: 'center',
  },
  txtEmpty: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 20,
  },
  boxEmpty: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: '30%',
  },
  footer: {
    width: '100%',
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container2: {
    width: '100%',
    minHeight: 150,
    alignSelf: 'center',
    height: 'auto',
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 10,
    borderColor: '#e5e5e5',
  },
  line: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: '#f2ede3',
  },
  wrapper: {
    width: '100%',
    height: 'auto',
    //backgroundColor: 'lightpink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgProduct: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
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
});

export default SearchResultScreen;
