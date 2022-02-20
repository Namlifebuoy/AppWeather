import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require('../../assets/Images/logoHome.png')}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.wrapper}>
          <Text style={styles.title_1}>Chào mừng bạn đến với FoodReview</Text>
          <Text style={styles.title_2}>Món ngon được cập nhật mỗi ngày!</Text>
          <View style={styles.wrapper_button}>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.sign_in}
                onPress={() => navigation.navigate('Signin')}>
                <Text style={styles.text_btn1}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sign_up}
                onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.text_btn2}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 110,
  },
  header: {
    flex: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 6,
    backgroundColor: '#f17045',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '85%',
    height: '70%',
  },
  wrapper_button: {
    alignSelf: 'center',
    width: '100%',
    height: '20%',
  },
  box: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sign_in: {
    width: 160,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign_up: {
    width: 160,
    height: 50,
    borderRadius: 22,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title_1: {
    fontWeight: '600',
    fontSize: 25,
    marginBottom: 20,
  },
  title_2: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 40,
  },
  text_btn1: {
    color: 'white',
    fontWeight: 'bold',
  },
  text_btn2: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
