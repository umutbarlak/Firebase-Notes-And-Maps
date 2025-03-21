import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {screenHeight, screenWidth} from '../../utils/contants';
import Colors from '../../theme/colors';
import {Add} from 'iconsax-react-native';

const FloatActionButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} {...props} style={styles.container}>
      <Add size={44} color={Colors.White} />
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
});
