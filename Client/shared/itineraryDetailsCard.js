import React from 'react';
import {StyleSheet, View} from 'react-native';

const ItineraryDetailsCard = (props) => {
  return (
    <View style={styles.itineraryCard}>
      <View style={styles.itineraryCardContent}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryCard: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#f5f7f9',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  itineraryCardContent: {
    marginHorizontal: 10,
    marginVertical: 12,
  },
});

export default ItineraryDetailsCard;
