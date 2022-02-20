import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import SearchScreen from '../Screens/HomeScreen/SearchScreen';
import {useNavigation} from '@react-navigation/native';

const HeaderHome = props => {
  const navigation = useNavigation();
  let avatar = require('../assets/Images/avatarDefault.png');
  if (props?.avatar != undefined) {
    avatar = {uri: props?.avatar};
  }
  return (
    <View style={styles.containerHeader}>
      <Image
        style={styles.logo}
        source={require('../assets/Images/logoHome.png')}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Search')}
        style={styles.boxSearch}>
        <Text style={styles.search} children={'Tìm kiếm...'} />
        <FontAwesomeIcon style={styles.iconSearch} icon={faSearch} />
      </TouchableOpacity>
      {/* <Image source={avatar} style={styles.avatar} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  iconSearch: {
    alignSelf: 'center',
    marginRight: 5,
    opacity: 0.5,
  },
  search: {
    fontSize: 15,
    marginLeft: 5,
    opacity: 0.4,
    alignSelf: 'center',
  },
  boxSearch: {
    width: '50%',
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 5,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#ebeef5',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: 'yellow',
  },
  logo: {
    width: 130,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  containerHeader: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 0.6,
    borderColor: '#cdd9e5',
  },
});
export default HeaderHome;
