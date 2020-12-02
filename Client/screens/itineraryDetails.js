import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../styles/global';
import Card from '../shared/card';
import FlatButton from '../shared/button';

// file fetch
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

const ItineraryDetails = ({navigation}) => {
  // on modal update, fetch the respective file to load in viewer. File reader option is used to indicate whether the file is fetched for view or for download.
  useEffect(() => {
    if (navigation.getParam('filename')) {
      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true, // <-- this is the only thing required
          notification: true,
          description: 'File downloaded by download manager.',
          mediaScannable: true,
          path:
            RNFetchBlob.fs.dirs.DownloadDir +
            '/' +
            '3 days in Bali with family.docx',
          mime:
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        },
      })
        .fetch(
          'GET',
          'https://itiapinodejs.herokuapp.com/files/download?file=3 days in Bali with family.docx&id=5f9bebf90067e045f8c23131&fileReader=true',
        )
        .then((res) => {
          // the temp file path
          console.log('The file saved to ', res.path());

          RNFetchBlob.android.actionViewIntent(
            res.path(),
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          );

          // FileViewer.open(res.path(), {
          //   showOpenWithDialog: true,
          //   showAppsSuggestions: true,
          // })
          //   .then(() => {
          //     // success
          //     console.log('success');
          //   })
          //   .catch((error) => {
          //     // error
          //     console.log(error);
          //   });
        });
    }
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.paragraph}>
          <Text style={{fontWeight: 'bold'}}>Itinerary Name:</Text>{' '}
          {navigation.getParam('filename')}
        </Text>
        <Text style={globalStyles.paragraph}>
          <Text style={{fontWeight: 'bold'}}>File Type:</Text>{' '}
          {navigation.getParam('contentType')}
        </Text>
        <Text style={globalStyles.paragraph}>
          <Text style={{fontWeight: 'bold'}}>Upload Date:</Text>{' '}
          {navigation.getParam('uploadDate')}
        </Text>
        <Text style={globalStyles.paragraph}>
          <Text style={{fontWeight: 'bold'}}>Itinerary Description:</Text>{' '}
          {navigation.getParam('des')}
        </Text>
        <View style={styles.bottom}>
          <Text>
            {' '}
            <Text style={{fontWeight: 'bold'}}>Author:</Text>{' '}
            {navigation.getParam('author')}{' '}
          </Text>
        </View>
      </Card>
      <FlatButton
        text="Download"
        onPress={() => console.log('downloading...')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
});

export default ItineraryDetails;
