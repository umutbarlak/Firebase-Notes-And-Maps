import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '../../utils/contants';
import Colors from '../../theme/colors';

const FloatActionButton = props => {
  const {icon, bg = Colors.Purple, customStyle = {}} = props;

  console.log(customStyle);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      {...props}
      style={[styles.container, {backgroundColor: bg}, customStyle]}>
      {icon}
    </TouchableOpacity>
  );
};

export default FloatActionButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Purple,
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.05,
    borderRadius: 50,
  },
});
