import { StyleSheet, Text, View,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import Loader from './Loader';

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
    <View style={styles.container}>
    {isLoading ? (
      <Loader/>
    ) : (
      <View>
       <FlatList
        data={coinData}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.symbol}>{item.market_cap_rank}</Text>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.name}>{item.name}</Text>
            {
              item.price_change_percentage_24h >= 0?
              <Text style={styles.changegreen}>{item.price_change_percentage_24h}%</Text>:
              <Text style={styles.changered}>{item.price_change_percentage_24h}</Text>
            }
          </View>
        )}
      /> 
      </View>
    )}
  </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    padding: 10
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: 16,
    color:'black',
  },
  name: {
    fontSize: 14,
    color:'black',
  },
  changegreen:{
    color:'green',
    fontWeight:'bold'
  },
  changered:{
    color:'red',
    fontWeight:'bold'
  }
})