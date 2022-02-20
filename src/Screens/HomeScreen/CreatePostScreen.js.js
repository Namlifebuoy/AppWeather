import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import { listCity } from '../../constant/listCity';
import { rmVN } from '../../Hook/rnVN';
import { getDistrict, getProvince, getWard } from '../../services/Api';
var RNFS = require('react-native-fs');
const CreatePostScreen = () => {
  const [img, setImg] = useState([]);
  const [txt, setTxt] = useState('');
  const [uploading, setUploading] = useState(false);
  const avt = useSelector(a => a.slice.infoUser?.avatar);
  const uid = useSelector(a => a.slice.uid);
  const infoUser = useSelector(a => a.slice.infoUser);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [local, setLocal] = useState('');
  const [search, setSearch] = useState('');
  const [dataModal, setDataModal] = useState(listCity);
  const [dataModalSearch, setDataModalSearch] = useState(listCity);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [provinceSelect, setProvinceSelect] = useState();
  const [districtSelect, setDistrictSelect] = useState();
  const [wardSelect, setWardSelect] = useState();
  const [listCategory, setListCategory] = useState([]);
  const [listCategory2, setListCategory2] = useState([]);
  const [category, setCategory] = useState();
  const [type, setType] = useState(1);
  const [modalVisibleMicro,setModalVisibleMicro] = useState(false)

  const CustomModal = useCallback(() => {
    return (
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.container2}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container2}>
            <View style={styles.modalContainer}>
              <View style={styles.topModal}>
                <View style={styles.searchModalContainer}>
                  <TextInput
                    style={styles.search}
                    placeholder={'Tìm kiếm...'}
                    value={search}
                    onChangeText={setSearch}
                  />
                  <FontAwesomeIcon style={styles.iconSearch} icon={faSearch} />
                </View>
                <FlatList
                  data={dataModal}
                  numColumns={2}
                  style={{ marginTop: 20 }}
                  renderItem={({ item, index }) => {
                    let txt = item?.province_name;
                    if (type == 1) {
                      txt = item?.province_name;
                    }
                    if (type == 2) {
                      txt = item?.district_name;
                    }
                    if (type == 3) {
                      txt = item?.ward_name;
                    }
                    if (type == 4) {
                      txt = item?.name;
                    }
                    return item ? (
                      <View style={styles.itemFlatList}>
                        <TouchableOpacity
                          onPress={() => {
                            if (type == 1) {
                              setProvinceSelect(item);
                              setDistrictSelect();
                              setWardSelect();
                              setModalVisible(false);
                              setSearch('');
                            }
                            if (type == 2) {
                              setDistrictSelect(item);
                              setWardSelect();
                              setModalVisible(false);
                              setSearch('');
                            }
                            if (type == 3) {
                              setWardSelect(item);
                              setModalVisible(false);
                              setSearch('');
                            }
                            if (type == 4) {
                              setCategory(item);
                              setModalVisible(false);
                              setSearch('');
                            }
                          }}
                          style={styles.itemModal}>
                          <Text
                            style={{ alignSelf: 'center', fontWeight: '500' }}>
                            {txt}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <></>
                    );
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalCancel}>
                <Text style={styles.txtCancelModal}>Huỷ</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }, [modalVisible, search, dataModal]);
  const handleChoose = () => {
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
            setImg(img.concat(linkImg));
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };
  const handleCamera = () => {
    const options = {
      title: 'Select Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };
    launchCamera(options, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        Alert.alert('Đã có lỗi xảy ra', 'Thử lại', [{ text: 'Ok' }]);
      } else {
        const link = response.assets[0].uri;
        RNFS.readFile(link, 'base64')
          .then(base64Data => {
            const linkImg = `data:image/png;base64,${base64Data}`;
            setImg(img.concat(linkImg));
          })
          .catch(err => {
            console.log(err);
          });
      }
    });

    // }
  };
  const handleDele = index => {
    const fakeData = img;
    const resData1 = fakeData.slice(0, index);
    const resData2 = fakeData.slice(index + 1, fakeData.length);
    setImg(resData1.concat(resData2));
  };
  const handlePost = () => {
    if (txt == null || txt == undefined || txt == '') {
      Alert.alert('Bạn phải viết gì đó', '', [{ text: 'Ok' }]);
    } else if (
      provinceSelect == undefined ||
      districtSelect == undefined ||
      wardSelect == undefined
    ) {
      Alert.alert('Bạn phải chọn địa chỉ', '', [{ text: 'Ok' }]);
    } else {
      let status = 0;
      if (infoUser.role == 1) {
        status = 1;
      }
      firestore()
        .collection('posts')
        .add({
          userId: uid,
          content: txt,
          timeCreate: firestore.FieldValue.serverTimestamp(),
          media: img,
          isActive: 1,
          status: status,
          reaction: [],
          location: {
            city: provinceSelect.province_name,
            district: districtSelect.district_name,
            ward: wardSelect.ward_name,
          },
          category: category?.name || 'Khác' ,
        })
        .then(response => {
          if(category?.name!=undefined){
          firestore()
            .collection('categorys')
            .doc(category.id)
            .update({
              postId: firestore.FieldValue.arrayUnion(
                response._documentPath._parts[1],
              ),
            })
            .then(console.log('done'));
          }
          if (status == 1) {
            Alert.alert('Bài viết đã được đăng !', '', [
              { text: 'Ok', onPress: () => navigation.goBack() },
            ]);
          } else
            firestore()
              .collection('notifications')
              .add({
                toUserId: 'admin',
                fromUserId: uid,
                fromUserName: infoUser.displayName,
                isRead: 0,
                postId: '',
                timeCreate: firestore.FieldValue.serverTimestamp(),
                type: 5,
              })
              .then(() => {
                Alert.alert(
                  'Bài viết đã được đăng, chờ quản trị viên duyệt !',
                  '',
                  [{ text: 'Ok', onPress: () => navigation.goBack() }],
                );
              })
              .catch(() => {
                console.log('Ko push noti');
                Alert.alert(
                  'Bài viết đã được đăng, chờ quản trị viên duyệt !',
                  '',
                  [{ text: 'Ok', onPress: () => navigation.goBack() }],
                );
              });
        })
        .catch(er => {
          console.log('er', er);
          Alert.alert(
            'Đăng bài thất bại',
            'Bạn thử kiểm tra lại, có thẻ dung lượng ảnh của bạn quá lớn',
            [{ text: 'Ok' }],
          );
        });
        
    }
  };
  const handleOpenType = () => {
    setDataModal(listCategory);
    setDataModalSearch(listCategory);
    setType(4);
    setModalVisible(true);
  };

  const handleMicro =()=>{

  }

  const CustomModal2 =()=>{
    return(
      <Modal animationType="slide"
      transparent={true}
      visible={modalVisibleMicro} >

      </Modal>
    )
  }

  const Greeting = useCallback(() => {
    return (
      <View style={styles.greetingContainer}>
        <Image style={styles.avatar} source={{ uri: avt }} />
        <View style={styles.greetingContent}>
          <Text style={styles.txtName}>Chào {infoUser?.displayName}</Text>
          <Text style={styles.txtQuestion}>Bạn đang nghĩ gì ?</Text>
        </View>
      </View>
    );
  }, [avt]);
  const ListImage = useCallback(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {img?.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              width: 'auto',
              height: 'auto',
            }}>
            <Image
              key={index}
              style={styles.imageChoose}
              source={{ uri: item }}
            />
            <TouchableOpacity
              onPress={() => handleDele(index)}
              style={styles.boxCancel}>
              <Image
                style={{ width: 20, height: 20, alignSelf: 'center' }}
                source={require('../../assets/Icons/iconCancel.png')}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }, [img]);
  const CustomButton = useCallback(props => {
    return (
      <TouchableOpacity style={styles.btContainer} onPress={props?.onPress}>
        <Image style={styles.iconCustomButton} source={props?.icon} />
        <Text style={styles.txtCustomButton}>{props.title}</Text>
      </TouchableOpacity>
    );
  }, []);
  const BtPost = useCallback(props => {
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.btSubmit}>
        <Image
          style={styles.iconBtSubmit}
          source={require('../../assets/Icons/iconPaperPlane.png')}
        />
      </TouchableOpacity>
    );
  }, []);
  useEffect(async () => {
    const data = await getProvince();
    setProvince(data);
    firestore()
      .collection('categoríe')
      .onSnapshot(snapshot => {
        if (snapshot != undefined && snapshot != null) {
          const documents = snapshot?.docs.map(doc => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          console.log('documents', documents);
          setListCategory2(documents);
        }
      });
  }, []);
  useEffect(() => {
    const new_arr = listCategory2.filter(item => item != undefined);
    setListCategory(new_arr);
  }, [listCategory2]);
  useEffect(async () => {
    const data = await getDistrict(provinceSelect.province_id);
    setDistrict(data);
  }, [provinceSelect]);
  useEffect(async () => {
    const data = await getWard(districtSelect.district_id);
    setWard(data);
  }, [districtSelect]);
  useEffect(() => {
    if (search != '' && search != null && search != undefined) {
      let newList = [];
      if (type == 1) {
        newList = dataModalSearch.filter(item =>
          rmVN(item.province_name).includes(rmVN(search)),
        );
      }
      if (type == 2) {
        newList = dataModalSearch.filter(item =>
          rmVN(item.district_name).includes(rmVN(search)),
        );
      }
      if (type == 3) {
        newList = dataModalSearch.filter(item =>
          rmVN(item.ward_name).includes(rmVN(search)),
        );
      }
      if (type == 4) {
        newList = dataModalSearch.filter(item =>
          rmVN(item.name).includes(rmVN(search)),
        );
      }
      setDataModal(newList);
    } else {
      setDataModal(dataModalSearch);
    }
  }, [search]);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          {CustomModal()}
          {CustomModal2()}
          <ScrollView>
            <Header title={'Đăng bài'} />
            <Greeting />
            <View style={styles.boxMore}>
              <TouchableOpacity
                onPress={() => {
                  setDataModal(province);
                  setDataModalSearch(province);
                  setModalVisible(true);
                  setType(1);
                }}
                style={styles.boxLocal}>
                <Text style={styles.txtLocal}>
                  {provinceSelect
                    ? provinceSelect.province_name
                    : 'Chọn thành phố'}
                </Text>
                <Image
                  style={styles.iconLocal}
                  source={require('../../assets/Icons/iconLocal.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDataModal(district);
                  setDataModalSearch(district);
                  setType(2);
                  setModalVisible(true);
                }}
                style={styles.boxLocal}>
                <Text style={styles.txtLocal}>
                  {districtSelect
                    ? districtSelect.district_name
                    : 'Chọn quận/huyện'}
                </Text>
                <Image
                  style={styles.iconLocal}
                  source={require('../../assets/Icons/iconLocal.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.boxMore}>
              <TouchableOpacity
                onPress={() => {
                  setDataModal(ward);
                  setDataModalSearch(ward);
                  setType(3);
                  setModalVisible(true);
                }}
                style={styles.boxLocal}>
                <Text style={styles.txtLocal}>
                  {wardSelect ? wardSelect.ward_name : 'Chọn xã/phường'}
                </Text>
                <Image
                  style={styles.iconLocal}
                  source={require('../../assets/Icons/iconLocal.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOpenType}
                style={styles.boxLocal}>
                <Text style={styles.txtLocal}>
                  {category ? category.name : 'Loại đồ ăn'}
                </Text>
                <Image
                  style={styles.iconLocal}
                  source={require('../../assets/Icons/iconFood.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.boxPost}>
              <TextInput
                multiline={true}
                placeholder={'Bạn viết gì đi...'}
                style={styles.input}
                value={txt}
                onChangeText={setTxt}
              />
              <ListImage />
            </View>
            <View style={styles.boxFunctions}>
              <CustomButton
                onPress={handleChoose}
                icon={require('../../assets/Icons/iconPicture.png')}
                title={'Ảnh'}
              />
              <CustomButton
                onPress={handleCamera}
                icon={require('../../assets/Icons/iconCamera.png')}
                title={'Camera'}
              />
            </View>
            {/* <TouchableOpacity style={styles.boxMicro} onPress={handleMicro} >
              <Image style={styles.iconMicro} source={require('../../assets/Icons/iconMicrophone.png')} />
            </TouchableOpacity> */}
            <View style={styles.mattress} />
          </ScrollView>
          <BtPost onPress={handlePost} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  iconMicro:{
    alignSelf:'center',
    width:40,
    height:40,
  },
  boxMicro: {
    width: 70,
    height: 70,
    backgroundColor: '#ff9f5b',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 10,
    borderRadius: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent:'center',
  },
  itemFlatList: {
    width: '50%',
    height: 35,
    marginBottom: 10,
  },
  itemModal: {
    height: 35,
    marginBottom: 10,
    backgroundColor: 'white',
    width: '94%',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  iconSearch: {
    alignSelf: 'center',
    marginRight: 5,
    opacity: 0.5,
  },
  search: {
    fontSize: 15,
    marginLeft: 5,
    alignSelf: 'center',
    width: '90%',
    height: 40,
  },
  searchModalContainer: {
    width: '84%',
    height: 30,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 0.3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: 'orange',
    backgroundColor: '#fef9ee',
    paddingHorizontal: 5,
  },
  topModal: {
    width: '100%',
    height: 350,
    paddingHorizontal: '5%',
  },
  txtCancelModal: { fontSize: 16, fontWeight: '600', alignSelf: 'center' },
  modalCancel: {
    width: '100%',
    height: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: 'orange',
  },
  modalContainer: {
    width: '90%',
    height: 400,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  iconLocal: {
    width: 15,
    height: 15,
    borderRadius: 30,
    alignSelf: 'center',
  },
  txtLocal: {
    alignSelf: 'center',
    fontSize: 13,
  },
  boxLocal: {
    width: '48%',
    height: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  boxMore: {
    width: '90%',
    height: 30,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
  },
  mattress: {
    width: '100%',
    height: 120,
  },
  boxCancel: {
    marginLeft: -10,
    marginTop: -10,
    width: 20,
    height: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 5,
  },
  imageChoose: {
    width: 100,
    height: 100 * 0.75,
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  iconBtSubmit: {
    width: '50%',
    height: '50%',
    alignSelf: 'center',
  },
  btSubmit: {
    width: 70,
    height: 70,
    backgroundColor: 'orange',
    borderRadius: 50,
    marginTop: Dimensions.get('window').height - 120,
    marginLeft: Dimensions.get('window').width - 80,
    justifyContent: 'center',
    position: 'absolute',
  },
  txtCustomButton: {
    fontSize: 16,
    alignSelf: 'center',
    marginLeft: 6,
  },
  iconCustomButton: {
    width: 24,
    height: 24,
    alignSelf: 'center',
  },
  btContainer: {
    width: '45%',
    height: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  boxFunctions: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
  },
  input: {
    width: '96%',
    alignSelf: 'center',
    height: 'auto',
    minHeight: 40,
    fontSize: 16,
    marginTop: 2,
    marginBottom: 10,
    color: 'black',
  },
  boxPost: {
    width: '90%',
    height: 'auto',
    minHeight: 100,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginTop: 10,
    backgroundColor: 'white',
    paddingVertical: 6,
  },
  txtQuestion: {
    fontSize: 18,
    fontWeight: '500',
  },
  txtName: {
    fontSize: 18,
  },
  greetingContent: {
    alignSelf: 'center',
    width: 'auto',
    height: 60,
    minWidth: 100,
    marginLeft: 10,
    justifyContent: 'space-evenly',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'red',
    alignSelf: 'center',
  },
  greetingContainer: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CreatePostScreen;
