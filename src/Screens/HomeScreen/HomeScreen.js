import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import HeaderHome from '../../components/HeaderHome';
import ImageViewScreen from '../../components/ImageViewScreen';
import Post from '../../components/Post';
import PostUpHome from '../../components/PostUpHome';
import _ from 'lodash';
const HomeScreen = () => {
  const infoUser = useSelector(state => state.slice.infoUser);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [dataMore, setDataMore] = useState([]);
  const [infoUserPost, setInfoUserPost] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [img, setImg] = useState();
  const [limit, setLimit] = useState(5)
console.log('dataMore',dataMore);
console.log('data',data);
  useEffect(() => {
    firestore()
      .collection('posts')
      .orderBy('timeCreate', 'desc')
      .limit(5)
      .get()
      .then(snapshot => {
        console.log(snapshot);
        if (snapshot != undefined && snapshot != null) {
          const documents = snapshot?.docs.map(doc => {
            if (doc.data().status == 1) {
              return {
                ...doc.data(),
                id: doc.id,
              };
            }
          });
          setData(documents);
        }
      });
    return () => {
      setData([]);
    };
  }, [infoUser]);

  useEffect(() => {
    if (limit != 5) {
      firestore()
        .collection('posts')
        .orderBy('timeCreate', 'desc')
        .limit(limit)
        .onSnapshot(snapshot => {
          if (snapshot != undefined && snapshot != null) {
            const documents = snapshot?.docs.map(doc => {
              if (doc.data().status == 1) {
                return {
                  ...doc.data(),
                  id: doc.id,
                };
              }
            });
            setDataMore(documents);
          }
        });
    }
  }, [limit]);

  useEffect(() => {
    if (dataMore.length > 1 ) {
      dataMore.map((a) => {
        if (a != undefined) {
          const check = data.find(item => item?.id == a?.id)
          if (check == undefined) {
            setData([...data, a])
          }
        }
      })
    }
  }, [dataMore, data])

  return (
    <View style={styles.container}>
      <ImageViewScreen
        img={img}
        showImage={showImage}
        setShowImage={setShowImage}
        setImg={setImg}
      />
      <SafeAreaView>
        <HeaderHome />
        {PostUpHome(infoUser?.avatar)}
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        {/* {data.map((item, index) => {
            return (
              <Post
                item={item}
                index={index}
                setShowImage={setShowImage}
                setImg={setImg}
              />
            );
          })} */}
        <FlatList
          data={data}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={100}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
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
          ListFooterComponent={() => <View style={{paddingTop:10}} >
            <ActivityIndicator size="large" color="orange" />
             <View style={styles.footer} />
            </View>
            }
          onEndReached={() => setLimit(limit + 2)}
        />

        {/* </ScrollView> */}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default HomeScreen;
