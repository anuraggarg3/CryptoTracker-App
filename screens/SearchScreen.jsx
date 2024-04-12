import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet,Image } from 'react-native';
import coinData from './data.json'
import LinearGradient from 'react-native-linear-gradient';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(coinData);

  const handleSearch = (text) => {
    const filteredCoins = coinData.filter(coin => (
        coin.name.toLowerCase().includes(text.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(text.toLowerCase())
      ));
    setSearchQuery(text);
    setSearchResults(filteredCoins);
  };

  return (
    <LinearGradient colors={['#307ABB', '#5249C7', "#6035CC", "#682ACF", "#6E21D1"]} 
    style={{flex:1,paddingHorizontal:20,paddingTop:20,}} locations={[0.2, 0.45, 0.7, 0.85, 1]}>
      <TextInput
        style={styles.input}
        placeholder="Search for coins..."
        placeholderTextColor={'black'}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
            <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.coinImage} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.symbol}>{item.symbol}</Text>
            </View>
          </View>
        )}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(248, 248, 248, 0.5)',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#5249C7',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    input: {
        backgroundColor: 'rgba(248, 248, 248, 0.5)',
        height: 70,
        borderColor:'#307ABB',
        borderWidth: 2,
        borderRadius: 8,
        paddingLeft: 20,
        marginBottom: 16,
        fontSize: 16,
        color: 'black',
        borderRadius:20,
      },
    coinImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    infoContainer: {
      marginLeft: 16,
      justifyContent:'space-around',
      flex:1,
      flexDirection: 'row',
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      flex: 0.7,
    },
    symbol: {
      fontSize: 18,
      color: 'black',
      flex: 0.3,
      fontWeight: 'bold',
    },
  });

export default SearchScreen;
