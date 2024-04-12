import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import { useRoute,useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart'

const CryptocoinDetailscreen = () => {
  const route = useRoute(); 
  const { data } = route.params;
  const navigation = useNavigation();
  const backtohome=()=>{
    navigation.goBack();
  }
  const [tooltip, setTooltip] = useState({ visible: false, x: undefined, y: undefined });

  const showTooltip = (x, y) => {
    setTooltip({ visible: true, x, y });
  };

  const hideTooltip = () => {
    setTooltip({ visible: false, x: undefined, y: undefined });
  };
  const Tooltip = ({ visible, x, y }) => {
    if (!visible) return null;
  
    return (
      <View style={styles.tooltip}>
        <Text>X: {x?.toFixed(2)}</Text>
        <Text>Y: {y?.toFixed(2)}</Text>
      </View>
    );
  };
  console.log(data.name);
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
      <Chart
  style={{ height: 200, width: 300 }}
  data={[
    { x: -2, y: 15 },
    { x: -1, y: 10 },
    { x: 0, y: 12 },
    { x: 5, y: 8 },
    { x: 6, y: 12 },
    { x: 7, y: 14 },
    { x: 8, y: 12 },
    { x: 9, y: 13.5 },
    { x: 10, y: 18 },
    { x: 11, y: 20 },
    { x: 12, y: 18 },
    { x: 13, y: 15 },
    { x: 14, y: 12 },
    { x: 15, y: 10 },
    { x: 16, y: 12 },
    { x: 17, y: 15 },
    { x: 18, y: 18 },
    { x: 19, y: 20 },
    { x: 20, y: 18 },
    { x: 21, y: 15 },
    { x: 22, y: 12 },
    { x: 23, y: 10 },
    { x: 24, y: 12 },
    { x: 25, y: 15 },
    { x: 26, y: 18 },
    { x: 27, y: 20 },
    { x: 28, y: 18 },
    { x: 29, y: 15 },
    { x: 30, y: 12 },
    { x: 31, y: 10 },
    { x: 32, y: 12 },
    { x: 33, y: 15 },
    { x: 34, y: 18 },
    { x: 35, y: 20 },
    { x: 36, y: 18 },
    { x: 37, y: 15 },
    { x: 38, y: 12 },
    { x: 39, y: 10 },
    { x: 40, y: 12 },
    { x: 41, y: 15 },
    { x: 42, y: 18 },
    { x: 43, y: 20 },
    { x: 44, y: 18 },
    { x: 45, y: 15 },
  ]}
  padding={{ left: 40, bottom: 0, right: 20, top: 20 }}
  xDomain={{ min: -1, max: 40 }}
  yDomain={{ min: -4, max: 30 }}
>
  <VerticalAxis
    tickCount={10}
    theme={{ labels: { formatter: (v) => v.toFixed(2) } }}
  />
  <HorizontalAxis tickCount={3} />
  <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } }}} />
  {/* <Line theme={{ stroke: { color: '#44bd32', width: 5 } }} /> */}
  <Line
    tooltipComponent={<Tooltip />}
    theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#44ad32' }, selected: { color: 'red' } } }}
    onMouseOver={(data) => showTooltip(data.x, data.y)}
          onMouseOut={hideTooltip}
  />
</Chart>
<Tooltip visible={tooltip.visible} x={tooltip.x} y={tooltip.y} />
    </LinearGradient>
  )
}

export default CryptocoinDetailscreen

const styles = StyleSheet.create({
topbar: {
  flexDirection: 'row',
  // padding:20,
  paddingHorizontal: 20,
  backgroundColor:'#307ABB',
  height:50,
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },

})