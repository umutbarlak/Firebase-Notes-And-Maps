import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const CustomCallout = ({marker}) => {
  console.log(marker);
  return (
    <View>
      <Text>{marker.title}</Text>
      <Text>marker.title</Text>
      <Text>{marker.description}</Text>
    </View>
  );
};

export default CustomCallout;

const styles = StyleSheet.create({});
