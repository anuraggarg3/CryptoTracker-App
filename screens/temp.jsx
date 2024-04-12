import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import Loader from './Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const [coinData, setCoinData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&per_page=200&sparkline=false&precision=2&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8', options);
      const data = await response.json();
      setCoinData(data);
      setIsLoading(false); 
    };
    fetchData(); 
  }, []);
  // console.log(coinData[3].id)
  return (
    <View style={{flex:1}}>
    {isLoading ? (
      <Loader/>
    ) : (
      <View  style={{flex:1}}>
    <LinearGradient colors={[ '#307ABB', '#5249C7',"#6035CC","#682ACF","#6E21D1"]} 
    style={styles.container}
    locations={[ 0.2, 0.45, 0.7,0.85, 1]}>
       <FlatList
        data={coinData}
        keyExtractor={(item) => item.id} 
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
      <View style={styles.item}>
      <View style={styles.coinInfoContainer}>
        <Image source={{uri:item.image}} style={styles.coinImage} />
        <View style={styles.coinDetails}>
          <Text style={styles.symbol}>{item.symbol}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
         <View style={{ flexDirection: 'row',flex:0.3 }}> 
         {
           item.price_change_percentage_24h > 0?
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
             <AntDesign name="caretup" size={20} color="green" />
             <Text style={styles.changegreen}> +{Math.round(item.price_change_percentage_24h * 100) / 100  }%</Text>
           </View>:
           <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
             <AntDesign name="caretdown" size={20} color="red" />
             <Text style={styles.changered}> {Math.round(item.price_change_percentage_24h * 100) / 100  }%</Text>
           </View>
          }
        </View>
          </View>
        )}
      /> 
      </LinearGradient>
      </View>
    )}
  </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:20,
  },
  item: {
    flexDirection: 'row',
          alignItems: 'center',
        backgroundColor: 'rgba(248, 248, 248, 0.5)',

        padding: 15,
        marginBottom: 10, 
        borderRadius: 8,

        // Shadow
        shadowColor:'#5249C7',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // For Android
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
    fontSize: 16,
    fontWeight: 'bold',
    color:'black',
  },
  name: {
    fontSize: 14,
    color: '#666',
  },
  changegreen: {
    color: 'green',
    fontWeight: 'bold',
  },
  changered: {
    color: 'red',
    fontWeight: 'bold',
  },
})