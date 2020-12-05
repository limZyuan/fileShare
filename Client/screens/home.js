import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {globalStyles} from '../styles/global';
import Card from '../shared/card';
import {getAllFiles} from '../functions/dbConnect';
import ModalCustom from '../shared/modal';

const Home = ({navigation}) => {
  // store the full set of db data
  const [dbData, setDbData] = useState(null);
  // what is currently showing on the screen based on user search
  const [itineraries, setItineraries] = useState([]);
  // used for loader
  const [loading, setLoading] = useState(true);
  // store user searched term
  const [search, setSearch] = useState('');

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
              itiName: value.metadata.itiName,
              des: value.metadata.itiDes,
              uploadDate: value.uploadDate.toString().split('T')[0],
              downloads: value.metadata.downloads,
            });
          });
          setLoading(false);
          setDbData(allIti);
          setItineraries(allIti);
        }
      })
      .catch(() => {
        setLoading(false);
        alert(
          'We are unable to fetch itineraries. Please check your internet connection and try again.',
        );
      });
  }, []);

  const filterIti = () => {
    setItineraries(() => {
      return dbData.filter(
        (iti) =>
          iti.itiName
            .toLowerCase()
            .replace(/\s/g, '')
            .indexOf(search.toLowerCase().replace(/\s/g, '')) !== -1,
      );
    });
  };

  return (
    <View style={globalStyles.container}>
      <ModalCustom
        transparent={true}
        visible={loading}
        animationType={'none'}
      />
      <TextInput
        style={globalStyles.searchBar}
        onChangeText={(search) => setSearch(search)}
        onSubmitEditing={filterIti}
        placeholder="Search for itineraries"
        returnKeyType="search"
        autoCorrect={true}
      />
      <FlatList
        data={itineraries}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItineraryDetails', item)}>
            <Card>
              <Text style={globalStyles.titleText}>{item.itiName}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
