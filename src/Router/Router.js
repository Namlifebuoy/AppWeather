import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {useDispatch} from 'react-redux';
import {setInfoUser, setUid} from '../Redux/slice';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import SearchScreen from '../Screens/HomeScreen/SearchScreen.js';
import SearchResultScreen from '../Screens/HomeScreen/SearchResultScreen.js';
import CreatePostScreen from '../Screens/HomeScreen/CreatePostScreen.js';
import LoginScreen from '../Screens/LoginScreen/LoginScreen';
import SigninScreen from '../Screens/LoginScreen/SigninScreen';
import SignupScreen from '../Screens/LoginScreen/SignupScreen';
import NotificationScreen from '../Screens/NotificationScreen/NotificationScreen';
import ReserveScreen from '../Screens/ReserveScreen/ReserveScreen';
import ChangePassScreen from '../Screens/UserScreen/User/ChangePassScreen';
import EditProfileScreen from '../Screens/UserScreen/User/EditProfileScreen';
import UserScreen from '../Screens/UserScreen/UserScreen';
import CensorshipScreen from '../Screens/UserScreen/Admin/CensorshipScreen';
import CommentScreen from '../Screens/HomeScreen/CommentScreen';
import CensorshipMemberScreen from '../Screens/UserScreen/Admin/CensorshipMemberScreen';
import InstructScreen from '../Screens/UserScreen/User/InstructScreen';
import PostedScreen from '../Screens/UserScreen/User/PostedScreen';
import UpdatePostScreen from '../Screens/UserScreen/User/UpdatePostScreen';
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabBottom = () => {
  //#fe7100
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
          ...styles.wrapperTab,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.wrapperBtn}>
              <Image
                source={require('../assets/Icons/iconHome.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#fe7100' : '#111111',
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text
                style={{color: focused ? '#fe7100' : '#111111', fontSize: 12}}>
                Trang chủ
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Reserve"
        component={ReserveScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.wrapperBtn}>
              <Image
                source={require('../assets/Icons/iconSaved.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#4caf50' : '#111111',
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text
                style={{color: focused ? '#4caf50' : '#111111', fontSize: 12}}>
                Đã lưu
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.wrapperBtn}>
              <Image
                source={require('../assets/Icons/iconNotifi.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#9463ec' : '#111111',
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text
                style={{color: focused ? '#9463ec' : '#111111', fontSize: 12}}>
                Thông báo
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.wrapperBtn}>
              <Image
                source={require('../assets/Icons/iconUser.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#47AEF9' : '#111111',
                  opacity: focused ? 1 : 0.5,
                }}
              />
              <Text
                style={{color: focused ? '#47AEF9' : '#111111', fontSize: 12}}>
                Cá nhân
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const Router = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        firestore()
          .collection('users')
          .doc(value)
          .get()
          .then(documentSnapshot => {
            if (documentSnapshot.exists) {
              console.log('Có tài khoản ');
              dispatch(setInfoUser(documentSnapshot.data()));
              dispatch(setUid(value));
              setLoading(false);
            }
          });
      } else {
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log('Lỗi AsyncStorage');
    }
  }, []);
  if (loading)
    return (
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../assets/Animations/AnimationHome.json')}
        animationStyle={{
          width: 300,
          height: 300,
        }}
        speed={1}></AnimatedLoader>
    );
  else
    return (
      <NavigationContainer>
        <MainStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <MainStack.Screen name="TabBottom" component={TabBottom} />
          <MainStack.Screen name="Login" component={LoginScreen} />
          <MainStack.Screen name="Signin" component={SigninScreen} />
          <MainStack.Screen name="Signup" component={SignupScreen} />
          <MainStack.Screen name="EditProfile" component={EditProfileScreen} />
          <MainStack.Screen name="ChangePass" component={ChangePassScreen} />
          <MainStack.Screen name="CreatePost" component={CreatePostScreen} />
          <MainStack.Screen name="Censorship" component={CensorshipScreen} />
          <MainStack.Screen name="Comment" component={CommentScreen} />
          <MainStack.Screen name="Instruct" component={InstructScreen} />
          <MainStack.Screen name="Search" component={SearchScreen} />
          <MainStack.Screen name="Posted" component={PostedScreen} />
          <MainStack.Screen name="UpdatePost" component={UpdatePostScreen} />
          <MainStack.Screen
            name="SearchResult"
            component={SearchResultScreen}
          />
          <MainStack.Screen
            name="CensorshipMember"
            component={CensorshipMemberScreen}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    );
};
const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    color: '#aaaaaa',
    marginTop: 10,
  },
  wrapperTab: {
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: '#cdd9e5',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  wrapperBtn: {
    alignItems: 'center',
    top: Platform.OS === 'ios' ? 15 : 0,
  },
  tabBarStyle: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 25 : 10,
    left: 20,
    right: 20,
    height: 70,
  },
});
export default Router;
