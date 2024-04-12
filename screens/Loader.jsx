import { Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
const Loader = () => {
  return (
    <LinearGradient colors={[ "#13A4B1","#14A2B1",'#307ABB', '#5249C7',"#6035CC","#682ACF","#6E21D1"]} 
    style={styles.linearGradient}
    locations={[0.1, 0.2, 0.3, 0.55, 0.7,0.85, 1]}
    >
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to</Text>
        <Text style={styles.heading}>Cryptotracker</Text>
        <Image source={require('../images/loader.png')} style={styles.image}/>
        <Text style={styles.content}>Track Crypto trends and news at your fingertips</Text>
      </View>
  </LinearGradient>
  )
}

export default Loader

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
    container: {
        padding:30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
      fontSize: 38,
      textAlign: 'center',
      color: 'white',
  },
    heading: {
        fontSize: 30,
        textAlign: 'center',
        color: '#FAA034',
        fontWeight:"500",
    },
    content: {
      marginTop:14,
      fontSize: 18,
      paddingHorizontal: 50,
      textAlign: 'center',
      color: 'white',
  },
    image:{
      height:300,
      width:300,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight:30,
    },
})