import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {globalStyles} from '../styles/global';
import Card from '../shared/card';
import {getAllFiles} from '../functions/dbConnect';
import ModalCustom from '../shared/modal';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <View style={globalStyles.searchWrap}>
        <Icon name={'search'} size={25} color={'#bbb'} />
        <TextInput
          style={globalStyles.searchBar}
          onChangeText={(search) => setSearch(search)}
          onSubmitEditing={filterIti}
          placeholder="Search for Itineraries"
          selectionColor="#5ca9fb"
          returnKeyType="search"
          autoCorrect={true}
        />
      </View>
      <FlatList
        data={itineraries}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ItineraryDetails', item)}>
            <Card>
              <Image
                style={globalStyles.image}
                source={{
                  uri: `https://source.unsplash.com/100x100/?travel,${index}`,
                }}
              />
              <Text style={globalStyles.titleText}>
                <Text style={{fontWeight: '700', fontSize: 17}}>
                  {item.itiName.length > 33
                    ? item.itiName.substring(0, 33 - 3) + '...'
                    : item.itiName}
                </Text>
                {'\n'}
                <Text style={{color: '#a0a0a0', fontSize: 13}}>
                  {item.author}
                </Text>
              </Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;
