import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {globalStyles} from '../styles/global';
import RNFetchBlob from 'rn-fetch-blob';
import FlatButton from '../shared/button';
import {Formik} from 'formik';
import * as yup from 'yup';

// doc picker wrapper
import DocumentPicker from 'react-native-document-picker';

// schema for form
const UploadSchema = yup.object({
  title: yup.string().required().min(4),
  body: yup.string().required().min(8),
  rating: yup
    .string()
    .required()
    .test('is-num-1-5', 'Rating must be a number 1 - 5', (value) => {
      return parseInt(value) < 6 && parseInt(value) > 0;
    }),
});

const uploadFunc = () => {
  // Pick a single file
  DocumentPicker.pick({
    type: [DocumentPicker.types.allFiles],
  })
    .then((res) => {
      RNFetchBlob.fetch(
        'POST',
        'https://itiapinodejs.herokuapp.com/email/send',
        {
          'Content-Type': 'multipart/form-data',
        },
        [
          // part file from storage
          {
            name: 'file',
            filename: `${res.name}`,
            type: `${res.type}`,
            data: `${RNFetchBlob.wrap(res.uri)}`,
          },
          // elements without property `filename` will be sent as plain text
          {name: 'autName', data: 'gg'},
          {name: 'autEmail', data: 'gg@gg.com'},
          {name: 'itiName', data: 'From the Phone and prod server'},
          {name: 'itiDes', data: 'bad'},
          {name: 'filename', data: `${res.name}`},
        ],
      )
        .then((res) => {
          console.log('file uploaded from phone');
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('user cancelled');
      } else {
        console.log(err);
      }
    });
};

const Upload = () => {
  return (
    <View style={globalStyles.container}>
      <Text>Upload Screen</Text>
      <Formik
        initialValues={{title: '', body: '', rating: ''}}
        validationSchema={UploadSchema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}>
        {(formikProps) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Review Title"
              onChangeText={formikProps.handleChange('title')}
              value={formikProps.values.title}
              onBlur={formikProps.handleBlur('title')}
            />
            <Text style={globalStyles.errorText}>
              {formikProps.touched.title && formikProps.errors.title}
            </Text>
            <TextInput
              multiline
              style={globalStyles.input}
              placeholder="Review body"
              onChangeText={formikProps.handleChange('body')}
              value={formikProps.values.body}
              onBlur={formikProps.handleBlur('body')}
            />
            <Text style={globalStyles.errorText}>
              {formikProps.touched.body && formikProps.errors.body}
            </Text>
            <TextInput
              style={globalStyles.input}
              placeholder="Rating (1-5)"
              onChangeText={formikProps.handleChange('rating')}
              value={formikProps.values.rating}
              keyboardType="numeric"
              onBlur={formikProps.handleBlur('rating')}
            />
            <Text style={globalStyles.errorText}>
              {formikProps.touched.rating && formikProps.errors.rating}
            </Text>
            <FlatButton text="submit" onPress={formikProps.handleSubmit} />
          </View>
        )}
      </Formik>
      <FlatButton
        style={{marginTop: 16, backgroundColor: '#a5d1e3'}}
        text="Upload"
        onPress={() => uploadFunc()}
      />
    </View>
  );
};

export default Upload;
