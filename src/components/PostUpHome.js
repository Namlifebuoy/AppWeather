import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/core';
import {useSelector} from 'react-redux';
const PostUpHome = props => {
  const navigation = useNavigation();
  const infoUser = useSelector(state => state.slice.infoUser);
  let avatar = require('../assets/Images/avatarDefault.png');
  if (props != undefined) {
    avatar = {uri: props};
  }
  return (
    <View style={styles.container}>
      <View style={styles.boxPostUp}>
        <View style={styles.boxPostUpLeft}>
          <Image style={styles.avatar} source={avatar} />
          <TouchableOpacity
            onPress={() => {
              if (infoUser != null && infoUser != undefined) {
                navigation.navigate('CreatePost');
              } else {
                Alert.alert(
                  'Thông báo',
                  'Bạn cần đăng nhập để dùng chức năng này',
                  [
                    {
                      text: 'Huỷ',
                    },
                    {
                      text: 'Đăng nhập',
                      onPress: () => {
                        navigation.navigate('Login');
                      },
                    },
                  ],
                );
              }
            }}
            style={styles.boxPress}>
            <Text
              style={styles.txtPostUp}
              children={'Món ăn hôm nay của bạn như thế nào ?'}
            />
            <FontAwesomeIcon
              color={'#ff9800'}
              style={styles.iconSearch}
              icon={faCamera}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};
const styles = StyleSheet.create({
  boxPress: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: Dimensions.get('window').width * 0.9 - 40,
    justifyContent: 'space-between',
    height: 'auto',
  },
  iconSearch: {
    alignSelf: 'center',
    opacity: 0.9,
    marginLeft: 10,
  },
  boxPostUpLeft: {
    flexDirection: 'row',
  },
  txtPostUp: {
    alignSelf: 'center',
    fontSize: 14,
    marginLeft: 10,
    opacity: 0.9,
  },
  avatar: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 50,
  },
  boxPostUp: {
    width: '90%',
    height: 65,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: 70,
  },
  line: {
    width: '100%',
    height: 5,
    backgroundColor: '#e5e5e5',
  },
});
export default PostUpHome;
