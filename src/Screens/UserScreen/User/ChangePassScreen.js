import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import {useSelector} from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
const ChangePassScreen = ({navigation}) => {
  const [isSecureEntryOld, setIsSecureEntryOld] = useState(true);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSecureEntryConfirm, setIsSecureEntryConfirm] = useState(true);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassConfirm, setNewPassConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const email = useSelector(state => state.slice.infoUser);
  const handleSubmit = () => {
    if (oldPass.length < 6) {
      Alert.alert('Mật khẩu hiện tại quá ngắn', 'Vui lòng thử lại', [
        {text: 'OK'},
      ]);
    } else if (newPass.length < 6) {
      Alert.alert('Mật khẩu mới quá ngắn', 'Vui lòng thử lại', [{text: 'OK'}]);
    } else if (newPass == oldPass) {
      Alert.alert('Mật khẩu mới trùng mật khẩu hiện tại', 'Vui lòng thử lại', [
        {text: 'OK'},
      ]);
    } else if (newPass !== newPassConfirm) {
      Alert.alert('Nhập lại mật khẩu không khớp', 'Vui lòng thử lại', [
        {text: 'OK'},
      ]);
    } else {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(email.email, oldPass)
        .then(function (user) {
          auth()
            .currentUser.updatePassword(newPass)
            .then(function () {
              setLoading(false);
              Alert.alert('Thông báo', 'Đổi thành công', [{text: 'OK'}]);
            })
            .catch(function (err) {
              setLoading(false);
              Alert.alert('Thất bại', 'Vui lòng thử lại', [{text: 'OK'}]);
            });
        })
        .catch(function (err) {
          setLoading(false);
          Alert.alert('Thất bại', 'Vui lòng thử lại', [{text: 'OK'}]);
        });
    }
  };
  if (loading)
    return (
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../../assets/Animations/AnimationChangePass.json')}
        animationStyle={{
          width: 300,
          height: 300,
        }}
        speed={1}></AnimatedLoader>
    );
  else
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.wrapper}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={styles.left_arrow}
                source={require('../../../assets/Icons/left_arrow.png')}
              />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Đổi mật khẩu</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.wrapperLock}>
              <Image
                style={styles.iconLock}
                source={require('../../../assets/Icons/iconChangePass.png')}
              />
            </View>
          </View>
          <View style={styles.center}>
            <View style={styles.wrapperPass}>
              <View style={{}}>
                <Text style={{color: 'gray'}}>Mật khẩu hiện tại</Text>
                <View style={styles.row}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={isSecureEntryOld}
                    value={oldPass}
                    onChangeText={setOldPass}
                  />
                  <TouchableOpacity
                    style={styles.center}
                    onPress={() => setIsSecureEntryOld(!isSecureEntryOld)}>
                    <Image
                      style={styles.show_pass}
                      source={require('../../../assets/Icons/showPass.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color: 'gray'}}>Mật khẩu mới</Text>
                <View style={styles.row}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={isSecureEntry}
                    value={newPass}
                    onChangeText={setNewPass}
                  />
                  <TouchableOpacity
                    style={styles.center}
                    onPress={() => setIsSecureEntry(!isSecureEntry)}>
                    <Image
                      style={styles.show_pass}
                      source={require('../../../assets/Icons/showPass.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Text style={{color: 'gray'}}>Xác nhận mật khẩu</Text>
                <View style={styles.row}>
                  <TextInput
                    style={styles.textInput}
                    secureTextEntry={isSecureEntryConfirm}
                    value={newPassConfirm}
                    onChangeText={setNewPassConfirm}
                  />
                  <TouchableOpacity
                    style={styles.center}
                    onPress={() =>
                      setIsSecureEntryConfirm(!isSecureEntryConfirm)
                    }>
                    <Image
                      style={styles.show_pass}
                      source={require('../../../assets/Icons/showPass.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.wrapperBtn}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={{fontWeight: '600', color: 'white'}}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  abc: {
    flex: 1,
  },
  wrapper: {
    width: '88%',
    height: '95%',
  },
  left_arrow: {
    width: 20,
    height: 20,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    alignSelf: 'center',
    marginLeft: '28%',
    fontSize: 20,
    fontWeight: '500',
  },
  box: {
    width: '100%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightblue',
  },
  iconLock: {
    width: 80,
    height: 95,
  },
  wrapperLock: {
    width: 220,
    height: 220,
    backgroundColor: '#feffcd',
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperPass: {
    width: '90%',
    height: 300,
    paddingHorizontal: 20,
  },
  textInput: {
    width: '100%',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#d8d8d8',
  },
  wrapperBtn: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    shadowOpacity: 0.1,
    shadowColor: 'gray',
  },
  row: {
    flexDirection: 'row',
  },
  show_pass: {
    width: 20,
    height: 20,
    marginLeft: -35,
  },
});

export default ChangePassScreen;
