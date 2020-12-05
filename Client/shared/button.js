import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

const FlatButton = ({text, onPress, style}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.button, ...style}}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#3a7c91',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FlatButton;
