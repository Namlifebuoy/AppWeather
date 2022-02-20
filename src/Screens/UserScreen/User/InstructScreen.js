import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import Header from '../../../components/Header';

const InstructScreen = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title={'Hướng dẫn sử dụng'} />
        <View style={styles.container}>
          <Image
            source={require('../../../assets/Images/oops.png')}
            style={styles.img}
          />
          <Text style={styles.txt}>Đã có lỗi mất rồi</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  img: {
    width: '60%',
    height: Dimensions.get('window').width * 0.6,
    alignSelf: 'center',
    marginTop: '30%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default InstructScreen;
