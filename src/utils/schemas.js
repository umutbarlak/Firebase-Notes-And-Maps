import {object, string, date} from 'yup';

const noteSchema = object({
  title: string()
    .required('Zorunlu alan')
    .min(2, 'minimum 2 karakter')
    .max(100, 'maksimum 100 karakter olabilir'),
  description: string()
    .required('Zorunlu alan')
    .min(15, 'minimum 15 karakter')
    .max(300, 'maksimum 300 karakter olabilir'),
  lastDate: date().required('Zorunlu alan'),
});

export {noteSchema};
