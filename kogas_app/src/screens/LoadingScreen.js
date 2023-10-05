import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { PRIMARY } from '../color';

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={PRIMARY.DEFAULT} />
    </View>
  );
};

export default LoadingScreen;
