import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  collection,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';
import CustomMarker from '../../components/ui/customMarker';
import CustomCallout from '../../components/ui/CustomCallout';
import {convertDate} from '../../utils/functions';
import {screenWidth} from '../../utils/contants';

const Maps = () => {
  const [notes, setNotes] = useState([]);
  const [position, setPosition] = useState(null);

  const initialRegion = {
    latitude: position?.coords?.latitude || 40.982634,
    longitude: position?.coords?.longitude || 29.024495,
    latitudeDelta: 0.0115,
    longitudeDelta: 0.0221,
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

  useEffect(() => {
    getNotes();
    getPosition();
  }, []);

  console.log(notes);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        // mapId="a9320aaf1bcb47ad"
        style={styles.map}
        region={initialRegion}>
        {notes.map((marker, index) => {
          console.log(convertDate(marker.createdAt));
          return (
            <Marker
              key={index}
              coordinate={{
                longitude: marker.coordinate.longitude,
                latitude: marker.coordinate.latitude,
              }}
              // title={marker?.title}
              // description={marker?.description}
            >
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

        <Marker
          coordinate={{
            latitude: position?.coords.latitude,
            longitude: position?.coords.longitude,
          }}>
          <CustomMarker />
        </Marker>
      </MapView>
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
