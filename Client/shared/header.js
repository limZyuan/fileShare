import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = ({navigation, title}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#333',
    letterSpacing: 1,
    fontFamily: 'nunito-bold',
  },
  headerTitle: {
    flexDirection: 'row',
  },
});

export default Header;
