import React from 'react';
import {StyleSheet} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
const AnimationLoad = props => {
  return (
    <AnimatedLoader
      visible={props?.visible || false}
      overlayColor="rgba(255,255,255,0.75)"
      source={require('../assets/Animations/AnimationLogin.json')}
      animationStyle={styles.lottie}
      speed={1}></AnimatedLoader>
  );
};
const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300,
  },
});
export default AnimationLoad;
