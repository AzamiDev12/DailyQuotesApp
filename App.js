import { StatusBar } from 'expo-status-bar';
import React, { useState ,useEffect } from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen  from './src/screen/WelcomeScreen';
import QuotesScreen from './src/screen/QuotesScreen'; 
 

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    
  }, [])
  return (
    <NavigationContainer>
        <StatusBar style="inverted" />
      <Stack.Navigator initialRouteName="Welcome"  screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen}  />
       <Stack.Screen name="Quotes" component={QuotesScreen}  /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
export default App;