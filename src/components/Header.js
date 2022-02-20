import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Header = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.containerHeader}>
      <TouchableOpacity
        style={styles.boxIcon}
        onPress={() => navigation.goBack()}>
        <Image
          style={styles.iconHeader}
          source={require('../assets/Icons/left_arrow.png')}
        />
      </TouchableOpacity>

      <Text style={styles.titleHeader}>{props?.title}</Text>
      <View style={styles.iconHeader}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  boxIcon: {
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
  },
  titleHeader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  iconHeader: {
    width: 16,
    height: 16,
    alignSelf: 'center',
  },
  containerHeader: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Header;
