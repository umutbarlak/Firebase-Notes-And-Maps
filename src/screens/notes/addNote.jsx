import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {screenStyle} from '../../styles/screenStyles';
import {Button, Datepicker, Input} from '@ui-kitten/components';
import {uiElementStyles} from '../../styles/uiElementStyles';
import {Calendar} from 'iconsax-react-native';
import Colors from '../../theme/colors';
import {Formik} from 'formik';
import {
  addDoc,
  collection,
  getFirestore,
  Timestamp,
} from '@react-native-firebase/firestore';
import {noteSchema} from '../../utils/schemas';
import {Toast} from 'toastify-react-native';

const AddNote = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const addNote = async note => {
    setLoading(true);

    try {
      const db = getFirestore();
      await addDoc(collection(db, 'Notes'), {
        ...note,
        lastDate: Timestamp.fromDate(new Date(note.lastDate)),
        createdAt: Timestamp.now(),
      });

      navigation.goBack();
      Toast.success('Note başarı ile eklendi');
    } catch (error) {
      console.log(error);
      Toast.error('Üzgünüz bir hata oluştu');
      setLoading(false);
    }

    setLoading(false);
  };

  console.log(loading);

  return (
    <View style={screenStyle.container}>
      <Formik
        validationSchema={noteSchema}
        validateOnBlur={false}
        initialValues={{title: '', description: '', lastDate: null}}
        onSubmit={values => {
          addNote(values);
          console.log(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          touched,
        }) => (
          <View>
            <Input
              status={errors.title && touched.title ? 'danger' : 'default'}
              caption={errors.title && touched.title && errors.title}
              style={uiElementStyles.input}
              value={values.title}
              label="Başlık"
              placeholder="Lütfen başlık girin"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
            />
            <Input
              status={
                errors.description && touched.description ? 'danger' : 'default'
              }
              caption={
                errors.description && touched.description && errors.description
              }
              multiline
              style={uiElementStyles.input}
              value={values.description}
              label="Açıklama"
              placeholder="Lütfen açıklama girin"
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
            />

            <Datepicker
              status={
                errors.lastDate && touched.lastDate ? 'danger' : 'default'
              }
              caption={errors.lastDate && touched.lastDate && errors.lastDate}
              style={uiElementStyles.input}
              label="Son gün"
              placeholder="Lütfen son günü seçiniz"
              date={values.lastDate ? new Date(values.lastDate) : null}
              onSelect={nextDate => setFieldValue('lastDate', nextDate)}
              accessoryRight={() => <Calendar size="24" color={Colors.Gray} />}
            />
            <Button
              disabled={loading}
              onPress={handleSubmit}
              style={uiElementStyles.button}
              size="large">
              KAYDET
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({});
