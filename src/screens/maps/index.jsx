import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Callout, Marker} from 'react-native-maps';
import {
  collection,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from '../../components/ui/customMarker';
import {screenHeight, screenWidth} from '../../utils/contants';
import FloatActionButton from '../../components/ui/floatActionButton';
import {Add, ArrowRight, Map} from 'iconsax-react-native';
import Colors from '../../theme/colors';
import {ADDNOTE} from '../../utils/routes';

const Maps = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [position, setPosition] = useState(null);
  const [coordinate, setCoordinate] = useState(null);
  const [mapType, setmapType] = useState('terrain');

  const initialRegion = {
    latitude: position?.coords?.latitude || 40.982634,
    longitude: position?.coords?.longitude || 29.024495,
    latitudeDelta: 0.02,
    longitudeDelta: 0.03,
  };

  const getNotes = async () => {
    try {
      const db = getFirestore();
      const notesCollection = collection(db, 'Notes');
      const querySnapshot = await getDocs(notesCollection);
      let notes = [];
      querySnapshot.forEach(documentSnapshot => {
        notes.push({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        });
      });

      setNotes(notes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(pos);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  const changeMapType = () => {
    console.log(mapType);
    if (mapType === 'satellite') {
      setmapType('terrain');
    } else {
      setmapType('satellite');
    }
  };

  useEffect(() => {
    getNotes();
    getPosition();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        showsTraffic
        mapType={mapType}
        zoomEnabled={true}
        zoomTapEnabled={true}
        onPress={pos => setCoordinate(pos.nativeEvent.coordinate)}
        showsUserLocation
        style={styles.map}
        region={initialRegion}>
        {notes &&
          notes.map((marker, index) => {
            return (
              <Marker
                key={index}
                coordinate={{
                  longitude: marker.coordinate.longitude,
                  latitude: marker.coordinate.latitude,
                }}>
                <Callout>
                  <View style={{padding: 5, width: screenWidth * 0.5}}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>
                      {marker.title}
                    </Text>
                    <Text style={{fontSize: 12}}>{marker.description}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}

        {coordinate && (
          <Marker coordinate={coordinate}>
            <CustomMarker />
          </Marker>
        )}
      </MapView>
      {coordinate && (
        <FloatActionButton
          bg={Colors.Green}
          icon={<ArrowRight size={30} color={Colors.White} />}
          onPress={() => navigation.navigate(ADDNOTE, {coordinate})}
        />
      )}
      <FloatActionButton
        customStyle={{
          top: screenHeight * 0.01,
          width: screenWidth * 0.12,
          height: screenWidth * 0.12,
          right: screenWidth * 0.03,
        }}
        bg={Colors.Gray}
        icon={<Map size={30} color={Colors.White} />}
        onPress={changeMapType}
      />
    </SafeAreaView>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
