import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState, useEffect,useMemo } from 'react';
import Loader from './Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

// const HomeScreen = () => {
  const HomeScreen = ({route}) => {
  const {coinData}=route.params;
  // console.log("homescreen",load)
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const topGainers = useMemo(() => coinData.filter(item => item.price_change_percentage_24h >= 0).sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h), [coinData]);
  const topLosers = useMemo(() => coinData.filter(item => item.price_change_percentage_24h <= 0).sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h), [coinData]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white', height: 3, borderRadius: 5 }} 
      style={styles.tabBar} 
       labelStyle={styles.tabLabel} // Apply custom style to the tab label
    />
  );

  const renderItem = ({ item }) => (
    <CoinItem item={item} />
  );
  const detailcoin=(data)=>{
    navigation.navigate('CryptoDetail',{data:data});
  }

  const CoinItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={()=>detailcoin(item)} activeOpacity={0.8}>
      <View style={styles.coinInfoContainer}>
        <Image source={{ uri: item.image }} style={styles.coinImage} />
        <View style={styles.coinDetails}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.symbol}>{item.symbol}</Text>
        </View>
      </View>
      <View>
        <View><Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>₹{item.current_price}</Text></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {
          item.price_change_percentage_24h > 0 ?
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name="caretup" size={18} color="green" />
              <Text style={styles.changegreen}> +{Math.round(item.price_change_percentage_24h * 100) / 100}%</Text>
            </View> :
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name="caretdown" size={18} color="red" />
              <Text style={styles.changered}> {Math.round(item.price_change_percentage_24h * 100) / 100}%</Text>
            </View>
        }
      </View>
      </View>
    </TouchableOpacity>
  );

  const FirstRoute = () => (
    <FlatList
      data={coinData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.1}
    />
  );

  const SecondRoute = () => (
    <FlatList
      data={topGainers}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.1}
    />
  );

  const ThirdRoute = () => (
    <FlatList
      data={topLosers}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.8}
    />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  return (
    <View style={{ flex: 1 }}>
          <LinearGradient colors={['#307ABB', '#5249C7', "#6035CC", "#682ACF", "#6E21D1"]} style={styles.container} locations={[0.2, 0.45, 0.7, 0.85, 1]}>
            <TabView
              lazy
              navigationState={{ index, routes: [
                { key: 'first', title: 'All' },
                { key: 'second', title: 'Top Gainers' },
                { key: 'third', title: 'Top Losers' },
              ] }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: Dimensions.get('window').width }}
              renderTabBar={renderTabBar}
            />
          </LinearGradient>
        </View>
      
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#6E21D1',
    marginBottom:10,
    borderRadius:15,
    height:50,
    marginTop:10,
  },
  tabLabel: {
    fontSize: 12, 
    fontWeight: '700', 
    color: '#FFFFFF', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 248, 248, 0.5)',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#5249C7',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  coinInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  coinImage: {
    width: 45,
    height: 45,
    marginRight: 20,
  },
  coinDetails: {
    // marginRight: 20,
  },
  symbol: {
    fontSize: 14,
    color: 'black',
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight:'bold',
  },
  changegreen: {
    color: 'green',
    fontWeight: 'bold',
  },
  changered: {
    color: 'red',
    fontWeight: 'bold',
  },
});
