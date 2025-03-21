import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notes from '../screens/notes';
import {
  ADDNOTE,
  LOGIN,
  MAPS,
  NOTES,
  PROFILE,
  REGISTER,
  UPDATENOTE,
} from '../utils/routes';
import Profile from '../screens/profile';
import Login from '../screens/login';
import Register from '../screens/register';
import AddNote from '../screens/notes/addNote';
import UpdateNote from '../screens/notes/updateNote';
import Maps from '../screens/maps';
import {Add, AddSquare, Note1} from 'iconsax-react-native';
import Colors from '../theme/colors';

const Stack = createNativeStackNavigator();

const RootNatigator = () => {
  return (
    <Stack.Navigator initialRouteName={MAPS}>
      <Stack.Screen name={NOTES} component={Notes} />
      <Stack.Screen name={PROFILE} component={Profile} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={REGISTER} component={Register} />
      <Stack.Screen name={ADDNOTE} component={AddNote} />
      <Stack.Screen name={UPDATENOTE} component={UpdateNote} />
      <Stack.Screen
        options={({navigation}) => ({
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginRight: 10,
              }}>
              <AddSquare
                onPress={() => navigation.navigate(ADDNOTE)}
                size="28"
                color={Colors.Black}
                variant="Outline"
              />
              <Note1
                onPress={() => navigation.navigate(NOTES)}
                size="28"
                color={Colors.Black}
              />
            </View>
          ),
        })}
        name={MAPS}
        component={Maps}
      />
    </Stack.Navigator>
  );
};

export default RootNatigator;

const styles = StyleSheet.create({});
