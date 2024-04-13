import { ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
const NewsLoader = () => {
  return (
    <LinearGradient colors={[ "#13A4B1","#14A2B1",'#307ABB', '#5249C7',"#6035CC","#682ACF","#6E21D1"]} 
    style={styles.linearGradient}
    locations={[0.1, 0.2, 0.3, 0.55, 0.7,0.85, 1]}
    >
    
      <View style={styles.container}>
        <Text style={styles.content}>News at your fingertips!</Text>
        <Image source={require('../images/loader.png')} style={styles.image}/>
      </View>
  </LinearGradient>
  )
}

export default NewsLoader

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
    container: {
        padding:30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
    left: 0,
    right: 0, 
    bottom: 0,
    },
    content: {
      // marginTop:14,
      fontSize: 25,
      marginBottom:40,
      // paddingHorizontal: 50,
      textAlign: 'center',
      color: 'white',
      fontWeight:'800'
  },
    image:{
      height:300,
      width:300,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight:30,
    },
})