import React from 'react';
import {View, StyleSheet, ActivityIndicator, Modal} from 'react-native';

const ModalCustom = (props) => {
  return (
    <Modal
      transparent={props.transparent}
      visible={props.visible}
      animationType={props.animationType}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={props.visible}
            size="large"
            color="#3a7c91"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    display: 'flex',
    height: 100,
    width: 100,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
});

export default ModalCustom;
