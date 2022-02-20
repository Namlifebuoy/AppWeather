import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Header from '../../../components/Header';
import Post3 from '../../../components/Post3';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import _ from 'lodash';

const PostedScreen = () => {
  const uid = useSelector(state => state.slice.uid);
  const [data, setData] = useState();
  const [showImage, setShowImage] = useState(false);
  const [img, setImg] = useState();

  useEffect(() => {
    firestore()
      .collection('posts')
      .orderBy('userId')
      .where('userId', 'in', [uid])
      .onSnapshot(snapshot => {
        if (snapshot != undefined && snapshot != null) {
          const documents = snapshot?.docs.map(doc => {
            if (doc._data.isActive == 1) {
              return {
                ...doc.data(),
                id: doc.id,
              };
            }
          });
          setData(_.orderBy(documents, 'timeCreate', 'desc'));
        }
      });
  }, []);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title={'Bài viết đã đăng'} />
        {data ? (
          <FlatList
            data={data}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={100}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              item ? (
                <Post3
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
            <Text style={styles.txtEmpty}>Bạn chưa đăng bài viết nào</Text>
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

export default PostedScreen;
