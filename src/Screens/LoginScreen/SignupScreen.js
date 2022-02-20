import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AnimationLoad from '../../components/AnimationLoad';
import { launchImageLibrary } from 'react-native-image-picker';
var RNFS = require('react-native-fs');
import firestore from '@react-native-firebase/firestore';
const SignupScreen = ({ navigation }) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
  const [autoAdd, setAutoAdd] = useState();
  var user = autoAdd + '@gmail.com';
  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const [img, setImg] = useState();
  const linkImg = `data:image/png;base64,${img}`;
  const [confirmPass, setConfirmPass] = useState();
  const [loading, setLoading] = useState(false);
  const handleChoose = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        alert('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        alert('ImagePicker Error: ' + response.error);
      } else {
        const link = response.assets[0].uri;
        RNFS.readFile(link, 'base64')
          .then(base64Data => {
            // console.log('base64Data', base64Data);
            setImg(base64Data);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  const ChooseImg = () => {
    return (
      <TouchableOpacity onPress={handleChoose} style={styles.button_1}>
        <Text style={styles.text_btn1}>Chọn ảnh đại diện</Text>
      </TouchableOpacity>
    );
  };

  const CheckPass = () => {
    if (name != null) {
      if (pass.length >= 6) {
        if (pass == confirmPass) {
          Signup();
        } else
          Alert.alert('Mật khẩu nhập lại không chính xác', 'Thử lại', [
            { text: 'OK' },
          ]);
      } else Alert.alert('Mật khẩu quá ngắn', 'Thử lại', [{ text: 'OK' }]);
    } else Alert.alert('Nhập tên của bạn', 'Thử lại', [{ text: 'OK' }]);
  };

  const addInfo = async props => {
    //set
    await firestore()
      .collection('users')
      .doc(props)
      .set({
        displayName: name,
        avatar: linkImg,
        email: user,
        role: 0,
        isActive: 1,
      })
      .then(() => {
        setLoading(false);
        Alert.alert('Đăng kí thành công ', 'Đăng nhập', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      });
  };

  const Signup = async () => {
    setLoading(true);
    await auth()
      .createUserWithEmailAndPassword(user, pass)
      .then(data => {
        addInfo(data.user._user.uid);
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Tài khoản tồn tại ', 'Vui lòng thử lại', [{ text: 'OK' }]);
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert('Mật khẩu không hợp lệ', 'Vui lòng thử lại', [
            { text: 'OK' },
          ]);
        } else Alert.alert('Đã có lỗi', 'Vui lòng thử lại', [{ text: 'OK' }]);
      });
  };
  const Avartar = () => {
    if (img != null && img != undefined)
      return (
        <Image
          onError={() => console.log('lỗi')}
          style={{ width: 100, height: 100, borderRadius: 100, marginTop: 10 }}
          source={{ uri: linkImg }}
        />
      );
    else return <></>;
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <>
        <AnimationLoad visible={loading} />
        <SafeAreaView style={styles.header}>
          <View style={styles.wrapper_hed}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={styles.left_arrow}
                source={require('../../assets/Icons/left_arrow.png')}
              />
            </TouchableOpacity>
            <Text style={styles.title_1}>Đăng ký</Text>
            <Text style={styles.title_2}>
              Bạn chưa có tài khoản? Hãy đăng ký
            </Text>
          </View>
        </SafeAreaView>
        <View style={styles.middle}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.wrapper_mid}>
              <TextInput
                style={styles.text_input}
                placeholder="Tên đăng nhập"
                onChangeText={setAutoAdd}
                value={autoAdd}
                autoCorrect={false}
              />
              <TextInput
                style={styles.text_input}
                placeholder="Tên hiển thị"
                onChangeText={setName}
                value={name}
              />
              <View style={styles.wrapper_pass}>
                <TextInput
                  style={styles.text_input_pass}
                  placeholder="Mật khẩu"
                  onChangeText={setPass}
                  value={pass}
                  secureTextEntry={isSecureEntry}
                />
                <TouchableOpacity
                  style={styles.center}
                  onPress={() => setIsSecureEntry(!isSecureEntry)}>
                  <Image
                    style={styles.show_pass}
                    source={require('../../assets/Icons/showPass.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.wrapper_pass}>
                <TextInput
                  style={styles.text_input_pass}
                  placeholder="Nhập lại mật khẩu"
                  onChangeText={setConfirmPass}
                  value={confirmPass}
                  secureTextEntry={isSecureEntryConfirm}
                />
                <TouchableOpacity
                  style={styles.center}
                  onPress={() =>
                    setIsSecureEntryConfirm(!isSecureEntryConfirm)
                  }>
                  <Image
                    style={styles.show_pass}
                    source={require('../../assets/Icons/showPass.png')}
                  />
                </TouchableOpacity>
              </View>
              <Avartar />
              <ChooseImg />
              <TouchableOpacity
                style={styles.button_2}
                onPress={() => {
                  CheckPass();
                }}>
                <Text style={styles.text_btn2}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f17045d1',
  },
  header: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper_hed: {
    width: '88%',
    height: '90%',
  },
  left_arrow: {
    width: 20,
    height: 20,
  },
  title_1: {
    fontSize: 25,
    fontWeight: '600',
    marginTop: '5%',
  },
  title_2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  middle: {
    flex: 9,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper_mid: {
    width: '100%',
    height: '86%',
    alignItems: 'center',
  },
  wrapper_pass: {
    flexDirection: 'row',
    marginTop: 15,
  },
  text_input: {
    width: 290,
    height: 58,
    marginTop: 15,
    borderRadius: 25,
    backgroundColor: '#ebebeb',
    padding: 0,
    paddingLeft: 15,
  },
  text_input_pass: {
    width: 290,
    height: 58,
    borderRadius: 25,
    backgroundColor: '#ebebeb',
    padding: 0,
    paddingLeft: 15,
  },
  show_pass: {
    width: 20,
    height: 20,
    marginLeft: -35,
  },
  button_1: {
    width: 290,
    height: 58,
    marginTop: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f17045d1',
  },
  button_2: {
    width: 290,
    height: 58,
    marginTop: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111',
  },
  text_btn1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  text_btn2: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  center: {
    justifyContent: 'center',
  },
});
export default SignupScreen;
