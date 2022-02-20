import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableNativeFeedback,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Header from '../../../components/Header';
import Post2 from '../../../components/Post2';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import ImageViewScreen from '../../../components/ImageViewScreen';
import Post from '../../../components/Post';

const CensorshipScreen = () => {
  const [data, setData] = useState([]);
  const [showImage, setShowImage] = useState(false);
  const [img, setImg] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const BoxModal = () => {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: 'rgba(130, 130, 130,0.5)',
            justifyContent: 'center',
          },
        ]}>
        <View
          style={{
            width: '30%',
            minHeight: 70,
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 6,
          }}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  };

  useEffect(() => {
    firestore()
      .collection('posts')
      .orderBy('timeCreate', 'desc')
      .onSnapshot(snapshot => {
        if (snapshot != undefined && snapshot != null) {
          const documents = snapshot?.docs.map(doc => {
            if (doc.data().status == 0) {
              return {
                ...doc.data(),
                id: doc.id,
              };
            }
          });
          console.log('documents', documents);
          setData(documents);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <Modal animationType="none" transparent={true} visible={modalVisible}>
        <BoxModal />
      </Modal>
      <ImageViewScreen
        img={img}
        showImage={showImage}
        setShowImage={setShowImage}
        setImg={setImg}
      />
      <SafeAreaView style={styles.container}>
        <Header title={'Duyệt bài'} />
        <FlatList
          data={data}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={100}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) =>
            item ? (
              <Post2
                item={item}
                index={index}
                setShowImage={setShowImage}
                setImg={setImg}
                setModalVisible={setModalVisible}
              />
            ) : (
              <></>
            )
          }
          keyExtractor={(a, b) => b}
          ListFooterComponent={() => <View style={styles.footer} />}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default CensorshipScreen;
