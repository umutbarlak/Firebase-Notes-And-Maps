import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Location} from 'iconsax-react-native';
import Colors from '../../theme/colors';

const CustomMarker = () => {
  return (
    <View>
      <Location size="36" color={Colors.Blue} variant="Bold" />
    </View>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({});
