import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import Loader from './screens/Loader';
import Newslistscreen from './screens/Newslistscreen';
import NewsDetailsscreen from './screens/NewsDetailsscreen';
import CryptocoinDetailscreen from './screens/CryptocoinDetailscreen';
import SearchScreen from './screens/SearchScreen';

const HomeStack = createNativeStackNavigator();

function HomeStackScreen({route}) {
  // console.log(set)
  const {coinData}=route.params;
  // console.log("homestack",coinData)

  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      {/* <HomeStack.Screen name="Home" component={HomeScreen}/> */}
      <HomeStack.Screen name="Home" component={HomeScreen} initialParams={{coinData:coinData}} />
      <HomeStack.Screen name="CryptoDetail" component={CryptocoinDetailscreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();


function NewsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{headerShown:false}}>
      <SettingsStack.Screen name="NewsScreen" component={Newslistscreen} />
      <SettingsStack.Screen name="Details" component={NewsDetailsscreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [load,setload]=useState("true")
  const [coinData, setCoinData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&per_page=200&sparkline=false&precision=0&x_cg_demo_api_key=CG-1rLRNK8WiqpUgPwzEJywvWb8', options);
      const data = await response.json();
      setCoinData(data);
      setload(false);
    };
    fetchData();
  }, []);
  return (
    <>
    { (load==="true")? <Loader/> 
    :<NavigationContainer>
      <Tab.Navigator
      screenOptions={{
      headerShown: false,
      tabBarStyle: { 
        backgroundColor: '#3D1273',
        paddingTop:2,
      },
      tabBarLabelStyle: { fontSize: 14},
      tabBarInactiveTintColor:'#cba4ff',
      tabBarActiveTintColor: '#FAA034',
       }}
      //  initialRouteName='Search'
>
        <Tab.Screen name="Market" component={HomeStackScreen} initialParams={{coinData:coinData}}
        options={{
          
          tabBarIcon: ({ color, size ,focused}) => (
            <FontAwesome6 name="codiepie" size={24} color={focused ?'#FAA034':'#cba4ff'} />
          ),
        }}
        />
        <Tab.Screen name="Search" component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size ,focused}) => (
            <View style={{
              position: 'absolute',
              top: -25, 
              alignSelf: 'center', 
              backgroundColor: '#3D1273',
              paddingHorizontal:15,
              paddingTop:5,
              borderTopRightRadius:80,
              borderTopLeftRadius:80,
            }}>
           <Ionicons name="search" size={38} color={focused ? '#FAA034' : '#cba4ff'} />
           </View>
          ),
        }}
        />
        <Tab.Screen name="News" component={NewsStackScreen}
        options={{
          tabBarIcon: ({ color, size ,focused}) => (
            <Ionicons name="newspaper" size={24} color={focused ? '#FAA034':'#cba4ff'} />
          ),
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    }
    </>
  );
}