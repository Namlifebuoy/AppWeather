import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import SearchResultScreen from '../HomeScreen/SearchResultScreen';

const Item = props => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={props.press}
        activeOpacity={0.4}
        style={styles.leftItem}>
        <Text style={{width: 80}}>{props.textItem}</Text>
        <Image style={styles.imgItem} source={props.imgItem} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.press2}
        activeOpacity={0.4}
        style={styles.rightItem}>
        <Text style={{width: 80}}>{props.textItem2}</Text>
        <Image style={styles.imgItem} source={props.imgItem2} />
      </TouchableOpacity>
    </View>
  );
};

const SearchScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const Option = () => {
    if (search == null || search == '') {
    } else {
      navigation.navigate('SearchResult', search);
    }
  };
  const listItem = [
    {
      textItem: 'Bánh mì',
      imgItem: require('../../assets/Images/banhMi.jpeg'),
      press: () => navigation.navigate('SearchResult', 'Bánh mì'), //Làm mẫu 1 cái này
      textItem2: 'Phở',
      imgItem2: require('../../assets/Images/pho.jpeg'),
      press2: () => navigation.navigate('SearchResult', 'Phở'),
    },
    {
      textItem: 'Mì xào',
      imgItem: require('../../assets/Images/miXao.jpeg'),
      press: () => navigation.navigate('SearchResult', 'Mì xào'),
      textItem2: 'Bánh cuốn',
      imgItem2: require('../../assets/Images/banhCuon.jpeg'),
      press2: () => navigation.navigate('SearchResult', 'Bánh cuốn'),
    },
    {
      textItem: 'Trà sữa',
      imgItem: require('../../assets/Images/traSua.jpeg'),
      press: () => navigation.navigate('SearchResult', 'Trà sữa'),
      textItem2: 'Chè',
      imgItem2: require('../../assets/Images/che.jpeg'),
      press2: () => navigation.navigate('SearchResult', 'Chè'),
    },
  ];

  const listItem2 = [
    {
      textItem: 'Đồ ăn',
      imgItem: require('../../assets/Images/miXao.jpeg'),
      press: () => navigation.navigate('SearchResult', 'Đồ ăn'),
      textItem2: 'Đồ uống',
      imgItem2: require('../../assets/Images/banhCuon.jpeg'),
      press2: () => navigation.navigate('SearchResult', 'Đồ uống'),
    },
    {
      textItem: 'Đồ chay',
      imgItem: require('../../assets/Images/traSua.jpeg'),
      press: () => navigation.navigate('SearchResult', 'Đồ chay'),
      textItem2: 'Bánh kem',
      imgItem2: require('../../assets/Images/che.jpeg'),
      press2: () => navigation.navigate('SearchResult', 'Bánh kem'),
    },
    {
      textItem: 'Tráng miệng',
      imgItem: require('../../assets/Images/miXao.jpeg'),
      press: () => navigation.navigate('SearchResult', 'Tráng miệng'),
      textItem2: 'Món lẩu',
      imgItem2: require('../../assets/Images/banhCuon.jpeg'),
      press2: () => navigation.navigate('SearchResult', 'Món lẩu'),
    },
    {
      textItem: 'Vỉa hè',
      imgItem: require('../../assets/Images/traSua.jpeg'),
      press: () => navigation.navigate('SearchResult', 'Vỉa hè'),
      textItem2: 'Cơm hộp',
      imgItem2: require('../../assets/Images/che.jpeg'),
      press2: () => navigation.navigate('SearchResult', 'Cơm hộp'),
    },
    {
      textItem: 'Homemade',
      imgItem: require('../../assets/Images/traSua.jpeg'),
      press: () => navigation.navigate('SearchResult', 'Homemade'),
      textItem2: 'Pizza',
      imgItem2: require('../../assets/Images/che.jpeg'),
      press2: () => navigation.navigate('SearchResult', 'Pizza'),
    },
  ];
  return (
    <TouchableWithoutFeedback style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title={'Tìm kiếm'} />
        <View style={styles.boxSearch}>
          <TextInput
            style={styles.search}
            placeholder={'Tìm kiếm địa chỉ, món ăn, thức uống,...'}
            returnKeyType="done"
            onSubmitEditing={() => {
              Option();
            }}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity
            style={{justifyContent: 'center'}}
            onPress={() => {
              Option();
            }}>
            <FontAwesomeIcon style={styles.iconSearch} icon={faSearch} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.wrapper}>
          {/* abc */}
          <View style={{width: '100%'}}>
            <View style={styles.boxText}>
              <Text style={styles.textTitle}>Gợi ý tìm kiếm</Text>
            </View>
            {listItem.map((item, index) => (
              <Item
                key={index}
                textItem={item.textItem}
                textItem2={item.textItem2}
                press={item.press}
                imgItem={item.imgItem}
                imgItem2={item.imgItem2}
                press2={item.press2}
              />
            ))}
          </View>
          {/* cba */}
          <View
            style={{
              width: '100%',
              borderTopWidth: 6,
              borderColor: '#e5e5e5',
            }}>
            <View style={styles.boxText}>
              <Text style={styles.textTitle}>Danh mục</Text>
            </View>
            {listItem2.map((item, index) => (
              <Item
                key={index}
                textItem={item.textItem}
                textItem2={item.textItem2}
                imgItem={item.imgItem}
                imgItem2={item.imgItem2}
                press={item.press}
              />
            ))}
          </View>
          {/* mno */}
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  boxSearch: {
    width: '90%',
    height: 35,
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#e4e7ed',
    paddingHorizontal: 5,
  },
  search: {
    fontSize: 15,
    marginLeft: 5,
    alignSelf: 'center',
    height: '100%',
    width: '90%',
  },
  iconSearch: {
    alignSelf: 'center',
    marginRight: 5,
    opacity: 0.5,
  },
  wrapper: {
    width: '100%',
    height: '30%',
    marginTop: 20,
    //backgroundColor: 'lightgreen',
    borderTopWidth: 6,
    borderColor: '#e5e5e5',
  },
  boxText: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
  },
  textTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  leftItem: {
    width: '50%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    justifyContent: 'space-around',
  },
  rightItem: {
    width: '50%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#e5e5e5',
    justifyContent: 'space-around',
  },
  imgItem: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});

export default SearchScreen;
