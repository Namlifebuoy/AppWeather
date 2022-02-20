import React from 'react';
import {Image, Text, TouchableOpacity, StyleSheet, View} from 'react-native';

const BoxFunction = props => {
  return (
    <>
      <TouchableOpacity style={styles.container} onPress={props.press}>
        <View style={styles.main}>
          <View style={styles.backgroundIcon}>
            <Image style={styles.icon} source={props.icon} />
          </View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <Image
          style={styles.iconArrow}
          source={require('../assets/Icons/iconRightArrow.png')}
        />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  iconArrow: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginRight: 20,
  },
  title: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
  },
  backgroundIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    marginLeft: 15,
    borderRadius: 15,
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  main: {
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
export default React.memo(BoxFunction);
