import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {globalStyles} from '../styles/global';
import Card from '../shared/card';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {getAllFiles} from '../functions/dbConnect';

const Home = ({navigation}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    const allIti = [];
    getAllFiles()
      .then((res) => {
        if (res) {
          Object.values(res).map((value) => {
            allIti.push({
              filename: value.filename,
              contentType: value.contentType,
              key: value._id,
              author: value.metadata.author,
              des: value.metadata.itiDes,
              uploadDate: value.uploadDate.toString().split('T')[0],
              downloads: value.metadata.downloads,
            });
          });

          setItineraries(allIti);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(
          'We are unable to fetch itineraries. Please check your internet connection and try again.',
        );
      });
  }, []);

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <Icon
              name="close"
              size={30}
              onPress={() => setModalOpen(false)}
              style={styles.modalClose}
            />
            <Text>Upload Itineraries</Text>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Icon
        name="plus"
        size={30}
        onPress={() => setModalOpen(true)}
        style={styles.modalTogger}></Icon>
      <FlatList
        data={itineraries}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItineraryDetails', item)}>
            <Card>
              <Text style={globalStyles.titleText}>{item.filename}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalTogger: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {flex: 1},
});

export default Home;
