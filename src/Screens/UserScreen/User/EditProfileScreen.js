import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

const EditProfileScreen = ({navigation}) => {
  const renderInner = () => (
    <View
      style={{
        width: '100%',
        height: 300,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: '80%',
          height: '13%',
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          marginTop: 15,
        }}>
        <Text style={{fontSize: 18, color: '#FFFF', fontWeight: '700'}}>
          Tải ảnh lên
        </Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Tên tài khoản"
        placeholderTextColor="#f00"
        autoCorrect={false}
        style={{
          width: '80%',
          height: '13%',
          borderRadius: 15,
          marginTop: 15,
          borderWidth: 1,
          borderColor: 'red',
          paddingHorizontal: 10,
        }}
      />
      <TouchableOpacity
        style={{
          width: '80%',
          height: '13%',
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 15,
          marginTop: 15,
        }}>
        <Text style={{fontSize: 18, color: '#FFFF', fontWeight: '700'}}>
          Xác nhận
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );
  const sheetRef = React.useRef(null);

  const bs = React.createRef();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={styles.left_arrow}
            source={require('../../../assets/Icons/left_arrow.png')}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}>
          <TouchableOpacity>
            <ImageBackground
              style={styles.changeImage}
              imageStyle={{borderRadius: 15}}
              source={require('../../../assets/Images/avatar.jpeg')}>
              <View style={styles.center}>
                <Image
                  style={styles.iconCamera}
                  source={require('../../../assets/Icons/iconCamera.png')}
                />
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <Text style={styles.textDisplay}>Namlifebuoy</Text>
          <TextInput
            placeholder="Tên tài khoản"
            placeholderTextColor="#f00"
            autoCorrect={false}
            style={styles.textInput}
          />
          <TouchableOpacity style={styles.submit}>
            <Text style={styles.textSubmit}>Xác nhận</Text>
          </TouchableOpacity>
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
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: 'gray',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeImage: {
    height: 100,
    width: 100,
  },
  iconCamera: {
    width: 35,
    height: 35,
    opacity: 0.7,
  },
  textDisplay: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  textInput: {
    borderWidth: 1,
    marginTop: 50,
    borderColor: '#f00',
    borderRadius: 20,
    width: 250,
    height: 40,
    paddingLeft: 15,
  },
  submit: {
    marginTop: 20,
    width: 250,
    height: 40,
    backgroundColor: '#f00',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textSubmit: {
    color: '#FFFF',
    fontWeight: 'bold',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'orange',
    marginBottom: 10,
  },
  panelHeader: {
    alignItems: 'center',
  },
});
export default EditProfileScreen;
