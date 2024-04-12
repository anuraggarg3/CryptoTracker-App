import { StyleSheet, Text, View ,FlatList,TouchableOpacity,Image} from 'react-native'
import React, { useEffect, useState,useRef } from 'react';
import NewsLoader from './NewsLoader';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Newslistscreen = () => {
    const navigation = useNavigation();
    const [news,setnews]=useState({});
  const [isLoading, setIsLoading] = useState(true); 
    useEffect(() => {
        const fetchData = async () => {
        await fetch('https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=13daf56bfc3e42d6b67fc6a824a9d8b9')
          .then(response => response.json())
          .then(response => {
            setnews(response); 
          })
          .catch(err => console.error(err)); 
          setIsLoading(false); 
        };
    
        fetchData(); 
      }, []);
    const callnews=(data)=>{
        navigation.navigate('Details',{data: data});
    }
  return (
    <View style={styles.container}>
    {isLoading ? (
      <NewsLoader/>
    ) : (<>
  {/* backgroundColor:'#6E21D1', */}

        <View style={{backgroundColor:'#307ABB',padding:10,justifyContent:'center',alignItems:'center'}}><Text style={{color:"white",fontSize:30,fontWeight:'900'}}>News</Text></View>
        <LinearGradient colors={[ '#307ABB', '#5249C7',"#6035CC","#682ACF","#6E21D1"]} 
        style={styles.linearGradient}
        locations={[ 0.3, 0.55, 0.7,0.85, 1]}
        >
      <View>
       <FlatList
      data={news.articles}
      keyExtractor={(item) => item.title}
      onEndReachedThreshold={0.1}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>(
        
            (item.urlToImage)?
        <TouchableOpacity style={styles.articleContainer} activeOpacity={0.8}
        onPress={()=>callnews(item)}>
            <Image source={{ uri: item.urlToImage }} style={styles.articleImage} />
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>{item.title}</Text>
              <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:3}}>
              <Text style={styles.articleSource}>•{item.source.name}</Text>
              <Text style={styles.articleSource}>{(item.publishedAt).substr(8,2)}{(item.publishedAt).substr(4,1)}{(item.publishedAt).substr(5,3)}{(item.publishedAt).substr(0,4)}</Text>
              </View>
            </View>
          </TouchableOpacity>:<></>
        )
      }
    />
      </View>
  </LinearGradient>
  </>
    )}
  </View>
  )
}

export default Newslistscreen


const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingHorizontal: 20,
      },
  container: {
    flex: 1,
  },
   articleContainer: {
    flexDirection: 'row',
    paddingVertical:18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  articleImage: {
    width: 85,
    height: 85,
    borderRadius: 10,
    marginRight: 10,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 5,
    color: 'white',
  },
  articleSource: {
    fontSize: 12,
    color: '#f7e0c4',
  },
});
