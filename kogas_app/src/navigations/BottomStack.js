import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.js';
import {PRIMARY, WHITE} from '../color';
import Icon from 'react-native-vector-icons/Ionicons';

import SignatureListScreen from '../screens/SignatureListScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';
import SignatureScreen from '../screens/SignatureScreen.js';

const Tab = createBottomTabNavigator();

const BottomStack = () => {
  Icon.loadFont(); // Ionicons 폰트 로드
  return (
    <Tab.Navigator
      initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'KOGAS',
          tabBarLabel: 'KOGAS',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Signature"
        component={SignatureScreen}
        options={{
          tabBarLabel: '서명 문서',
          title: '서명 문서',
          tabBarIcon: ({color, size}) => (
            <Icon name="document-text-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: '환경설정',
          title: '환경설정',
          headerStyle: {
            backgroundColor: PRIMARY.DEFAULT,
          },
          headerTintColor: WHITE,
          tabBarIcon: ({color, size}) => (
            <Icon name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomStack;
