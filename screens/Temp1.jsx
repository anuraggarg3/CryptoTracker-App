import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { CartesianChart, Line ,useChartPressState} from "victory-native";
import { useFont,Circle } from '@shopify/react-native-skia';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
Animated.addWhitelistedNativeProps({text:true});
const AnimatedTextInput=Animated.createAnimatedComponent(TextInput);
const Temp1 = () => {
  const font =useFont('font-awesome')
  const DATA = Array.from({ length: 31 }, (_, i) => ({
    x: i,
    highTmp: 40 +i,
  }));
  const { state, isActive } = useChartPressState({ x: 0, y: { highTmp: 0 } });
  function ToolTipp({ x, y ,dataa}) {
    console.log(isActive)
    return <Circle cx={x} cy={y} r={8} color="black" />;
  }
  // console.log(state.y.highTmp.value.value)
  // console.log(state.x.position.value)
  const animatedText=useAnimatedProps(()=>{
    return{
      // x:state.x.position.value,
      // y:state.y.highTmp.value.value
      text:`${state.y.highTmp.value.value}`,
      defaultValue:'',
    }
  })
  const animatedvalue=useAnimatedProps(()=>{
    return{
      // x:state.x.position.value,
      // y:state.y.highTmp.value.value
      value:`${state.x.position.value}`,
      defaultValue:'',
    }
  })
  return (
    <View style={{backgroundColor:'grey'}}>
      <Text style={{color:'black'}}>Temp1</Text>
      <View style={{ height: 300 ,width:250,marginLeft:50}}>
      <CartesianChart data={DATA} 
      xKey="day" 
      yKeys={["highTmp"]}
      axisOptions={{
        font,
        // labelColor:'black',
        labelOffset:{x: 0, y:0},
        tickCount:5,
        formatYLabel:(v)=>`${v}`,
        formatXLabel:(v)=>`${v}`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
      }}
      chartPressState={state}
      >
        {({ points }) => (<>
          <Line points={points.highTmp} color="red" strokeWidth={3} />
          {isActive && (
              <ToolTipp x={state.x.position} y={state.y.highTmp.position} dataa={state.x}  />
            )}
        </>
          
        )}
      </CartesianChart>
      {
        (isActive)?<View>
          <AnimatedTextInput editable={false} underlineColorAndroid={'transparent'}
           animatedProps={animatedText} style={{color:'black'}}>
          </AnimatedTextInput>
          <AnimatedTextInput editable={false} underlineColorAndroid={'transparent'}
           animatedProps={animatedText} style={{color:'black'}}>
          </AnimatedTextInput>
          </View>:<></>
      }
    </View>
    </View>
  )
}

export default Temp1

const styles = StyleSheet.create({

})