import { FlatList, StyleSheet, Text, View ,Dimensions,ScrollView} from 'react-native'
import React, { useEffect, useState,useRef } from 'react';
import Loader from './Loader';
import { LineChart } from 'react-native-chart-kit';

const HomeScreen = () => {
  const [coinData, setCoinData] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const [chartData, setChartData] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      // const response = await fetch('https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8', options);
      // const data = await response.json();
      // setCoinData(data);
      // await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=1&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8', options)
    // await  fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=daily&precision=0&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8', options)
    await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=1&precision=0&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8', options)
      .then(response => response.json())
      .then(response => {
        const priceData = response.prices.map(item => ({
          timestamp: new Date(item[0]).toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }),
          value: item[1] 
        }));
        setChartData(priceData); 
      })
      .catch(err => console.error(err))
      setIsLoading(false); 
    };

    fetchData(); 
  }, []);


  const filteredChartData = chartData.filter((item, index) => index %60 === 0); // Filter to include only every 4th data point (1 hour interval)

//  console.log(coins)
// console.log(isLoading)
// console.log(chartData)



  return (
    <View style={styles.container}>
    {isLoading ? (
      <Loader/>
    ) : (
      <View>
        <LineChart
      data={{
        labels: filteredChartData.map(item => item.timestamp),
        datasets: [{
          data: chartData.map(item => item.value),
        }]
      }}
      width={300} 
      height={320}
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          // borderRadius: 16,
        },
        propsForDots: {
          r: '1',
          strokeWidth: '1',
          stroke: '#b35300',
        },
      }}
      bezier
        style={{
          // borderRadius: 16,
        }}
    />
      {/* <FlatList
        data={coinData}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      /> */}
      </View>
    )}
  </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    padding: 10
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: 16
  },
  name: {
    fontSize: 14
  }
});