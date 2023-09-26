import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import SignInScreen from '../screens/SignInScreen';
import MainStack from './MainStack';

const RootStack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={SignInScreen}/>
        <RootStack.Screen name="Main" component={MainStack}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
