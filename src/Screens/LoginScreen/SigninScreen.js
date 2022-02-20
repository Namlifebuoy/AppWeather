import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AnimationLoad from '../../components/AnimationLoad';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setInfoUser, changeAccount,setUid} from '../../Redux/slice';
import firestore from '@react-native-firebase/firestore';
const SigninScreen = ({navigation}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [autoAdd, setAutoAdd] = useState();
  var user = autoAdd + '@gmail.com';
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const SaveLogin = async props => {
    console.log('props', props);
    try {
      await AsyncStorage.setItem('key', props);
    } catch (e) {
      console.log('Lỗi lưu AsyncStorage');
    }
  };
  const Login = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(user, pass)
      .then(data => {
        firestore()
          .collection('users')
          .doc(data.user._user.uid)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              console.log('Có tài khoản ');
              dispatch(setUid(data.user._user.uid));
              dispatch(setInfoUser(documentSnapshot.data()));
              dispatch(changeAccount());
            }
          });
        setLoading(false);
        console.log('Logged in successfully!', data.user._user);
        SaveLogin(data.user._user.uid);
        navigation.navigate('TabBottom');
      })
      .catch(error => {
        setLoading(false);
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Tài khoản không tồn tại', 'Vui lòng thử lại', [
            {text: 'OK'},
          ]);
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('Mật khẩu sai', 'Vui lòng thử lại', [{text: 'OK'}]);
        } else
          Alert.alert('Đã có lỗi xảy ra', 'Vui lòng thử lại', [{text: 'OK'}]);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <Text style={styles.title_1}>Đăng nhập</Text>
              <Text style={styles.title_2}>
                Hãy đăng nhập và trải nghiệm dịch vụ của chúng tôi
              </Text>
            </View>
          </SafeAreaView>
          <View style={styles.middle}>
            <View style={styles.wrapper_mid}>
              <TextInput
                style={styles.text_input}
                placeholder="Tên đăng nhập"
                onChangeText={setAutoAdd}
                value={autoAdd}
                autoCorrect={false}
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
                  onPress={() => setIsSecureEntry(prev => !prev)}>
                  <Image
                    style={styles.show_pass}
                    source={require('../../assets/Icons/showPass.png')}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{marginLeft: '120%', width: '100%'}}>
                <Text style={styles.text_forgot}>Quên mật khẩu?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  Login();
                }}>
                <Text style={styles.text_btn}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f17045d1',
  },
  header: {
    flex: 3,
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
    marginTop: '10%',
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
    width: '86%',
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
    padding: 0,
    borderRadius: 25,
    backgroundColor: '#ebebeb',
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
  text_forgot: {
    fontWeight: '600',
    color: '#767676',
    marginTop: 10,
  },
  button: {
    width: '80%',
    height: 50,
    marginTop: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111111',
    alignSelf: 'center',
  },
  text_btn: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  center: {
    justifyContent: 'center',
  },
});
export default SigninScreen;
