import React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from '../styles/global';
import RNFetchBlob from 'rn-fetch-blob';
import FlatButton from '../shared/button';

// doc picker wrapper
import DocumentPicker from 'react-native-document-picker';

const uploadFunc = () => {
  // Pick a single file
  DocumentPicker.pick({
    type: [DocumentPicker.types.allFiles],
  })
    .then((res) => {
      console.log(res);
      RNFetchBlob.fetch(
        'POST',
        'http://10.0.2.2:3000/email/send',
        {
          'Content-Type': 'multipart/form-data',
        },
        [
          // part file from storage
          {
            name: 'file',
            filename: `${res.name}`,
            type: `${res.type}`,
            data: `${res.uri}`,
          },
          // elements without property `filename` will be sent as plain text
          {name: 'autName', data: 'gg'},
          {name: 'autEmail', data: 'gg@gg.com'},
          {name: 'itiName', data: 'hmmmm'},
          {name: 'itiDes', data: 'bad'},
          {name: 'filename', data: `${res.name}`},
        ],
      )
        .then((res) => {
          console.log(res, 'here');
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
      <FlatButton
        style={{marginTop: 16, backgroundColor: '#a5d1e3'}}
        text="Upload"
        onPress={() => uploadFunc()}
      />
    </View>
  );
};

export default Upload;
