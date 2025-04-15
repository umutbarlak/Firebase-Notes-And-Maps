import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import FloatActionButton from '../../components/ui/floatActionButton';
import {screenStyle} from '../../styles/screenStyles';
import NoteItem from '../../components/notes/noteItem';
import {ADDNOTE} from '../../utils/routes';
import {Add} from 'iconsax-react-native';
import Colors from '../../theme/colors';
import {getApp} from '@react-native-firebase/app';

const Notes = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    try {
      const app = getApp();
      const db = getFirestore(app);
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

  useEffect(() => {
    getNotes();
  }, []);
  return (
    <View style={screenStyle.container}>
      <FlatList
        data={notes}
        renderItem={({item}) => <NoteItem item={item} />}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({});
