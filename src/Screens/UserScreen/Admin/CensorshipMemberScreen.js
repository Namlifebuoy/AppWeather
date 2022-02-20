import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import Header from '../../../components/Header';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {rmVN} from '../../../Hook/rnVN';

const Item = ({item}) => {
  let role = 'Người dùng';
  let up = false;
  let admin = false;
  if (item?.role == 1) {
    role = 'Quản trị';
    admin = true;
  }
  if (item?.role == 2) {
    role = 'Người kiểm duyệt';
    up = true;
  }
  const handlePress = () => {
    try {
      firestore()
        .collection('users')
        .doc(item?.id)
        .update({
          role: 2,
        })
        .then(() => {
          Alert.alert('', 'Đã duyệt');
        });
    } catch (error) {
      console.log('lỗi');
    }
  };
  const handleCancel = () => {
    try {
      firestore()
        .collection('users')
        .doc(item?.id)
        .update({
          role: 0,
        })
        .then(() => {
          Alert.alert('', 'Đã huỷ quyền');
        });
    } catch (error) {
      console.log('lỗi');
    }
  };
  return (
    <View style={styles.itemContainer}>
      <FastImage
        style={styles.avatar}
        source={
          item?.avatar
            ? {uri: item?.avatar}
            : require('../../../assets/Images/avatarDefault.png')
        }
      />
      <View style={styles.blockRightItem}>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.txtName}>{item?.displayName}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.boxIcon}>
              <Image
                style={styles.iconRole}
                source={require('../../../assets/Icons/iconMedal.png')}
              />
            </View>
            <Text style={styles.txtRole}>{role}</Text>
          </View>
        </View>
        {admin ? (
          <View style={{justifyContent: 'flex-end'}}></View>
        ) : (
          <View style={{justifyContent: 'flex-end'}}>
            {up ? (
              <TouchableOpacity
                onPress={handleCancel}
                style={[styles.btSubmit, {backgroundColor: '#ffa2a2'}]}>
                <Text style={styles.txtSubmit}>Huỷ quyền</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.btSubmit} onPress={handlePress}>
                <Text style={styles.txtSubmit}>Nâng quyền</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const CensorshipMemberScreen = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [dataSearch, setDataSearch] = useState([]);
  useEffect(() => {
    firestore()
      .collection('users')
      .orderBy('role', 'asc')
      .onSnapshot(snapshot => {
        // console.log('snapshot', snapshot);
        if (snapshot != undefined && snapshot != null) {
          const documents = snapshot?.docs.map(doc => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setData(documents);
          setDataSearch(documents);
        }
      });
  }, []);

  useEffect(() => {
    if (search == '') {
      setDataSearch(data);
    } else {
      const newList = data.filter(item =>
        rmVN(item.displayName).includes(rmVN(search)),
      );
      setDataSearch(newList);
      console.log('search', search);
    }
  }, [search]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('object');
        Keyboard.dismiss();
      }}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title={'Quản lý thành viên'} />
        <View style={styles.tabSearch}>
          <TextInput
            style={styles.search}
            placeholder={'Tìm kiếm...'}
            value={search}
            onChangeText={setSearch}
          />
          <FontAwesomeIcon style={styles.iconSearch} icon={faSearch} />
        </View>
        <ScrollView>
          <View onStartShouldSetResponder={() => true}>
            {dataSearch.map((item, index) => (
              <Item item={item} />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
  },
  tabSearch: {
    width: '94%',
    height: 40,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#e4e7ed',
    paddingHorizontal: 5,
  },
  boxIcon: {
    width: 23,
    height: 23,
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#ffd264',
    marginTop: 5,
  },
  txtSubmit: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    alignSelf: 'center',
  },
  btSubmit: {
    width: 'auto',
    height: 30,
    backgroundColor: 'orange',
    marginBottom: 5,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  txtRole: {
    alignSelf: 'center',
    marginTop: 5,
    marginLeft: 5,
    color: 'orange',
    fontWeight: '400',
  },
  iconRole: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  txtName: {
    fontSize: 15,
    fontWeight: '500',
  },
  blockRightItem: {
    width: Dimensions.get('window').width * 0.94 * 0.94 - 45,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 7,
  },
  avatar: {
    width: 45,
    height: 45,
    alignSelf: 'center',
    borderRadius: 40,
  },
  itemContainer: {
    width: '94%',
    height: 70,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: '3%',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CensorshipMemberScreen;
