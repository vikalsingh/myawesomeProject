import React from 'react';
import { View, StyleSheet } from 'react-native';
import CurrentLocationMap from '../components/CurrentLocationMap'; // path as per your setup

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <CurrentLocationMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
