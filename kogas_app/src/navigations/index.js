import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import SignInScreen from '../screens/SignInScreen';
import MainStack from './MainStack';
import { PRIMARY } from '../color';

const RootStack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Main"
        >
        <RootStack.Screen name="Login" component={SignInScreen} />
        <RootStack.Screen name="Main" component={MainStack} options={{
        title: 'KOGAS',
        tabBarActiveTintColor: PRIMARY.DEFAULT,
        headerTitleAlign: 'center',
        headerTintColor: PRIMARY.DEFAULT,
        headerTitleStyle: {fontWeight: '700'},
      }} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
