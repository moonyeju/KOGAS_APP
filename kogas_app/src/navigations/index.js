import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import SignInScreen from '../screens/SignInScreen';
import BottomStack from './BottomStack';

const RootStack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Login" component={SignInScreen} />
        <RootStack.Screen name="Main" component={BottomStack} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
