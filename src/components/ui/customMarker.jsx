import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Location} from 'iconsax-react-native';
import Colors from '../../theme/colors';

const CustomMarker = () => {
  return <Location size="24" color={Colors.Blue} variant="Bold" />;
};

export default CustomMarker;

const styles = StyleSheet.create({});
