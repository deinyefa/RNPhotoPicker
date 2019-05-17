import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import PhotoPickerScreen from '../screens/PhotoPickerScreen';

const PhotoPickerStack = createStackNavigator({
  PhotoPicker: PhotoPickerScreen,
});

PhotoPickerStack.navigationOptions = {
  tabBarLabel: 'Photo Library'
}

export default createBottomTabNavigator({
  PhotoPickerStack
});