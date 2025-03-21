import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  collection,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';
import Geolocation from '@react-native-community/geolocation';

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

  console.log(position?.coords.latitude);
  console.log(position?.coords.longitude);

  useEffect(() => {
    getNotes();
    getPosition();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={initialRegion}>
        {notes.map((item, index) => {
          const coordinate = {
            latitude: item.coordinate.latitude,
            longitude: item.coordinate.longitude,
          };

          return (
            <Marker
              key={index}
              coordinate={coordinate}
              title={item?.title}
              description={item?.description}
            />
          );
        })}

        <Marker
          coordinate={{
            latitude: position?.coords.latitude,
            longitude: position?.coords.longitude,
          }}
        />
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
