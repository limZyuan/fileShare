import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {globalStyles} from '../styles/global';
import Card from '../shared/card';
import {getAllFiles} from '../functions/dbConnect';

const Home = ({navigation}) => {
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

export default Home;
