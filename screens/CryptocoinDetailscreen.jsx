import { StyleSheet, Text, View ,TouchableOpacity,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useRoute,useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CartesianChart,Line,useChartPressState  } from "victory-native";
import { Circle, useFont, vec } from "@shopify/react-native-skia";
import { Line as Linnd} from '@shopify/react-native-skia';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({text:true});
const AnimatedTextInput=Animated.createAnimatedComponent(TextInput);
const CryptocoinDetailscreen = () => {
  const route = useRoute(); 
  const { data } = route.params;
  const navigation = useNavigation();
  const backtohome=()=>{
    navigation.goBack();
  }
  const font =useFont('font-awesome')
  const [chartData,setChartData]=useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  function formatPrice(price) {
    if (price >= 100000) {
      return (price / 100000).toFixed(1) + 'L';
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1) + 'k';
    } else {
      return price.toFixed(1);
    }
  }

  const { state, isActive } = useChartPressState({ x: 0, y: { y: 0 } });
  function ToolTip({ x, y }) {
    return <Circle cx={x} cy={y} r={6} color="green" />;
  }
  useEffect(() => {
    const fetchData = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };
       await fetch(`https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=inr&days=7&precision=5&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8`, options)
      .then(response => response.json())
      .then(response => {
        const priceData = response.prices.map(item => ({
         x:item[0],
         y:item[1],
        }));
        setChartData(priceData); 
        setIsLoading(false); 
      })
      .catch(err => console.error(err))
    };
    fetchData(); 
  }, []);

  console.log("X",state.x.value.value);
  // console.log("Y",state.y.y.value.value)
  console.log(chartData[0])

  const animatedText=useAnimatedProps(()=>{
    return{
      text:`${state.y.y.value.value}`,
      defaultValue:'',
    }
  })
  const animatedvalue=useAnimatedProps(()=>{
    const dattt=new Date(state.x.value.value);
    return{
      text:`${dattt.toLocaleDateString()}`,
      defaultValue:'',
    }
  })

  return (
    <LinearGradient colors={['#307ABB', '#5249C7', "#6035CC", "#682ACF", "#6E21D1"]} style={{flex:1}} locations={[0.2, 0.45, 0.7, 0.85, 1]}>
      <View style={styles.topbar}>
      <TouchableOpacity style={{flex:0.15,marginTop:8,}} onPress={backtohome} >
       <AntDesign name="leftcircle" size={36} color={"white"}/>
      </TouchableOpacity>
      <View style={{justifyContent:"center",alignItems:'center',flex:1}}>
        <Text style={{fontSize:24,fontWeight:'400',color:'white'}}>{data.name}</Text>
      </View>
      </View>
        { (isLoading)?<></>:<View style={{ height: 300 }}>
        {
        (isActive)?<View>
          <AnimatedTextInput editable={false} underlineColorAndroid={'transparent'}
           animatedProps={animatedText} style={{color:'black',fontSize:20}}>
          </AnimatedTextInput>
          <AnimatedTextInput editable={false} underlineColorAndroid={'transparent'}
           animatedProps={animatedvalue} style={{color:'black'}}>
          </AnimatedTextInput>
          </View>:<View>
          <AnimatedTextInput editable={false} underlineColorAndroid={'transparent'}
           animatedProps={animatedText} style={{color:'black',fontSize:20}}>
          </AnimatedTextInput>
          <AnimatedTextInput editable={false} underlineColorAndroid={'transparent'}
           animatedProps={animatedvalue} style={{color:'black'}}>
          </AnimatedTextInput>
          </View>
      }
      <View style={{ height: 300 ,width:250,marginLeft:50}}>
      <CartesianChart 
      data={chartData} 
      xKey="x" 
      yKeys={["y"]}
      chartPressState={state}
      axisOptions={{
        fontSize:20,
        // labelColor:'black',
        labelOffset:{x: 0, y:0},
        tickCount:5,
        formatYLabel:(v)=>`${v}`,
        formatXLabel:(v)=>`${v}`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
      }}
      >
        {({ points }) => (
          <>
          <Line points={points.y} color="white" strokeWidth={2} />
          {isActive && (
              <ToolTip x={state.x.position} y={state.y.y.position} />
            )}
          </>
        )}
      </CartesianChart>
      </View>
    </View>
    }
    </LinearGradient>
  )
}
export default CryptocoinDetailscreen

const styles = StyleSheet.create({
topbar: {
  flexDirection: 'row',
  paddingHorizontal: 20,
  backgroundColor:'#307ABB',
  height:50,
  },
})