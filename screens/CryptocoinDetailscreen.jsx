import { StyleSheet, Text, View ,TouchableOpacity,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useRoute,useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { CartesianChart,Line,useChartPressState  } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
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
  const customfont =useFont('font-awesome')
  const [chartDataday1,setChartDataday1]=useState([]);
  const [chartDataday7,setChartDataday7]=useState([]);
  const [chartDatamonth,setChartDatamonth]=useState([]);
  const [chartDatayear,setChartDatayear]=useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [activeDataset, setActiveDataset] = useState('day1'); 
  const { state, isActive } = useChartPressState({ x: 0, y: { y: 0 } });
  function ToolTip({ x, y }) {
    return <Circle cx={x} cy={y} r={6} color="#6E21D1" />;
  }
  useEffect(() => {
    const fetchData = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      const url1 = `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=inr&days=1&precision=2&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8`;
      const url7 = `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=inr&days=7&precision=2&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8`;
      const urlm = `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=inr&days=30&precision=2&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8`;
      const urly = `https://api.coingecko.com/api/v3/coins/${data.id}/market_chart?vs_currency=inr&days=360&precision=2&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8`;
  
      try {
        const [response1, response2,response3,response4] = await Promise.all([
          fetch(url1, options),
          fetch(url7, options),
          fetch(urlm, options),
          fetch(urly, options),
        ]);
        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();
        const priceData1 = data1.prices.map(item => ({
          x: item[0],
          y: item[1],
        }));
        const priceData7 = data2.prices.map(item => ({
          x: item[0],
          y: item[1],
        }));
        const priceDatam = data3.prices.map(item => ({
          x: item[0],
          y: item[1],
        }));
        const priceDatay = data4.prices.map(item => ({
          x: item[0],
          y: item[1],
        }));
        setChartDataday1(priceData1);
        setChartDataday7(priceData7);
        setChartDatamonth(priceDatam);
        setChartDatayear(priceDatay);
  
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  let currenttime=0;
 if(!isLoading){ 
    currenttime=new Date(chartDataday1[chartDataday1.length-1].x).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
  })}
  console.log(currenttime)
  console.log(chartDataday1[0])

  const animatedText=useAnimatedProps(()=>{
    return{
      text:`₹${state.y.y.value.value}`,
      defaultValue:'',
    }
  })
  const animatedvalue=useAnimatedProps(()=>{
    const dattt=new Date(state.x.value.value).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
  })
    return{
      text:`${dattt.toLocaleString()}`,
      defaultValue:'',
    }
  })


  return (
    <LinearGradient colors={['#307ABB', '#5249C7', "#6035CC", "#682ACF", "#6E21D1"]} style={{flex:1}} 
    locations={[0.2, 0.45, 0.75, 0.85, 1]}>
      <View style={styles.topbar}>
      <TouchableOpacity style={{flex:0.15,marginTop:8,}} onPress={backtohome} >
       <AntDesign name="leftcircle" size={36} color={"white"}/>
      </TouchableOpacity>
      <View style={{justifyContent:"center",alignItems:'center',flex:1}}>
        <Text style={{fontSize:24,fontWeight:'400',color:'white'}}>{data.name}</Text>
      </View>
      </View>
        { (isLoading)?<></>:
        <View style={{ height: 300 }}>
        {
        (isActive)?
        <View style={styles.container}>
          <AnimatedTextInput editable={false} underlineColorAndroid={'transparent'}
           animatedProps={animatedText} style={{fontSize:20,color:'white'}}>
          </AnimatedTextInput>
          <AnimatedTextInput editable={false} underlineColorAndroid={'transparent'}
           animatedProps={animatedvalue} style={{fontSize:20,color:'white'}}>
          </AnimatedTextInput>
          </View>
          :
          <View style={styles.container}>
            <Text style={styles.tooltipText}>₹{chartDataday1[chartDataday1.length-1].y}</Text>
            <Text style={styles.tooltipText}>{`${currenttime.toLocaleString()}`}</Text>
          </View>
      }
      <View style={{ height: 300 ,width:300,marginLeft:30,backgroundColor: 'rgba(248, 248, 248, 0.16)'}}>
      <CartesianChart 
      data={activeDataset === 'day1' ? chartDataday1 : 
      activeDataset === 'day7' ? chartDataday7 :
      activeDataset === 'month' ? chartDatamonth : chartDatayear} 
      xKey="x" 
      yKeys={["y"]}
      chartPressState={state}
      axisOptions={{
        fontSize:20,
        labelColor:'black',
        labelOffset:{x: 0, y:0},
        tickCount:5,
        // formatYLabel:(v)=>`${v}`,
        // formatXLabel:(v)=>`${v}`,
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
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => setActiveDataset('day1')}
      style={[styles.button, activeDataset === 'day1' && styles.activeButton]}>
        <Text style={styles.buttontext}>1 Day</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveDataset('day7')}
      style={[styles.button, activeDataset === 'day7' && styles.activeButton]}>
        <Text style={styles.buttontext}>Week</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveDataset('month')}
      style={[styles.button, activeDataset === 'month' && styles.activeButton]}>
        <Text style={styles.buttontext}>Month</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveDataset('year')}
      style={[styles.button, activeDataset === 'year' && styles.activeButton]}>
        <Text style={styles.buttontext}>Year</Text></TouchableOpacity>
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipText: {
    color: 'white',
    fontSize: 20,
    marginTop:22,
  },
  buttonContainer : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around' ,
    marginTop:30,
  },
  activeButton:{
    backgroundColor: 'rgba(248, 248, 248, 0.6)',
  },
  button:{
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    // padding: 15, 
    paddingHorizontal:15,
    paddingVertical: 10,
    borderRadius: 15,
    borderWidth: 0,  
    // height:40,
  },
  buttontext:{
    color:'white',
    fontWeight:'bold',
  }
})