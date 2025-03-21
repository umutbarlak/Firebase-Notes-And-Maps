import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../theme/colors';
import {Edit2, Trash} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {UPDATENOTE} from '../../utils/routes';
import {deleteDoc, doc, getFirestore} from '@react-native-firebase/firestore';
import {Toast} from 'toastify-react-native';

const NoteItem = ({item}) => {
  const navigation = useNavigation();

  const date = new Date(item?.createdAt?._seconds * 1000).toLocaleDateString(
    'tr-TR',
  );
  const lastDate = new Date(item?.lastDate?._seconds * 1000).toLocaleDateString(
    'tr-TR',
  );

  const deleteNote = async () => {
    try {
      const db = getFirestore();
      await deleteDoc(doc(db, 'Notes', item.id));
      Toast.info('Not başarı ile silindi');
    } catch (error) {
      console.log(error);
      Toast.error('Üzgünüz bir hata oluştu');
    }
  };

  const askUser = () => {
    return Alert.alert(
      'Not silinecek, emin misiniz?',
      'Bu işlem daha sonra geri alınamaz!',
      [
        {
          text: 'Sil',
          onPress: () => deleteNote(),
        },
        {
          text: 'Vazgeç',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.desc}>{item.description}</Text>
        </View>
        <View style={styles.body}>
          <TouchableOpacity onPress={() => askUser()} activeOpacity={0.5}>
            <Trash size={24} color={Colors.Red} variant="Bold" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(UPDATENOTE, {note: item})}
            activeOpacity={0.5}>
            <Edit2 size={24} color={Colors.Blue} variant="Bold" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lastDataContainer}>
        <Text style={styles.lastDate}>Last Date: </Text>
        <Text style={styles.lastDateValue}>{lastDate}</Text>
      </View>
    </View>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SoftPurple,
    padding: 10,
  },
  innerContainer: {flexDirection: 'row'},
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
  },
  lastDataContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  lastDateValue: {
    color: Colors.Purple,
    fontSize: 12,
  },
  lastDate: {
    fontSize: 12,
    color: Colors.Purple,
    textAlign: 'right',
  },
  desc: {
    fontSize: 16,
  },
  body: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    gap: 10,
  },
  date: {
    marginVertical: 5,
    fontSize: 12,
    color: Colors.Blue,
  },
});
