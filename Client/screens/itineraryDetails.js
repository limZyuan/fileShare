import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../styles/global';
import Card from '../shared/card';
import FlatButton from '../shared/button';

// file fetch
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';

const ItineraryDetails = ({navigation}) => {
  const openFile = () => {
    if (navigation.getParam('filename')) {
      RNFetchBlob.config({
        fileCache: true,
        path:
          RNFetchBlob.fs.dirs.DownloadDir +
          '/' +
          `${navigation.getParam('filename')}`,
      })
        .fetch(
          'GET',
          `https://itiapinodejs.herokuapp.com/files/download?file=${navigation.getParam(
            'filename',
          )}&id=${navigation.getParam('key')}&fileReader=true`,
        )
        .then((res) => {
          FileViewer.open(res.path(), {
            showOpenWithDialog: true,
            showAppsSuggestions: true,
            onDismiss: () => {
              // remove file by specifying a path
              RNFetchBlob.fs.unlink(res.path()).then(() => {
                console.log('removed', res.path());
              });
            },
          })
            .then(() => {
              // success
              console.log('success');
            })
            .catch((error) => {
              // error
              alert(error);
            });
        });
    }
  };

  const downloadFile = () => {
    if (navigation.getParam('filename')) {
      RNFetchBlob.config({
        fileCache: true,
        // android only options, these options be a no-op on IOS
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          title: `${navigation.getParam('filename')}`,
          mime: 'application/pdf',
          path:
            RNFetchBlob.fs.dirs.DownloadDir +
            '/' +
            `${navigation.getParam('filename')}`,
        },
      })
        .fetch(
          'GET',
          `https://itiapinodejs.herokuapp.com/files/download?file=${navigation.getParam(
            'filename',
          )}&id=${navigation.getParam('key')}&fileReader=true`,
        )
        .then((res) => console.log('download success'))
        .catch((err) => alert(err));
    }
  };

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
        style={{marginTop: 16, backgroundColor: '#a5d1e3'}}
        text="View"
        onPress={() => openFile()}
      />
      <FlatButton
        style={{marginTop: 16, backgroundColor: '#3a7c91'}}
        text="Download"
        onPress={() => downloadFile()}
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
