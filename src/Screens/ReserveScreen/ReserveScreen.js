import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import Post from '../../components/Post';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import _ from 'lodash';

const ReserveScreen = () => {
  const listPostSave = useSelector(state => state.slice.infoUser?.listPostSave);
  const [data, setData] = useState();
  const [showImage, setShowImage] = useState(false);
  const [img, setImg] = useState();
  const [first, setFirst] = useState(0)

  useEffect(() => {
    if (listPostSave != undefined) {
      firestore()
        .collection('posts')
        .orderBy('status')
        .where('status', '>=', 1)
        .onSnapshot(snapshot => {
          if (snapshot != undefined && snapshot != null) {
            const documents = snapshot?.docs.map(doc => {
              if (listPostSave?.indexOf(doc.id) != -1) {
                return {
                  ...doc.data(),
                  id: doc.id,
                };
              }
            });
            setData(_.orderBy(documents, 'timeCreate', 'desc'));
          }
        });
    }
    setFirst(1)
  }, []);
  useEffect(() => {
    if (listPostSave != undefined && first== 1) {
      firestore()
        .collection('posts')
        .orderBy('timeCreate', 'desc')
        .onSnapshot(snapshot => {
          if (snapshot != undefined && snapshot != null) {
            const documents = snapshot?.docs.map(doc => {
              if (listPostSave?.indexOf(doc.id) != -1) {
                return {
                  ...doc.data(),
                  id: doc.id,
                };
              }
            });
            setData(documents);
          }
        });
    }
  }, [listPostSave]);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        {data ? (
          <FlatList
            data={data}
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
            ListFooterComponent={() => <View style={styles.footer} />}
          />
        ) : (
          <View style={styles.container2}>
            <Text style={styles.txtEmpty}>Bạn chưa lưu bài viết nào</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  txtEmpty: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  footer: {
    width: '100%',
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ReserveScreen;
