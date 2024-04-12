import { StyleSheet, Text, View ,Image, TouchableOpacity,Linking, Alert,Share, ScrollView} from 'react-native'
import React from 'react'
import { useRoute,useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
const NewsDetailsscreen = () => {
    const route = useRoute(); 
    const { data } = route.params;
    const navigation = useNavigation();
    const handleWebsiteLink =  () => {
        const supported =  Linking.canOpenURL(data.url);
            if (supported) {
                 Linking.openURL(data.url);
            } else {
                Alert.alert(`Don't know how to open this URL: https://www.yourwebsite.com`);
            }
      };
      const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this news article: ${data.title} - App By Anurag Garg`,
                url: data.url,
            });
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };
    const backmainnews=()=>{
      navigation.goBack();
    }
    // console.log(data)
  return (
   <View style={{flex:1}}>
    <Image source={{ uri: data.urlToImage }} style={styles.articleImage} />
   <TouchableOpacity style={styles.backbutton} onPress={backmainnews} >
   <AntDesign name="leftcircle" size={42} color={"white"}/>
   </TouchableOpacity>
    <View style={styles.container}>
    <ScrollView>
    <LinearGradient colors={[ '#307ABB', '#5249C7',"#6035CC","#682ACF","#6E21D1"]} 
    style={styles.linearGradient}
    locations={[ 0.2, 0.45, 0.7,0.85, 1]}>
    <Text style={styles.articleTitle}>{data.title}</Text>
    <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:12}}>
              <Text style={styles.articleSource}>Source: {data.source.name}</Text>
              <Text style={styles.articleSource}>{(data.publishedAt).substr(8,2)}{(data.publishedAt).substr(4,1)}{(data.publishedAt).substr(5,3)}{(data.publishedAt).substr(0,4)}</Text>
              </View>
           <Text style={styles.articleDescription}>{data.description}</Text> 
<View style={{justifyContent:'flex-end',flex:1}}>
           <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:12,padding:20}}>
           <TouchableOpacity  onPress={handleWebsiteLink} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.fullarticle}>Read Full Article</Text></TouchableOpacity>
           <TouchableOpacity onPress={handleShare} activeOpacity={0.8}>
           <Octicons name="share" size={38} color={"white"}/>
           <Text style={{color:'white',fontWeight:'bold',fontSize:12}}>Share</Text>
           </TouchableOpacity>
           </View>
           </View>
      </LinearGradient>
      </ScrollView>
      </View>
      </View>
  )
}

export default NewsDetailsscreen

const styles = StyleSheet.create({
  backbutton:{
    position: 'absolute',
    margin:20,
  },
    linearGradient: {
        flex: 1,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        paddingHorizontal:20,
        paddingTop:10,
      },
      articleImage: {
        width: "100%",
        height: "38%",
        borderRadius: 10,
        marginRight: 10,
      },
      container:{
        backgroundColor:"#6E21D1",
        flex:1,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        marginTop:-40,
      },
      articleTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop:20,
        color: 'white',
      },
      articleSource: {
        fontSize: 14,
        color: '#f7e0c4',
      },    
  articleDescription: {
    fontSize: 16,
    marginTop: 28,
    color: 'white',
    lineHeight:30,
    fontWeight:'300'
  },
  button:{
    flex:0.8,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:12,
    height:40,
  },
  fullarticle:{
    color:'#6E21D1',
    fontSize:18,
    fontWeight:'700'
  }
})