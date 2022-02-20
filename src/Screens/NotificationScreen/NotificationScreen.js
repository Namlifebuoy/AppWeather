import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import Item from './Item';
//notifications

const NotificationScreen = () => {
  const [data, setData] = useState([]);
  const uid = useSelector(state => state.slice.uid);
  const infoUser = useSelector(state => state.slice.infoUser);
  console.log('data', data);

  const getData = () => {
    if (infoUser?.role == 1 || infoUser?.role == 2) {
      firestore()
        .collection('notifications')
        .orderBy('toUserId')
        .where('toUserId', 'in', [uid, 'admin'])
        .onSnapshot(snapshot => {
          if (snapshot != undefined && snapshot != null) {
            const documents = snapshot?.docs.map(doc => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            });
            console.log('documents', documents);
            setData(_.orderBy(documents, 'timeCreate', 'desc'));
          }
        });
    } else {
      firestore()
        .collection('notifications')
        .orderBy('toUserId')
        .where('toUserId', 'in', [uid])
        .onSnapshot(snapshot => {
          if (snapshot != undefined && snapshot != null) {
            const documents = snapshot?.docs.map(doc => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            });
            console.log('documents', documents);
            setData(_.orderBy(documents, 'timeCreate', 'desc'));
          }
        });
    }
  };

  useEffect(() => {
    getData(); 
  }, [infoUser]);

  const numNoti = data.length;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {/* header */}
        <View style={styles.header}>
          <View style={{width: 300, height: 60}}>
            <Text style={{fontSize: 28, fontWeight: '600'}}>Thông báo</Text>
            <Text style={styles.textHeader}>
              Bạn có <Text style={styles.textColor}>{numNoti} thông báo</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.btnOption}>
            <Image
              source={require('../../assets/Icons/iconOption.png')}
              style={styles.imgBtn}
            />
          </TouchableOpacity>
        </View>
        {/* main */}
        <View style={styles.wrapper}>
          <View style={styles.titleWrap}>
            <Text style={{fontSize: 17, fontWeight: '600'}}>Hôm nay</Text>
          </View>
          {/* <<<<<<< HEAD
          {listItem.map((item, index) => (
            <Item
              key={index}
              image={item.image}
              user={item.user}
              time={item.time}
            />
          ))}
======= */}
          <ScrollView showsVerticalScrollIndicator={false}>
            {data ? (
              data.map((item, index) => <Item key={index} item={item} />)
            ) : (
              <></>
            )}
            <View style={styles.footer}></View>
          </ScrollView>
          {/* >>>>>>> 667000aded9c3b64bec79fc64e8f698ef946b41f */}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 300,
  },
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
    backgroundColor: '#a8deff',
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
export default NotificationScreen;
