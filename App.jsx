import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNatigator from './src/router/rootNatigator';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import ToastManager from 'toastify-react-native';
import {screenWidth} from './src/utils/contants';
const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <ToastManager
          animationInTiming={300}
          duration={2000}
          position="top"
          showCloseIcon={false}
          animationStyle={'upInUpOut'}
          width={screenWidth * 0.7}
        />
        <RootNatigator />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
