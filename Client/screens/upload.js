import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import {globalStyles} from '../styles/global';
import RNFetchBlob from 'rn-fetch-blob';
import FlatButton from '../shared/button';
import {Formik} from 'formik';
import * as yup from 'yup';

// doc picker wrapper
import DocumentPicker from 'react-native-document-picker';

// schema for form
const UploadSchema = yup.object({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  itineraryName: yup.string().required().min(3),
  itineraryDescription: yup.string().required().min(10),
});

const uploadFunc = (values, resetForm) => {
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
          {name: 'autName', data: values.name},
          {name: 'autEmail', data: values.email},
          {name: 'itiName', data: values.itineraryName},
          {name: 'itiDes', data: values.itineraryDescription},
          {name: 'filename', data: `${res.name}`},
        ],
      )
        .then((res) => {
          resetForm();
          Alert.alert(
            'Thank you for giving back to the community! 😍',
            'Your itinerary has been send to the Travellist team for review.',
            [{text: 'Close'}],
          );
        })
        .catch((err) => {
          alert(err);
        });
    })
    .catch((err) => {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('user cancelled');
      } else {
        alert(err);
      }
    });
};

const Upload = () => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={globalStyles.container}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            itineraryName: '',
            itineraryDescription: '',
          }}
          validationSchema={UploadSchema}
          onSubmit={(values, actions) => {
            uploadFunc(values, actions.resetForm);
          }}>
          {(formikProps) => (
            <View>
              <Text>Name</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="What is my name?"
                onChangeText={formikProps.handleChange('name')}
                value={formikProps.values.name}
                onBlur={formikProps.handleBlur('name')}
              />
              <Text style={globalStyles.errorText}>
                {formikProps.touched.name && formikProps.errors.name}
              </Text>
              <Text>Email</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="What is my email?"
                onChangeText={formikProps.handleChange('email')}
                value={formikProps.values.email}
                onBlur={formikProps.handleBlur('email')}
                keyboardType="email-address"
              />
              <Text style={globalStyles.errorText}>
                {formikProps.touched.email && formikProps.errors.email}
              </Text>
              <Text>Itinerary Name</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="What should I call my itinerary?"
                onChangeText={formikProps.handleChange('itineraryName')}
                value={formikProps.values.itineraryName}
                onBlur={formikProps.handleBlur('itineraryName')}
              />
              <Text style={globalStyles.errorText}>
                {formikProps.touched.itineraryName &&
                  formikProps.errors.itineraryName}
              </Text>
              <Text>Itinerary Description</Text>
              <TextInput
                placeholder="My itinerary is about..."
                multiline
                maxLength={300}
                style={globalStyles.input}
                onChangeText={formikProps.handleChange('itineraryDescription')}
                value={formikProps.values.itineraryDescription}
                onBlur={formikProps.handleBlur('itineraryDescription')}
              />
              <Text style={globalStyles.errorText}>
                {formikProps.touched.itineraryDescription &&
                  formikProps.errors.itineraryDescription}
              </Text>
              <FlatButton
                text="Let's pick my itinerary!"
                onPress={formikProps.handleSubmit}
              />
            </View>
          )}
        </Formik>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Upload;
