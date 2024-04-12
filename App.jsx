import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from './screens/HomeScreen';
import Loader from './screens/Loader';
import Newslistscreen from './screens/Newslistscreen';
import NewsDetailsscreen from './screens/NewsDetailsscreen';
function DetailsScreens() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown:false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreens} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreens} />
    </SettingsStack.Navigator>
  );
}
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
  useEffect(() => {
    setTimeout(() => {
      setload(false);
    }, 200);
  }, [])
  
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
       initialRouteName='Market'
>
        <Tab.Screen name="Market" component={HomeStackScreen} 
        options={{
          
          tabBarIcon: ({ color, size ,focused}) => (
            <FontAwesome6 name="codiepie" size={24} color={focused ?'#FAA034':'#cba4ff'} />
          ),
        }}
        />
        <Tab.Screen name="Watchlist" component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size ,focused}) => (
            <MaterialCommunityIcons name="bookmark-multiple" size={24} color={focused ? '#FAA034':'#cba4ff'} />
          ),
        }}
        />
        <Tab.Screen name="Conversion Rate" component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size ,focused}) => (
            <MaterialIcons name="currency-exchange" size={24} color={focused ? '#FAA034':'#cba4ff'} />
          ),
          tabBarLabel: ({ focused }) => (
            <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize:14, color: focused ? '#FAA034' : '#cba4ff' }}>
          Conversion
        </Text>
      </View>
          )
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